<template>
  <q-card class="q-ma-lg" style="width: 50%">
    <div class="row">
      <div class="q-pa-lg text-h6">Guarnições</div>

      <div class="q-pa-md q-gutter-sm">
        <q-select
          standout="bg-red text-white"
          v-model="dia"
          :options="options"
          option-value="id"
          option-label="name"
          label="Dia da Semana"
          style="width: 200px"
        />
      </div>

      <div class="q-pa-md q-gutter-sm">
        <q-btn
          class="q-ma-md"
          color="red"
          style="width: 100px"
          @click="handleInputs(0)"
          >menos</q-btn
        >
        <q-btn
          class="q-ma-md"
          color="green"
          style="width: 100px"
          @click="handleInputs(1)"
          >mais</q-btn
        >
        <q-btn
          class="q-ma-md"
          color="blue"
          style="width: 100px"
          @click="handleInputs(2)"
          >limpar</q-btn
        >
      </div>
    </div>

    <div class="row" style="justify-content: center">
      <q-input
        v-for="item in guarnições_form"
        :key="item.id"
        class="q-pa-lg"
        standout="bg-red text-white"
        :label="`Guarnição ${item.id}`"
        style="width: 200px"
        v-model="item.food"
      />
    </div>

    <div class="row q-mt-lg" style="display: flex; justify-content: center">
      <q-btn
        color="green-8"
        class="q-ma-lg text-h6"
        style="width: 120px"
        @click="saveNewMenu()"
        >SALVAR</q-btn
      >
    </div>
  </q-card>
</template>

<script>
import { updateMenu } from "../boot/menuServices";

export default {
  name: "Cardapio_card",
  data() {
    return {
      guarnições_form: [],
      options: [
        { name: "segunda-feira", id: 1 },
        { name: "terça-feira", id: 2 },
        { name: "quarta-feira", id: 3 },
        { name: "quinta-feira", id: 4 },
        { name: "sexta-feira", id: 5 },
        { name: "sábado", id: 6 },
        { name: "domingo", id: 7 },
      ],
      dia: null,
    };
  },
  methods: {
    handleInputs(num) {
      const qtd = this.guarnições_form.length + 1;

      const model = { id: qtd, food: "" };

      if (num == 1) {
        this.guarnições_form.push(model);
      } else if (num == 0) {
        this.guarnições_form.pop();
      } else {
        for (let i = 0; i < this.guarnições_form.length; i++) {
          this.guarnições_form[i].food = "";
        }
      }
    },
    async saveNewMenu() {
      if (this.dia == null) {
        alert("Selecione o dia da semana para alterar o cardápio");
      } else {
        var array_form_foods = [];
        var string_foods;

        //Pegando array com o campo food dos objetos guarnições
        for (let i in this.guarnições_form) {
          array_form_foods.push(this.guarnições_form[i].food.toLowerCase());
        }

        //Filtrando campo food vazios
        const filtered_foods = array_form_foods.filter(
          (food) => food.length >= 1
        );

        //Transformando foods em caixa baixa e juntando todos em uma string só
        for (let i in filtered_foods) {
          let food_to_string = filtered_foods[i].toLowerCase();
          if (string_foods == undefined) {
            string_foods = food_to_string;
          } else {
            string_foods += `,${food_to_string}`;
          }
        }

        //Criando objeto que vai substituir o menu do dia
        const newMenu = {
          id: this.dia.id,
          day: this.dia.name,
          menu_of_day: string_foods || "",
        };

        const data = JSON.stringify(newMenu);
        console.log(data);

        const response = await updateMenu(newMenu.id, data);
        console.log(response);

        location.reload();
      }
    },
  },
  mounted() {
    //Projetando 8 guarnições por default na tela
    for (let i = 1; i <= 8; i++) {
      let model = {
        id: i,
        food: "",
      };
      this.guarnições_form.push(model);
    }
  },
};
</script>
