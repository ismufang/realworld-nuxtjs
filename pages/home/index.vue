import home from '@/pages/live/index/index';
<template>
<div class="home-page">

    <div class="banner">
        <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
        </div>
    </div>

    <div class="container page">
        <div class="row">

            <div class="col-md-9">
                <div class="feed-toggle">
                    <ul class="nav nav-pills outline-active">
                        <li class="nav-item" v-if="user">
                            <nuxt-link class="nav-link" exact :class="{active: tab === 'your_feed'}" :to="{
                                name: 'home',
                                query: {
                                    tab: 'your_feed'
                                }
                            }">Your Feed</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" exact :class="{active: tab === 'global_feed'}" :to="{
                                name: 'home',
                            }">Global Feed</nuxt-link>
                        </li>
                        <li class="nav-item" v-if="tag">
                            <nuxt-link class="nav-link" exact :class="{active: tab === 'tag'}" :to="{
                                name: 'home',
                                query: {
                                    tab: 'tag',
                                    tag: tag
                                }
                            }"># {{ tag }}</nuxt-link>
                        </li>
                    </ul>
                </div>

                <div class="article-preview" v-for="article in articles" :key="article.slug">
                    <div class="article-meta">
                        <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }"><img :src="article.author.image" /></nuxt-link>
                        <div class="info">
                            <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }" class="author">{{article.author.username}}</nuxt-link>
                            <span class="date">{{article.createdAt | date}}</span>
                        </div>
                        <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{active: article.favorited}" @click="onFav(article)" :disabled="article.favDis">
                            <i class="ion-heart"></i> {{article.favoritesCount}}
                        </button>
                    </div>
                    <nuxt-link :to="{
            name: 'article',
            params: {
              slug: article.slug
            }
          }" class="preview-link">
                        <h1>{{article.title}}</h1>
                        <p>{{article.description}}</p>
                        <span>Read more...</span>
                    </nuxt-link>
                </div>

                <!-- 分页 -->
                <nav>
                    <ul class="pagination">
                        <li class="page-item ng-scope" :class="{'active': item === page}" v-for="item in totalPage" :key="item">
                            <nuxt-link class="page-link ng-binding" :to="{
                              name: 'home',
                              query: {
                                tab: tab,
                                page: item,
                                tag: $route.query.tag
                              }
                            }">{{ item }}</nuxt-link>
                        </li>
                    </ul>
                </nav>

            </div>

            <div class="col-md-3">
                <div class="sidebar">
                    <p>Popular Tags</p>

                    <div class="tag-list">
                        <nuxt-link v-for="item in tags" :key="item" :to="{
                            name: 'home',
                            query: {
                                tab: 'tag',
                                tag: item
                            }
                        }" class="tag-pill tag-default">{{ item }}</nuxt-link>
                    </div>
                </div>
            </div>

        </div>
    </div>

</div>
</template>

<script>
import {
    getArticles,
    getYourArts,
    addFav,
    delFav
} from '@/api/article'
import {
    getTags
} from '@/api/tag'
import {
    mapState
} from 'vuex'

export default {
    name: 'HomeIndex',

    async asyncData({
        query
    }) {
        const page = query.page * 1 || 1;
        const limit = 10;
        const tab = query.tab || 'global_feed';
        const tag = query.tag;
        const loadArticles = tab === 'global_feed' ?
            getArticles :
            getYourArts
        const [articleRes, tagRes] = await Promise.all([
            loadArticles({
                limit,
                offset: (page - 1) * limit,
                tag,
                tab
            }),
            getTags()
        ])

        // console.log(articleRes)

        const {
            articles,
            articlesCount
        } = articleRes.data
        const {
            tags
        } = tagRes.data

        articles.forEach(item => {
            item.favDis = false
        })

        return {
            articles,
            articlesCount,
            page,
            limit,
            tags,
            tab,
            tag
        }
    },
    watchQuery: ['page', 'tag', 'tab'],
    computed: {
        ...mapState(['user']),
        totalPage() {
            return Math.ceil(this.articlesCount / this.limit)
        }
    },
    methods: {
        async onFav(article) {
            article.favDis = true

            if (article.favorited) {
                await delFav(article.slug)
                article.favorited = false
                article.favoritesCount += -1
            } else {
                await addFav(article.slug)
                article.favorited = true
                article.favoritesCount += 1
            }

            article.favDis = false
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
