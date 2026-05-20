import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakController } from './keycloak.controller';
import { KeycloakService } from './keycloak.service';
import { AuthDto, RefreshTokenDto } from './dto/auth.dto';
import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

describe('KeycloakController (Authentication)', () => {
  let controller: KeycloakController;
  let keycloakService: KeycloakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeycloakController],
      providers: [
        {
          provide: KeycloakService,
          useValue: {
            auth: jest.fn(),
            changePassword: jest.fn(),
            signOut: jest.fn(),
            refreshAccessToken: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<KeycloakController>(KeycloakController);
    keycloakService = module.get<KeycloakService>(KeycloakService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('auth', () => {
    it('should call keycloakService.auth with correct payload', async () => {
      const authDto: AuthDto = {
        iss: 'http://localhost:8080/auth/realms/myrealm',
        code: 'abc123',
        state: 'random-state-123',
      };
      const mockResult = {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Authentication successful',
        data: { token: 'jwt-token', rolesAndPermissions: [] },
      };
      (keycloakService.auth as jest.Mock).mockResolvedValue(mockResult);

      const result = await controller.auth(authDto);
      expect(keycloakService.auth).toHaveBeenCalledWith(authDto);
      expect(result).toEqual(mockResult);
    });

    it('should throw RpcException on auth error', async () => {
      const authDto: AuthDto = {
        iss: 'http://localhost:8080/auth/realms/myrealm',
        code: 'abc123',
        state: 'invalid-state',
      };
      (keycloakService.auth as jest.Mock).mockRejectedValue(
        new RpcException('Invalid state parameter'),
      );

      await expect(controller.auth(authDto)).rejects.toThrow(
        new RpcException('Invalid state parameter'),
      );
      expect(keycloakService.auth).toHaveBeenCalledWith(authDto);
    });
  });

  describe('changePassword', () => {
    it('should call keycloakService.changePassword', async () => {
      const mockResult = {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Password change URL generated successfully',
        data: { url: 'http://keycloak/auth/change-password' },
      };
      (keycloakService.changePassword as jest.Mock).mockResolvedValue(
        mockResult,
      );

      const result = await controller.changePassword();
      expect(keycloakService.changePassword).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });

    it('should throw RpcException on changePassword error', async () => {
      (keycloakService.changePassword as jest.Mock).mockRejectedValue(
        new RpcException('Missing redirect URI'),
      );

      await expect(controller.changePassword()).rejects.toThrow(
        new RpcException('Missing redirect URI'),
      );
      expect(keycloakService.changePassword).toHaveBeenCalled();
    });
  });

  describe('signOut', () => {
    it('should call keycloakService.signOut with correct payload', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'refresh-token-123',
      };
      const mockResult = {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Logout successful',
        data: null,
      };
      (keycloakService.signOut as jest.Mock).mockResolvedValue(mockResult);

      const result = await controller.signOut(refreshTokenDto);
      expect(keycloakService.signOut).toHaveBeenCalledWith(refreshTokenDto);
      expect(result).toEqual(mockResult);
    });

    it('should throw RpcException on signOut error', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'invalid-token',
      };
      (keycloakService.signOut as jest.Mock).mockRejectedValue(
        new RpcException('Invalid refresh token'),
      );

      await expect(controller.signOut(refreshTokenDto)).rejects.toThrow(
        new RpcException('Invalid refresh token'),
      );
      expect(keycloakService.signOut).toHaveBeenCalledWith(refreshTokenDto);
    });
  });

  describe('refreshToken', () => {
    it('should call keycloakService.refreshAccessToken with correct payload', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'refresh-token-123',
      };
      const mockResult = {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Token refresh successful',
        data: { access_token: 'new-token' },
      };
      (keycloakService.refreshAccessToken as jest.Mock).mockResolvedValue(
        mockResult,
      );

      const result = await controller.refreshToken(refreshTokenDto);
      expect(keycloakService.refreshAccessToken).toHaveBeenCalledWith(
        refreshTokenDto,
      );
      expect(result).toEqual(mockResult);
    });

    it('should throw RpcException on refreshAccessToken error', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'invalid-token',
      };
      (keycloakService.refreshAccessToken as jest.Mock).mockRejectedValue(
        new RpcException('Token refresh failed'),
      );

      await expect(controller.refreshToken(refreshTokenDto)).rejects.toThrow(
        new RpcException('Token refresh failed'),
      );
      expect(keycloakService.refreshAccessToken).toHaveBeenCalledWith(
        refreshTokenDto,
      );
    });
  });
});
