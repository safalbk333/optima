export const CATEGORY_PATTERN = {
  // Queries
  FIND_ALL:      'category.findAll',
  FIND_ROOTS:    'category.findRoots',
  FIND_ONE:      'category.findOne',
  FIND_SUBTREE:  'category.findSubtree',
  FIND_ANCESTORS:'category.findAncestors',

  // Mutations
  CREATE: 'category.create',
  UPDATE: 'category.update',
  MOVE:   'category.move',
  DELETE: 'category.delete',
} as const;