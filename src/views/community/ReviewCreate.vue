<template>
  <div>
    <!-- 리뷰 작성 폼 -->
    <div class="mx-auto reviewform">
      <v-text-field
        label="제목"
        id="title"
        v-model="review.title"
        class="mb-3"
      ></v-text-field>
      <v-textarea
        class="mb-5"
        id="content"
        label="내용"
        v-model="review.content"
        ></v-textarea>
      <v-btn
        class="ma-1"
        color="error"
        plain
        @click="createReview"
      >submit
      </v-btn>
    </div>
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
      },
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
        this.$router.push({ name: 'ReviewList', params: { page: 1 }})
        })
      } else {
        alert('내용을 작성해주세요.')
      }
    }
  },
}
</script>

<style>
.reviewform {
  padding: 3rem;
  width: 30%;
  margin-top: 10rem;
  box-shadow: 0 5px 10px -3px rgba(0,0,0,1);
  background-color: #FFFFEF;
}
</style>