<template>
  <div>
    <!-- 로그인 폼 -->
    <div class="mx-auto loginform">
      <p style="font-size: x-large; margin-bottom: 3rem;"><span class="spread-underline">로그인</span></p>
      <v-text-field
        label="아이디"
        id="username"
        v-model="credentials.username"
      ></v-text-field>
      <v-text-field
        class="mb-5"
        type="password"
        id="password"
        label="비밀번호"
        v-model="credentials.password"
        @keyup.enter="login"
      ></v-text-field>
      <v-btn
        class="ma-1"
        color="error"
        plain
        @click="login"
      >login
      </v-btn>
      <v-btn
        class="ma-1"
        color="error"
        plain
        @click="moveToSignup"
      >signup
      </v-btn>
    </div>
    <div @click="alertmsg=false" v-if="alertmsg" style="margin-right: 40rem; margin-left: 40rem; margin-top: 10rem; cursor: pointer">
      <v-alert
        color="red"
        type="error"
      >
        아이디와 비밀번호를 정확히 입력해 주세요
      </v-alert>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
      },
      alertmsg: false,
    }
  },
  methods: {
    login: function () {
      this.$store
      .dispatch('login', this.credentials)
      .then(() => {
        this.$router.push({ name: 'Home' })
        this.alertmsg = false
      })
      .catch(() => {
        this.alertmsg = true
      })
    },
    moveToSignup: function () {
      this.$router.push('Signup')
    },
  }
}
</script>

<style>
.loginform {
  padding: 3rem;
  width: 30%;
  margin-top:
  10rem;
  box-shadow: 0 5px 10px -3px rgba(0,0,0,1);
  border-radius: 10px;
  background-color: #FFFFEF;
}
.loginform:hover .spread-underline:after {
  width: 100%; 
  left: 0; 
}
.spread-underline {
  color: #333;
  text-decoration: none;
  display: inline-block;
  padding: 10px 0;
  position: relative;
}
.spread-underline:after {
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 1px;
  left: 50%;
  position: absolute;
  background: black;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
  transition:all .8s;
}
</style>