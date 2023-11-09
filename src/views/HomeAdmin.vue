<template>
    <div id="app">
        <!-- <mastHead /> -->
        <AdminIntro />
        <Track />
        <News />
        <!-- <Maps /> -->
        <Footer />  
    </div>
    </template>
    
    <script setup>
        // import mastHead from "@/components/Jumbotrons/Masthead.vue"
        import AdminIntro from "@/components/AdminFeatures/AdminIntro.vue"
        import Track from "@/components/AdminFeatures/TrackComponent.vue"
        import News from "@/components/News/newsCards.vue"
        // import Maps from "@/components/Map/MapTest.vue"
        import Footer from "@/components/Footer/footer.vue"    
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