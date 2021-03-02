import request from "../../controller/request";

export function getArtypes(data) {
  return request({
    url: '/api/artype/get',
    method: 'post',
    data
  })
}
