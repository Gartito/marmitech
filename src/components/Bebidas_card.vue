<template>
    <q-card v-if="isMobile" class="q-ma-sm">
        <q-table title="Bebidas" :rows="rows" :columns="columns" row-key="id" v-model:selected="selected"
            selection="single" :pagination="initialPagination" />

        <div class="input-group">
            <q-input class="q-pa-md" standout="bg-red text-white" style="width: 50%" label="Bebida"
                v-model="newDrink.name" />
            <q-input class="q-pa-md" standout="bg-red text-white" style="width: 50%" type="number" label="Valor"
                v-model="newDrink.value" />
        </div>

        <div class="row" style="display: flex; justify-content: center">
            <q-btn color="red-8" class="q-ma-lg" style="width: 120px" @click="deleteDrink()">EXCLUIR</q-btn>
            <q-btn color="green-8" class="q-ma-lg" style="width: 120px" @click="saveNewDrinks()">SALVAR</q-btn>
        </div>
    </q-card>

    <q-card v-else style="width: 30%" class="q-ma-lg">
        <q-table title="Bebidas" :rows="rows" :columns="columns" row-key="id" v-model:selected="selected"
            selection="single" :pagination="initialPagination" />

        <div class="input-group">
            <q-input class="q-pa-md" standout="bg-red text-white" style="width: 50%" label="Bebida"
                v-model="newDrink.name" />
            <q-input class="q-pa-md" standout="bg-red text-white" style="width: 50%" type="number" label="Valor"
                v-model="newDrink.value" />
        </div>

        <div class="row" style="display: flex; justify-content: center">
            <q-btn color="red-8" class="q-ma-lg" style="width: 120px" @click="deleteDrink()">EXCLUIR</q-btn>
            <q-btn color="green-8" class="q-ma-lg" style="width: 120px" @click="saveNewDrinks()">SALVAR</q-btn>
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
    createDrink,
    updateDrink,
    getDrinks,
    deleteDrinks,
} from "../boot/menuServices";
import { ref } from "vue";

export default {
    name: "Bebidas_card",
    setup() {
        const rows = ref([]);
        const selected = ref([]);
        return {
            columns: [
                {
                    name: "Bebida",
                    label: "Bebida",
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
            initialPagination: {
                sortBy: "desc",
                descending: false,
                page: 1,
                rowsPerPage: 3,
            },
        };
    },
    data() {
        return {
            newDrink: {
                id: null,
                name: "",
                value: "",
            },
            showError: false,
            msgError: "",
            isMobile: false
        };
    },
    methods: {
        async getAllDrinks() {
            const response = await getDrinks();
            this.rows = response.data;
        },
        saveNewDrinks() {
            if (this.newDrink.name.length < 1) {
                this.msgError = "Por favor, dê um nome para a bebida";
                this.showError = true;
            } else if (this.newDrink.name.length > 50) {
                this.msgError = "Por favor, diminua o tamanho do nome da bebida";
                this.showError = true;
            } else if (this.newDrink.value == "") {
                this.msgError = "Por favor, coloque o preço da bebida";
                this.showError = true;
            } else {
                if (this.newDrink.id == null || !this.newDrink.id) {
                    this.newDrink.id = null;
                    createDrink(this.newDrink);
                    this.msgError = "Bebida criada com sucesso!";
                    this.showError = true;
                    location.reload();
                } else {
                    updateDrink(this.newDrink.id, this.newDrink);
                    this.msgError = "Bebida atualizada com sucesso!";
                    this.showError = true;
                    location.reload();
                }
            }
        },
        deleteDrink() {
            if (this.newDrink.id != null) {
                deleteDrinks(this.newDrink.id);
                this.msgError = "Bebida excluída com sucesso!";
                this.showError = true;
                location.reload();
            } else {
                this.msgError = "Escolha uma bebida para atualizar";
                this.showError = true;
            }
        },
        checkWindowSize() {
            this.isMobile = window.innerWidth < 600
        }
    },
    mounted() {
        this.getAllDrinks();
        this.checkWindowSize();
        window.addEventListener('resize', this.checkWindowSize);
    },
    watch: {
        selected(newValue) {
            this.newDrink.id = newValue[0]?.id;
            this.newDrink.name = newValue[0]?.name;
            this.newDrink.value = newValue[0]?.value;
        },
    },
};
</script>

<style>
.input-group {
    display: flex;
}

.input-group input {
    flex: 1;
    /* isso faz com que os inputs ocupem toda a largura disponível */
}

.input-group input+input {
    margin-left: 10px;
    /* adiciona um espaçamento de 10px entre os inputs */
}
</style>

<!--
            <template #body="props">
                <q-tr :props="props">

                    <q-td key="id" :props="props">
                        {{ props.row.id }}
                    </q-td>

                    <q-td key="name" :props="props">
                        {{ props.row.name }}
                        <q-popup-edit v-slot="scope" v-model="props.row.name" label-cancel="fechar" label-set="salvar"
                            buttons persistent>
                            <q-input v-model="scope.value" dense autofocus hint="Use os botões para fechar" />
                        </q-popup-edit>
                    </q-td>

                    <q-td key="value" :props="props">
                        {{ props.row.value }}
                        <q-popup-edit v-slot="scope" v-model="props.row.value" label-cancel="fechar" label-set="salvar"
                            buttons persistent>
                            <q-input v-model="scope.value" type="number" dense autofocus
                                hint="Use os botões para fechar" />
                        </q-popup-edit>
                    </q-td>

                </q-tr>
            </template>
-->
>
