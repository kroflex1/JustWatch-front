<script>
import router from './router';


export default {
    name: "app",
    components: { router }
};
</script>


<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/user">Личный кабинет</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/upload-video">Загрузить видео</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">Войти</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/register">Зарегестрироваться</router-link>
                    </li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>

    <router-view></router-view>
</template>


<style>
body {
    background-color: #535fe6;
}
</style>
