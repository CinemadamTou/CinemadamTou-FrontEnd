<template>
  <div class="row">
    <!-- 리뷰 댓글 정보 -->
    <div class="col-2 text-center">
      <span v-if="reviewComment.user" @click="moveToProfile" style="cursor:pointer;">{{ reviewComment.user.username }} </span>
    </div>
    <div class="col-1">:</div>
    <div class="col-7 text-start">
      <span :class="{ hidden: inUpdate }">{{ reviewComment.content }}</span>
      <input
        :class="{ hidden: !inUpdate }"
        type="text"
        v-model="reviewComment.content"
        @keyup.enter="updateReviewComment"
      >
    </div>
    <div class="col-1 text-end">
      <button
          plain
          :class="{ hidden: !inUpdate }"
          @click="updateReviewComment"
        ><font-awesome-icon :icon="['fas', 'check']" :style="{ color: 'black' }" />
      </button>
      <button
        v-if="reviewComment.user && reviewComment.user.username === username"
        @click="clickUpdate"
        :class="{ hidden: inUpdate }"><font-awesome-icon :icon="['fas', 'pen']" :style="{ color: 'black' }" /></button>
    </div>
    <div class="col-1 text-center">
      <button
      v-if="reviewComment.user && reviewComment.user.username === username"
      @click="deleteReviewComment"
      :class="{ hidden: inUpdate }"><font-awesome-icon :icon="['fas', 'trash-alt']" :style="{ color: 'red' }" /></button>
    </div>
    <v-divider></v-divider>
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