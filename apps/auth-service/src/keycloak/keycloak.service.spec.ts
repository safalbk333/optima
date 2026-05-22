import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakService } from './keycloak.service';
import { KeycloakUtil, KeycloakConfig } from './util/keycloak.util';
import { AuthDto, RefreshTokenDto } from './dto/auth.dto';
import { AppLogger } from '@gnx/logger';
import { RpcException } from '@nestjs/microservices';
import axios from 'axios';
import { HttpStatus } from '@nestjs/common';

jest.mock('axios');
jest.mock('./util/keycloak.util');
jest.mock('@gnx/logger');

describe('KeycloakService', () => {
  let service: KeycloakService;
  let axiosMock: { get: jest.Mock; post: jest.Mock };
  let loggerMock: { log: jest.Mock; error: jest.Mock; warn: jest.Mock };

  const mockConfig: KeycloakConfig = {
    realmName: 'myrealm',
    keycloakUrl: 'http://localhost:8080/auth',
    authClientId: 'auth-client',
    authClientSecret: 'auth-secret',
    redirectUrl: 'http://localhost:3000/callback',
    clientId: 'client-id',
    audience: 'audience',
    redirectUri: 'http://localhost:3000/pass_update',
  };

  beforeEach(async () => {
    axiosMock = {
      get: jest.fn(),
      post: jest.fn(),
    };
    (axios.get as jest.Mock) = axiosMock.get;
    (axios.post as jest.Mock) = axiosMock.post;

    loggerMock = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
    };
    (AppLogger as jest.Mock).mockReturnValue(loggerMock);

    jest.resetAllMocks();
    (KeycloakUtil.getConfig as jest.Mock).mockReturnValue(mockConfig);
    (KeycloakUtil.validateCode as jest.Mock).mockResolvedValue({
      access_token: 'partial-token',
    });
    (KeycloakUtil.validateTokenResponse as jest.Mock).mockImplementation();
    (KeycloakUtil.validateUserInfoResponse as jest.Mock).mockImplementation();
    (KeycloakUtil.validateLogoutResponse as jest.Mock).mockImplementation();

    const module: TestingModule = await Test.createTestingModule({
      providers: [KeycloakService],
    }).compile();

    service = module.get<KeycloakService>(KeycloakService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getClientToken', () => {
    it('should retrieve client token successfully', async () => {
      axiosMock.post.mockResolvedValue({
        data: { access_token: 'client-token' },
      });

      const result = await (service as any).getClientToken();
      expect(result).toBe('client-token');
      expect(axiosMock.post).toHaveBeenCalledWith(
        `${mockConfig.keycloakUrl}/realms/${mockConfig.realmName}/protocol/openid-connect/token`,
        expect.any(URLSearchParams),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );
    });

    it('should throw RpcException on token retrieval failure', async () => {
      axiosMock.post.mockResolvedValue({ data: {} });

      await expect((service as any).getClientToken()).rejects.toThrow(
        new RpcException('Failed to obtain client token'),
      );
    });

    it('should throw RpcException on API error', async () => {
      axiosMock.post.mockRejectedValue(new Error('API error'));

      await expect((service as any).getClientToken()).rejects.toThrow(
        new RpcException('API error'),
      );
    });
  });

  describe('fetchUserRolesAndPermissions', () => {
    it('should fetch roles and permissions successfully', async () => {
      axiosMock.get
        .mockResolvedValueOnce({
          data: [
            { name: 'role1', composite: true },
            { name: 'role2', composite: false },
          ],
        })
        .mockResolvedValueOnce({
          data: [
            { name: 'perm1', composite: false },
            { name: 'perm2', composite: false },
          ],
        });

      const result = await (service as any).fetchUserRolesAndPermissions(
        'client-token',
        'user-id',
      );
      expect(result).toEqual([
        { role: 'role1', permissions: ['perm1', 'perm2'] },
      ]);
      expect(axiosMock.get).toHaveBeenCalledWith(
        `${mockConfig.keycloakUrl}/admin/realms/${mockConfig.realmName}/users/user-id/role-mappings/realm/composite`,
        { headers: { Authorization: `Bearer client-token` } },
      );
      expect(axiosMock.get).toHaveBeenCalledWith(
        `${mockConfig.keycloakUrl}/admin/realms/${mockConfig.realmName}/roles/role1/composites`,
        { headers: { Authorization: `Bearer client-token` } },
      );
    });

    it('should throw RpcException if no roles found', async () => {
      axiosMock.get.mockResolvedValue({ data: [] });

      await expect(
        (service as any).fetchUserRolesAndPermissions(
          'client-token',
          'user-id',
        ),
      ).rejects.toThrow(new RpcException('No roles found for the user.'));
    });

    it('should throw RpcException if no composite roles found', async () => {
      axiosMock.get.mockResolvedValue({
        data: [{ name: 'role1', composite: false }],
      });

      await expect(
        (service as any).fetchUserRolesAndPermissions(
          'client-token',
          'user-id',
        ),
      ).rejects.toThrow(new RpcException('User has no composite roles.'));
    });

    it('should throw RpcException on API error', async () => {
      axiosMock.get.mockRejectedValue(new Error('API error'));

      await expect(
        (service as any).fetchUserRolesAndPermissions(
          'client-token',
          'user-id',
        ),
      ).rejects.toThrow(new RpcException('API error'));
    });
  });

  describe('auth', () => {
    it('should authenticate user successfully', async () => {
      process.env.STATE = 'random-state-123';
      const authDto: AuthDto = {
        iss: 'http://localhost:8080/auth/realms/myrealm',
        code: 'abc123',
        state: 'random-state-123',
      };
      axiosMock.post
        .mockResolvedValueOnce({
          data: { access_token: 'full-token' },
        })
        .mockResolvedValueOnce({
          data: { access_token: 'client-token' },
        });
      axiosMock.get
        .mockResolvedValueOnce({ data: { sub: 'user-id' } })
        .mockResolvedValueOnce({
          data: [{ name: 'role1', composite: true }],
        })
        .mockResolvedValueOnce({
          data: [{ name: 'perm1', composite: false }],
        });

      const result = await service.auth(authDto);
      expect(result).toEqual({
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Authentication successful',
        data: {
          token: { access_token: 'full-token' },
          rolesAndPermissions: [{ role: 'role1', permissions: ['perm1'] }],
        },
      });
      expect(KeycloakUtil.validateCode).toHaveBeenCalledWith(
        authDto.iss,
        authDto.code,
        mockConfig.redirectUrl,
        mockConfig.clientId,
        authDto.state,
      );
      expect(KeycloakUtil.validateTokenResponse).toHaveBeenCalled();
      expect(KeycloakUtil.validateUserInfoResponse).toHaveBeenCalledWith({
        sub: 'user-id',
      });
    });

    it('should throw RpcException on invalid state', async () => {
      process.env.STATE = 'random-state-123';
      const authDto: AuthDto = {
        iss: 'http://localhost:8080/auth/realms/myrealm',
        code: 'abc123',
        state: 'invalid-state',
      };
      (KeycloakUtil.validateCode as jest.Mock).mockRejectedValue(
        new Error('Invalid state parameter'),
      );

      await expect(service.auth(authDto)).rejects.toThrow(
        new RpcException('Invalid state parameter'),
      );
      expect(KeycloakUtil.validateCode).toHaveBeenCalledWith(
        authDto.iss,
        authDto.code,
        mockConfig.redirectUrl,
        mockConfig.clientId,
        authDto.state,
      );
    });

    it('should throw RpcException on token validation failure', async () => {
      process.env.STATE = 'random-state-123';
      const authDto: AuthDto = {
        iss: 'http://localhost:8080/auth/realms/myrealm',
        code: 'abc123',
        state: 'random-state-123',
      };
      (KeycloakUtil.validateCode as jest.Mock).mockResolvedValue({});
      (KeycloakUtil.validateTokenResponse as jest.Mock).mockImplementation(
        () => {
          throw new RpcException('Token retrieval failed');
        },
      );

      await expect(service.auth(authDto)).rejects.toThrow(
        new RpcException('Token retrieval failed'),
      );
      expect(KeycloakUtil.validateCode).toHaveBeenCalled();
      expect(KeycloakUtil.validateTokenResponse).toHaveBeenCalled();
      expect(axiosMock.post).not.toHaveBeenCalled();
    });

    it('should throw RpcException on user info failure', async () => {
      process.env.STATE = 'random-state-123';
      const authDto: AuthDto = {
        iss: 'http://localhost:8080/auth/realms/myrealm',
        code: 'abc123',
        state: 'random-state-123',
      };
      (KeycloakUtil.validateCode as jest.Mock).mockResolvedValue({
        access_token: 'partial-token',
      });
      axiosMock.post.mockResolvedValueOnce({
        data: { access_token: 'full-token' },
      });
      axiosMock.get.mockResolvedValueOnce({ data: {} });
      (KeycloakUtil.validateUserInfoResponse as jest.Mock).mockImplementation(
        () => {
          throw new RpcException('Failed to obtain user info');
        },
      );

      await expect(service.auth(authDto)).rejects.toThrow(
        new RpcException('Failed to obtain user info'),
      );
      expect(KeycloakUtil.validateCode).toHaveBeenCalled();
      expect(KeycloakUtil.validateUserInfoResponse).toHaveBeenCalled();
      expect(axiosMock.get).toHaveBeenCalled();
    });

    it('should throw RpcException on API error', async () => {
      process.env.STATE = 'random-state-123';
      const authDto: AuthDto = {
        iss: 'http://localhost:8080/auth/realms/myrealm',
        code: 'abc123',
        state: 'random-state-123',
      };
      (KeycloakUtil.validateCode as jest.Mock).mockRejectedValue(
        new Error('API error'),
      );

      await expect(service.auth(authDto)).rejects.toThrow(
        new RpcException('API error'),
      );
    });
  });

  describe('changePassword', () => {
    it('should generate password change URL successfully', async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [KeycloakService],
      }).compile();
      const service = module.get<KeycloakService>(KeycloakService);

      const result = await service.changePassword();
      expect(result).toEqual({
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Password change URL generated successfully',
        data: {
          url: `${mockConfig.keycloakUrl}/realms/${mockConfig.realmName}/protocol/openid-connect/auth?client_id=${mockConfig.clientId}&redirect_uri=${mockConfig.redirectUri}/pass_update&response_type=code&scope=openid&kc_action=UPDATE_PASSWORD&acr=urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport&prompt=login`,
        },
      });
    });

    it('should throw RpcException on missing redirectUri', async () => {
      jest.spyOn(KeycloakUtil, 'getConfig').mockReturnValue({
        ...mockConfig,
        redirectUri: '',
      });

      const module: TestingModule = await Test.createTestingModule({
        providers: [KeycloakService],
      }).compile();
      const service = module.get<KeycloakService>(KeycloakService);

      await expect(service.changePassword()).rejects.toThrow(
        new RpcException('Missing redirect URI'),
      );
    });
  });

  describe('signOut', () => {
    it('should sign out user successfully', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'refresh-token-123',
      };
      axiosMock.post.mockResolvedValue({ status: HttpStatus.NO_CONTENT });

      const result = await service.signOut(refreshTokenDto);
      expect(result).toEqual({
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Logout successful',
        data: null,
      });
      expect(axiosMock.post).toHaveBeenCalledWith(
        `${mockConfig.keycloakUrl}/realms/${mockConfig.realmName}/protocol/openid-connect/logout`,
        expect.any(URLSearchParams),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );
      expect(KeycloakUtil.validateLogoutResponse).toHaveBeenCalledWith(
        HttpStatus.NO_CONTENT,
      );
    });

    it('should throw RpcException on invalid logout response', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'refresh-token-123',
      };
      axiosMock.post.mockResolvedValue({ status: HttpStatus.BAD_REQUEST });
      (KeycloakUtil.validateLogoutResponse as jest.Mock).mockImplementation(
        () => {
          throw new RpcException('Logout failed');
        },
      );

      await expect(service.signOut(refreshTokenDto)).rejects.toThrow(
        new RpcException('Logout failed'),
      );
      expect(axiosMock.post).toHaveBeenCalled();
      expect(KeycloakUtil.validateLogoutResponse).toHaveBeenCalledWith(
        HttpStatus.BAD_REQUEST,
      );
    });

    it('should throw RpcException on API error', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'refresh-token-123',
      };
      axiosMock.post.mockRejectedValue(new Error('API error'));

      await expect(service.signOut(refreshTokenDto)).rejects.toThrow(
        new RpcException('API error'),
      );
    });
  });

  describe('refreshAccessToken', () => {
    it('should refresh access token successfully', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'refresh-token-123',
      };
      axiosMock.post
        .mockResolvedValueOnce({ data: { access_token: 'partial-token' } })
        .mockResolvedValueOnce({ data: { access_token: 'new-token' } });

      const result = await service.refreshAccessToken(refreshTokenDto);
      expect(result).toEqual({
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Token refresh successful',
        data: { access_token: 'new-token' },
      });
      expect(axiosMock.post).toHaveBeenCalledWith(
        `${mockConfig.keycloakUrl}/realms/${mockConfig.realmName}/protocol/openid-connect/token`,
        expect.any(URLSearchParams),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );
      expect(KeycloakUtil.validateTokenResponse).toHaveBeenCalled();
    });

    it('should throw RpcException on token validation failure', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'refresh-token-123',
      };
      axiosMock.post.mockResolvedValueOnce({ data: {} });
      (KeycloakUtil.validateTokenResponse as jest.Mock).mockImplementation(
        () => {
          throw new RpcException('Token retrieval failed');
        },
      );

      await expect(service.refreshAccessToken(refreshTokenDto)).rejects.toThrow(
        new RpcException('Token retrieval failed'),
      );
      expect(axiosMock.post).toHaveBeenCalled();
      expect(KeycloakUtil.validateTokenResponse).toHaveBeenCalled();
    });

    it('should throw RpcException on API error', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'refresh-token-123',
      };
      axiosMock.post.mockRejectedValue(new Error('API error'));

      await expect(service.refreshAccessToken(refreshTokenDto)).rejects.toThrow(
        new RpcException('API error'),
      );
    });
  });
});
