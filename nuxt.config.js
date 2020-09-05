module.exports = {
    // loading: false, 
    // 自定义加载组件
    loading: '~/components/loading.vue', 

    head: {
        titleTemplate: 'RealWorld - muzhifan',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: 'Meta description' }
        ]
    },

    router: {
        // linkActiveClass: 'active',
        linkExactActiveClass: 'active',

        extendRoutes(routes, resolve) {
            // 重置路由
            routes.splice(0)

            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout/'),
                    children: [
                        {
                            path: '',
                            name: 'home',
                            component: resolve(__dirname, 'pages/home/')
                        },
                        {
                            path: '/login',
                            name: 'login',
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            path: '/register',
                            name: 'register',
                            component: resolve(__dirname, 'pages/login/')
                        },
                        {
                            path: '/profile/:username',
                            name: 'profile',
                            component: resolve(__dirname, 'pages/profile/')
                        },
                        {
                            path: '/settings',
                            name: 'settings',
                            component: resolve(__dirname, 'pages/settings/')
                        },
                        {
                            path: '/editor',
                            name: 'editor',
                            component: resolve(__dirname, 'pages/editor/')
                        },
                        {
                            path: '/article/:slug',
                            name: 'article',
                            component: resolve(__dirname, 'pages/article/')
                        }
                    ]
                },
                {
                    path: '*',
                    name: 'nofound',
                    component: resolve(__dirname, 'pages/nofound/')
                }
            ])
          }
    },

    server: {
        host: '0.0.0.0',
        port: 3032
    },

    plugins: [
        '~/plugins/request.js',
        '~/plugins/day.js',
    ]
}