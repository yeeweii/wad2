<template>
<div id="portfolio">
    <div class="container-fluid p-0">
    <v-app style="background: linear-gradient(to bottom, #266165bb, #FFDDE1)">
    <v-hover v-slot="{ isHovering, props}">
        <div class="d-flex align-items-center justify-content-center mt-3" style="flex-direction: column">
            <h2 class="text-h2 text-white fw-bold">Hot News</h2>
            <div class="text-subtitle-1 text-white">Catch on whats going on globally in the field of pharmaceutical sustainability</div>
            <!-- <v-divider color="info" inset></v-divider> -->
        </div>
      <v-container class="">
        <v-sheet
          elevated="4"
          class="mx-auto full-width-carousel"
          color="black"
          v-bind="props"
        >
          <v-carousel rounded="10" show-arrows="hover" :interval="3000" cycle
          progress>
            <v-carousel-item
              v-for="(slide, index) in slides"
              :key="index"
              :src="slide.src"
              cover
            >
            <a :href="slide.link" target="_blank" rel="noopener noreferrer">
              <v-expand-transition>
                <div
                  v-if="isHovering"
                  class="d-flex transition-fast-in-fast-out bg-pink-lighten-5 v-card--reveal text-h2"
                  style="height: 100%"
                >
                  {{ slide.title }}
                </div>
              </v-expand-transition>
            </a>
            </v-carousel-item>
          </v-carousel>
        </v-sheet>
      </v-container>
    </v-hover>
  </v-app>
  </div>
  </div>
</template>


<script>
import { useNewsStore } from '@/store/news';

const useNews = useNewsStore();
export default {
  data() {
    return {
      slides: null,
    }
  },
  mounted() {
    useNews.getNewsData().then(()=>{
      const newsData = useNews.getRequiredInfo;
      this.slides = newsData;
      console.log(newsData)
    });
  },
}




</script>

<style scoped>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.9;
    position: absolute;
    width: 100%;
  }

  .full-width-carousel {
  width: 100%;
  background-color: black /* Set the width to 100% of the viewport width */
}
</style>

   