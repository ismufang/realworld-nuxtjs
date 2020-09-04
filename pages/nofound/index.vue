<template>
    <div class="nofound">
        <h2>{{info}}</h2>
        <nuxt-link to="/">back home</nuxt-link>
    </div>
</template>

<script>
    export default {
        async asyncData(context) {
            return {
                info: '404 - 页面不存在~'
            }
        },
    }
</script>

<style lang="scss" scoped>
.nofound{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    h2{
        font-size: 18px;
    }
}
</style>