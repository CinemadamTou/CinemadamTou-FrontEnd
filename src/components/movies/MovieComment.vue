<template>
  <div class="row">
    <!-- 영화 댓글 정보 -->
    <div class="col-2 text-center">
      <span v-if="movieComment.user" @click="moveToProfile" style="cursor:pointer;">{{ movieComment.user.username }} </span>
    </div>
    <div class="col-1">:</div>
    <div class="col-7 text-start">
      <span :class="{ hidden: inUpdate }">{{ movieComment.content }}</span>
      <input
        :class="{ hidden: !inUpdate }"
        type="text"
        v-model="movieComment.content"
        @keyup.enter="updateMovieComment"
      >
    </div>
    <div class="col-1 text-end">
      <button
          plain
          :class="{ hidden: !inUpdate }"
          @click="updateMovieComment"
        ><font-awesome-icon :icon="['fas', 'check']" :style="{ color: 'black' }" />
      </button>
      <button
        v-if="movieComment.user && movieComment.user.username === username"
        @click="clickUpdate"
        :class="{ hidden: inUpdate }"><font-awesome-icon :icon="['fas', 'pen']" :style="{ color: 'black' }" /></button>
    </div>
    <div class="col-1 text-center">
      <button
      v-if="movieComment.user && movieComment.user.username === username"
      @click="deleteMovieComment"
      :class="{ hidden: inUpdate }"><font-awesome-icon :icon="['fas', 'trash-alt']" :style="{ color: 'red' }" /></button>
    </div>
    <v-divider></v-divider>
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