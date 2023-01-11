<template>
    <q-card v-if="isMobile" class="q-ma-sm">
        <q-table title="Marmitas" :rows="rows" :columns="columns" row-key="id" v-model:selected="selected"
            selection="single" />

        <div class="input-group">
            <q-input class="q-pa-md" standout="bg-red text-white" style="width: 50%" label="Marmita"
                v-model="newSize.name" />
            <q-input class="q-pa-md" standout="bg-red text-white" style="width: 50%" type="number" label="Valor"
                v-model="newSize.value" />
        </div>

        <div class="row" style="display: flex; justify-content: center">
            <q-btn color="red-8" class="q-ma-lg" style="width: 120px" @click="deleteSize()">EXCLUIR</q-btn>
            <q-btn color="green-8" class="q-ma-lg" style="width: 120px" @click="saveNewSizes()">SALVAR</q-btn>
        </div>
    </q-card>

    <q-card v-else style="width: 30%" class="q-ma-lg">
        <q-table title="Marmitas" :rows="rows" :columns="columns" row-key="id" v-model:selected="selected"
            selection="single" />

        <div class="input-group">
            <q-input class="q-pa-md" standout="bg-red text-white" style="width: 50%" label="Marmita"
                v-model="newSize.name" />
            <q-input class="q-pa-md" standout="bg-red text-white" style="width: 50%" type="number" label="Valor"
                v-model="newSize.value" />
        </div>

        <div class="row" style="display: flex; justify-content: center">
            <q-btn color="red-8" class="q-ma-lg" style="width: 120px" @click="deleteSize()">EXCLUIR</q-btn>
            <q-btn color="green-8" class="q-ma-lg" style="width: 120px" @click="saveNewSizes()">SALVAR</q-btn>
        </div>
    </q-card>


    <q-dialog v-model="showError" title="Erro">
        <q-card>
            <q-card-section>
                <div class="text-h6">AVISO</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                {{ msgError }}
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import {
    createSize,
    updateSize,
    getSizes,
    deleteSizes,
} from "../boot/menuServices";
import { ref } from "vue";

export default {
    name: "Sizes_card",
    setup() {
        const rows = ref([]);
        const selected = ref([]);
        return {
            columns: [
                {
                    name: "Tamanho",
                    label: "Tamanho",
                    align: "left",
                    field: (row) => row.name,
                    format: (val) => `${val}`,
                },
                {
                    name: "Valor",
                    label: "Valor",
                    align: "left",
                    field: (row) => row.value,
                    format: (val) => `${val}`,
                },
            ],
            rows,
            selected,
        };
    },
    data() {
        return {
            newSize: {
                id: null,
                name: "",
                value: "",
            },
            showError: false,
            msgError: "",
            isMobile: false,
            restaurant: null
        };
    },
    methods: {
        async getAllSizes() {
            const response = await getSizes(this.restaurant);
            this.rows = response.data;
            this.rows.sort((a, b) => a.value - b.value);
        },
        saveNewSizes() {
            if (this.newSize.name.length < 1) {
                this.msgError = "Escreva o nome da marmita";
                this.showError = true;
            } else if (this.newSize.name.length > 50) {
                this.msgError = "Diminua o nome da marmita";
                this.showError = true;
            } else if (this.newSize.value == "") {
                this.msgError = "Escreva o valor da marmita";
                this.showError = true;
            } else {
                if (this.newSize.id == null || !this.newSize.id) {
                    this.newSize.id = null;
                    createSize(this.restaurant, this.newSize);
                    this.msgError = "Marmita criada com sucesso!";
                    this.showError = true;
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                } else {
                    updateSize(this.restaurant, this.newSize);
                    this.msgError = "Marmita atualizada com sucesso!";
                    this.showError = true;
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                }
            }
        },
        deleteSize() {
            if (this.newSize.id != null) {
                deleteSizes(this.restaurant, this.newSize.id);
                this.msgError = "Marmita excluída com sucesso!";
                this.showError = true;
                setTimeout(function () {
                    location.reload();
                }, 2000);
            } else {
                this.msgError = "Escolha uma marmita para excluir";
                this.showError = true;
            }
        },
        checkWindowSize() {
            this.isMobile = window.innerWidth < 600
        }
    },
    mounted() {
        const jwt = localStorage.getItem('jwt_token_marmitech_session');
        const jwtDecoded = JSON.parse(atob(jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        this.restaurant = jwtDecoded.name;
        this.getAllSizes();
        this.checkWindowSize();
        window.addEventListener('resize', this.checkWindowSize);
    },
    watch: {
        selected(newValue) {
            this.newSize.id = newValue[0]?.id;
            this.newSize.name = newValue[0]?.name;
            this.newSize.value = newValue[0]?.value;
        },
    },
};
</script>

<style>

</style>
