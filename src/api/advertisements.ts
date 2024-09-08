import {
  Advertisment,
  PaginatedResponse,
  PaginationInfo,
} from '../../types.ts';

const HOST_GET = 'http://localhost:8000/advertisements';

export async function fetchAdvertisements(
  page: number,
  limit: number,
): Promise<PaginatedResponse<Advertisment>> {
  const response = await fetch(`${HOST_GET}?_page=${page}&_per_page=${limit}`);

  if (!response.ok) {
    throw new Error('Ошибка при загрузке объявлений');
  }

  const result = await response.json();

  return {
    data: result.data as Advertisment[],
    pagination: {
      first: result.first,
      prev: result.prev,
      next: result.next,
      last: result.last,
      pages: result.pages,
      items: result.items,
    } as PaginationInfo,
  };
}

export async function fetchAdvertisementById(
  id: string,
): Promise<Advertisment> {
  const response = await fetch(`${HOST_GET}/${id}`);

  if (!response.ok) {
    throw new Error('Ошибка при загрузке объявления');
  }

  return await response.json();
}
