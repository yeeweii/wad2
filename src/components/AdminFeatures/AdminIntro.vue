<template>

<header class="masthead">
    <div class="container px-4 px-lg-5 h-100">
        <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
            <div class="col-lg-8 align-self-end">
                <h1 class="text-white font-weight-bold"><VueWriter :array="['Pharma-Save Dashboard']"/></h1>
                <hr class="divider" />
            </div>
            <div class="col-lg-8 align-self-baseline">
                <font-awesome-icon :icon="['fas', 'capsules']" size="2xl" ref="capsuleIcon" color="white"/>
                <p class="text-white-75 mb-5">Welcome Admin User, these are the updates </p>
                <!-- <v-btn href="#about" color="primary">Find Out More</v-btn> -->
            </div>
        </div>
    </div>
    </header>

</template>

<script>
import VueWriter from "vue-writer"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { gsap, Power0 } from 'gsap';

export default {
    components: {
        VueWriter
    },
    mounted() {
        const capsuleIcon = this.$refs.capsuleIcon;

        // Create a GSAP animation for the capsule icon
        gsap.fromTo(
        capsuleIcon.$el,
        { x: -120}, // Initial position
        {
            x: 120, // Target position
            duration: 2, 
            ease: Power0.easeNone,
            yoyo: true, // Makes it go back and forth
            repeat: -1, // Repeats indefinitely
        }
        );
    }
}
</script>