import { Order } from '../../types.ts';

const API_URL = 'http://localhost:8000/orders';

export async function fetchOrders(): Promise<Order[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Ошибка при получении заказов');
  }

  return response.json();
}

export async function deleteOrder(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Ошибка при удалении заказа');
  }
}
