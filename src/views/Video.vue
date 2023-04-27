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
            startNumberOfLikes: 0,
            startNumberOfDislikes: 0,
            isLikeActive: false,
            isDislikeActive: false
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
            this.startNumberOfLikes = this.video_inf.numberOfLikes
            this.startNumberOfDislikes = this.video_inf.numberOfDislikes
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
        putReaction(event) {
            this.video_inf.numberOfDislikes = this.startNumberOfDislikes
            this.video_inf.numberOfLikes = this.startNumberOfLikes
            if (event.target.id == 'like' && !this.isLikeActive) {
                this.setReactionsActiveStatus(true, false)
                this.video_inf.numberOfLikes += 1
            }
            else if (event.target.id == 'dislike' && !this.isDislikeActive) {
                this.setReactionsActiveStatus(false, true)
                this.video_inf.numberOfDislikes += 1
            }
            else
                this.setReactionsActiveStatus(false, false)
        }
    }
};
</script>



<template>
    <div class="row justify-content-md-center h-20 video-container" v-if="isVideoReady">
        <div class="col-7">
            <video-player :options="videoOptions" class="mb-3" />
            <div class="d-flex justify-content-between align-items-center mb-3">
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
            <div>
                <p>{{ video_inf.description }}</p>
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
</style>