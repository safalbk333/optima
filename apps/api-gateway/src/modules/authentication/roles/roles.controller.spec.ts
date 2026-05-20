import { Test, TestingModule } from '@nestjs/testing';
import { GroupRolesController } from './roles.controller';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { HttpStatus, Logger, HttpException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

// Mock the roles-map module
jest.mock('../guards/mappings/roles-map', () => {
  const mockRolesMap = {
    ROLE_ADMIN: 'grp_admin',
    ROLE_HR: 'grp_hr',
    ROLE_VIEW_ONLY: 'grp_view_only',
    ROLE_SUPER_ADMIN: 'grp_super_admin',
  };
  return {
    ...mockRolesMap,
    ALL_ROLES: Object.values(mockRolesMap),
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
      request.user = {
        payload: {
          sub: 'ecc2f185-9be0-47b0-9d95-fde8f1d03d8c',
          realm: 'gnxsolutions',
        },
      };
      return true;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}

describe('RolesController', () => {
  let controller: GroupRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupRolesController],
      providers: [
        Logger,
        {
          provide: JwtAuthGuard,
          useClass: MockJwtAuthGuard,
        },
        {
          provide: 'AUTH_SERVICE',
          useValue: {
            send: jest.fn().mockImplementation(() =>
              Promise.resolve({
                success: true,
                statusCode: HttpStatus.OK,
                message: 'Group roles retrieved successfully',
                data: {
                  ROLE_ADMIN: 'grp_admin',
                  ROLE_HR: 'grp_hr',
                  ROLE_VIEW_ONLY: 'grp_view_only',
                  ROLE_SUPER_ADMIN: 'grp_super_admin',
                },
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<GroupRolesController>(GroupRolesController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllRoles', () => {
    it('should return all roles with keys for an authenticated user', async () => {
      const mockRolesMap = {
        ROLE_ADMIN: 'grp_admin',
        ROLE_HR: 'grp_hr',
        ROLE_VIEW_ONLY: 'grp_view_only',
        ROLE_SUPER_ADMIN: 'grp_super_admin',
      };
      const result = await controller.getAllRoles();

      expect(result).toEqual({
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Group roles retrieved successfully',
        data: mockRolesMap,
      });
    });

    it('should throw HttpException if roles map is empty', async () => {
      jest.resetAllMocks();
      jest.resetModules();

      jest.mock('../guards/mappings/roles-map', () => ({
        ALL_ROLES: [],
      }));

      const { GroupRolesController: FreshRolesController } = await import(
        './roles.controller'
      );

      const module: TestingModule = await Test.createTestingModule({
        controllers: [FreshRolesController],
        providers: [
          Logger,
          {
            provide: 'AUTH_SERVICE',
            useValue: {
              send: jest.fn().mockRejectedValue(
                new HttpException(
                  {
                    success: false,
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Group roles configuration is invalid or empty',
                  },
                  HttpStatus.INTERNAL_SERVER_ERROR,
                ),
              ),
            },
          },
        ],
      }).compile();

      const tempController =
        module.get<GroupRolesController>(FreshRolesController);

      await expect(tempController.getAllRoles()).rejects.toThrow(
        new HttpException(
          {
            success: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Group roles configuration is invalid or empty',
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
