<script>
import { getResponce } from '@/scripts/requestManager.js';
export default {
    props: ['preview_image_url', 'video_name', 'video_id', 'author_name', 'author_id', 'published_at', 'number_of_views'],
    data() {
        return {
            author_avatar_url: null
        }
    },
    async created() {
        var responce = await getResponce('get_user_avatar_image', { user_id: this.author_id })
        this.author_avatar_url = responce.data.result
        this.checkURL()
    },
    methods: {
        checkURL() {
            var tester = new Image();
            tester.onerror = this.imageNotFound
            tester.src = this.author_avatar_url;
        },
        imageNotFound() {
            this.author_avatar_url = './src/staticFiles/standartAvatar.jpg'
        }
    }
};
</script>

<template>
    <div class="card video_preview text-white bg-dark scale" style="width: 18rem;">
        <img :src="preview_image_url" class="card-img-top scale video_preview_image">
        <div class="card-body d-flex px-2 py-1 gap-2">
            <img :src="author_avatar_url" alt="" class="author_avatar align-self-start mt-3">
            <div>
                <h5 class="card-title my-1">{{ video_name }}</h5>
                <p class="text-muted">{{ author_name }}</p>
                <div class="d-flex gap-3">
                    <p class="text-muted video_inf_text">Просмотров: {{ number_of_views }}</p>
                    <p class="text-muted  video_inf_text">{{ published_at }}</p>
                </div>
                <router-link v-bind:to="`/video/${video_id}`" class="stretched-link">
                </router-link>
            </div>

        </div>
    </div>
</template>


<style scoped>
.video_preview {
    transition: all 0.5s ease;
}

.video_preview_image {
    height: 160px;
}


.video_preview:hover {
    background: rgb(54, 54, 54) !important;
    transform: scale(1.08);
}

.author_avatar {
    width: 32px;
    border-radius: 100px;
}

.video_inf_text{
    font-size: 11pt;
}
</style>