<template>
  <tr>
    <!-- 리뷰 정보 -->
    <td>{{ index + 1 }}</td>
    <td class="px-0">
    </td>
    <!-- title 클릭 시 상세정보로 이동 -->
    <td class="text-start" @click="moveToReviewDetail" style="cursor:pointer">
      <span style="font-weight: 600; margin-right: 10px; font-size: 15px">{{ review.title }}</span><span style="color: gray; font-size: 13px">{{ review.movie.title }}</span>
      <span
        v-if="review.created_at.slice(0,4) == today.year && review.created_at.slice(5,7) == today.month && review.created_at.slice(8,10) == today.date"
        class="badge rounded-pill me-1 p-1"
        style="color: #01FA33;"
      >New</span>
    </td>
    <td class="px-0"></td>
    <td class="text-start" @click="moveToProfile" style="cursor:pointer;">
      <v-avatar size="30px" style="filter: drop-shadow(1px 1px 1px black); margin-right: .5rem;">
        <img
          v-if="imgUrl"
          :src="imgUrl"
          :alt="review.user.username"
        >
      </v-avatar>
      {{ review.user.username }}
    </td>
    <td class="px-0"></td>
    <td>{{ dateFilter }}</td>
  </tr>
</template>

<script>
export default {
  name: 'Review',
  data: function () {
    return {
      today: {
        year: null,
        month: null,
        date: null,
      }
    }
  },
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
    },
  },
  created: function () {
    let day = new Date()
    this.today.year = String(day.getFullYear())
    this.today.month = String(day.getMonth() + 1)
    this.today.date = String(day.getDate())
  },
  computed: {
    dateFilter () {
      return `${this.review.created_at.slice(0,4)}-${this.review.created_at.slice(5,7)}-${this.review.created_at.slice(8,10)}`
    },
    imgUrl () {
      return `https://cinemadamtou.herokuapp.com${this.review.user.img}`
    },
  }
}
</script>

<style>

</style>