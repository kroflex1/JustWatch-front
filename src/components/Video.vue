<script>
import VideoPlayer from '@/components/VideoPlayer.vue';

export default {
    name: 'VideoExample',
    components: {
        VideoPlayer
    },
    data() {
        return {
            videoOptions: {
                autoplay: false,
                controls: true,
                preload: "auto",
                sources: [
                    {
                        src: 'https://storage.yandexcloud.net/justwatchvideos/black%20hole.mp4',
                        type: 'video/mp4'
                    }
                ]
            }
        };
    }
};
</script>


<template>
        <video-player :options="videoOptions" />
</template>
  
