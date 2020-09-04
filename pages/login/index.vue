<template>
<div class="auth-page">
    <div class="container page">
        <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign up</h1>
                <p class="text-xs-center">
                    <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
                    <nuxt-link v-else to="/register">Need an account?</nuxt-link>
                </p>

                <ul class="error-messages">
                    <template v-for="(value, key) in errors">
                        <li v-for="(item, index) in value" :key="item+index">{{key}} {{item}}</li>
                    </template>
                </ul>

                <form @submit.prevent="onSubmit">
                    <fieldset class="form-group" v-if="!isLogin">
                        <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email" required>
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" placeholder="Password" minlength="8" v-model="user.password" required>
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right">
                        {{isLogin? 'Sign in' : 'Sign up'}}
                    </button>
                </form>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import { login, register } from '@/api/user'
// 仅客户端加载
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    name: 'LoginIndex',
    middleware: 'noauth',
    data() {
        return {
            user: {
                username: '', // 6yhnmju7
                email: '', // 6yhnmju7@123.com
                password: '' // 6yhnmju7
            },
            errors: {}
        }
    },
    computed: {
        isLogin() {
            return this.$route.name === 'login'
        }
    },
    methods: {
        onSubmit(){
            let data = this.isLogin ? login({
                user: this.user
            }) :
            register({
                user: this.user
            })

            data.then(res => {
                // console.log(res)
                let user = res.data.user
                this.$store.commit('setUser', user)

                // 防止刷新页面数据丢失
                Cookie.set('user', user)

                this.$router.push('/')
            })
            .catch(err => {
                // console.dir(err)
                this.errors = err.response.data.errors
            })
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
