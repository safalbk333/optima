import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from './permissions.controller';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpStatus, Logger, HttpException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

// Mock the permissions-map module
jest.mock('../guards/mappings/permissions-map', () => {
  const mockPermissionsMap = {
    HOME_READ: 'prv_home_read',
    USER_USER_CREATE: 'prv_user_user_create',
    USER_USER_READ: 'prv_user_user_read',
    HIRING_ONBOARDING_CREATE: 'prv_hiring_onboarding_create',
  };
  return {
    ...mockPermissionsMap,
    ALL_PERMISSIONS: Object.values(mockPermissionsMap),
  };
});

// Mock JwtAuthGuard
class MockJwtAuthGuard {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as {
      headers?: Record<string, string>;
      user?: any;
    };
    if (request.headers?.authorization) {
      request.user = { rolesAndPermissions: ['prv_user_user_read'] };
      return true;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}

describe('PermissionsController', () => {
  let controller: PermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        Logger,
        {
          provide: JwtAuthGuard,
          useClass: MockJwtAuthGuard,
        },
      ],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules(); // Ensure module cache is cleared after each test
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllPermissions', () => {
    it('should return all permissions with keys for an authenticated user', async () => {
      const mockPermissionsMap = {
        HOME_READ: 'prv_home_read',
        USER_USER_CREATE: 'prv_user_user_create',
        USER_USER_READ: 'prv_user_user_read',
        HIRING_ONBOARDING_CREATE: 'prv_hiring_onboarding_create',
      };
      const result = await controller.getAllPermissions();

      expect(result).toEqual({
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Permissions retrieved successfully',
        data: mockPermissionsMap,
      });
    });

    it('should throw HttpException if permissions map is empty', async () => {
      // Clear all mocks and module cache
      jest.resetAllMocks();
      jest.resetModules();

      // Mock an empty permissions map
      jest.mock('../guards/mappings/permissions-map', () => ({
        ALL_PERMISSIONS: [],
      }));

      // Re-import the controller to ensure it uses the new mock
      const { PermissionsController: FreshPermissionsController } =
        await import('./permissions.controller');

      // Re-create the testing module with the fresh controller
      const module: TestingModule = await Test.createTestingModule({
        controllers: [FreshPermissionsController],
        providers: [Logger],
      }).compile();

      const tempController = module.get<PermissionsController>(
        FreshPermissionsController,
      );

      await expect(tempController.getAllPermissions()).rejects.toThrow(
        new HttpException(
          {
            success: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Permissions configuration is invalid or empty',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });

    it('should throw Unauthorized if not authenticated', async () => {
      const guard = new MockJwtAuthGuard();

      const mockExecutionContext = {
        switchToHttp: () => ({
          getRequest: () => ({ headers: {}, user: undefined }),
        }),
      } as unknown as ExecutionContext;

      expect(() => guard.canActivate(mockExecutionContext)).toThrow(
        new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED),
      );
    });
  });
});
