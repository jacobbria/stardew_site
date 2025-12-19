// Vuetify plugin setup for Vue 3
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'woodTheme',
    themes: {
      woodTheme: {
        dark: false,
        colors: {
          primary: '#c8ad7f96', // tan/wood

        },
      },
    },
  },
})
