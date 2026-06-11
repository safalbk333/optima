import { Test, TestingModule } from '@nestjs/testing';
import { KeycloakController } from './keycloak.controller';
import { of, throwError } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthDto, RefreshTokenDto } from './dto/auth.dto';

describe('KeycloakController (Gateway)', () => {
  let controller: KeycloakController;

  const mockClientProxy = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeycloakController],
      providers: [
        {
          provide: 'AUTH_SERVICE',
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    controller = module.get<KeycloakController>(KeycloakController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('auth', () => {
    it('should authenticate user successfully', async () => {
      const authDto: AuthDto = {
        iss: 'http://localhost:8080/auth/realms/myrealm',
        code: 'abc123',
        state: 'random-state-123',
      };
      const expectedResponse = {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Authentication successful',
        data: { token: 'jwt-token', rolesAndPermissions: [] },
      };

      mockClientProxy.send.mockReturnValue(of(expectedResponse));

      const observable = await controller.auth({ query: authDto });
      const result = await firstValueFrom(observable);
      expect(result).toEqual(expectedResponse);
      expect(mockClientProxy.send).toHaveBeenCalledWith(
        'authentication.keycloak.auth',
        authDto,
      );
    });

    it('should throw HttpException on authentication error', async () => {
      const authDto: AuthDto = {
        iss: 'http://localhost:8080/auth/realms/myrealm',
        code: 'abc123',
        state: 'invalid-state',
      };
      const error = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid state parameter',
      };

      mockClientProxy.send.mockReturnValue(throwError(() => error));

      const observable = await controller.auth({ query: authDto });
      await expect(firstValueFrom(observable)).rejects.toThrow(
        new HttpException(error, HttpStatus.BAD_REQUEST),
      );
      expect(mockClientProxy.send).toHaveBeenCalledWith(
        'authentication.keycloak.auth',
        authDto,
      );
    });
  });

  describe('changePassword', () => {
    it('should generate password change URL successfully', async () => {
      const expectedResponse = {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Password change URL generated successfully',
        data: { url: 'http://keycloak/auth/change-password' },
      };

      mockClientProxy.send.mockReturnValue(of(expectedResponse));

      const observable = await controller.changePassword();
      const result = await firstValueFrom(observable);
      expect(result).toEqual(expectedResponse);
      expect(mockClientProxy.send).toHaveBeenCalledWith(
        'authentication.keycloak.change-password',
        {},
      );
    });

    it('should throw HttpException on change password error', async () => {
      const error = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to generate password change URL',
      };

      mockClientProxy.send.mockReturnValue(throwError(() => error));

      const observable = await controller.changePassword();
      await expect(firstValueFrom(observable)).rejects.toThrow(
        new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR),
      );
      expect(mockClientProxy.send).toHaveBeenCalledWith(
        'authentication.keycloak.change-password',
        {},
      );
    });
  });

  describe('signOut', () => {
    it('should sign out user successfully', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'refresh-token-123',
      };
      const expectedResponse = {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Logout successful',
        data: null,
      };

      mockClientProxy.send.mockReturnValue(of(expectedResponse));

      const observable = await controller.signOut({
        headers: { refreshtoken: 'refresh-token-123' },
      });
      const result = await firstValueFrom(observable);
      expect(result).toEqual(expectedResponse);
      expect(mockClientProxy.send).toHaveBeenCalledWith(
        'authentication.keycloak.signout',
        refreshTokenDto,
      );
    });

    it('should throw HttpException on signout error', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'invalid-token',
      };
      const error = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid refresh token',
      };

      mockClientProxy.send.mockReturnValue(throwError(() => error));

      const observable = await controller.signOut({
        headers: { refreshtoken: 'invalid-token' },
      });
      await expect(firstValueFrom(observable)).rejects.toThrow(
        new HttpException(error, HttpStatus.BAD_REQUEST),
      );
      expect(mockClientProxy.send).toHaveBeenCalledWith(
        'authentication.keycloak.signout',
        refreshTokenDto,
      );
    });
  });

  describe('refreshToken', () => {
    it('should refresh access token successfully', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'refresh-token-123',
      };
      const expectedResponse = {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Token refresh successful',
        data: { access_token: 'new-token' },
      };

      mockClientProxy.send.mockReturnValue(of(expectedResponse));

      const observable = await controller.refreshToken({
        headers: { refreshtoken: 'refresh-token-123' },
      });
      const result = await firstValueFrom(observable);
      expect(result).toEqual(expectedResponse);
      expect(mockClientProxy.send).toHaveBeenCalledWith(
        'authentication.keycloak.refresh-token',
        refreshTokenDto,
      );
    });

    it('should throw HttpException on refresh token error', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'invalid-token',
      };
      const error = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Token refresh failed',
      };

      mockClientProxy.send.mockReturnValue(throwError(() => error));

      const observable = await controller.refreshToken({
        headers: { refreshtoken: 'invalid-token' },
      });
      await expect(firstValueFrom(observable)).rejects.toThrow(
        new HttpException(error, HttpStatus.BAD_REQUEST),
      );
      expect(mockClientProxy.send).toHaveBeenCalledWith(
        'authentication.keycloak.refresh-token',
        refreshTokenDto,
      );
    });
  });
});
