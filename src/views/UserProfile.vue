<script>
import { getResponce } from '@/scripts/requestManager.js';
import { getUserIdFromToken } from '@/scripts/tokenManager.js'
import VideoBlock from '@/components/VideoBlock.vue'
export default {
    components: {
        VideoBlock
    },
    data() {
        return {
            is_ready: false,
            user_id: null,
            author_username: "",
            number_of_subscribers: null,
            number_of_videos: null,
            author_id: null,
            author_videos: [],
            author_avatar_url: null,
            is_subscribed: null,
        };
    },
    async created() {
        this.author_id = parseInt(this.$route.params.id)
        var responce = await getResponce('get_user_profile', { user_id: this.author_id })
        console.log(responce.data)
        this.author_username = responce.data.result.username
        this.number_of_subscribers = responce.data.result.number_of_subscribers
        this.number_of_videos = responce.data.result.number_of_videos
        this.author_videos = responce.data.result.user_videos
        this.author_avatar_url = responce.data.result.user_avatar_url
        this.checkURL(this.author_avatar_url)

        var responce = await getResponce('is_subscribed_to_author', { author_id: this.author_id })
        this.is_subscribed = responce.data.result
        this.user_id = getUserIdFromToken()

        this.is_ready = true
    },

    methods: {
        async changeSubscription() {
            if (this.is_subscribed) {
                const responce = await getResponce('unsubscribe', { author_id: this.author_id })
                this.number_of_subscribers -= 1
            }
            else {
                const responce = await getResponce('subscribe', { author_id: this.author_id })
                this.number_of_subscribers += 1
            }
            this.is_subscribed = !this.is_subscribed
        },
        convertDate(date) {
            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timezone: 'UTC',
            };
            var datetime = new Date(date)
            return datetime.toLocaleString("ru", options)
        },
        checkURL(url) {
            var tester = new Image();
            tester.onerror = this.imageNotFound
            tester.src = url;
        },
        imageNotFound() {
            this.author_avatar_url = 'https://storage.yandexcloud.net/just-watch-avatars/standartAvatar.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=YCAJED_bUtsncA2HLQAgpIaPu%2F20230614%2Fru-central1%2Fs3%2Faws4_request&X-Amz-Date=20230614T160544Z&X-Amz-Expires=2592000&X-Amz-Signature=4914106BD77A045E1C3DBACB06E1C6FA2259CB70FF4A9EE793AE05CBFD063939&X-Amz-SignedHeaders=host'
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
                <img :src="author_avatar_url" class="user-avatar" alt="">
                <div class="d-flex flex  flex-column">
                    <p class="display-3">{{ author_username }}</p>
                    <div class="d-flex gap-3">
                        <p>Подписчиков: {{ NumberOfSubscribers }}</p>
                        <p>Видео: {{ number_of_videos }}</p>
                    </div>

                </div>
                <button class="btn btn-light btn-lg ms-auto subscribed_button" @click="changeSubscription"
                    v-if="user_id != author_id">{{
                        SubscribeText }}</button>
            </div>
            <div v-if="number_of_videos === 0 && user_id == author_id">
                <div class="upload-block">
                    <router-link to="/upload-video" class="d-flex flex-column align-items-md-center upload-link h6"> <svg
                            xmlns="http://www.w3.org/2000/svg" width="120" fill="currentColor" class="bi bi-upload"
                            viewBox="0 0 16 16">
                            <path
                                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                            <path
                                d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                        </svg> Загрузите своё первое видео </router-link>
                </div>
            </div>
            <div v-else class="p-4 row row-cols-4 test-block">
                <template v-for="video in author_videos">
                    <div class="col mb-4 h-100">
                        <VideoBlock :preview_image_url="video.preview_image_url" :video_name="video.video_name"
                            :video_id="video.id" :author_name="video.author_name" :author_id="video.author_id"
                            :published_at="convertDate(video.published_at)" :number_of_views="video.number_of_views" />
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

.subscribed_button {
    border-radius: 100px;
}


.lds-ring {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 45%;
    width: 80px;
    height: 80px;
}

.upload-block {
    display: inline-block;
    position: absolute;
    left: 45%;
    top: 50%;
}

.upload-link {
    color: white;
    text-decoration: none;
    transition: all 0.5s ease;
}

.upload-link:hover {
    color: rgb(185, 185, 185);
    transform: scale(1.08);

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
