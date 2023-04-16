<script>
import axios from 'axios';
import { checkAccessToken } from '../tokenManager.js'
export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: ""
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
        async onSubmit() {
            const responce = await axios.post('api/upload-video-file', {

            })
            if (typeof responce.data.error !== 'undefined')
                this.errorMessage = 'Некорректные данные'
            else {
                localStorage.setItem('access-token', responce.data.result.access_token)
                localStorage.setItem('refresh-token', responce.data.result.refresh_token)
                this.$router.push('/user')
                this.email = ""
                this.password = ""
            }
        }
    },
};
</script>

<template>
    <div class="row justify-content-center">
        <form @submit.prevent="onSubmit" class="col-3">
            <div class="mb-1">
                <label>Название видео</label>
                <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Название видео" required>
            </div>
            <div class="mb-1">
                <label>Описание видео</label>
                <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Описание видео">
            </div>
            <div class="custom-file mb-2">
                <input type="file" class="custom-file-input" required>
                <label class="custom-file-label">Choose file</label>
            </div>
            <button type="submit" class="btn btn-primary ">Загрузить видео</button>
        </form>
    </div>
</template>

