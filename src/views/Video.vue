<script>
import VideoPlayer from '@/components/VideoPlayer.vue';
import { getResponce } from '@/scripts/requestManager.js';
import { getUserIdFromToken } from '@/scripts/tokenManager.js'
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
                fluid: true,
                preload: "auto",
                sources: [
                    {
                        src: '',
                        type: 'video/mp4'
                    }
                ]
            },
            video_inf: {
                name: '',
                description: '',
                numberOfLikes: 0,
                numberOfDislikes: 0,
                numberOfViews: null,
                publishedAt: null,
            },
            channelInf: {
                authorId: null,
                authorName: null,
                numberOfSubscribers: null,
                authorAvatarUrl: null
            },
            isSubscribed: null,
            isLikeActive: false,
            isDislikeActive: false,
            comments: [],
            commentText: '',
            userId: null
        };
    },
    async created() {
        const watchResponce = await getResponce('watch_video', { video_id: parseInt(this.$route.params.id) })
        const videoResponce = await getResponce('get_video_show_inf_by_id', { video_id: parseInt(this.$route.params.id) })
        if (typeof videoResponce.data.error !== 'undefined')
            this.$router.push('/')
        else {
            this.videoOptions.sources[0].src = videoResponce.data.result.video_url
            this.video_inf = {
                name: videoResponce.data.result.video_name,
                description: videoResponce.data.result.description,
                numberOfLikes: videoResponce.data.result.reactionsInf.number_of_likes,
                numberOfDislikes: videoResponce.data.result.reactionsInf.number_of_dislikes,
                numberOfViews: videoResponce.data.result.number_of_views,
                publishedAt: videoResponce.data.result.published_at
            }
            this.comments = videoResponce.data.result.comments
            const startUserReaction = videoResponce.data.result.user_reaction
            this.setReactionsActiveStatus(startUserReaction == 'like', startUserReaction == 'dislike')
            this.startNumberOfLikes = this.video_inf.numberOfLikes
            this.startNumberOfDislikes = this.video_inf.numberOfDislikes
            if (startUserReaction == 'like')
                this.startNumberOfLikes -= 1
            if (startUserReaction == 'dislike')
                this.startNumberOfDislikes -= 1

            const authorId = videoResponce.data.result.author_id
            const authorChannelResponce = await getResponce('get_user_channel_information', { user_id: authorId })
            console.log(authorChannelResponce)
            this.channelInf = {
                authorId: authorId,
                authorName: authorChannelResponce.data.result.username,
                numberOfSubscribers: authorChannelResponce.data.result.number_of_subscribers,
                authorAvatarUrl: authorChannelResponce.data.result.user_avatar_url
            }

            const checkSubscribedResponce = await getResponce('is_subscribed_to_author', { author_id: authorId })
            this.isSubscribed = checkSubscribedResponce.data.result
            this.userId = getUserIdFromToken()

            this.isVideoReady = true
        }
    },
    computed: {
        numberOfLikes() {
            return this.video_inf.numberOfLikes
        },
        numberOfDislikes() {
            return this.video_inf.numberOfDislikes
        },
        likeClassObject() {
            return {
                'active': this.isLikeActive
            }
        },
        dislikeClassObject() {
            return {
                'active': this.isDislikeActive
            }
        },
        subscribeText() {
            if (this.isSubscribed)
                return "Отписаться"
            return "Подписаться"
        },
        numberOfSubscribers() {
            return this.channelInf.numberOfSubscribers
        }
    },
    methods: {
        setReactionsActiveStatus(likeStatus, dislikeStatus) {
            this.isLikeActive = likeStatus
            this.isDislikeActive = dislikeStatus
        },
        async OnLikeClick() {
            this.video_inf.numberOfLikes = this.startNumberOfLikes
            this.video_inf.numberOfDislikes = this.startNumberOfDislikes
            if (!this.isLikeActive) {
                this.setReactionsActiveStatus(true, false)
                this.video_inf.numberOfLikes += 1
                const responce = await getResponce('rate_video', { video_id: parseInt(this.$route.params.id), user_reaction: "like" })
            }
            else {
                this.setReactionsActiveStatus(false, false)
                const responce = await getResponce('rate_video', { video_id: parseInt(this.$route.params.id), user_reaction: "neutral" })
            }
        },
        async OnDislikeClick() {
            this.video_inf.numberOfLikes = this.startNumberOfLikes
            this.video_inf.numberOfDislikes = this.startNumberOfDislikes
            if (!this.isDislikeActive) {
                this.setReactionsActiveStatus(false, true)
                this.video_inf.numberOfDislikes += 1
                const responce = await getResponce('rate_video', { video_id: parseInt(this.$route.params.id), user_reaction: "dislike" })
            }
            else {
                this.setReactionsActiveStatus(false, false)
                const responce = await getResponce('rate_video', { video_id: parseInt(this.$route.params.id), user_reaction: "neutral" })
            }
        },
        async onWriteComment() {
            await getResponce('add_comment_to_video', { video_id: parseInt(this.$route.params.id), comment_text: this.commentText })
            const responce = await getResponce('get_comments_from_video', { video_id: parseInt(this.$route.params.id) })
            this.commentText = ''
            this.comments = responce.data.result
        },
        convertCommentDate(date) {
            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timezone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
            };
            var datetime = new Date(date)
            return datetime.toLocaleString("ru", options)
        },
        converVideoDate(date) {
            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timezone: 'UTC',
            };
            var datetime = new Date(date)
            return datetime.toLocaleString("ru", options)
        },
        async changeSubscription() {
            if (this.isSubscribed) {
                const responce = await getResponce('unsubscribe', { author_id: this.channelInf.authorId })
                this.channelInf.numberOfSubscribers -= 1
            }
            else {
                const responce = await getResponce('subscribe', { author_id: this.channelInf.authorId })
                this.channelInf.numberOfSubscribers += 1
            }
            this.isSubscribed = !this.isSubscribed
        },
        async deleteVideo() {
            const responce = await getResponce('delete_video', { video_id: this.$route.params.id })
            this.$router.push('/')
        }
    }
};
</script>



<template>
    <div class="lds-ring" v-if="isVideoReady == false">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div v-else class="row justify-content-md-center h-20 video-container">
        <div class="col-7 bg-dark">
            <video-player :options="videoOptions" class="mb-3" />
            <div class="d-flex flex-column gap-3 mb-3">
                <div class="d-flex align-items-center">
                    <p class="fw-bold fs-4 lh-1">{{ video_inf.name }}</p>
                    <div class="btn-group ms-auto dropstart" v-if="userId == channelInf.authorId">
                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor"
                                class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                <path
                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark py-0">
                            <li><button class="dropdown-item py-2 text-center" type="button"
                                    @click="deleteVideo">Удалить</button></li>
                        </ul>
                    </div>
                </div>

                <div class="d-flex align-items-center gap-3">
                    <router-link v-bind:to="`/user/${channelInf.authorId}`">
                        <img :src="channelInf.authorAvatarUrl" class="author_avatar" alt="">
                    </router-link>
                    <div class="d-flex flex-column">
                        <router-link v-bind:to="`/user/${channelInf.authorId}`" class="author_link">{{
                            channelInf.authorName }}</router-link>
                        <p class="text-muted">Подписчиков: {{ numberOfSubscribers }}</p>
                    </div>
                    <button class="btn btn-light subscribed_button" @click="changeSubscription"
                        v-if="userId != channelInf.authorId">{{ subscribeText
                        }}</button>
                    <div class="ms-auto">
                        <button class="reaction-button btn btn-secondary py-2 px-2" :class="likeClassObject" id="like"
                            @click="OnLikeClick">
                            <div class="d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" id="like" fill="#3d3d3d" stroke="white"
                                    class="bi bi-hand-thumbs-up-fill me-2" viewBox="0 0 16 16">
                                    <path
                                        d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                </svg>
                                {{ numberOfLikes }}
                            </div>

                        </button>
                        <button class="reaction-button btn btn-secondary py-2 px-2" :class="dislikeClassObject" id="dislike"
                            @click="OnDislikeClick">
                            <div class="d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3d3d3d" stroke="white"
                                    class="bi bi-hand-thumbs-down-fill me-2" viewBox="0 0 16 16">
                                    <path
                                        d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z" />
                                </svg>
                                {{ numberOfDislikes }}
                            </div>
                        </button>
                    </div>
                </div>
                <div class="video_inf_block p-2">
                    <div class="d-flex gap-3">
                        <p>Просмотров: {{ video_inf.numberOfViews }}</p>
                        <p>Опубликовано: {{ converVideoDate(video_inf.publishedAt) }}</p>
                    </div>
                    <p>{{ video_inf.description }}</p>
                </div>

            </div>

            <form class="d-flex flex-column mb-3 gap-1" @submit.prevent="onWriteComment">
                <textarea class="form-control bg-dark text-white" id="exampleFormControlTextarea1" rows="2"
                    placeholder="Введите комментарий" v-model="commentText" required></textarea>
                <button class="btn btn-primary align-self-end" type="submit">Оставить комментарий</button>
            </form>

            <div class="d-flex flex-column comments">
                <template v-for="(comment, index) in comments" :key="index">
                    <div class="comment p-3 pe-4">
                        <p class="mb-2">{{ comment.author_name }}</p>
                        <p class="mb-1">{{ comment.text }}</p>
                        <p class="comment-date">{{ convertCommentDate(comment.published_at) }}</p>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.reaction-button {
    background-color: #3d3d3d;
    outline: 0;
    border-right-color: black;
}

.reaction-button:first-child {
    border-width: 0px 1px 0px 0px;
    border-radius: 25px 0 0 25px;
}

.reaction-button:nth-child(2) {
    border-width: 0;
    border-radius: 0px 25px 25px 0px;
}

.reaction-button:hover {
    background-color: rgb(197, 192, 192);
}

.active:first-child svg {
    fill: green;
}

.dropdown-toggle::before {
    display: none !important;
}

.active:nth-child(2) svg {
    fill: red;
}

.comment {
    background-color: #282828;
    border-radius: 10px;
}

.comments {
    gap: 1rem;
}

.comment-date {
    color: grey
}

.author_avatar {
    width: 50px;
    border-radius: 100px;
}

.author_link {
    color: white;
    text-decoration: none;
}

.subscribed_button {
    border-radius: 100px;
}

.video_inf_block {
    background-color: #3d3d3d;
    border-radius: 10px;
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