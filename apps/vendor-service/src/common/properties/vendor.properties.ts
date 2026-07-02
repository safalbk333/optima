export const VendorProperties = {
  controller: {
    start: 'Vendor Controller started successfully',
    findAll: 'Received request to find all vendors',
    findOne: 'Received request to find vendor with id',
    create: 'Received request to create vendor',
    update: 'Received request to update vendor'
  },
  service: {
    findAll: {
      start: 'Fetching all vendors',
      success: 'Vendors fetched successfully',
      error: 'Failed to fetch vendors',
    },
    findOne: {
      start: 'Fetching vendor with id',
      success: 'Vendor found with id',
      notFound: 'Vendor not found with id',
      error: 'Failed to fetch vendor with ID',
    },
    create: {
      start: 'Creating new vendor',
      success: 'Vendor created with id',
      error: 'Failed to create vendor',
    },
    update: {
      start: 'Updating vendor',
      success: 'Vendor updated with id',
      error: 'Failed to update vendor',
    },
  },
};
