/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCapsules, faClock } from '@fortawesome/free-solid-svg-icons';
library.add(faCapsules, faClock);

// Plugins
import { registerPlugins } from '@/plugins'

import '@/styles/styles.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@/js/scripts'
import 'axios'
import VueGoogleMaps from '@fawmi/vue-google-maps'
// import { VueWriter } from "vue-writer"
import { gsap } from "gsap"
import { Power1 } from "gsap"

gsap.registerPlugin(Power1);






const app = createApp(App).use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyChoB7acH7atO-TI5G4LGb0jqQY7CPS8AY',
        libraries: 'places',
        callback : 'initMap',
        v: 'weekly',
    }
})


registerPlugins(app)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
