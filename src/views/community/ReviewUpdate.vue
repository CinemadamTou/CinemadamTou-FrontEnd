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
        @click="updateReview"
      >update
      </v-btn>
    </div>
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