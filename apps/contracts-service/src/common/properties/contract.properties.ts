export const ContractProperties = {
  controller: {
    start: 'Contract Controller started successfully',
    findAll: 'Received request to find all contracts',
    findOne: 'Received request to find contract with id',
    create: 'Received request to create contract',
    update: 'Received request to update contract with id',
  },
  service: {
    findAll: {
      start: 'Fetching all contracts',
      success: 'Found contracts',
      error: 'Failed to fetch all contracts',
    },
    findOne: {
      start: 'Fetching contract with id',
      success: 'Contract found with id',
      notFound: 'Contract not found with id',
      error: 'Failed to fetch contract with ID',
    },
    create: {
      start: 'Creating new contract',
      success: 'Contract created with id',
      error: 'Failed to create contract',
    },
    update: {
      start: 'Updating contract with id',
      success: 'Contract updated with id',
      notFound: 'Contract not found with id',
      error: 'Failed to update contract with ID',
    },
  },
};
