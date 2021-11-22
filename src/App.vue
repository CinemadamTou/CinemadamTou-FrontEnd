<template>
  <div id="app">
    <v-sheet
      class="overflow-hidden"
      style="position: relative;"
    >
      <v-container>
        <v-row
          align="center"
          justify="center"
        >
          <span id="nav" class="d-flex justify-content-between align-items-center p-0">
            <span>
              <router-link class="mx-3" :to="{ name: 'Home' }"><h3>Logo</h3></router-link>
            </span>
            <span class="ms-4 mt-2">
              <router-link class="mx-3" :to="{ name: 'MovieList' }">MovieList</router-link>
              <router-link class="mx-3" :to="{ name: 'ReviewList', params: { page: 1 }}">Review</router-link>
              <router-link class="mx-3" :to="{ name: 'MovieTinder' }">Secret</router-link>
            </span>

            <span>
              <!-- 로그인 되어있을 경우 -->
              <span v-if="isLogin">
                <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
                  <template #button-content>
                    <font-awesome-icon :icon="['fas', 'user-check']" :style="{ color: 'black' }" />
                  </template>
                  <b-dropdown-item href="#"><router-link :to="{ name: 'Profile', params: { userId: user.id }}">Profile</router-link></b-dropdown-item>
                  <b-dropdown-item href="#"><router-link to="#" @click.native="logout">LogOut</router-link></b-dropdown-item>
                </b-dropdown>
              </span>
              <!-- 로그인 되어있지 않을 경우 -->
              <span v-else>
                <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
                  <template #button-content>
                    <font-awesome-icon :icon="['fas', 'user']" :style="{ color: 'black' }" />
                  </template>
                  <b-dropdown-item href="#"><router-link :to="{ name: 'Login' }">Login</router-link></b-dropdown-item>
                  <b-dropdown-item href="#"><router-link :to="{ name: 'Signup' }">Signup</router-link></b-dropdown-item>
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
          <!-- <router-view/> -->
          <!-- <v-footer
            padless
            color="#FFFFFF"
            class="mt-5"
          >
            <v-col
              class="text-center"
              cols="12"
            >
              <p>by 재희</p>
              <p>by 종현</p>
              <v-divider></v-divider>
              {{ new Date().getFullYear() }} — <strong>Logo</strong>
            </v-col>
          </v-footer> -->
        </v-row>
      </v-container>

      <v-navigation-drawer
        height="100%"
        v-model="drawer"
        absolute
        temporary
        right
        disable-route-watcher
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="imgUrl"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ username }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item>
            <!-- <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon> -->
            <v-list-item-content>
              <v-list-item-title>
                <router-link class="mx-3 drawer-text" :to="{ name: 'MovieList' }">MovieList</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <router-link class="mx-3 drawer-text" :to="{ name: 'ReviewList', params: { page: 1 }}">Review</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <router-link class="mx-3 drawer-text" :to="{ name: 'MovieTinder' }">Movie Tinder</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>

    <router-view/>
    <v-footer
      padless
      color="#FFFFFF"
      class="mt-5"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <p>by 재희</p>
        <p>by 종현</p>
        <v-divider></v-divider>
        {{ new Date().getFullYear() }} — <strong>Logo</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import Vue from 'vue';
import VueCarousel from 'vue-carousel';
import { mapGetters, mapState } from 'vuex';

Vue.use(VueCarousel);

export default {
  name: 'App',
  data () {
      return {
        drawer: null,
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
    // this.$router.push({ name: 'Home' })
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  computed: {
    imgUrl () {
      return `http://127.0.0.1:8000${this.user.img}`
    },
    ...mapState(['user', 'username']),
    ...mapGetters(['isLogin']),
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
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
