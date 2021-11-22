<template>
  <div>
    <h2>회원가입</h2>
    <hr>
    <!-- 회원가입 폼 -->
    <div>
      <label for="username">아이디 : </label>
      <input
        type="text"
        id="username"
        v-model="credentials.username"
      >
    </div>
    <div>
      <label for="password">비밀번호 : </label>
      <input
        type="password"
        id="password"
        v-model="credentials.password"
      >
    </div>
    <div>
      <label for="passwordConfirmation">비밀번호 확인 : </label>
      <input
        type="password"
        id="passwordConfirmation"
        @keyup.enter="signup"
        v-model="credentials.passwordConfirmation"
      >
    </div>
    <button @click="signup">회원가입</button>
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
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>