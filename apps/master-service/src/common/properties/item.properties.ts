export const ItemProperties = {
  controller: {
    start: 'Item Controller started successfully',
    findAll: 'Received request to find all items',
    findOne: 'Received request to find item with id',
    create: 'Received request to create item',
  },
  service: {
    findAll: {
      start: 'Fetching all items',
      success: 'Items fetched successfully',
      error: 'Failed to fetch items',
    },
    findOne: {
      start: 'Fetching item with id',
      success: 'Item found with id',
      notFound: 'Item not found with id',
      error: 'Failed to fetch item with ID',
    },
    create: {
      start: 'Creating new item',
      success: 'Item created with id',
      error: 'Failed to create item',
    },
  },
};
