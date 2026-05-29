export const GoodsReceiptProperties = {
  controller: {
    start: 'Goods Receipt Controller started successfully',
    findAll: 'Received request to find all goods receipts',
    findOne: 'Received request to find goods receipt with id',
    create: 'Received request to create goods receipt',
    update: 'Received request to update goods receipt',
    delete: 'Received request to delete goods receipt',
  },
  service: {
    findAll: {
      start: 'Fetching all goods receipts',
      success: 'Goods receipts fetched successfully',
      error: 'Error fetching goods receipts',
    },
    findOne: {
      start: 'Fetching goods receipt with id',
      success: 'Goods receipt fetched successfully',
      error: 'Error fetching goods receipt',
    },
    create: {
      start: 'Creating goods receipt',
      success: 'Goods receipt created successfully',
      error: 'Error creating goods receipt',
    },
    update: {
      start: 'Updating goods receipt',
      success: 'Goods receipt updated successfully',
      error: 'Error updating goods receipt',
    },
    delete: {
      start: 'Deleting goods receipt',
      success: 'Goods receipt deleted successfully',
      error: 'Error deleting goods receipt',
    },
  },
};
