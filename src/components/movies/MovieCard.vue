<template>
    <!-- 포스터를 클릭할 경우 상세정보로 이동 -->
    <li class = "listcard">
      <img :src="imgUrl" alt="img" @click="moveToMovieDetail">
    </li>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movieCard: Object
  },
  methods: {
    // 해당하는 영화의 상세정보로 route
    moveToMovieDetail: function () {
      this.$router.push({ name: 'MovieDetail', params: { movieId: this.movieCard.id }})
    }
  },
  computed: {
    // 해당하는 영화의 포스터 url 생성
    imgUrl () {
      return `https://image.tmdb.org/t/p/w300${this.movieCard.poster_path}`
    }
  }
}
</script>

<style>

</style>