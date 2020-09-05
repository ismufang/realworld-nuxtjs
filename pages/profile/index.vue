<template>
<div class="profile-page">

    <div class="user-info">
        <div class="container">
            <div class="row">

                <div class="col-xs-12 col-md-10 offset-md-1">
                    <img :src="profile.image" class="user-img" />
                    <h4>{{profile.username}}</h4>
                    <p>
                        {{profile.bio}}
                    </p>

                    <nuxt-link v-if="isSelf" class="btn btn-sm btn-outline-secondary action-btn" ng-show="$ctrl.isUser" to="/settings">
                        <i class="ion-gear-a"></i> Edit Profile Settings
                    </nuxt-link>
                    <button v-else class="btn btn-sm btn-outline-secondary action-btn">
                        <i class="ion-plus-round"></i>
                        &nbsp;
                        Follow Eric Simons
                    </button>
                </div>

            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">
                <div class="articles-toggle">
                    <ul class="nav nav-pills outline-active">
                        <li class="nav-item">
                            <nuxt-link class="nav-link" exact :class="{'active': tab === 'author'}" :to="{
                                name: 'profile',
                                params: {
                                    username: profile.username
                                },
                                query: {
                                    tab: 'author'
                                }
                            }">My Articles</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" exact :class="{'active': tab === 'favorited'}" :to="{
                                name: 'profile',
                                params: {
                                    username: profile.username
                                },
                                query: {
                                    tab: 'favorited'
                                }
                            }">Favorited Articles</nuxt-link>
                        </li>
                    </ul>
                </div>

                <article-item :articles="articles"></article-item>

                <!-- 分页 -->
                <nav>
                    <ul class="pagination">
                        <li class="page-item ng-scope" :class="{'active': item === page}" v-for="item in totalPage" :key="item">
                            <nuxt-link class="page-link ng-binding" :to="{
                                name: 'profile',
                                params: {
                                    username: profile.username
                                },
                                query: {
                                    tab: tab,
                                    page: item
                                }
                            }">{{ item }}</nuxt-link>
                        </li>
                    </ul>
                </nav>

            </div>

        </div>
    </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import { getProfile } from '@/api/user'
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
    name: 'ProfileIndex',
    middleware: 'auth',
    components: {
        ArticleItem
    },
    computed: {
        ...mapState(['user']),
        isSelf() {
            return this.user.username === this.profile.username
        },
        totalPage() {
            return Math.ceil(this.articlesCount / this.limit)
        }
    },
    watchQuery: ['page', 'tab'],
    async asyncData({
        isDev,
        route,
        store,
        env,
        params,
        query,
        req,
        res,
        redirect,
        error
    }) {
        // console.log(query)
        const page = query.page * 1 || 1;
        const limit = 5;
        const currUser = params.username
        const tab = query.tab || 'author'
        const data = {
            [tab]: currUser,
            limit,
            offset: (page - 1) * limit
        }

        const [articleRes, profileRes] = await Promise.all([
            getArticles(data),
            getProfile(currUser)
        ])

        const {
            articles,
            articlesCount
        } = articleRes.data
        const {
            profile
        } = profileRes.data

        articles.forEach(item => {
            item.favDis = false
        })
        // console.log(data)
        return {
            profile,
            articles,
            articlesCount,
            tab,
            page,
            limit,
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
