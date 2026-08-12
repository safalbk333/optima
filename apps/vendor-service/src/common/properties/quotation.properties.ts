export const QuotationProperties = {
  controller: {
    start: 'Quotation Controller started successfully',
    findAll: 'Received request to find all quotations',
    findOne: 'Received request to find quotation with id',
    create: 'Received request to create quotation',
    update: 'Received request to update quotation',
    delete: 'Received request to delete quotation',
  },
  service: {
    findAll: {
      start: 'Fetching all quotations',
      success: 'Quotations fetched successfully',
      error: 'Error fetching quotations',
    },
    findOne: {
      start: 'Fetching quotation with id',
      success: 'Quotation fetched successfully',
      error: 'Error fetching quotation',
    },
    create: {
      start: 'Creating quotation',
      success: 'Quotation created successfully',
      error: 'Error creating quotation',
    },
    update: {
      start: 'Updating quotation',
      success: 'Quotation updated successfully',
      error: 'Error updating quotation',
    },
    delete: {
      start: 'Deleting quotation',
      success: 'Quotation deleted successfully',
      error: 'Error deleting quotation',
    },
  },
};
