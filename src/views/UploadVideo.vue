<script>
import axios from 'axios';
export default {
    data() {
        return {
            videoName: "",
            videoDescription: "",
            videoFile: null,
            imagePreview: null,
            isVideoUploading: false,
            videoUploadProgress: 0,
            isVideoCheck: false,
            isVideoReady: false,
        };
    },
    methods: {
        onVideoFileSelected(event) {
            this.videoFile = event.target.files[0]
        },
        onImagePreviewSelected(event) {
            this.imagePreview = event.target.files[0]
        },
        async onSubmit(event) {
            this.isVideoReady = false
            var formData = new FormData()
            formData.append('video_data', this.videoFile, 'video_data')
            this.isVideoUploading = true
            const responce = await axios.post("api/upload-video-file?video_name=testNames&video_descr=mem", formData, {
                headers: {
                    'access-token': localStorage.getItem('access-token')
                },
                params: {
                    video_name: this.videoName,
                    video_descr: this.videoDescription
                },
                onUploadProgress: function (progressEvent) {
                    this.videoUploadProgress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                    if (this.videoUploadProgress >= 100)
                        this.isVideoCheck = true
                }.bind(this)
            })
            this.isVideoCheck = false
            this.isVideoUploading = false
            this.videoUploadProgress = 0
            this.isVideoReady = true
            this.videoDescription = 0
            this.videoName = ""
            this.videoDescription = ""
        }
    },
};
</script>

<template>
    <section class="vh-80">
        <form @submit.prevent="onSubmit">
            <div class="container py-3 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-dark text-white" style="border-radius: 1rem;">
                            <div class="card-body p-5 text-center">

                                <div class="mb-md-4">

                                    <h2 class="fw-bold mb-5 text-uppercase">Загрузить видео</h2>

                                    <div class="form-outline form-white mb-4">
                                        <input type="text" class="form-control form-control-lg" v-model="videoName"
                                            required />
                                        <label class="form-label">Название видео</label>
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <input type="text" class="form-control form-control-lg"
                                            v-model="videoDescription" />
                                        <label class="form-label">Описание видео</label>
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <input type="file" class="form-control form-control-lg"
                                            @change="onVideoFileSelected" required />
                                        <label class="form-label">Видео</label>
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <input type="file" class="form-control form-control-lg"
                                            @change="onImagePreviewSelected" required />
                                        <label class="form-label m-0">Превью видео</label>
                                    </div>


                                    <button class="btn btn-outline-light btn-lg px-5 mb-4" type="submit">Загрузить
                                        видео</button>

                                    <div class="progress mb-3" style="height: 20px;" v-if="isVideoUploading">
                                        <div class="progress-bar progress-bar-striped upload-video-progress-bar"
                                            role="progressbar" :style="{ width: videoUploadProgress + '%' }"
                                            aria-valuemin="0" aria-valuemax="100">
                                        </div>
                                    </div>

                                    <div v-if="isVideoCheck">
                                        <p class="fw-bold fs-5 text-uppercase">Проверка видео</p>
                                        <div class="lds-ellipsis">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>


                                    <div v-if="isVideoReady">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="95" fill="currentColor"
                                            class="bi bi-check confirm-check-mark" viewBox="0 0 16 16">
                                            <path
                                                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                        </svg>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>


<style scoped>
.upload-video-progress-bar {
    background: #6a11cb;
    background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
    background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
}

.confirm-message {
    color: lawngreen;
    font-size: large;
}

.confirm-check-mark {
    animation: 2s show ease;
}

@keyframes show {
    from {
        opacity: 0;
        scale: 0.2;
    }

    to {
        opacity: 1;
        scale: 1;
    }
}

.confirm-check-mark path {
    color: blueviolet;
}


.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-ellipsis div {
    position: absolute;
    top: 13px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}

@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(24px, 0);
    }
}
</style>
