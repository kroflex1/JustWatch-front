<script>
import { getResponce } from '@/assets/requestManager.js';
export default {
    data() {
        return {
            username: "",
            email: ""
        };
    },
    async created() {
        const responce = await getResponce('get_current_user_information', {})
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
