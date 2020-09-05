<template>
    <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form @submit.prevent="updateUserFn">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" v-model="user.image" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr>
        <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import { updateUser, getCurrUser } from '@/api/user'
    export default {
        name: 'SettingsIndex',
        middleware: 'auth',

        async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
          const { data } = await getCurrUser()
          // console.log(data)
          const { user } = data
          

          return {
            user: {
              username: user.username,
              email: user.email,
              image: user.image,
              bio: user.bio,
              password: ''
            }
          }
        },
        methods: {
          
          async updateUserFn(){
            // console.log(this.user)
            const user = {
              ...this.user
            }
            if(!user.password){
              delete user.password
            }

            const { data } = await updateUser({
              user
            })

            console.log(data)
            
            this.$store.commit('setUser', data.user)
            // 防止刷新页面数据丢失
            Cookie.set('user', data.user)

            this.$router.push(`/profile/${data.user.username}`)
          },
          logout(){
            this.$store.commit('logout')
            Cookie.set('user', '')
            this.$router.push(`/`)
          }
        },
    }
</script>

<style lang="scss" scoped>

</style>