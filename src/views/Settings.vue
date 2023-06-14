<script>
import axios from 'axios';
import { getResponce } from '@/scripts/requestManager.js';
import { getUserIdFromToken } from '@/scripts/tokenManager.js'

export default {
    data() {
        return {
            avatarFile: null,
            imageUploadProgress: 0,
            isImageUploading: false,
            isImageReady: false,
            isInvalidImageFormat: false
        };
    },
    methods: {
        onAvatarFileSelected(event) {
            this.avatarFile = event.target.files[0]
        },
        async onSubmit(event) {
            this.isImageReady = false
            this.isInvalidImageFormat = false
            if(this.avatarFile.type != 'image/jpeg' && this.avatarFile.type != 'image/png'){
                this.isInvalidImageFormat = true
                return
            }
            var formData = new FormData()
            formData.append('avatar_data', this.avatarFile, 'avatar_data')
            this.isImageUploading = true
            const responce = await axios.post("api/upload-avatar/", formData, {
                headers: {
                    'access-token': localStorage.getItem('access-token')
                },
                onUploadProgress: function (progressEvent) {
                    this.imageUploadProgress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
                }.bind(this)
            })
            this.isImageUploading = false
            this.isImageReady = true
        }
    }
};
</script>

<template>
    <div class="container">
        <form @submit.prevent="onSubmit" class="d-flex gap-4 align-items-top">
            <label for="formFile" class="form-label">Изображение вашего профиля:</label>
            <div class="d-flex flex-column gap-2">
                <input type="file" class="form-control file_input" @change="onAvatarFileSelected" required>
                <button class="btn btn-outline-light" type="submit">Загрузить изображение</button>

                <div v-if="isInvalidImageFormat" class="alert alert-danger" role="alert">
                    Неверный формат изображения
                </div>

                <div class="progress mb-3" style="height: 20px;" v-if="isImageUploading">
                    <div class="progress-bar progress-bar-striped upload_image_progress_bar" role="progressbar"
                        :style="{ width: imageUploadProgress + '%' }" aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>

                <div class="align-self-center" v-if="isImageReady">
                    <svg xmlns="http://www.w3.org/2000/svg" width="95" fill="#6a11cb"
                        class="bi bi-check confirm-check-mark " viewBox="0 0 16 16">
                        <path
                            d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                    </svg>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.file_input {
    width: 400px;
}

.upload_image_progress_bar {
    background: #6a11cb;
    background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
    background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
}

.confirm-check-mark {
    animation: 2s show ease;
}

.confirm-check-mark path {
    color: blueviolet;
}
</style>
