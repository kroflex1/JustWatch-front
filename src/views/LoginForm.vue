<script>
import { getResponce } from '@/assets/requestManager.js';
export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: ""
        };
    },
    methods: {
        async onSubmit() {
            var userData = {
                email: this.email,
                password: this.password
            }
            const responce = await getResponce('login', { user_data: userData })
            if (typeof responce.data.error !== 'undefined')
                this.errorMessage = 'Некорректные данные'
            else {
                localStorage.setItem('access-token', responce.data.result.access_token)
                localStorage.setItem('refresh-token', responce.data.result.refresh_token)
                this.$router.push('/user')
            }
        }
    },
};
</script>

<template>
    <div class="row justify-content-center">
        <form @submit.prevent="onSubmit" class="col-3">
            <div class=" mb-1">
                <label>Почта</label>
                <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Введите почту"
                    v-model="email" required>
            </div>
            <div class="mb-2">
                <label>Пароль</label>
                <input type="password" class="form-control" placeholder="Введите пароль" v-model="password" required>
            </div>
            <div v-if="errorMessage !== ''" class="alert alert-danger" role="alert">
                {{ errorMessage }}
            </div>
            <button type="submit" class="btn btn-primary ">Войти</button>
        </form>
    </div>
</template>

