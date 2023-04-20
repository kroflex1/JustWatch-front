import { createRouter, createWebHashHistory } from "vue-router";
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import UserInformation from './components/UserInformation.vue'
import UploadVideo from './components/UploadVideo.vue'
import Videos from './components/Videos.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/login', component: LoginForm},
        {path: '/register', component: RegisterForm},
        {path: '/user', component: UserInformation},
        {path: '/upload-video', component: UploadVideo},
        {path: '/videos', component: Videos}
    ]
})

export default router