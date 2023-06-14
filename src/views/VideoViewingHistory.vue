<script>
import { getResponce } from '@/scripts/requestManager.js';
import VideoBlock from '@/components/VideoBlock.vue'
export default {
    components: {
        VideoBlock
    },
    data() {
        return {
            videos: [],
            isReady: false
        };
    },
    async created() {
        const responce = await getResponce('get_latest_viewed_videos', {})
        this.videos = responce.data.result
        this.isReady = true
        
    },
    methods: {
        convertDate(date) {
            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timezone: 'UTC',
            };
            var datetime = new Date(date)
            return datetime.toLocaleString("ru", options)
        }
    }
};
</script>

<template>
    <div class="d-flex flex-column align-items-center justify-content-center gap-4">
        <div class="lds-ring" v-if="isReady == false">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <h1 class="">История просмотров</h1>
        <template v-for="video in videos">
            <div class="">
                <VideoBlock :preview_image_url="video.preview_image_url" :video_name="video.video_name" :video_id="video.id"
                    :author_name="video.author_name" :published_at="convertDate(video.published_at)" :author_id="video.author_id"
                    :number_of_views="video.number_of_views" />
            </div>
        </template>
    </div>
</template>

<style scoped>
.lds-ring {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 45%;
    width: 80px;
    height: 80px;
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
