<script>
import { getResponce } from '@/assets/requestManager.js';
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
            var userData = {
                email: this.email,
                username: this.username,
                password: this.password
            }
            const responce = await getResponce('register_user', { user_data: userData })
            if (typeof responce.data.error !== 'undefined')
                this.errorMessage = 'Некорректные данные'
            else {
                localStorage.setItem('access-token', responce.data.result.access_token)
                localStorage.setItem('refresh-token', responce.data.result.refresh_token)
                this.$router.push('/')
                this.errorMessage = ""
            }
        }
    },
};
</script>

<template>
    <section class="vh-80">
        <form @submit.prevent="onSubmit">
            <div class="container py-3 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-dark text-white" style="border-radius: 1rem;">
                            <div class="card-body p-5 text-center">

                                <div class="mb-md-4  pb-3">

                                    <h2 class="fw-bold mb-2 text-uppercase">Зарегестрироваться</h2>
                                    <p class="text-white-50 mb-5">Создайте новый аккаунт</p>

                                    <div class="form-outline form-white mb-4">
                                        <input type="email" class="form-control form-control-lg" v-model="email" required />
                                        <label class="form-label">Почта</label>
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <input type="text" class="form-control form-control-lg" v-model="username"
                                            required />
                                        <label class="form-label">Имя</label>
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <input type="password" class="form-control form-control-lg" v-model="password"
                                            required />
                                        <label class="form-label">Пароль</label>
                                    </div>

                                    <div v-if="errorMessage !== ''" class="alert alert-danger" role="alert">
                                        {{ errorMessage }}
                                    </div>

                                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Войти</button>

                                </div>

                                <div>
                                    <p class="mb-0">Уже есть аккаунт?
                                        <router-link class="text-white-50 fw-bold" to="/login">Войти</router-link>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>


<style></style>
