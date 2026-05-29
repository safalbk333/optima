export const PurchaseOrderProperties = {
  controller: {
    start: 'Purchase Order Controller started successfully',
    findAll: 'Received request to find all purchase orders',
    findOne: 'Received request to find purchase order with id',
    create: 'Received request to create purchase order',
    update: 'Received request to update purchase order',
    delete: 'Received request to delete purchase order',
  },
  service: {
    findAll: {
      start: 'Fetching all purchase orders',
      success: 'Purchase orders fetched successfully',
      error: 'Error fetching purchase orders',
    },
    findOne: {
      start: 'Fetching purchase order with id',
      success: 'Purchase order fetched successfully',
      error: 'Error fetching purchase order',
    },
    create: {
      start: 'Creating purchase order',
      success: 'Purchase order created successfully',
      error: 'Error creating purchase order',
    },
    update: {
      start: 'Updating purchase order',
      success: 'Purchase order updated successfully',
      error: 'Error updating purchase order',
    },
    delete: {
      start: 'Deleting purchase order',
      success: 'Purchase order deleted successfully',
      error: 'Error deleting purchase order',
    },
  },
};
