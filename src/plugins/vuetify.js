/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          //primary: '#19376D',
          primary:'ff6000',
          secondary: '#576CBC',
          body:'#A5D7E8',
          title:'#0B2447'
        },
      },
    },
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
})
