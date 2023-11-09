<template>

    <section class="page-section bg-services" id="services">
            <div class="container px-4 px-lg-5">
                <h2 class="text-center mt-0 text-white fw-bold" id="head">Services and Features</h2>
                <div class="row gx-4 gx-lg-5">
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5" id="card1">
                        <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                            <v-card elevation="2" height="250" class="transparent-card"
                            :color="isHovering ? 'blue' : undefined">
                                <div class="mb-2"><v-icon icon="mdi-medication" color="primary"></v-icon></div>
                                <h3 class="h4 mb-2 text-white">Apply Medication</h3>
                                <p class="text-white-50 mb-0">Apply and Request for Disposable Pharmaceuticals and Medications</p>
                                <router-link :to="{name:'Application'}" @click="scrollToTop"><v-btn elevation="2" color="primary" class="mt-4" v-bind="props">Apply</v-btn></router-link>
                                <!-- <v-btn elevation="2" color="primary" class="mt-4" href="#">Apply</v-btn> -->
                            </v-card>
                            </template>
                        </v-hover>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5" id="card2">
                        <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                        <v-card elevation="2" height="250" class="transparent-card"
                        :color="isHovering ? 'blue' : undefined">
                            <div class="mb-2"><v-icon icon="mdi-gift" color="primary"></v-icon></div>
                            <h3 class="h4 mb-2 text-white">Donate Medication</h3>
                            <p class="text-white-50 mb-0">Medication unused and disposable can be donated.</p>
                            <router-link :to="{name:'Donate'}" @click="scrollToTop"><v-btn elevation="2" color="primary" class="mt-4" v-bind="props">Donate</v-btn></router-link>
                        </v-card>
                        </template>
                        </v-hover>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5" id="card3">
                        <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                        <v-card elevation="2" height="250" class="transparent-card"
                        :color="isHovering ? 'blue' : undefined">
                            <div class="mb-2"><v-icon icon="mdi-chart-pie" color="primary"></v-icon></div>
                            <h3 class="h4 mb-2 text-white">Statistics</h3>
                            <p class="text-white-50 mb-0">Find out more about the impact of disposing pharmaceuticals</p>
                            <router-link :to="{name:'Stats'}" @click="scrollToTop"><v-btn elevation="2" class="mt-4" color="primary" v-bind="props">View</v-btn></router-link>
                        </v-card>
                        </template>
                        </v-hover>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5" id="card4">
                        <v-hover>
                        <template v-slot:default="{ isHovering, props }">
                        <v-card 
                        elevated height="250" class="transparent-card"
                        :color="isHovering ? 'blue' :undefined">
                        <div class="mb-2" >
                            <v-icon icon="mdi-information" color="primary"> </v-icon>
                        </div>
                            <h3 class="h4 mb-2 text-white">Help / FAQ</h3>
                            <p class="text-white-50 mb-0">For those in need of help, or have any questions.</p>
                            <router-link :to="{name:'FAQ'}" @click="scrollToTop"><v-btn elevation="2" class="mt-4" color="primary" v-bind="props">Help</v-btn></router-link>
                            <!-- <v-btn elevation="2" class="mt-4" color="primary" href="#">Help</v-btn> -->
                        </v-card>
                        </template>
                        </v-hover>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default {
    mounted() {
        gsap.registerPlugin(ScrollTrigger);
        let card1 = document.getElementById('card1');
        let card2 = document.getElementById('card2');
        let card3 = document.getElementById('card3');
        let card4 = document.getElementById('card4');
        let header = document.getElementById('head');

        gsap.to(head, {opacity:0, y:100});
        gsap.to(card1, {opacity:0, x:-100});
        gsap.to(card2, {opacity:0, x:-100});
        gsap.to(card3, {opacity:0, x:-100});
        gsap.to(card4, {opacity:0, x:-100});
        

        const ScrollDownTrigger = {
            trigger: "#services",
            start: "top center",
            end: "bottom bottom",
            scrub: true,
        }

        const ScrollUpTrigger = {
            trigger: "#services",
            start: "bottom bottom",
            end: "top center",
            scrub: true,
        }

        gsap.timeline({
            scrollTrigger: ScrollDownTrigger
        })
        .to(header, {opacity:1, y:0, duration: 4,ease: "power1.inOut"})
        .to(card1, {opacity:1, x:0, duration: 4,ease: "power1.inOut"})
        .to(card2, {opacity:1, x:0, duration: 4,ease: "power1.inOut"})
        .to(card3, {opacity:1, x:0, duration: 4,ease: "power1.inOut"})
        .to(card4, {opacity:1, x:0, duration: 4,ease: "power1.inOut"})
        
    },
    methods: { 
    scrollToTop() {
    window.scrollTo(0,0);
    }
}
}

</script>
<style scoped>

.transparent-card {
    background-color: rgba(0, 0, 0, 0.5);
    flex-direction: column;
    display:flex;
    align-items: center;
    justify-content: center;
}


</style>