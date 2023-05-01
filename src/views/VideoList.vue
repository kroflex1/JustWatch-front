<script>
import { getResponce } from '@/assets/requestManager.js';
export default {
    data() {
        return {
            videos: []
        };
    },
    async created() {
        const responce = await getResponce('get_all_videos_inf', {})
        if (typeof responce.data.error !== 'undefined')
            this.$router.push('/login')
        else
            this.videos = responce.data.result
        console.log(responce)
    }
};
</script>

<template>
    <div class="p-4 row row-cols-4">
        <template v-for="video in videos">
            <div class="col mb-4">
                <div class="card video_preview text-white bg-dark scale" style="width: 18rem;">
                    <img src="@/files/videoPreviewPlug.png" class="card-img-top scale"
                        v-if="video.preview_image_irl === null">
                    <img :src="video.preview_image_irl" class="card-img-top scale" v-else>
                    <div class="card-body">
                        <h5 class="card-title">{{ video.video_name }}</h5>
                        <router-link v-bind:to="`/video/${video.id}`" class="stretched-link">
                        </router-link>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
.video_preview:hover {
    background-color: grey !important;
}
</style>
