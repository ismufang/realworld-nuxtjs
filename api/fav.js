import { request } from '../plugins/request'

export const fav = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`,
    })
}

export const unfav = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`,
    })
}