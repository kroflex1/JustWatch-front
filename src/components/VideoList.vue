<script>
import axios from 'axios';
import { checkAccessToken } from '../tokenManager.js'
export default {
    data() {
        return {
            videos: []
        };
    },
    async created() {
        await checkAccessToken();
        const responce = await axios.post('api',
            {
                jsonrpc: '2.0',
                id: 0,
                method: 'get_all_videos_inf',
                params: {}
            },
            {
                headers: {
                    'access-token': localStorage.getItem('access-token')
                }
            })
        if (typeof responce.data.error !== 'undefined')
            this.$router.push('/login')
        else 
            this.videos = responce.data.result
    }
};
</script>

<template>
    <div class="list-group col-4">
        <template v-for="video in videos">    
            <router-link v-bind:to="`/video/${video.id}`" class="list-group-item list-group-item-action">
                {{ video.video_name }}
            </router-link>
        </template>
    </div>
</template>
