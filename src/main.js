import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Tinder from 'vue-tinder'
import vuetify from './plugins/vuetify'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faUserCheck, faBars, faHeart, faTimes, faPen, faCheck, faTrashAlt, faHeartBroken, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import AOS from 'aos'
import "aos/dist/aos.css"
import { VueMasonryPlugin } from 'vue-masonry'


library.add(faUser, faUserCheck, faBars, faHeart, faTimes, faPen, faCheck, faTrashAlt, faHeartBroken, faBookmark)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueMasonryPlugin)
Vue.use(Tinder)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  created() {
    AOS.init();
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
