<template>
<div>
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
            <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{'active': article.favorited}" @click="onFav(article)" :disabled="article.favDis">
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
    <div class="article-preview" v-if="articles.length===0">
        No articles are here... yet.
    </div>
</div>
</template>

<script>
import { addFav, delFav } from '@/api/article'
export default {
    props: {
        articles: {
            type: Array,
            required: true,
            default(){
                return []
            }
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
