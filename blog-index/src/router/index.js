import Vue from 'vue';
import VueRouter from "vue-router";
// 解决重复点击路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

import Layout from '../layout/index'

const routes = [{
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/article/list',
    children: [
        {
            path: '/article/list',
            name: 'ArticleList',
            component: () => import('@/views/article')
        }, {
            path: '/article/details',
            name: 'ArticleDetails',
            component: () => import('@/views/article/ArticlesDetails')
        }, {
            path: '/note',
            name: 'EmailNote',
            component: () => import('@/views/EmailNote')
        }, {
            path: '/tag',
            name: 'Tag',
            component: () => import('@/views/Tag')
        }, {
            path: '/timeline',
            name: 'Timeline',
            component: () => import('@/views/TimeLine')
        }, {
            path: '/task',
            name: 'TaskList',
            component: () => import('@/views/task/TaskList')
        }, {
            path: '/interview',
            name: 'Interview',
            component: () => import('@/views/interview/category'),
        }, {
            path: '/interviewList',
            name: 'InterviewList',
            component: () => import('@/views/interview/list'),
        }
    ]
}]

const router = new VueRouter({
    routes
})


export default router
