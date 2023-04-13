import { createRouter, createWebHashHistory } from "vue-router";
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/login', component: LoginForm},
        {path: '/register', component: RegisterForm}
    ]
})