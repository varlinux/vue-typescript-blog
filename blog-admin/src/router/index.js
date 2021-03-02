import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决重复点击路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

import Layout from '../layout'

const routes = [{
    path: '/admin',
    name: 'login',
    component: () => import('@/views/login/index'),
    mate: {title: 'Ming Blog 首页'},
    hidden: true
},{
    path: '/admin/home',
    name: 'home',
    component: Layout,
    mate: {title: 'Ming Blog 首页'},
    hidden: true
}, {
    path: '/admin/article',
    component: Layout,
    name: 'article',
    mate: {title: '文章管理'},
    children: [
        {
            path: 'articleList',
            name: 'articleList',
            component: () => import('@/views/article/ArticleList'),
            mate: {title: '文章列表'}
        }, {
            path: 'articleWriter',
            name: 'articleWriter',
            component: () => import('@/views/article/ArticleWriter'),
            mate: {title: '编辑文章'}
        }
    ]
}, {
    path: '/admin/tag',
    component: Layout,
    name: 'tag',
    mate: {title: '标签管理'},
    children: [
        {
            path: 'tagList',
            name: 'tagList',
            component: () => import('@/views/tag/TagList'),
            mate: {title: '标签列表'}
        }, {
            path: 'tagWriter',
            name: 'tagWriter',
            component: () => import('@/views/tag/TagWriter'),
            mate: {title: '编辑标签'}
        }
    ]
}, {
    path: '/admin/pic',
    component: Layout,
    name: 'tag',
    mate: {title: '图片管理'},
    children: [
        {
            path: 'picGithub',
            name: 'picGithub',
            component: () => import('@/views/pic/GithubPic'),
            mate: {title: 'github图片'}
        }
    ]
}, {
    path: '/admin/sys',
    component: Layout,
    name: 'sys',
    mate: {title: '系统管理'},
    children: [
        {
            path: 'menuTree',
            name: 'menuTree',
            component: () => import('@/views/sys/navbar/MenuTree'),
            mate: {title: '导航栏管理'}
        }
    ]
}, {
    path: '/admin/task',
    component: Layout,
    name: 'task',
    mate: {title: '任务管理'},
    children: [
        {
            path: 'list',
            name: 'list',
            component: () => import('@/views/task/TaskList'),
            mate: {title: '前台任务管理'}
        }
    ]
}]

const router = new VueRouter({
    modal: "history",
    routes
})

/**
 * 注意：这里不要使用module.exports = router，否则会报错：
 * Uncaught TypeError: Cannot assign to read only property 'exports' of object '#<Object>'
 * 参考：（github issue）https://github.com/webpack/webpack/issues/4039
 *      https://www.cnblogs.com/zhn0823/p/6820605.html
 */
export default router
