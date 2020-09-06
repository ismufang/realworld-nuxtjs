import { request } from '../plugins/request'

// 获取公共文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

export const getYourArts = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        params
    })
}

export const addFav = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}

export const delFav = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}

// 获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

// 获取评论
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}

// 添加评论
export const addComment = ({ slug, data}) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data
    })
}

// 删除评论
export const delComment = (slug, id) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/comments/${id}`
    })
}

// 发布文章
export const createArticle = data => {
    return request({
        method: 'POST',
        url: '/api/articles',
        data
    })
}

export const delArticle = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}`,
    })
}


