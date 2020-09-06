<template>
<div>
    <form class="card comment-form" @submit.prevent="addCommentFn">
        <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="comment.body"></textarea>
        </div>
        <div class="card-footer">
            <img :src="article.author.image" class="comment-author-img" />
            <button class="btn btn-sm btn-primary">
                Post Comment
            </button>
        </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
        <div class="card-block">
            <p class="card-text">{{comment.body}}</p>
        </div>
        <div class="card-footer">
            <nuxt-link :to="{
                name: 'profile',
                params: {
                    username: comment.author.username
                }
            }" class="comment-author">
                <img :src="comment.author.image" class="comment-author-img" />
            </nuxt-link>
            &nbsp;
            <a href="" class="comment-author">{{comment.author.username}}</a>
            <span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
            <span class="mod-options" v-if="comment.author.username == $store.state.user.username">
                <i class="ion-trash-a" @click="delCommentFn(article.slug, comment)"></i>
            </span>
        </div>
    </div>
</div>
</template>

<script>
import { getComments, addComment, delComment } from '@/api/article'
export default {
    name: 'ArticleComments',
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            comments: [],
            comment: {
                body: ''
            }
        }
    },
    async mounted() {
        this.getCommentsFn()
    },
    methods: {
        async getCommentsFn(){
            const { data } = await getComments(this.article.slug)
            // console.log(data)
            this.comments = data.comments
        },
        addCommentFn(){
            if(!this.comment.body) return
            addComment({
                slug: this.article.slug,
                data: {
                    comment: this.comment
                }
            })
            .then(({data}) => {
                // console.log(data)
                this.comment.body = '';
                this.comments.unshift(data.comment)
            })

        },
        delCommentFn(slug, comment){
            delComment(slug, comment.id)
            .then(()=>{
                this.getCommentsFn()
            })
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
