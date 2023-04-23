<script>
import VideoPlayer from '@/components/VideoPlayer.vue';
import axios from 'axios';
export default {
    name: 'VideoExample',
    components: {
        VideoPlayer
    },
    data() {
        return {
            isVideoReady: false,
            videoOptions: {
                autoplay: false,
                controls: true,
                preload: "auto",
                sources: [
                    {
                        src: '',
                        type: 'video/mp4'
                    }
                ]
            }
        };
    },
    async created() {
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
            this.videoOptions.sources[0].src = responce.data.result
            this.isVideoReady = true
        }
    },
};
</script>



<template>
    <video-player v-if="isVideoReady" :options="videoOptions" />
</template>
  
