<template>
<div id="app">
    <HomeNav />
    <mastHead />
    <AboutView />
    <Services />
    <News />
    <Footer />
</div>
</template>

<script setup>
    import HomeNav from "@/layouts/Home/HomeNav.vue"
    import mastHead from "@/components/Jumbotrons/Masthead.vue"
    import AboutView from "@/components/Jumbotrons/About.vue"
    import Services from "@/components/Jumbotrons/Services.vue"
    import News from "@/components/News/newsCards.vue"
    import Footer from "@/components/Footer/footer.vue"
    import { gsap } from 'gsap';
</script>

<style scoped>
#app {
  max-height: 100vh; 
  display: flex;
  flex-direction: column;
}

.content {
  flex-grow: 1;
}
</style>