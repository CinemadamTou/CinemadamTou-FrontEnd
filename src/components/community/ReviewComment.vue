<template>
  <div>
    <!-- 리뷰 댓글 정보 -->
    <span v-if="reviewComment.user" @click="moveToProfile">{{ reviewComment.user.username }}</span> |
    <span :class="{ hidden: inUpdate }">{{ reviewComment.content }}</span>
    <input :class="{ hidden: !inUpdate }" type="text" v-model="reviewComment.content" @keyup.enter="updateReviewComment">
    <button
      v-if="reviewComment.user && reviewComment.user.username === username"
      @click="clickUpdate"
      :class="{ hidden: inUpdate }">수정</button>
    <button @click="updateReviewComment" :class="{ hidden: !inUpdate }">작성</button>
    <button
      v-if="reviewComment.user && reviewComment.user.username === username"
      @click="deleteReviewComment"
      :class="{ hidden: inUpdate }">삭제</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ReviewComment',
  data: function () {
    return {
      inUpdate: false,
    }
  },
  props: {
    reviewComment: Object
  },
  methods: {
    // 유저 프로필로 이동
    moveToProfile: function () {
      this.$router.push({ name: 'Profile', params: { userId: this.reviewComment.user.id }})
    },
    clickUpdate: function () {
      this.inUpdate = true
    },
    updateReviewComment: function () {
      this.inUpdate = false
      this.$store.dispatch('updateReviewComment', this.reviewComment)
    },
    deleteReviewComment: function () {
      // 해당 댓글 삭제
      this.$store.dispatch('deleteReviewComment', this.reviewComment)
    }
  },
  computed: {
    ...mapState(['username',]),
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}
</style>