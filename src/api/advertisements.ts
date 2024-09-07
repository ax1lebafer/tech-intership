import { Advertisment } from '../../types.ts';

const HOST_GET = 'http://localhost:8000/advertisements';

export async function fetchAdvertisements(): Promise<Advertisment[]> {
  const response = await fetch(HOST_GET);

  if (!response.ok) {
    throw new Error('Ошибка при загрузке объявлений');
  }

  return await response.json();
}
