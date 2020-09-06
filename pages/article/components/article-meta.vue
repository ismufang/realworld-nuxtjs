<template>
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
        <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
    </div>

    <template v-if="isSelf">
        <span class="ng-scope">
            <nuxt-link class="btn btn-outline-secondary btn-sm" :to="'/editor/'+article.slug">
                <i class="ion-edit"></i> Edit Article
            </nuxt-link>

            <button class="btn btn-outline-danger btn-sm" @click="delArt(article.slug)">
                <i class="ion-trash-a"></i> Delete Article
            </button>
        </span>
    </template>
    <template v-else>
        <button class="btn btn-sm btn-outline-secondary" :class="{'active': article.author.following}" @click="followFn(article.author.username)">
            <i class="ion-plus-round"></i>
            &nbsp;
            {{article.author.following ? 'unFollow' : 'Follow'}} Eric Simons
        </button>
        &nbsp;&nbsp;
        <button class="btn btn-sm btn-outline-primary" :class="{'active': article.favorited}" @click="favFn(article.slug)">
            <i class="ion-heart"></i>
            &nbsp;
            {{article.favorited ? 'Unfavorite' : 'Favorite'}} Post <span class="counter">({{article.favoritesCount}})</span>
        </button>
    </template>

</div>
</template>

<script>
import {
    mapState
} from 'vuex'
import { delArticle } from '@/api/article'
import { follow, unfollow } from '@/api/follow'
import { fav, unfav } from '@/api/fav'
export default {
    name: 'ArticleMeta',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState(['user']),
        isSelf() {
            return this.article.author.username === this.user.username
        }
    },
    methods: {
        delArt(slug){
            delArticle(slug)
            .then(()=>{
                this.$router.push('/')
            })
        },
        followFn(username){
            const request = !this.article.author.following ? follow : unfollow

            request(username)
            .then(({data}) => {
                // console.log(data)
                this.article.author.following = data.profile.following
            })
        },

        favFn(slug){
            const request = !this.article.favorited ? fav : unfav

            request(slug)
            .then(({data}) => {
                // console.log(data)
                this.article.favorited = data.article.favorited
                this.article.favoritesCount = data.article.favoritesCount
            })
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
