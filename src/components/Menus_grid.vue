<template>
  <div v-if="isMobile">

    <q-table title="Cardápios da Semana" :rows="rows" :columns="Columns" row-key="day" class="q-ma-sm"
      :pagination="initialPagination" />
    <Cardapio_card />
    <Sizes_card />
    <Bebidas_card />

  </div>

  <div v-else>
    <div style="display: flex">
      <q-table title="Cardápios da Semana" :rows="rows" :columns="Columns" row-key="day" class="q-ma-lg"
        :pagination="initialPagination" style="width: 70%" />

      <Sizes_card />
    </div>

    <div style="display: flex">
      <Cardapio_card />
      <Bebidas_card />
    </div>
  </div>
</template>

<script>
import { getMenus, getSpecificMenu } from "../boot/menuServices";
import Cardapio_card from "./Cardapio_card.vue";
import Bebidas_card from "./Bebidas_card.vue";
import Sizes_card from "./Sizes_card.vue";

export default {
  name: "Menus_grid",
  components: {
    Cardapio_card,
    Bebidas_card,
    Sizes_card,
  },
  setup() {
    return {
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 7,
      },
      Columns: [
        {
          name: "Dia da semana",
          label: "Dia da semana",
          align: "left",
          field: (row) => row.day,
          format: (val) => `${val}`,
        },
        {
          name: "Cardápio",
          label: "Cardápio",
          align: "left",
          field: (row) => row.menu_of_day,
          format: (val) => `${val} `,
        },
      ],
    };
  },
  data() {
    return {
      rows: [],
      isMobile: false
    };
  },
  methods: {
    async getAllMenus() {
      const response = await getMenus();
      this.rows = await response.data;

      for (var i = 0; i < this.rows.length; i++) {
        this.rows[i].menu_of_day = this.rows[i].menu_of_day.join(", ");
      }
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth < 600
    }
  },
  created() {
    this.getAllMenus();
  },
  mounted() {
    this.checkWindowSize()
    window.addEventListener('resize', this.checkWindowSize)
  }
};
</script>