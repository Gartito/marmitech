<template>
    <q-card id="card">
        <q-card-section>
            <div class="text-h4 text-red-10 text-bold">MARMITECH</div>
        </q-card-section>

        <q-card-section>
            <q-input class="q-mb-xl" filled v-model="username" label="Usuário"
                hint="Digite aqui seu usuário (ex: user@gmail.com)" />
            <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Senha"
                hint="Digite sua senha">
                <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="isPwd = !isPwd" />
                </template>
            </q-input>
        </q-card-section>

        <q-card-section style="  display: flex; justify-content: center; align-items: center;">
            <q-btn color="secondary" label="ENTRAR" class="text-h6 q-mr-lg" @click="login" />
            <q-btn outline color="primary" label="esqueci minha senha" />
        </q-card-section>
    </q-card>
</template>

<script>
import { ref } from 'vue';
import { getJWT } from '../boot/menuServices'

export default {
    name: 'loginPage',
    setup() {
        const username = ref(null);
        const password = ref(null)
        const isPwd = ref(true)

        return {
            username, password, isPwd
        }
    },
    data() {
        return {
            token: null
        }
    },
    methods: {
        async login() {
            const data = {
                username: this.username,
                password: this.password
            }
            try {
                const response = await getJWT(data)
                this.token = response.data
                localStorage.setItem('jwt_token_marmitech_session', this.token)
                this.$router.replace('/cardapio')
            } catch (e) {
                console.log(e)
            }



            //this.token = response.data
        }
    }
}
</script>

<style>
#card {
    width: 25%;
    margin: 10% auto;
    display: block;
}
</style>