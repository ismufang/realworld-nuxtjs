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
        <button class="btn btn-sm btn-outline-secondary" :class="{'active': article.author.following}">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow Eric Simons <span class="counter">(10)</span>
        </button>
        &nbsp;&nbsp;
        <button class="btn btn-sm btn-outline-primary" :class="{'active': article.author.favorited}">
            <i class="ion-heart"></i>
            &nbsp;
            Favorite Post <span class="counter">(29)</span>
        </button>
    </template>

</div>
</template>

<script>
import {
    mapState
} from 'vuex'
import { delArticle } from '@/api/article'
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
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
