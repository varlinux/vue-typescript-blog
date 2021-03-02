import request from "../../controller/request";

export function getIndexMenu() {
  return request({
    url: '/api/menu/get/1',
    method: 'get'
  })
}
