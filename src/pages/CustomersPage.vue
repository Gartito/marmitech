<template>
    <ToolbarHeader />
    <q-card class="q-ma-sm">
        <q-table title="Clientes" :rows="rows" :columns="columns" row-key="id" v-model:selected="selected"
            selection="single" />
    </q-card>

    {{ selected[0]?.name }}
</template>

<script>

import ToolbarHeader from '../components/ToolbarHeader.vue'
import { getAllCustomers } from 'src/boot/menuServices';
import { ref } from "vue";

export default {
    name: 'CustomersPage',
    components: {
        ToolbarHeader
    },
    setup() {
        const rows = ref([]);
        const selected = ref([]);
        return {
            columns: [
                {
                    name: "Nome",
                    label: "Nome",
                    align: "left",
                    field: (row) => row.name,
                    format: (val) => `${val}`,
                },
                {
                    name: "Endereço",
                    label: "Endereço",
                    align: "left",
                    field: (row) => row.address,
                    format: (val) => `${val}`,
                },
                {
                    name: "Email",
                    label: "Email",
                    align: "left",
                    field: (row) => row.email,
                    format: (val) => `${val}`,
                },
                {
                    name: "Contato",
                    label: "Contato",
                    align: "left",
                    field: (row) => row.phone,
                    format: (val) => `${val}`,
                },
                {
                    name: "Empresa",
                    label: "Empresa",
                    align: "left",
                    field: (row) => row.company,
                    format: (val) => `${val}`,
                },
                {
                    name: "Saldo Devedor",
                    label: "Saldo devedor",
                    align: "left",
                    field: (row) => row.amount,
                    format: (val) => `${val}`,
                },
            ],
            rows,
            selected,
        };
    },
    data() {
        return {
            restaurant: null,
            newCustomer: {
                id: null,
                name: "",
                address: "",
                email: "",
                phone: "",
                company: "",
                amount: ""
            }
        }
    },
    methods: {
        async getCustomers() {
            const response = await getAllCustomers(this.restaurant);
            this.rows = response.data;
            this.rows.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
    },
    mounted() {
        const jwt = localStorage.getItem('jwt_token_marmitech_session');
        const jwtDecoded = JSON.parse(atob(jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        this.restaurant = jwtDecoded.name;
        this.getCustomers();
    },
    watch: {
        selected(newValue) {
            this.newCustomer.id = newValue[0]?.id;
            this.newCustomer.name = newValue[0]?.name;
            this.newCustomer.address = newValue[0]?.address;
            this.newCustomer.email = newValue[0]?.email;
            this.newCustomer.phone = newValue[0]?.address;
            this.newCustomer.company = newValue[0]?.address;
            this.newCustomer.amount = newValue[0]?.amount;
        },
    },
}
</script>
