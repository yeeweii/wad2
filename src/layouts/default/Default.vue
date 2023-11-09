<template>
  <v-app>
    <default-bar />

    <default-view :full-height="true"/>
  </v-app>
</template>

<script>
  import DefaultBar from './Header.vue'
  import DefaultView from './View.vue'
  export default{
    components: {
      DefaultBar,
      DefaultView,
    }
  }
</script>
