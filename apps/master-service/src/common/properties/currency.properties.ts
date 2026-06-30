export const CurrencyProperties = {
  controller: {
    start: 'Currency Controller started successfully',
    findAll: 'Received request to find all currencies',
    findOne: 'Received request to find currency with id',
    create: 'Received request to create currency',
    update: 'Received request to update currency',
  },
  service: {
    findAll: {
      start: 'Fetching all currencies',
      success: 'Currencies fetched successfully',
      error: 'Failed to fetch currencies',
    },
    findOne: {
      start: 'Fetching currency with id',
      success: 'Currency found with id',
      notFound: 'Currency not found with id',
      error: 'Failed to fetch currency with ID',
    },
    create: {
      start: 'Creating new currency',
      success: 'Currency created with id',
      error: 'Failed to create currency',
    },
    update: {
      start: 'Updating currency with id',
      success: 'Currency updated with id',
      notFound: 'Currency not found with id',
      error: 'Failed to update currency with ID',
    },
  },
};
