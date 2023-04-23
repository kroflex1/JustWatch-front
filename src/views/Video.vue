<script>
import VideoPlayer from '@/components/VideoPlayer.vue';
import { getResponce } from '@/assets/requestManager.js';
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
        const responce = await getResponce('get_video_url_by_id', { video_id: parseInt(this.$route.params.id) })
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
  
