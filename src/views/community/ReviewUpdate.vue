<template>
  <div>
    <h1>리뷰 수정</h1>
    <hr>
    <!-- 리뷰 수정 폼 -->
    <label for="title">제목 : </label>
    <input type="text" id="title" v-model="review.title" @keyup.enter="updateReview">
    <br>
    <p v-if="review.movie">{{ review.movie.title }}</p>
    <br>
    <label for="content">내용 : </label>
    <input type="text" id="content" v-model="review.content" @keyup.enter="updateReview">
    <button @click="updateReview">수정</button>
  </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'ReviewUpdate',
  data: function () {
    return {
      review: {
        id: null,
        title: null,
        movie: null,
        content: null,
      }
    }
  },
  methods: {
    updateReview: function () {
      // 내용이 비어있을 경우 alert
      if (this.review.title && this.review.content) {
        this.review.id = this.selectedReview.id
        this.$store
        .dispatch('updateReview', this.review)
        .then(() => {
          // 리뷰 상세 정보로 route
          this.$router.push({ name: 'ReviewDetail', params: { reviewId: this.$route.params.reviewId }})
        })
      } else {
        alert('내용을 작성해주세요.')
      }
    }
  },
  created: function () {
    this.review.title = this.selectedReview.title
    this.review.movie = this.selectedReview.movie
    this.review.content = this.selectedReview.content
  },
  computed: {
    ...mapState(['selectedReview']),
  }
}
</script>

<style>

</style>