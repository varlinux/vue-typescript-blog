import request from '../controller/request'

/**
 * 获得所有标签
 * @returns {*}
 */
export function getAll() {
    return request({
        url: '/api/tags/getAll',
        type: 'get'
    })
}
