<template>
    <main class="bg-yellow-14 q-pa-sm">
        <q-card class="q-pa-sm q-ma-sm">
            <q-card-session>
                <div class="text-h5 q-pl-md text-center text-bold">Cardápio de {{ dia }} do {{ restaurant }}</div>
            </q-card-session>
            <q-separator inset />
            <q-card-session>
                <div class="q-pa-md text-center">
                    <q-list dense>
                        <q-item v-ripple v-for="comida in menu" :key="comida">
                            <q-item-section>
                                {{ comida }}
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </q-card-session>
            <q-separator class="q-ma-md" inset />
            <q-card-session>
                <strong class="q-pl-md">Pedidos para entrega:</strong> 10:30 às 12:00
                <br>
                <strong class="q-pl-md">Atendimento no restaurante:</strong> 10:30 às 14:00
                <br>
                <strong class="q-pl-md">WhatsApp:</strong> (47) 991305533
            </q-card-session>
        </q-card>

        <q-card class="q-pa-sm q-ma-sm">
            <q-card-session>
                <div class="text-h6 q-pl-md">Marmitas</div>
            </q-card-session>
            <q-separator inset />
            <q-card-session>
                <q-table :columns="columnsSizes" :rows="tamanhos" :pagination="initialPagination" />
            </q-card-session>
        </q-card>

        <q-card class="q-pa-sm q-ma-sm">
            <q-card-session>
                <div class="text-h6 q-pl-md">Bebidas</div>
                <div class="text-subtitle2 q-pl-md">Bebidas e seus preços</div>
            </q-card-session>
            <q-separator inset />
            <q-card-session>
                <q-table :columns="columnsDrinks" :rows="bebidas" :pagination="initialPagination" />
            </q-card-session>
        </q-card>
    </main>
</template>

<script>
import { getSpecificMenu } from "../boot/menuServices";
import { getDrinks } from "../boot/menuServices";
import { getSizes } from "../boot/menuServices";
import { ref } from 'vue';

export default {
    name: 'CustomerView',
    setup() {
        const bebidas = ref([])
        const tamanhos = ref([])
        return {
            columnsDrinks: [
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
            columnsSizes: [
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
            bebidas,
            tamanhos,
            initialPagination: {
                page: 1,
                rowsPerPage: 20,
            }
        }

    },
    data() {
        return {
            menu: null,
            dia: null,
            restaurant: null
        }
    },
    methods: {
        async getMenu() {
            const day = new Date()
            const today = day.getDay()
            const response = await getSpecificMenu(today, this.restaurant);
            this.menu = response.data[0].menu_of_day;
            this.dia = response.data[0].day;
        },
        async getAllDrinks() {
            const response = await getDrinks();
            this.bebidas = response.data;
            for (var bebida of this.bebidas) {
                bebida.value = parseInt(bebida.value)
            }
            this.bebidas.sort((a, b) => a.value - b.value);
        },
        async getAllSizes() {
            const response = await getSizes();
            this.tamanhos = response.data;
            for (var tamanho of this.tamanhos) {
                tamanho.value = parseInt(tamanho.value)
            }
            this.tamanhos.sort((a, b) => a.value - b.value);
        }

    },
    mounted() {
        const jwt = localStorage.getItem('jwt_token_marmitech_session');
        const jwtDecoded = JSON.parse(atob(jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        this.restaurant = jwtDecoded.name;
        this.getMenu();
        this.getAllSizes();
        this.getAllDrinks();
    }
}
</script>

<style scoped>

</style>