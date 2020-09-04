const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: null,
    version: '0.1.2'
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {

    // 仅在服务端渲染中运行
    // 初始化容器数据
    nuxtServerInit ({ commit }, { req }) {
      let user = null

      if (req.headers.cookie) {
        const parsed = cookieparser.parse(req.headers.cookie)
        try {
          user = JSON.parse(parsed.user)
        } catch (err) {
          // No valid cookie found
        }
      }

      commit('setUser', user)
    }
  }