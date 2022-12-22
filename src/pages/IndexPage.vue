<template>
    <ToolbarHeader />
    <Menus_grid />
</template>

<script>
import { defineComponent } from 'vue'
import ToolbarHeader from '../components/ToolbarHeader.vue'
import Menus_grid from '../components/Menus_grid.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ToolbarHeader,
    Menus_grid
  }
  
})
</script>
