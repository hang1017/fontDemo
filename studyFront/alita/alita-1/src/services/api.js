import { request } from 'alita';

export async function query() {
  return request('/api/hello');
}
export async function updateData() {
  return request('/api/hello');
}
