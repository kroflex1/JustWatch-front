<script>
export default {
    props: ['preview_image_url', 'video_name', 'video_id', 'author_name', 'published_at', 'number_of_views'],

};
</script>

<template>
    <div class="card video_preview text-white bg-dark scale" style="width: 18rem;">
        <img :src="preview_image_url" class="card-img-top scale video_preview_image">
        <div class="card-body">
            <h5 class="card-title">{{ video_name }}</h5>
            <p class="text-muted">{{ author_name }}</p>
            <div class="d-flex">
                <p class="text-muted">Просмотров: {{ number_of_views }}</p>
                <p class="text-muted ms-auto">{{ published_at }}</p>
            </div>

            <router-link v-bind:to="`/video/${video_id}`" class="stretched-link">
            </router-link>
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
</style>