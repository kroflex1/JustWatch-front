<script>
import axios from 'axios';
export default {
    data() {
        return {
            username: "",
            email: ""
        };
    },
    async created() {
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
        this.username = responce.data.result.username
        this.email = responce.data.result.email
    }
};
</script>

<template>
    <div>
        <p>Имя: {{ username }}</p>
        <p>Почта: {{ email }}</p>
    </div>
</template>
