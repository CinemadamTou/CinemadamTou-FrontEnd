<template>
  <div id="app">
    <v-sheet
      class="overflow-hidden"
      style="position: relative;"
    >
      <div v-if="inResult" class="v-overlay__scrim" style="opacity: 0.7; background-color: rgb(0, 0, 0); border-color: rgb(33, 33, 33); z-index: 100;"></div>
      <div style="margin-left: 5rem; margin-right: 5rem; margin-top: 1rem;">
        <v-row
          align="center"
          justify="center"
        >
          <span id="nav" class="d-flex justify-content-between align-items-center p-0">
            <span>
              <router-link class="mx-3" :to="{ name: 'Home' }"><h3>씨네마담뚜</h3></router-link>
            </span>
            <span v-if="isLogin" class="mt-2" style="font-size: medium;">
              <router-link class="mx-5" :to="{ name: 'MovieList' }">MOVIE</router-link>
              <router-link class="mx-5" :to="{ name: 'ReviewList', params: { page: 1 }}">REVIEW</router-link>
              <router-link class="mx-5" :to="{ name: 'MovieTinder' }">RECOMMEND</router-link>
            </span>

            <span>
              <!-- 로그인 되어있을 경우 -->
              <span v-if="isLogin">
                <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                  <template #button-content>
                    <font-awesome-icon :icon="['fas', 'user-check']" :style="{ color: 'black' }" />
                  </template>
                  <b-dropdown-item>
                    <router-link :to="{ name: 'Profile', params: { userId: user.id }}">
                      <div style="margin: -4px -16px; padding: 4px 16px">PROFILE</div>
                    </router-link>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <router-link to="#" @click.native="logout">
                      <div style="margin: -4px -16px; padding: 4px 16px">LOGOUT</div>
                    </router-link>
                  </b-dropdown-item>
                </b-dropdown>
              </span>
              <!-- 로그인 되어있지 않을 경우 -->
              <span v-else>
                <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
                  <template #button-content>
                    <font-awesome-icon :icon="['fas', 'user']" :style="{ color: 'black' }" />
                  </template>
                  <b-dropdown-item>
                    <router-link :to="{ name: 'Login' }">
                      <div style="margin: -4px -16px; padding: 4px 16px">LOGIN</div>
                    </router-link>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <router-link :to="{ name: 'Signup' }">
                      <div style="margin: -4px -16px; padding: 4px 16px">SIGNUP</div>
                    </router-link>
                  </b-dropdown-item>
                </b-dropdown>
              </span>
              <v-btn
                color="pink"
                text
                @click.stop="drawer = !drawer"
              >
                <font-awesome-icon :icon="['fas', 'bars']" :style="{ color: 'black' }" />
              </v-btn>
            </span>
          </span>
        </v-row>
        <v-snackbar
          v-if="user.best_genres"
          style="margin-bottom: 16rem;"
          v-model="inResult"
          multi-line
          timeout="-1"
          color="#d7e2f7"
          tile
        ><div style="padding: 1rem; margin-left: 5rem; margin-right: 5rem;">
            <h1 class="text-center" style="font-size: 300%; color: black; margin-left:1rem; margin-right: 2rem; margin-bottom: 6rem;"><span style="padding-right:130px;">{{ user.username }} 님의</span><br>
            <span style="padding-left:90px">취향 분석 결과</span></h1>
            <p class="text-center" style="font-size: 150%; color: black;" v-if="user.best_genres[0]">선호 장르 1순위는 <span style="font-weight: 800;">{{ user.best_genres[0].name }}</span>, 2순위는 <span style="font-weight: 800;">{{ user.best_genres[1].name }}</span> 입니다.</p>
            <div class="text-center" style="margin-top: 8rem;">
              <v-btn
                @click="inResult = false"
                elevation="2"
                color = "#6d6692"
                style="padding-left: 2rem; padding-right: 2rem;"
              >닫기</v-btn>
            </div>
          </div>
        </v-snackbar>
        <router-view/>
        <v-footer
          v-if="!inRecommend"
          padless
          color="#FFFFFF"
          style="margin-top: 10rem;"
          
        >
          <v-col
            class="text-center"
            cols="12"
          >
            <a href="" class="text-decoration-none px-2" style="color: #c7c7c7; font-size: 11px;">소개</a>
            <span style="color: #c7c7c7; font-size: 11px;">·</span>
            <a href="https://vuetifyjs.com/en/" class="text-decoration-none px-2" style="color: #c7c7c7; font-size: 11px;">Vuetify</a>
            <span style="color: #c7c7c7; font-size: 11px;">·</span>
            <a href="https://shanlh.github.io/vue-tinder/" class="text-decoration-none px-2" style="color: #c7c7c7;font-size: 11px;">Vue Tinder</a>
            <span style="color: #c7c7c7; font-size: 11px;">·</span>
            <a href="https://developers.themoviedb.org/3" class="text-decoration-none px-2" style="color: #c7c7c7;font-size: 11px;">TMDB API</a>
            <span style="color: #c7c7c7; font-size: 11px;">·</span>
            <a href="" class="text-decoration-none px-2" style="color: #c7c7c7;font-size: 11px;">GitHub</a>
            <span style="color: #c7c7c7; font-size: 11px;">·</span>
            <a href="" class="text-decoration-none px-2" style="color: #c7c7c7;font-size: 11px;">GitHub</a>
            <span style="color: #c7c7c7; font-size: 11px;">·</span>
            <a href="https://github.com/snowwhitewolf" class="text-decoration-none px-2" style="color: #c7c7c7;font-size: 11px;">Snowwhite GitHub</a>
            <p class="my-3" style="color: #8e8e8e;font-size: 12px;">Copyright © {{ new Date().getFullYear() }} LJH.co.Ltd All rights reserved.</p>
          </v-col>
        </v-footer>
      </div>

      <v-navigation-drawer
        height="100%"
        v-model="drawer"
        absolute
        temporary
        right
        disable-route-watcher
      >
        <v-list-item style="margin-top: 16px; padding-left: 2rem; padding-right: 2rem;">
          <router-link :to="{ name: 'Profile', params: { userId: user.id }}">
            <v-list-item-avatar>
              <v-avatar size="36px" style="filter: drop-shadow(1px 1px 1px black); margin-right: .5rem;">
                <img
                  v-if="imgUrl"
                  :src="imgUrl"
                  :alt="user.username"
                >
              </v-avatar>
            </v-list-item-avatar>
          </router-link>

          <v-list-item-content>
            <v-list-item-title>{{ username }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <hr class="mx-3">

        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <div style="margin-bottom: 0rem;"></div>
                <router-link class="drawer-text fs-6" :to="{ name: 'Home' }">HOME</router-link>
                <div style="margin-bottom: 2rem;"></div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <router-link class="drawer-text fs-6" :to="{ name: 'MovieList' }">MOVIE</router-link>
                <div style="margin-bottom: 2rem;"></div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <router-link class="drawer-text fs-6" :to="{ name: 'ReviewList', params: { page: 1 }}">REVIEW</router-link>
                <div style="margin-bottom: 2rem;"></div>
                
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <router-link class="drawer-text fs-6" :to="{ name: 'MovieTinder' }">RECOMMEND</router-link>
                <div style="margin-bottom: 2rem;"></div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </div>
</template>

<script>
import Vue from 'vue';
import VueCarousel from 'vue-carousel';
import VueStar from 'vue-star'
import { mapGetters, mapState } from 'vuex';
Vue.component('VueStar', VueStar)
Vue.use(VueCarousel);

export default {
  name: 'App',
  data () {
      return {
        drawer: null,
        inRecommend: false,
        inResult: false,
      }
    },
  methods: {
    // 로그아웃
    logout: function () {
      this.$store
      .dispatch('logout')
      .then(() => {
        this.$router.push({ name: 'Login' })
      })
    },
  },
  created: function () {
    // JWT 토큰이 유효하다면 사용자 이름 설정
    if (localStorage.getItem('JWT')) {
      this.$store.dispatch('setUsername')
    }
  },
  watch: {
    $route (to, from) {
      if (document.location.pathname === '/movies/tinder') {
        this.inRecommend = true
      } else {
        this.inRecommend = false
      }
      if (from.name === 'MovieTinder' && to.name === 'Profile') {
        this.inResult = true
      } else {
        this.inResult = false
      }
    }
  },
  computed: {
    imgUrl () {
      return `http://127.0.0.1:8000${this.user.img}`
    },
    ...mapState(['user', 'username', '']),
    ...mapGetters(['isLogin','tinderMovies']),
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');

@font-face {
  font-family: 'GowunDodum-Regular';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunDodum-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  unicode-range: U+AC00-D7A3;
}

@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  unicode-range: U+0030-0039;
}

#app {
  font-family: 'GowunDodum-Regular', 'Pretendard-Regular', 'Work Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  /* font-weight: bold; */
  color: #2c3e50;
  text-decoration: none;
}

.drawer-text {
  color: #2c3e50;
  text-decoration: none;
}
</style>
