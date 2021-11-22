<template>
  <div>
    <!-- 영화 댓글 정보 -->
    <span v-if="movieComment.user" @click="moveToProfile">{{ movieComment.user.username }}</span> |
    <span :class="{ hidden: inUpdate }">{{ movieComment.content }}</span>
    <input :class="{ hidden: !inUpdate }" type="text" v-model="movieComment.content" @keyup.enter="updateMovieComment">
    <button
      v-if="movieComment.user && movieComment.user.username === username"
      @click="clickUpdate"
      :class="{ hidden: inUpdate }">수정</button>
    <button @click="updateMovieComment" :class="{ hidden: !inUpdate }">작성</button>
    <button
      v-if="movieComment.user && movieComment.user.username === username"
      @click="deleteMovieComment"
      :class="{ hidden: inUpdate }">삭제</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MovieComment',
  data: function () {
    return {
      inUpdate: false,
    }
  },
  props: {
    movieComment: Object
  },
  methods: {
    // 유저 프로필로 이동
    moveToProfile: function () {
      this.$router.push({ name: 'Profile', params: { userId: this.movieComment.user.id }})
    },
    clickUpdate: function () {
      this.inUpdate = true
    },
    updateMovieComment: function () {
      this.inUpdate = false
      this.$store.dispatch('updateMovieComment', this.movieComment)
    },
    deleteMovieComment: function () {
      // 해당 댓글 삭제
      this.$store.dispatch('deleteMovieComment', this.movieComment)
    }
  },
  computed: {
    ...mapState(['username',])
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}
</style>