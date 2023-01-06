<template>
  <header v-if="isMobile">
    <q-toolbar class="bg-red-10 text-white q-my-md shadow-2" id="toolbarHeader">
      <p class="text-weight-bold text-h6 q-pl-sm q-mt-sm">
        Livorno Restaurante
      </p>
      <q-space />

      <q-btn-toggle v-model="model" flat stretch toggle-color="yellow" :options="options" />
    </q-toolbar>
  </header>

  <header v-else>
    <q-toolbar class="bg-red-10 text-white q-ma-md shadow-2" id="toolbarHeader">
      <p class="text-h2 text-weight-bolder">MARMITECH</p>
      <p class="text-weight-bold text-h5 q-pl-lg q-mt-lg">
        Livorno Restaurante
      </p>
      <q-space />

      <q-btn-toggle v-model="model" flat stretch toggle-color="yellow" :options="options" />
    </q-toolbar>
  </header>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      isMobile: false
    }
  },
  setup() {
    return {
      model: ref("cardapio"),

      options: [
        { label: "Cardápio", value: "cardapio", href: "/" },
        { label: "Sair", value: "sair", href: "/logout" },
      ],
    };
  },
  methods: {
    checkWindowSize() {
      this.isMobile = window.innerWidth < 600
    },
  },
  mounted() {
    this.checkWindowSize()
    window.addEventListener('resize', this.checkWindowSize)
  }

};
</script>

<style>
#toolbarHeader {
  margin: 0;
}
</style>
