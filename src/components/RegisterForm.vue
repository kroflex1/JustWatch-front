<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: "",
            username: "",
            password: "",
        };
    },
    methods: {
        onSubmit() {
            
            axios.post('api', {
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
            }).then(function (responce) {
                localStorage.setItem('access-token', responce.data.result.access_token)
                localStorage.setItem('refresh-token', responce.data.result.refresh_token)
                
            })
            this.$router.push('/login')
            this.email = ""
            this.username = ""
            this.password = ""     
        }
    },
};
</script>

<template>
    <div>
        <form @submit.prevent="onSubmit">
            <span>Почта</span><br>
            <input v-model="email" type="email" placeholder="Почта" required /><br>
            <span>Имя</span><br>
            <input v-model="username" type="text" placeholder="Имя" required /><br>
            <span>Пароль</span><br>
            <input v-model="password" type="password" placeholder="Пароль" required /><br>
            <input type="submit" value="Войти">
        </form>
    </div>
</template>









<style>
form {
    padding: 10px;
    border: 2px solid black;
    border-radius: 5px;
}

input {
    padding: 4px 8px;
    margin: 4px;
}

span {
    font-size: 18px;
    margin: 4px;
    font-weight: 500;
}

.submit {
    font-size: 15px;
    color: #fff;
    background: #222;
    padding: 6px 12px;
    border: none;
    margin-top: 8px;
    cursor: pointer;
    border-radius: 5px;
}
</style>