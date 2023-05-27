import { createRouter, createWebHashHistory } from "vue-router";
import { isUserAuthenticated } from '@/scripts/tokenManager.js'
import LoginForm from '@/views/LoginForm.vue'
import RegisterForm from '@/views/RegisterForm.vue'
import UserProfile from '@/views/UserProfile.vue'
import UploadVideo from '@/views/UploadVideo.vue'
import VideoList from '@/views/VideoList.vue'
import Video from '@/views/Video.vue'
import Settings from '@/views/Settings.vue'
import VideoViewingHistory from '@/views/VideoViewingHistory.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: VideoList, name: 'video-list' },
        { path: '/login', component: LoginForm, name: 'login' },
        { path: '/register', component: RegisterForm, name: 'register' },
        { path: '/user/:id', component: UserProfile, name: 'user-profile' },
        { path: '/upload-video', component: UploadVideo, name: 'upload-video' },
        { path: '/video/:id', component: Video, name: 'video-player' },
        { path: '/settings', component: Settings, name: 'settings' },
        { path: '/history', component: VideoViewingHistory, name: 'history' }
    ]
})


router.beforeEach(async (to, from) => {
    const freeEntry = ['login', 'register']
    const isAuth = await isUserAuthenticated()
    if (freeEntry.indexOf(to.name) == -1 && !isAuth)
        return { name: 'login' }
})

export default router