import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labs from 'vuetify/labs/components'

export default defineNuxtPlugin(nuxtApp => {
	const vuetifyLabs = createVuetify({
		directives,
		components: {
			...labs,
			...components
		}
	})
	nuxtApp.vueApp.use(vuetifyLabs)
})