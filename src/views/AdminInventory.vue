<template >
<v-app>
    <Loading />
    <Medication />
    <Footer  />
    
</v-app>

</template>

<script>

import Medication from "@/components/Medication/Inventory.vue"
import Footer from "@/components/Footer/footer.vue"
import Loading from "@/components/Loading/Loading.vue"

export default {
    components: {
        Medication,
        Footer,
    },
  }
</script>