import data from './static/storedata.json'

let dynamicRoutes = () => {
  return new Promise(resolve => {
    resolve(data.map(el => `product/${el.id}`))
  })
}


export default {
  // mode: 'universal',
  target: 'static',
  ssr: false,
  server: {
    port: 8000, // default: 3000
    //host: '0.0.0.0', // default: localhost,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Subangbang Store' || 'Subangbang' || '素邦邦',
    script: [{ src: 'https://js.stripe.com/v3/' }],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '素邦邦 - 素食者的烏托邦' || '到處都是隨手可吃的食材、調味料、美食，再也不用在包裝上找"素食"兩個字。'
      },
	  {
		name: 'baidu-site-verification', 
		content: 'code-lqL5VKUtDw',
		once: true
	  }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Montserrat:300,600|PT+Serif&display=swap'
      }
    ]
  },
  generate: {
    routes: dynamicRoutes,
	fallback: true
  },
  /*
   ** Customize the progress-bar color
   */
  //loading: '~/components/AppLoadingbar.vue',
  loading: { 
	color: '#07c160',
    height: '3px',
	continuous: true 
	},
  /*
   ** Global CSS
   */
  css: ['normalize.css', { src: '~/assets/main.scss', lang: 'sass' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/currency-filter.js', '~/plugins/graphcms.js', {src: '@/plugins/vant-ui', ssr: true}],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
	config.node = {
            fs: 'empty'
        }
    }
  },
  pwa: {
	  icon: {
		// Icon options
	  },
	  manifest: {
		lang: 'zh-Hans',
		name: "素邦邦 - SuBangBang Stroe",
		short_name: "SuBangBang",
	  },
	  workbox: {
		// Workbox options

	  }
  }	
}
