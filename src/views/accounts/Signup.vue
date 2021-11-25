<template>
  <div>
    <!-- 회원가입 폼 -->
    <div class="mx-auto signupform">
      <p style="font-size: x-large; margin-bottom: 2.5rem;"><span class="spread-underline">회원가입</span></p>
      <v-text-field
        label="아이디"
        id="username"
        v-model="credentials.username"
      ></v-text-field>
      <v-text-field
        type="password"
        id="password"
        label="비밀번호"
        v-model="credentials.password"
        @keyup.enter="login"
      ></v-text-field>
      <v-text-field
        type="password"
        id="passwordConfirmation"
        @keyup.enter="signup"
        label="비밀번호 확인"
        v-model="credentials.passwordConfirmation"
      ></v-text-field>
      <v-btn
        class="mt-5 ma-1"
        color="error"
        plain
        @click="signup"
      >signup
      </v-btn>
      <v-btn
        class="mt-5 ma-1"
        color="error"
        plain
        @click="moveToLogin"
      >login
      </v-btn>
    </div>
    <div 
      v-if="alertmsg"
      @click="alertmsg=false"
      style="margin-right: 40rem; margin-left: 40rem; margin-top: 6rem; cursor: pointer"
    >
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
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
        passwordConfirmations: '',
      },
      alertmsg: false,
    }
  },
  methods: {
    // 회원가입
    signup: function () {
      this.$store
      .dispatch('signup', this.credentials)
      .then(() => {
        // 로그인 화면으로 route
        this.$router.push({ name: 'Login' })
      })
      .catch(() => {
        this.alertmsg = true
        setTimeout(function(){
          this.alertmsg = false
        }, 500);
      })
    },
    moveToLogin: function () {
      this.$router.push('Login')
    },
  }
}
</script>

<style>
.signupform {
  padding: 3rem;
  width: 30%;
  margin-top:
  10rem;
  box-shadow: 0 5px 10px -3px rgba(0,0,0,1);
  border-radius: 10px;
  background-color: #FFFFEF;
}
.signupform:hover .spread-underline:after {
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