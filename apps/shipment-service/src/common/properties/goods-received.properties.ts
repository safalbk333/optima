export const GoodsReceivedProperties = {
  controller: {
    start: 'GoodsReceived Controller started successfully',
    findAll: 'Received request to find all goods received',
    findOne: 'Received request to find goods received with id',
    create: 'Received request to create goods received',
    update: 'Received request to update goods received with id',
    delete: 'Received request to delete goods received with id',
  },
  service: {
    findAll: {
      start: 'Fetching all goods received',
      success: 'Goods received found',
      error: 'Failed to fetch goods received',
    },
    findOne: {
      start: 'Fetching goods received with id',
      success: 'Goods received found with id',
      notFound: 'Goods received not found with id',
      error: 'Failed to fetch goods received with ID',
    },
    create: {
      start: 'Creating new goods received',
      success: 'Goods received created with id',
      error: 'Failed to create goods received',
    },
    update: {
      start: 'Updating goods received with id',
      success: 'Goods received updated with id',
      notFound: 'Goods received not found with id',
      error: 'Failed to update goods received with ID',
    },
    delete: {
      start: 'Deleting goods received with id',
      success: 'Goods received deleted with id',
      notFound: 'Goods received not found with id',
      error: 'Failed to delete goods received with ID',
    },
  },
};
