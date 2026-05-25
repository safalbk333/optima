export const ShipmentProperties = {
  controller: {
    start: 'Shipment Controller started successfully',
    findAll: 'Received request to find all shipments',
    findOne: 'Received request to find shipment with id',
    create: 'Received request to create shipment',
    update: 'Received request to update shipment with id',
    delete: 'Received request to delete shipment with id',
  },
  service: {
    findAll: {
      start: 'Fetching all shipments',
      success: 'Shipments found',
      error: 'Failed to fetch shipments',
    },
    findOne: {
      start: 'Fetching shipment with id',
      success: 'Shipment found with id',
      notFound: 'Shipment not found with id',
      error: 'Failed to fetch shipment with ID',
    },
    create: {
      start: 'Creating new shipment',
      success: 'Shipment created with id',
      error: 'Failed to create shipment',
    },
    update: {
      start: 'Updating shipment with id',
      success: 'Shipment updated with id',
      notFound: 'Shipment not found with id',
      error: 'Failed to update shipment with ID',
    },
    delete: {
      start: 'Deleting shipment with id',
      success: 'Shipment deleted with id',
      notFound: 'Shipment not found with id',
      error: 'Failed to delete shipment with ID',
    },
  },
};
