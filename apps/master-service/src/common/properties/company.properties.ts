export const CompanyProperties = {
  controller: {
    start: 'Company Controller started successfully',
    findAll: 'Received request to find all companies',
    findOne: 'Received request to find company with id',
    create: 'Received request to create company',
    update: 'Received request to update company',
  },
  service: {
    findAll: {
      start: 'Fetching all companies',
      success: 'Companies fetched successfully',
      error: 'Failed to fetch companies',
    },
    findOne: {
      start: 'Fetching company with id',
      success: 'Company found with id',
      notFound: 'Company not found with id',
      error: 'Failed to fetch company with ID',
    },
    create: {
      start: 'Creating new company',
      success: 'Company created with id',
      error: 'Failed to create company',
    },
    update: {
      start: 'Updating company with id',
      success: 'Company updated with id',
      notFound: 'Company not found with id',
      error: 'Failed to update company with ID',
    },
  },
};
