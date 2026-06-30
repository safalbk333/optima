export const CityProperties = {
  controller: {
    start: 'City Controller started successfully',
    findAll: 'Received request to find all cities',
    findOne: 'Received request to find city with id',
    create: 'Received request to create city',
    update: 'Received request to update city',
  },
  service: {
    findAll: {
      start: 'Fetching all cities',
      success: 'Cities fetched successfully',
      error: 'Failed to fetch cities',
    },
    findOne: {
      start: 'Fetching city with id',
      success: 'City found with id',
      notFound: 'City not found with id',
      error: 'Failed to fetch city with ID',
    },
    create: {
      start: 'Creating new city',
      success: 'City created with id',
      error: 'Failed to create city',
    },
    update: {
      start: 'Updating city with id',
      success: 'City updated with id',
      notFound: 'City not found with id',
      error: 'Failed to update city with ID',
    },
  },
};
