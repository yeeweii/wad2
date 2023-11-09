<template>
  <div id="app">
    <Nav/>
    <VueFaqAccordion/>
    <HelpForm/>
    <Footer/>
  </div>
</template>

<script setup>
  import Nav from "@/layouts/AllPageNav/OtherNav.vue"
  import VueFaqAccordion from "@/components/FAQAccordion/FAQAccordion.vue"
  import HelpForm from "@/components/Forms/HelpForm.vue"
  import Footer from "@/components/Footer/footer.vue"
</script>

<style scoped>
  #app{
    max-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content{
    flex-grow: 1;
  }
</style>

