<template>
    <q-card v-if="isMobile" class="q-ma-sm" style="margin-top: 40%">
        <q-card-section>
            <div class="text-h4 text-red-10 text-bold">MARMITECH</div>
        </q-card-section>

        <q-card-section>
            <q-input class="q-mb-xl" filled v-model="username" label="Usuário"
                hint="Digite aqui seu usuário (ex: user@gmail.com)" />
            <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Senha">
                <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="isPwd = !isPwd" />
                </template>
            </q-input>
            <q-btn flat color="primary" label="Esqueci minha senha" @click="showDialog = true" />
        </q-card-section>

        <q-card-section style="  display: flex; justify-content: center; align-items: center;">
            <q-btn color="secondary" label="ENTRAR" class="text-h6 q-mr-lg" @click="login" />
        </q-card-section>
    </q-card>

    <q-card v-else style="width: 25%; margin: 10% auto; display: block;">
        <q-card-section>
            <div class="text-h4 text-red-10 text-bold">MARMITECH</div>
        </q-card-section>

        <q-card-section>
            <q-input class="q-mb-xl" filled v-model="username" label="Usuário"
                hint="Digite aqui seu usuário (ex: user@gmail.com)" />
            <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Senha">
                <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                        @click="isPwd = !isPwd" />
                </template>
            </q-input>
            <q-btn flat color="primary" label="Esqueci minha senha" @click="showDialog = true" />
        </q-card-section>

        <q-card-section style="  display: flex; justify-content: center; align-items: center;">
            <q-btn color="secondary" label="ENTRAR" class="text-h6 q-mr-lg" @click="login" />
        </q-card-section>
    </q-card>


    <!-- CAIXAS DE DIÁLOGO -->
    <q-dialog v-model="showDialog" title="Esqueci minha Senha">
        <q-card>
            <q-card-section>
                <div class="text-h6">Esqueci minha senha</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                Para recuperar os dados de acesso de sua conta, entre em contato com nosso suporte, responderemos em até
                duas horas: <br><br>
                <strong>marmitech@suporte.com.br</strong>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-dialog v-model="showErrorLogin" title="Erro de Login">
        <q-card>
            <q-card-section>
                <div class="text-h6">Erro de Login</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                Dados de acesso incorretos, por favor, tente novamente!
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
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
            token: null,
            showDialog: false,
            showErrorLogin: false,
            isMobile: false
        }
    },
    methods: {
        async login() {
            const data = {
                username: this.username,
                password: this.password
            }
            try {
                const response = await getJWT(data);
                this.token = response.data;
                localStorage.setItem('jwt_token_marmitech_session', this.token);
                this.$router.replace('/');
            } catch (e) {
                console.log(e)
                this.showErrorLogin = true;
            }
        },
        checkWindowSize() {
            this.isMobile = window.innerWidth < 600
        }
    },
    mounted() {
        this.checkWindowSize();
        window.addEventListener('resize', this.checkWindowSize);
    }
}
</script>