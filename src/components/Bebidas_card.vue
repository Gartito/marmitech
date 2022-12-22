<template>
    <q-card style="max-width: 50%;" class="q-ma-lg">
        <q-table title="Bebidas" :rows="rows" :columns="columns" row-key="id" v-model:selected="selected"
            selection="single" />

        <div class="input-group">
            <q-input class="q-pa-md" standout="bg-red text-white" style="width:50%;" label="Bebida"
                v-model="newDrink.name" />
            <q-input class=" q-pa-md" standout="bg-red text-white" style="width:50%;" type="number" label="Valor"
                v-model="newDrink.value" />
        </div>


        <div class=" row" style="display: flex; justify-content: center;">
            <q-btn color="blue-8" class="q-ma-lg" style="width: 100px" @click="addDrink()">ADICIONAR</q-btn>
            <q-btn color="red-8" class="q-ma-lg" style="width: 100px" @click="deleteDrink()">EXCLUIR</q-btn>
            <q-btn color="green-8" class="q-ma-lg" style="width: 100px" @click="saveNewDrinks()">SALVAR</q-btn>

        </div>
    </q-card>
    <strong>newDrink:</strong> {{ newDrink }}
    <br><br>
    <strong>selected:</strong> {{ selected }}
    <br><br>
    <strong>rows:</strong> {{ rows }}
</template>

<script>
import { getDrinks, deleteDrinks } from '../boot/menuServices'
import { ref } from 'vue'


export default {
    name: 'Bebidas_card',

    setup() {

        const rows = ref([])
        const selected = ref([])
        return {
            columns: [
                { name: 'Bebida', label: 'Bebida', align: 'left', field: row => row.name, format: val => `${val}` },
                { name: 'Valor', label: 'Valor', align: 'left', field: row => row.value, format: val => `${val}` }
            ],
            rows,
            selected
        }
    },
    data() {

        return {
            newDrink: {
                id: null,
                name: "",
                value: ""
            },

        }
    },
    methods: {
        async getAllDrinks() {
            const response = await getDrinks()
            this.rows = response.data
        },
        saveNewDrinks() {
            if (this.newDrink.name.length < 1) {
                alert("Por favor, dê o nome da bebida");
            } else if (this.newDrink.name.length > 50) {
                alert("O nome da bebida é muito grande, diminua");
            } else {
                const data = JSON.stringify(this.newDrink)
                console.log(data)
            }
        },
        deleteDrink() {
            if (this.newDrink.id != null) {
                deleteDrinks(this.newDrink.id)
                alert("Bebida excluída com sucesso!");
                location.reload()
            } else {
                alert("Escolha uma bebida para excluir.")
            }

        },
        addDrink() {
            this.newDrink.id = null
            this.newDrink.name = ""
            this.newDrink.value = ""
        }
    },
    mounted() {
        this.getAllDrinks()
    },
    watch: {
        selected(newValue) {
            this.newDrink.id = newValue[0]?.id
            this.newDrink.name = newValue[0]?.name
            this.newDrink.value = newValue[0]?.value
        }
    }
}
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
-->>