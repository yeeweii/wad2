<template>

<v-layout :full-height="true">
    <AppBar />
    <Register />
    <!-- <Footer /> -->
  </v-layout>

 </template>
 <script setup>
  import AppBar from "@/components/LoginFeatures/AppBar.vue"
   import Register from "@/components/Forms/RegForm.vue"
 </script>