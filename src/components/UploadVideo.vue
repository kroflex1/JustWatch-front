<script>
import axios from 'axios';
import { checkAccessToken } from '../tokenManager.js'
import { toHandlers } from 'vue';
export default {
    data() {
        return {
            videoName: "",
            videoDescription: "",
            videoFile: null
        };
    },
    async created() {
        await checkAccessToken();
        const responce = await axios.post('api',
            {
                jsonrpc: '2.0',
                id: 0,
                method: 'get_current_user_information',
                params: {}
            },
            {
                headers: {
                    'access-token': localStorage.getItem('access-token')
                }
            })
        if (typeof responce.data.error !== 'undefined')
            this.$router.push('/login')
        else {
            this.username = responce.data.result.username
            this.email = responce.data.result.email
        }
    },
    methods: {
        onFileSelected(event) {
            this.videoFile = event.target.files[0]
        },
        async onSubmit(event) {
            var formData = new FormData()
            formData.append('video_data', this.videoFile, 'video_data')
            const responce = await axios.post("api/upload-video-file?video_name=testNames&video_descr=mememememe", formData, {
                headers: {
                    'access-token': localStorage.getItem('access-token')
                },
                params:{
                    video_name: this.videoName,
                    video_descr: this.videoDescription
                }
            })
            console.log(responce.data)
            this.videoName = ""
            this.videoDescription = ""
        }
    },
};
</script>

<template>
    <div class="row justify-content-center">
        <form @submit.prevent="onSubmit" class="col-3">
            <div class="mb-1">
                <label>Название видео</label>
                <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Название видео"
                    v-model="videoName" required>
            </div>
            <div class="mb-3">
                <label>Описание видео</label>
                <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Описание видео"
                    v-model="videoDescription">
            </div>
            <div class="custom-file mb-2">
                <input type="file" class="custom-file-input" @change="onFileSelected" required>
                <label class="custom-file-label">Choose file</label>
            </div>
            <button type="submit" class="btn btn-primary ">Загрузить видео</button>
        </form>
    </div>
</template>

