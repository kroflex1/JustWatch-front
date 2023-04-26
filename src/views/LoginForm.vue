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
                this.errorMessage = 'Вы ввели некорректные данные, попробуйте снова'
            else {
                localStorage.setItem('access-token', responce.data.result.access_token)
                localStorage.setItem('refresh-token', responce.data.result.refresh_token)
                this.$router.push('/')
            }
        }
    },
};
</script>

<template>
    <section class="vh-80">
        <form @submit.prevent="onSubmit">
            <div class="container py-4 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div class="card bg-dark text-white" style="border-radius: 1rem;">
                            <div class="card-body p-5 text-center">

                                <div class="mb-md-5 mt-md-4 pb-5">
                                    <h2 class="fw-bold mb-2 text-uppercase">Войти</h2>
                                    <p class="text-white-50 mb-5">Введите вашу почту и пароль</p>

                                    <div class="form-outline form-white mb-4">
                                        <input type="email" class="form-control form-control-lg" v-model="email" required />
                                        <label class="form-label">Почта</label>
                                    </div>

                                    <div class="form-outline form-white mb-4">
                                        <input type="password" class="form-control form-control-lg" v-model="password"
                                            required />
                                        <label class="form-label">Пароль</label>
                                    </div>

                                    <div v-if="errorMessage !== ''" class=" alert alert-danger" role="alert">
                                        {{ errorMessage }}
                                    </div>

                                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Войти</button>
                                </div>

                                <div>
                                    <p class="mb-0">Нет аккаунта?
                                        <router-link class="text-white-50 fw-bold"
                                            to="/register">Зарегестрируйтесь</router-link>
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

