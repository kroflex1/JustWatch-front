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
                numberOfDislikes: 0
            },
            isLikeActive: false,
            isDislikeActive: false,
            comments: [],
            commentText: ''
        };
    },
    async created() {
        const responce = await getResponce('get_video_show_inf_by_id', { video_id: parseInt(this.$route.params.id) })
        if (typeof responce.data.error !== 'undefined')
            this.$router.push('/login')
        else {
            this.videoOptions.sources[0].src = responce.data.result.video_url
            this.video_inf = {
                name: responce.data.result.video_name,
                description: responce.data.result.description,
                numberOfLikes: responce.data.result.reactionsInf.number_of_likes,
                numberOfDislikes: responce.data.result.reactionsInf.number_of_dislikes
            }
            this.comments = responce.data.result.comments
            const startUserReaction = responce.data.result.user_reaction
            this.setReactionsActiveStatus(startUserReaction == 'like', startUserReaction == 'dislike')
            this.startNumberOfLikes = this.video_inf.numberOfLikes
            this.startNumberOfDislikes = this.video_inf.numberOfDislikes
            if (startUserReaction == 'like')
                this.startNumberOfLikes -= 1
            if (startUserReaction == 'dislike')
                this.startNumberOfDislikes -= 1
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
        }
    },
    methods: {
        setReactionsActiveStatus(likeStatus, dislikeStatus) {
            this.isLikeActive = likeStatus
            this.isDislikeActive = dislikeStatus
        },
        async putReaction(event) {
            this.video_inf.numberOfDislikes = this.startNumberOfDislikes
            this.video_inf.numberOfLikes = this.startNumberOfLikes
            if (event.target.id == 'like' && !this.isLikeActive) {
                this.setReactionsActiveStatus(true, false)
                this.video_inf.numberOfLikes += 1
                const responce = await getResponce('rate_video', { video_id: parseInt(this.$route.params.id), user_reaction: "like" })
            }
            else if (event.target.id == 'dislike' && !this.isDislikeActive) {
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
        }
    }
};
</script>



<template>
    <div class="row justify-content-md-center h-20 video-container" v-if="isVideoReady">
        <div class="col-7">
            <video-player :options="videoOptions" class="mb-3" />
            <div class="d-flex justify-content-between align-items-center mb-2">
                <p class="fw-bold fs-3 lh-1">{{ video_inf.name }}</p>
                <div>
                    <button class="reaction-button" :class="likeClassObject" id="like" @click="putReaction">
                        Like: {{ numberOfLikes }}
                    </button>
                    <button class="reaction-button" :class="dislikeClassObject" id="dislike" @click="putReaction">
                        Dislike: {{ numberOfDislikes }}
                    </button>
                </div>
            </div>
            <div class="mb-4">
                <p>{{ video_inf.description }}</p>
            </div>
            <form class="d-flex flex-column mb-3" @submit.prevent="onWriteComment">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="1" placeholder="Введите комментарий"
                    v-model="commentText" required></textarea>
                <button class="btn btn-primary align-self-end" type="submit">Оставить комментарий</button>
            </form>

            <div class="d-flex flex-column comments">
                <template v-for="(comment, index) in comments" :key="index">
                    <div class="comment p-3 pe-4">
                        <p class="mb-2">{{ comment.author_name }}</p>
                        <p class="mb-1">{{ comment.text }}</p>
                        <p class="comment-date">{{ comment.published_at }}</p>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.reaction-button {
    outline: 0;
    border-right-color: black;
}

.reaction-button:first-child {
    border-width: 0px 1px 0px 0px;
    border-radius: 50px 0 0 50px;
}

.reaction-button:nth-child(2) {
    border-width: 0;
    border-radius: 0px 50px 50px 0px;
}

.reaction-button:hover {
    background-color: rgb(197, 192, 192);
}

.active:first-child {
    color: green;
}

.active:nth-child(2) {
    color: red;
}

.comment {
    background-color: black;
    border-radius: 10px;
}

.comments {
    gap: 1rem;
}

.comment-date {
    color: grey
}
</style>