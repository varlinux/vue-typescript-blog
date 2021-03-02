import request from '../controller/request'

/**
 * 获取文章列表
 */
export function getAll() {
    return request({
        url: '/api/atcs/getAll',
        method: 'get'
    })
}

/**
 * 获取文章列表
 */
export function get(data) {
    return request({
        url: '/api/atcs/get',
        method: 'post',
        data
    })
}

/**
 * 根据标签名称获取文章列表
 */
export function getByTagId(tagId) {
    return request({
        url: '/api/atcs/getByTagId/' + tagId,
        method: 'get'
    })
}

export function getByLimit(data) {
    return request({
        url: '/api/atcs/getByLimit?' + data,
        method: 'get'
    })
}
