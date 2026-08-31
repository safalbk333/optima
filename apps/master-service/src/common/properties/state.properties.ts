export const StateProperties = {
  controller: {
    start: 'State Controller started successfully',
    findAll: 'Received request to find all states',
    findOne: 'Received request to find state with id',
    create: 'Received request to create state',
    update: 'Received request to update state',
  },
  service: {
    findAll: {
      start: 'Fetching all states',
      success: 'States fetched successfully',
      error: 'Failed to fetch states',
    },
    findOne: {
      start: 'Fetching state with id',
      success: 'State found with id',
      notFound: 'State not found with id',
      error: 'Failed to fetch state with ID',
    },
    create: {
      start: 'Creating new state',
      success: 'State created with id',
      error: 'Failed to create state',
    },
    update: {
      start: 'Updating state with id',
      success: 'State updated with id',
      notFound: 'State not found with id',
      error: 'Failed to update state with ID',
    },
  },
};
