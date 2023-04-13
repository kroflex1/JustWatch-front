<script>
export default {
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        submitForm: function () {
            this.formSubmitted = true
        }
    },
};
</script>

<template>
    <div>
        <form @submit.prevent="submitForm">
            <span>Email</span><br>
            <input v-model="email" type="text" placeholder="Enter your email" /><br>
            <span>Password</span><br>
            <input v-model="password" type="password" placeholder="Enter your password" /><br>
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