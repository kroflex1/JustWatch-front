<script>
import axios from 'axios';
import { getResponce } from '@/scripts/requestManager.js';
import { getUserIdFromToken } from '@/scripts/tokenManager.js'

export default {
    data() {
        return {
            avatarFile: null,
            avatarUrl: null
        };
    },
    async created() {
        const responce = await getResponce("get_user_avatar_url", {user_id: getUserIdFromToken()})
        this.avatarUrl = responce.data.result
    },
    methods: {
        onAvatarFileSelected(event) {
            this.avatarFile = event.target.files[0]
        },
        async onSubmit(event) {
            var formData = new FormData()
            formData.append('avatar_data', this.avatarFile, 'avatar_data')
            const responce = await axios.post("api/upload-avatar/", formData, {
                headers: {
                    'access-token': localStorage.getItem('access-token')
                },
            })
        }
    }
};
</script>

<template>
    <div class="container">
        <div>
            <div class="row">
                <div class="col-3">
                    <form @submit.prevent="onSubmit">
                        <label for="formFile" class="form-label">Изображение вашего профиля</label>
                        <input type="file" class="form-control"  @change="onAvatarFileSelected" required>
                        <button class="btn btn-outline-light px-5" type="submit">Загрузить изображение</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.user-avatar {
    width: 130px;
    border-radius: 100px;
}
</style>
