import {
  Advertisment,
  PaginatedResponse,
  PaginationInfo,
} from '../../types.ts';

const API_URL = 'http://localhost:8000/advertisements';

export async function fetchAllAdvertisements(): Promise<Advertisment[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Ошибка при загрузке объявлений');
  }

  return response.json();
}

export async function fetchAdvertisements(
  page: number,
  limit: number,
): Promise<PaginatedResponse<Advertisment>> {
  const response = await fetch(`${API_URL}?_page=${page}&_per_page=${limit}`);

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
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error('Ошибка при загрузке объявления');
  }

  return await response.json();
}

export async function createAdvertisement(
  newAd: Advertisment,
): Promise<Advertisment> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(newAd),
  });

  if (!response.ok) {
    throw new Error('Ошибка при создании объявления');
  }

  return response.json();
}

export async function updateAdvertisement(
  id: string,
  updatedData: Partial<Advertisment>,
): Promise<Advertisment> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error('Ошибка при обновлении объявления');
  }

  return response.json();
}

export async function deleteAdvertisement(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Ошибка при удалении объявления');
  }
}
