import { PaginationDto } from '../dto/pagination.dto';

export const buildPaginationQuery = (params: PaginationDto) => {
  const { page = 1, limit = 10, search } = params;
  const skip = (page - 1) * limit;

  const where: any = {
    deletedAt: null,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { uuid: { contains: search, mode: 'insensitive' } },
    ];
  }

  return {
    where,
    skip,
    take: limit,
  };
};
