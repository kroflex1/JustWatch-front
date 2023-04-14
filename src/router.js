import { createRouter, createWebHashHistory } from "vue-router";
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import UserInformation from './components/UserInformation.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/login', component: LoginForm},
        {path: '/register', component: RegisterForm},
        {path: '/user', component: UserInformation}
    ]
})

export default router