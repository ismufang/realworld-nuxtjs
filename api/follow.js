import { request } from '../plugins/request'

export const follow = username => {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`,
    })
}

export const unfollow = username => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`,
    })
}
