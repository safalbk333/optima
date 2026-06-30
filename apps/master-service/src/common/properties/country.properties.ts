export const CountryProperties = {
  controller: {
    start: 'Country Controller started successfully',
    findAll: 'Received request to find all countries',
    findOne: 'Received request to find country with id',
    create: 'Received request to create country',
    update: 'Received request to update country',
  },
  service: {
    findAll: {
      start: 'Fetching all countries',
      success: 'Countries fetched successfully',
      error: 'Failed to fetch countries',
    },
    findOne: {
      start: 'Fetching country with id',
      success: 'Country found with id',
      notFound: 'Country not found with id',
      error: 'Failed to fetch country with ID',
    },
    create: {
      start: 'Creating new country',
      success: 'Country created with id',
      error: 'Failed to create country',
    },
    update: {
      start: 'Updating country with id',
      success: 'Country updated with id',
      notFound: 'Country not found with id',
      error: 'Failed to update country with ID',
    },
  },
};
