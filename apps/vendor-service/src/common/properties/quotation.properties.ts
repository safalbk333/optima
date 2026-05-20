export const QuotationProperties = {
  controller: {
    start: 'Quotation Controller started successfully',
    findAll: 'Received request to find all quotations',
    findOne: 'Received request to find quotation with id',
    create: 'Received request to create quotation',
  },
  service: {
    findAll: {
      start: 'Fetching all quotations',
      success: 'Quotations fetched successfully',
      notFound: 'No quotations found',
      error: 'Failed to fetch quotations',
    },
    findOne: {
      start: 'Fetching quotation with id',
      success: 'Quotation found with id',
      notFound: 'Quotation not found with id',
      error: 'Failed to fetch quotation with ID',
    },
    create: {
      start: 'Creating new quotation',
      success: 'Quotation created with id',
      error: 'Failed to create quotation',
      invalidStatus: 'Invalid quotation status',
    },
    generateRfqNo: {
      start: 'Generating RFQ number',
      success: 'RFQ number generated',
      error: 'Failed to generate RFQ number',
    },
  },
};
