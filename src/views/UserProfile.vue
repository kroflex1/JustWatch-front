<script>
import { getResponce } from '@/assets/requestManager.js';
import { getUserIdFromToken } from '@/assets/tokenManager.js'
export default {
    data() {
        return {
            is_ready: false,
            user_id: null,
            author_username: "",
            number_of_subscribers: null,
            author_id: null,
            author_videos: [],
            is_subscribed: null,
        };
    },
    async created() {
        this.author_id = parseInt(this.$route.params.id)
        var responce = await getResponce('get_user_profile', { user_id: this.author_id })
        this.author_username = responce.data.result.username
        this.number_of_subscribers = responce.data.result.number_of_subscribers
        this.author_videos = responce.data.result.user_videos

        var responce = await getResponce('is_subscribed_to_author', { author_id: this.author_id })
        this.is_subscribed = responce.data.result
        this.user_id = getUserIdFromToken()

        this.is_ready = true
    },

    methods: {
        async changeSubscription() {
            if (this.is_subscribed) {
                const responce = await getResponce('unsubscribe', { author_id: this.author_id})
                this.number_of_subscribers -= 1
            }
            else {
                const responce = await getResponce('subscribe', { author_id: this.author_id })
                this.number_of_subscribers += 1
            }
            this.is_subscribed = !this.is_subscribed
        }
    },

    computed: {
        isUserInformationReady() {
            return this.is_ready
        },
        SubscribeText() {
            if (this.is_subscribed)
                return "Отписаться"
            return "Подписаться"
        },
        NumberOfSubscribers() {
            return this.number_of_subscribers
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="lds-ring" v-if="isUserInformationReady == false">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div v-else>
            <div class="d-flex align-items-center gap-3 m-4">
                <img src="@/files/frog.jpg" class="user-avatar" alt="">
                <div class="d-flex flex  flex-column">
                    <p class="display-3">{{ author_username }}</p>
                    <p>Подписчиков: {{ NumberOfSubscribers }}</p>
                </div>
                <button class="btn btn-dark btn-lg ms-auto" @click="changeSubscription" v-if="user_id != author_id">{{
                    SubscribeText }}</button>
            </div>
            <div class="p-4 row row-cols-4 test-block">
                <template v-for="video in author_videos">
                    <div class="col mb-4 h-100">
                        <div class="card video_preview text-white bg-dark scale" style="width: 18rem;">
                            <img :src="video.preview_image_url" class="card-img-top scale video_preview_image">
                            <div class="card-body">
                                <h5 class="card-title">{{ video.video_name }}</h5>
                                <router-link v-bind:to="`/video/${video.id}`" class="stretched-link">
                                </router-link>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

    </div>
</template>

<style scoped>
.user-avatar {
    width: 130px;
    border-radius: 100px;
}

.video_preview_image {
    height: 160px;
}

.video_preview:hover {
    background-color: grey !important;
}



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
