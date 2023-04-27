<script>
import router from './router';
import { getResponce } from '@/assets/requestManager.js';

export default {
    name: "app",
    components: { router }
};
</script>


<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container-fluid">
            <div class="collapse navbar-collapse">
                <p class="navbar-brand m-0">JustWatch</p>
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Главная</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/user">Личный кабинет</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/upload-video">Загрузить видео</router-link>
                    </li>
                </ul>
                <router-link class="navbar-brand ms-auto" to="/login">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" fill="currentColor" class="bi bi-box-arrow-in-right"
                        viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                        <path fill-rule="evenodd"
                            d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                    Войти
                </router-link>
            </div>
        </div>
    </nav>
    <div class="container-fluid gradient-custom"><router-view></router-view></div>
</template>


<style>
body {
    padding-top: 65px;
    color: white;

    --s: 50px;
    --c: #191b22;
    --_s: calc(2*var(--s)) calc(2*var(--s));
    --_g: 35.36% 35.36% at;
    --_c: #0000 66%, #20222a 68% 70%, #0000 72%;
    background:
        radial-gradient(var(--_g) 100% 25%, var(--_c)) var(--s) var(--s)/var(--_s),
        radial-gradient(var(--_g) 0 75%, var(--_c)) var(--s) var(--s)/var(--_s),
        radial-gradient(var(--_g) 100% 25%, var(--_c)) 0 0/var(--_s),
        radial-gradient(var(--_g) 0 75%, var(--_c)) 0 0/var(--_s),
        repeating-conic-gradient(var(--c) 0 25%, #0000 0 50%) 0 0/var(--_s),
        radial-gradient(var(--_c)) 0 calc(var(--s)/2)/var(--s) var(--s) var(--c);
    background-attachment: fixed;


    /* background: #6a11cb;
    background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
    background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1)) */
}

p{
    margin: 0;
}
</style>

