<template>
  <tr>
    <!-- 리뷰 정보 -->
    <td>{{ index + 1 }}</td>
    <td></td>
    <td>{{ review.movie.title }}</td>
    <td></td>
    <!-- title 클릭 시 상세정보로 이동 -->
    <td @click="moveToReviewDetail">{{ review.title }}</td>
    <td></td>
    <td @click="moveToProfile">{{ review.user.username }}</td>
  </tr>
</template>

<script>
export default {
  name: 'Review',
  props: {
    review: Object,
    index: Number,
  },
  methods: {
    // 유저 프로필로 이동
    moveToProfile: function () {
      this.$router.push({ name: 'Profile', params: { userId: this.review.user.id }})
    },
    // 해당하는 리뷰의 상세정보로 이동
    moveToReviewDetail: function () {
      this.$router.push({ name: 'ReviewDetail', params: { reviewId: this.review.id }})
    }
  }
}
</script>

<style>

</style>