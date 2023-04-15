<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: "",
            username: "",
            password: "",
            errorMessage: ""
        };
    },
    methods: {
        async onSubmit() {
            const responce = await axios.post('api', {
                jsonrpc: '2.0',
                id: 0,
                method: 'register_user',
                params: {
                    user_data: {
                        email: this.email,
                        username: this.username,
                        password: this.password
                    }
                },
            })
            if (typeof responce.data.error !== 'undefined')
                this.errorMessage = 'Некорректные данные'
            else {
                localStorage.setItem('access-token', responce.data.result.access_token)
                localStorage.setItem('refresh-token', responce.data.result.refresh_token)
                this.$router.push('/user')
                this.email = ""
                this.username = ""
                this.password = ""
                this.errorMessage = ""
            }
        }
    },
};
</script>

<template>
    <div class="container ">
        <div class="row justify-content-center ">
            <form @submit.prevent="onSubmit" class="col-3">
                <div class=" mb-1">
                    <label>Почта</label>
                    <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Введите почту"
                        v-model="email" required>
                </div>
                <div class="mb-1">
                    <label>Имя</label>
                    <input type="text" class="form-control" placeholder="Введите ваше имя" v-model="username" required>
                </div>
                <div class="mb-2">
                    <label>Пароль</label>
                    <input type="password" class="form-control" placeholder="Введите пароль" v-model="password" required>
                </div>
                <div v-if="errorMessage !== ''" class="alert alert-danger" role="alert">
                    {{ errorMessage }}
                </div>
                <button type="submit" class="btn btn-primary ">Зарегестрироваться</button>
            </form>
        </div>
    </div>
</template>


<style>

</style>
