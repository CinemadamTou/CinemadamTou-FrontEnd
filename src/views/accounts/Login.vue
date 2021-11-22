<template>
  <div>
    <h2>로그인</h2>
    <hr>
    <!-- 에러 메세지 표시 -->
    <div v-if="errMsg">{{ errMsg }}</div>
    <!-- 로그인 폼 -->
    <div>
      <label for="username">아이디 : </label>
      <input
       type="text"
       id="username"
       v-model="credentials.username"
      >
    </div>
    <div>
      <label for="username">비밀번호 : </label>
      <input
       type="password"
       id="password"
       v-model="credentials.password"
       @keyup.enter="login"
      >
    </div>
    <button @click="login">로그인</button>
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
      errMsg: '',
    }
  },
  methods: {
    login: function () {
      this.$store
      .dispatch('login', this.credentials)
      .then(() => {
        this.$router.push({ name: 'MovieList' })
      })
      .catch(err => {
        this.errMsg = err.response.data.detail
      })
    },
  }
}
</script>