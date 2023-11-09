<template>


<v-app-bar :elevation="2" color="#00798C">
    <v-app-bar-title class="text-center shift_left">
      <h2 >{{useStore.companyName}}</h2>
    </v-app-bar-title>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
  <v-btn @click="toggleTheme" 
        v-bind="props"
        small 
        :color=" isHovering ? 'primary' : '#EC407A' " 
        class="dark-mode-button"
        :elevation="isHovering ? 10 : 0"
        v-if="isSmallScreen">
        <v-icon>mdi-weather-night</v-icon>
  </v-btn>
  <v-btn
      v-bind="props"
      @click="toggleTheme"
      class="dark-mode-button"
      small
      :elevation="isHovering ? 10 : 0"
      :color=" isHovering ? '#EC407A' : 'primary' " 
      v-else
    >
    Switch Theme
  </v-btn>
</template>
</v-hover>
</v-app-bar>


        
</template>

<style scoped>
.dark-mode-button {
  background-color: white; /* Set the background color */
  color: black; /* Set the text color */
}

.shift_left {
  margin-left:9%;
}


</style>

<script setup>

import { ref, computed, onMounted } from 'vue';
import { useUserStore } from "@/store/user";
import { useTheme } from 'vuetify'

const useStore = useUserStore();

const theme = useTheme()

const windowWidth = ref(window.innerWidth);

const isSmallScreen = computed(() => {
  return windowWidth.value <= 350; // Adjust the threshold as needed
});

window.addEventListener("resize", () => {
  // Update windowWidth when the window is resized
  windowWidth.value = window.innerWidth;
});

function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}



</script>