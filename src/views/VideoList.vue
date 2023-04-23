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
