import request from "../../controller/request";

export function getIndexTask(data) {
  return request({
    url: '/api/task/get',
    method: 'post',
    data
  })
}
