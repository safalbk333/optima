export const DepartmentProperties = {
  controller: {
    start: 'Department Controller started successfully',
    findAll: 'Received request to find all departments',
    findOne: 'Received request to find department with id',
    create: 'Received request to create department',
    update: 'Received request to update department',
  },
  service: {
    findAll: {
      start: 'Fetching all departments',
      success: 'Departments fetched successfully',
      error: 'Failed to fetch departments',
    },
    findOne: {
      start: 'Fetching department with id',
      success: 'Department found with id',
      notFound: 'Department not found with id',
      error: 'Failed to fetch department with ID',
    },
    create: {
      start: 'Creating new department',
      success: 'Department created with id',
      error: 'Failed to create department',
    },
    update: {
      start: 'Updating department with id',
      success: 'Department updated with id',
      notFound: 'Department not found with id',
      error: 'Failed to update department with ID',
    },
  },
};
