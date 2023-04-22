<script>
import VideoPlayer from '@/components/VideoPlayer.vue';
import axios from 'axios';
import { checkAccessToken } from '../tokenManager.js'
export default {
    name: 'VideoExample',
    components: {
        VideoPlayer
    },
    data() {
        return {
            video_url: '0',
            videoOptions: {
                autoplay: false,
                controls: true,
                preload: "auto",
                sources: [
                    {
                        src: this.video_url,
                        type: 'video/mp4'
                    }
                ]
            }
        };
    },

    async beforeCreate() {
        await checkAccessToken();
        const responce = await axios.post('api',
            {
                jsonrpc: '2.0',
                id: 0,
                method: 'get_video_url_by_id',
                params: { video_id: parseInt(this.$route.params.id) }
            },
            {
                headers: {
                    'access-token': localStorage.getItem('access-token')
                }
            })
        if (typeof responce.data.error !== 'undefined')
            this.$router.push('/login')
        else {
            this.video_url = responce.data.result
            this.videoOptions.sources[0].src = this.video_url
            console.log(this.video_url)
        }
    }
};
</script>


<template>
    <video-player :options="videoOptions" />
</template>
  
