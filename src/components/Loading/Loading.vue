<template>
  <div v-if= "loading" class="loading-overlay" onload = loadPage()>
    <v-progress-circular 
    :size="88"
    :width="8"
    indeterminate 
    >
    </v-progress-circular>
  </div>
</template>

<script>
export default {
    data() {
    return {
      loading: true, // Set the initial state to true.
    };
  },
  mounted() {
    this.loadPage();
 },
 methods: {
    loadPage() {
      setTimeout(() => {
        this.loading=false;
      }, 1000);
    },
 }
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(228, 194, 194, 0.74);
  z-index: 100;
}
</style>