export const RoleProperties = {
  controller: {
    start: 'Role Controller started successfully',
    findAll: 'Received request to find all roles',
    findOne: 'Received request to find roles with id',
    create: 'Received request to create roles',
  },
  service: {
    findAll: {
      start: 'Fetching all roles',
      success: 'Roles fetched successfully',
      error: 'Failed to fetch roles',
    },
    findOne: {
      start: 'Fetching role with id',
      success: 'Role found with id',
      notFound: 'Role not found with id',
      error: 'Failed to fetch role with ID',
    },
    create: {
      start: 'Creating new role',
      success: 'Role created with id',
      error: 'Failed to create role',
    },
  },
};
