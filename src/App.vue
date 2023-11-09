<template>
  <router-view />
  <v-app></v-app>
</template>

<script setup>
  //  
  // import db from '@/components/firebaseInit';

  // export default {
  //   name: 'inventory',
  //   data (){
  //     return {
  //       medicine: []
  //     }
  //   },
  //   created(){
  //     db.collection('medicine').get().then
  //     (querySnapshot=>{
  //       querySnapshot.foreach(doc=>{

  //       })
  //     })
  //   }
  // }
</script>

<style scope>
.v-application__wrap {
  min-height: unset !important;
  max-height: 100vh !important;
}
</style>
