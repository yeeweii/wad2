<template>

        <section class="page-section bg-about" id="about">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 id="header" class="text-white mt-0">What is Pharma-Save?</h2>
                        <hr id="line" class="divider divider-light" />
                        <p id="text1" class="text-white-75 mb-4">Pharma-Save is a new Platform, for users to be able to promote sustainability in the pharmaceutical field, and donate medication
                            to those in need
                        </p>
                        <v-btn id="btn" :cols="4" :rounded="4" :elevation="10" :ripple="true" href="#services">Services</v-btn>
                    </div>
                </div>
            </div>
        </section>

</template>

<script>

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";



export default {
    data() {
        return {
            
        }
    },
    mounted() {
        gsap.registerPlugin(ScrollTrigger);
        let header = document.getElementById('header');
        let text1 = document.getElementById('text1');
        let line = document.getElementById('line');
        let btn = document.getElementById('btn');

        gsap.to(header, {opacity: 0, x: -50,});
        gsap.to(text1, {opacity: 0, x: 50});
        gsap.to(line, {opacity: 0});
        gsap.to(btn, {opacity: 0, y: 50})

        const ScrollDownTrigger = {
                trigger: "#about",
                start: "top center",
                end: "bottom bottom",
                scrub: true,
             
            }


        const ScrollUpTrigger = {
            trigger: "#about",
            start: "bottom bottom",
            end: "top center",
            scrub: true,
            
        }

        gsap.timeline({
            scrollTrigger: ScrollDownTrigger
        })
        .to(header, {opacity : 1, x : 0, duration: 3, ease: "power1.inOut"})
        .to(text1, {opacity : 1, x : 0, duration: 3, ease: "power1.inOut"})
        .to(line, {opacity: 1, duration: 3, ease: "power1.inOut"})
        .to(btn, {opacity: 1, y : 0, duration: 3, ease: "power1.inOut"})
        // .to(header, {opacity: 0, x: -100, duration: 2})
        // .to(text1, {opacity: 0, x: 100, duration: 2})
        // .to(line, {opacity: 0, duration: 2}) 
        // .to(btn, {opacity: 0, y: 100, duration: 2})
        

        // gsap.timeline({
        //     scrollTrigger: ScrollUpTrigger
        // })
        // .to(header, { opacity: 0, x: -100, duration: 20 }) 
        // .to(text1, { opacity: 0, x: 100, duration: 20 }) 
        // .to(line, { opacity: 0, duration: 20 }) 
        // .to(btn, { opacity: 0, y: 100, duration: 20 }) 
        // .to(header, {opacity : 1, x : 0, duration: 20})
        // .to(text1, {opacity : 1, x : 0, duration: 20})
        // .to(line, {opacity: 1, duration: 20})
        // .to(btn, {opacity: 1, y : 0, duration: 20})

    }
}

</script>

<style scoped>

</style>