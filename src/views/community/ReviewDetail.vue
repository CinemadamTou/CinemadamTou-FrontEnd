<template>
  <div>
    <h1>상세 리뷰</h1>
    <hr>
    <!-- 리뷰 상세 정보 -->
    <h2>{{ selectedReview.title }}</h2>
    <p
      v-if="selectedReview.user"
      @click="moveToProfile"
    >{{ selectedReview.user.username }}</p>
    <p v-if="selectedReview.movie">{{ selectedReview.movie.title }}</p>
    <p>{{ selectedReview.content }}</p>
    <p>{{ selectedReview.created_at }}</p>
    <p>{{ selectedReview.updated_at }}</p>
    <hr>
    <!-- 리뷰 수정, 삭제 -->
    <button
      v-if="selectedReview.user && selectedReview.user.username === username"
      @click="moveToUpdate">수정</button>
    <button
      v-if="selectedReview.user && selectedReview.user.username === username"
      @click="deleteReview">삭제</button>
    <!-- 리뷰 좋아요 -->
    <div v-if="selectedReview.user && selectedReview.user.username !== username">
      <button
        v-if="!selectedReview.like_users.includes(user.id)"
        @click="reviewLike"
      >좋아요</button>
      <button
        v-if="selectedReview.like_users.includes(user.id)"
        @click="reviewLike"
      >좋아요 취소</button>
    </div>
    <hr>
    <!-- 댓글 작성 -->
    <label for="comment">내용 : </label>
    <input type="text" id="comment" v-model="newReviewComment.content" @keyup.enter="createReviewComment">
    <button @click="createReviewComment">댓글 작성</button>
    <hr>
    <!-- 댓글 목록 -->
    <review-comment
      v-for="reviewComment in reviewComments"
      :key="reviewComment.id"
      :reviewComment="reviewComment"
    >
    </review-comment>
  </div>
</template>

<script>
import ReviewComment from '@/components/community/ReviewComment.vue'
import { mapState } from 'vuex'

export default {
  name: 'ReviewDetail',
  data: function () {
    return {
      newReviewComment: {
        reviewId: null,
        content: null,
      },
    }
  },
  components: {
    ReviewComment,
  },
  methods: {
    // 유저 프로필로 이동
    moveToProfile: function () {
      this.$router.push({ name: 'Profile', params: { userId: this.selectedReview.user.id }})
    },
    // 리뷰 좋아요
    reviewLike: function () {
      this.$store.dispatch('reviewLike', this.$route.params.reviewId)
    },
    moveToUpdate: function () {
      // 리뷰 수정 폼으로 route
      this.$router.push({ name: 'ReviewUpdate', params: { reviewId: this.$route.params.reviewId }})
    },
    deleteReview: function () {
      // 해당 리뷰 삭제
      this.$store.dispatch('deleteReview', this.selectedReview.id)
      // 리뷰 목록으로 route
      this.$router.push({ name: 'ReviewList' })
    },
    createReviewComment: function () {
      // comment 가 비어있을 경우 alert
      this.newReviewComment.reviewId = this.selectedReview.id
      if (this.newReviewComment.content) {
        this.$store.dispatch('createReviewComment', this.newReviewComment)
      } else {
        alert('댓글을 작성해주세요.')
      }
      this.newReviewComment.content = null
    },
  },
  created: function () {
    // 리뷰 상세 정보 불러오기
    this.$store.dispatch('loadReviewDetail', this.$route.params.reviewId)
    // 리뷰 댓글 목록 불러오기
    this.$store.dispatch('loadReviewComments', this.$route.params.reviewId)
  },
  computed: {
    ...mapState(['user', 'username', 'selectedReview', 'reviewComments',]),
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}
</style>