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
        const responce = await axios.post('api', {
            jsonrpc: '2.0',
            id: 0,
            method: 'get_current_user_information',
            params: {}
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