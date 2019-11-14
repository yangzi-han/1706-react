import request from '../utils/request';

export function govList() {
  return request('/api/main/govList');
}
