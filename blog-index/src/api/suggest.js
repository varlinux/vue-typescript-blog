import request from '../controller/request'

/**
 * 插入建议
 * @param data
 * @returns {*}
 */
export function addSuggest(data) {
    return request({
        url: '/api/sgts/insert',
        method: 'post',
        data: data
    })
}
