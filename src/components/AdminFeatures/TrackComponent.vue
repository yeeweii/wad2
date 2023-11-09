<template>
<section class="bg-services" id="services">
    <div class="container">
        <h2 class="text-center mt-0 text-white fw-bold">Webpages Statuses</h2>
        <div class="row ">
            <div id="dataTable" class="col-12 col-sm-12 text-center">
                <v-data-table 
                    :hover = true
                    :group-by="groupBy"
                    :headers="headers"
                    :items="links"
                    :sort-by="sortBy"
                    class="elevation-1 mt-4"
                    item-value="name"
                ></v-data-table>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from 'axios'
  export default {
    data: () => ({
      sortBy: [{ key: 'name', order: 'asc' }],
      groupBy: [{ key: 'user', order: 'asc' }],
      headers: [
        {
          title: 'URLs',
          align: 'start',
          key: 'name',
          groupable: false,
        },
        { title: 'Status', key: 'status', align: 'end' },
        { title: 'User', key: 'user', align: 'end' },
      ],
      webpageStatuses: {},
      links: [
        {
          name: 'HomeAdmin',
          url:  'http://localhost:3000/src/views/HomeAdmin.vue',
          status: '',
          user: 'Admin',
        },
        {
          name: 'Medication Inventory',
          url: 'http://localhost:3000/src/views/AdminInventory.vue',
          status: '',
          user: 'Admin',
        },
        {
          name: 'User DataBase',
          url: 'http://localhost:3000/src/views/DataBase.vue',
          status: '',
          user: 'Admin',
        },
        {
          name: 'Home',
          url: 'http://localhost:3000/src/views/HomePage.vue',
          status: '',
          user: 'Regular'
        },
        {
          name: 'Apply Medicine',
          url: 'http://localhost:3000/src/views/Donate.vue',
          status: '',
          user: 'Regular',
        },
        {
          name: 'Donate Medicine',
          url: 'http://localhost:3000/src/views/Donate.vue',
          status: '',
          user: 'Regular',
        },
        {
          name: 'Help and FAQ',
          url:  'http://localhost:3000/src/views/FAQ.vue',
          status: '',
          user: 'Regular',
        },
        {
          name: 'Statistics',
          url: 'http://localhost:3000/src/views/Stats.vue',
          status: '',
          user: 'Regular',
        },
        {
          name: 'Settings',
          url: 'http://localhost:3000/src/views/Stats.vue',
          status: '',
          user: 'Regular'
        },
        {
          name: 'Login',
          url: 'http://localhost:3000/src/views/Login.vue',
          status: '',
          user: 'Regular'
        },
        {
          name: 'Register',
          url: 'http://localhost:3000/src/views/Register.vue',
          status: '',
          user: 'Regular'
        },
        {
          name: 'Forget Password',
          url: 'http://localhost:3000/src/views/ForgotPw.vue',
          status: '',
          user: 'Regular'
        },
      ],
    }),
    methods: {
        async checkWebpageStatus() {
        for (const link of this.links) {
            try {
                const response = await axios.head(link.url);
                link.status = response.status;
            }
            catch (error) {
                link.status = 'Error: ' + error;
            }
        }
    },
        async animateTracking() {
          gsap.registerPlugin(ScrollTrigger);
          const data = document.getElementById("dataTable");

          gsap.to(data, {opacity: 0, y: -150, scale: 0})
          const triggerPoint = {
          trigger: '#dataTable',
          start: "top 70%", // Adjust as needed
          end: "top 30%", // Adjust as needed
          scrub: true,
        };

        // Set up the animation for rotation
        gsap.timeline(data, {
          scrollTrigger: triggerPoint,
          toggleActions: "play reset play none" 
        })
        .to(data, {
          opacity: 1,
          y: 0,
          duration: 3,
          ease: "power1.inOut",
          scale: 1,
        });

        // Set the initial state (rotated and scaled)
        // gsap.set(data, { rotation: -90, scale: 0.2, duration: 20});
      }
    },
    mounted() {
    this.checkWebpageStatus();
    this.animateTracking();
  },
  }
</script>
