export const CategoryProperties = {
  controller: {
    start: 'Category Controller started successfully',
    findAll: 'Received request to find all categories',
    findOne: 'Received request to find category with id',
    create: 'Received request to create category',
    update: 'Received request to update category with id',
    delete: 'Received request to delete category with id',
  },
  service: {
    findAll: {
      start: 'Fetching all categories',
      success: 'Categories fetched successfully',
      error: 'Failed to fetch categories',
    },
    findOne: {
      start: 'Fetching category with id',
      success: 'Category found with id',
      notFound: 'Category not found with id',
      error: 'Failed to fetch category with ID',
    },
    create: {
      start: 'Creating new category',
      success: 'Category created with id',
      error: 'Failed to create category',
    },
    update: {
      start: 'Updating category with id',
      success: 'Category updated with id',
      notFound: 'Category not found with id',
      error: 'Failed to update category with ID',
    },
    delete: {
      start: 'Deleting category with id',
      success: 'Category deleted with id',
      notFound: 'Category not found with id',
      error: 'Failed to delete category with ID',
    },
  },
};
