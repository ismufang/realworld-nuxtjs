<template>
<div class="editor-page">
    <div class="container page">
        <div class="row">

            <ul class="error-messages">
                <template v-for="(value, key) in errors">
                    <li v-for="(item, index) in value" :key="item+index">{{key}} {{item}}</li>
                </template>
            </ul>

            <div class="col-md-10 offset-md-1 col-xs-12">
                <div>
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
                            <input type="text" class="form-control" placeholder="Enter tags" @keyup.enter="enterInput" v-model="tag">
                            <div class="tag-list">
                                <span class="tag-default tag-pill ng-binding ng-scope" v-for="(item,index) in article.tagList" :key="item+index">
                                <i class="ion-close-round"></i>
                                {{item}}
                                </span>
                            </div>
                        </fieldset>
                        <button class="btn btn-lg pull-xs-right btn-primary" @click="onSubmit">
                            Publish Article
                        </button>
                    </fieldset>
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import { getArticle, createArticle } from '@/api/article'
import MarkDownIt from 'markdown-it'
export default {
    middleware: 'auth',
    name: 'EditorIndex',
    data(){
        return {
            errors: {},
            tag: '',
        }
    },
    async asyncData({params}) {
        if(params.slug){
            const { data } = await getArticle(params.slug)
            const { article } = data 
            const md = new MarkDownIt()
            article.body = md.render(article.body)
            return {
                article: {
                    title: article.title,
                    description: article.description,
                    body: article.body,
                    tagList: article.tagList
                }
            }
        }else{
            return {
                article: {
                    title: '',
                    description: '',
                    body: '',
                    tagList: []
                }
            }
            
        }
    },
    methods: {
        async onSubmit(){
            // console.log(this.article)
            const params = {
                ...this.article
            }

            params.tagList = JSON.stringify(params.tagList)

            createArticle({
                article: params
            })
            .then(({data})=>{
                this.$router.push(`/article/${data.article.slug}`)
            })
            .catch(err=>{
                console.dir(err)
                this.errors = err.response.data.errors
            })
         
        },
        enterInput(){
            if(!this.tag) return
            this.article.tagList.push(this.tag)
            this.tag = ''
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
