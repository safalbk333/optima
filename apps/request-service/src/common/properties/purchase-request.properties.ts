export const PurchaseRequestProperties = {
  controller: {
    start: 'Purchase Request Controller started successfully',
    findAll: 'Received request to find all purchase requests',
    findOne: 'Received request to find purchase request with id',
    create: 'Received request to create purchase request',
    update: 'Received request to update purchase request with id',
    delete: 'Received request to delete purchase request with id',
  },
  service: {
    findAll: {
      start: 'Fetching all purchase requests',
      success: 'Purchase requests fetched successfully',
      error: 'Failed to fetch purchase requests',
    },
    findOne: {
      start: 'Fetching purchase request with id',
      success: 'Purchase request found with id',
      notFound: 'Purchase request not found with id',
      error: 'Failed to fetch purchase request with ID',
    },
    create: {
      start: 'Creating new purchase request',
      success: 'Purchase request created with id',
      error: 'Failed to create purchase request',
    },
    update: {
      start: 'Updating purchase request with id',
      success: 'Purchase request updated with id',
      notFound: 'Purchase request not found with id',
      error: 'Failed to update purchase request with ID',
    },
    delete: {
      start: 'Deleting purchase request with id',
      success: 'Purchase request deleted with id',
      notFound: 'Purchase request not found with id',
      error: 'Failed to delete purchase request with ID',
    },
  },
};
