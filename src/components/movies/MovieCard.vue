<template>
    <!-- 포스터를 클릭할 경우 상세정보로 이동 -->
    <div :style="{ 'max-height': randomHeight + 'px'}">
      <img class="profile-movie-card" :src="imgUrl" alt="img" @click="moveToMovieDetail">
    </div>
</template>

<script>
export default {
  name: 'MovieCard',
  data: function () {
    return {
      randomHeight: 450,
    }
  },
  props: {
    movieCard: Object,
  },
  methods: {
    // 해당하는 영화의 상세정보로 route
    moveToMovieDetail: function () {
      this.$router.push({ name: 'MovieDetail', params: { movieId: this.movieCard.id }})
    }
  },
  created () {
    this.randomHeight = 340 + Math.ceil(Math.random() * 110)
  },
  computed: {
    // 해당하는 영화의 포스터 url 생성
    imgUrl () {
      return `https://image.tmdb.org/t/p/w300${this.movieCard.poster_path}`
    }
  }
}
</script>

<style scoped>

</style>