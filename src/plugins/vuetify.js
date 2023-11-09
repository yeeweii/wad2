/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import  colors  from 'vuetify/lib/util/colors'
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        colors: {
          primary: '#EC407A',
          secondary: '#1E88E5',
        },
      },
      dark: {
        primary: '#2196F3',
        secondary: '#616161',
        accent: '#FF4081',
      },
    },
  },
  VBtn: {
    color: 'primary',
    variant: 'outlined',
    rounded: true,
  },
  icons: {
    defaultSet: 'mdi',
  },
  components: {
    ...components,
    ...labsComponents,
    ...colors,
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
  },
  customDarkTheme: {
    dark: true,
    colors: {
      background: "#15202b",
      surface: "#15202b",
      primary: "#3f51b5",
      secondary: "#03dac6",
      error: "#ff5722",
    },
  },
  
  customLightTheme: {
    dark: false,
    colors: {
      background: "#eee",
      surface: "#15202b",
      primary: "#3f51b5",
      secondary: "#00ccff",
      error: "#ffcc00",
    },
  }
})
