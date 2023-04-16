<script>
import axios from 'axios';
import { checkAccessToken } from '../tokenManager.js'
export default {
    data() {
        return {
            username: "",
            email: ""
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
        if (typeof responce.data.error !== 'undefined') {
            console.log('Meeee')
            console.log(responce.data)
            this.$router.push('/login')
        }

        else {
            this.username = responce.data.result.username
            this.email = responce.data.result.email
        }
    }
};
</script>

<template>
    <div>
        <p>Имя: {{ username }}</p>
        <p>Почта: {{ email }}</p>
    </div>
</template>
