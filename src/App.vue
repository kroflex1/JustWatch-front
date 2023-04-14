<script>
import router from './router';


export default {
    name: "app",
    components: { router }
};
</script>


<template>
    <div id="app" v-if="this.$route.path === '/'">
        <p><router-link to="/login">Войти</router-link></p>
        <p><router-link to="/register">Зарегестрироваться</router-link></p>
        <p><router-link to="/user">Личный кабинет</router-link></p>
        <p><router-link to="/">Начальная страница</router-link></p>
    </div>
    <router-view></router-view>
</template>
