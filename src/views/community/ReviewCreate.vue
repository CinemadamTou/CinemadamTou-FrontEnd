<template>
  <div>
    <h1>리뷰 작성</h1>
    <hr>
    <!-- 리뷰 작성 폼 -->
    <label for="title">제목 : </label>
    <input type="text" id="title" v-model="review.title">
    <br>
    <label for="content">내용 : </label>
    <input type="text" id="content" v-model="review.content" @keyup.enter="createReview">
    <button @click="createReview">작성</button>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'ReviewCreate',
  data: function () {
    return {
      review: {
        title: null,
        movie: null,
        content: null,
      }
    }
  },
  methods: {
    createReview: function () {
      // title, movie, content 각각 비어있을 경우 alert
      // 중첩을 줄이는 방법 고민 (단일 alert로 통일?)
      if (this.review.title && this.review.content) {
        this.review.movie = this.$route.params.movieId
        console.log(this.review)
        this.$store
        .dispatch('createReview', this.review)
        .then(() => {
          // 영화 상세 정보로 route
        this.$router.push({ name: 'ReviewList' })
        })
      } else {
        alert('내용을 작성해주세요.')
      }
    }
  },
}
</script>

<style>

</style>