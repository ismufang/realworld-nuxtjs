<template>
<div class="editor-page">
    <div class="container page">
        <div class="row">

            <div class="col-md-10 offset-md-1 col-xs-12">
                <form @submit.prevent="onSubmit">
                    <fieldset>
                        <fieldset class="form-group">
                            <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title">
                        </fieldset>
                        <fieldset class="form-group">
                            <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description">
                        </fieldset>
                        <fieldset class="form-group">
                            <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body"></textarea>
                        </fieldset>
                        <fieldset class="form-group">
                            <input type="text" class="form-control" placeholder="Enter tags">
                            <div class="tag-list">
                                <span class="tag-default tag-pill ng-binding ng-scope" v-for="(item,index) in article.tagList" :key="index">
                                <i class="ion-close-round"></i>
                                {{item}}
                                </span>
                            </div>
                        </fieldset>
                        <button class="btn btn-lg pull-xs-right btn-primary" type="button">
                            Publish Article
                        </button>
                    </fieldset>
                </form>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkDownIt from 'markdown-it'
export default {
    middleware: 'auth',
    name: 'EditorIndex',
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        if(params.slug){
            const { data } = await getArticle(params.slug)
            const { article } = data 
            const md = new MarkDownIt()
            article.body = md.render(article.body)
            return {
                article
            }
        }else{
            return {
                article: {
                    title: "How to train your dragon",
                    description: "Ever wonder how?",
                    body: "You have to believe",
                    tagList: ["reactjs", "angularjs", "dragons"]
                }
            }
            
        }
    },
    methods: {
        async onSubmit(){

        }
    },
}
</script>

<style lang="scss" scoped>

</style>
