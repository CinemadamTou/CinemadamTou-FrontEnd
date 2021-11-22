<template>
  <div class="col-3">
    <!-- <img :src="imgUrl" alt="img" @click="moveToMovieDetail"> -->
    <img :src="imgUrl" alt="img" @click="moveToMovieDetail" style="width: 100%;">
  </div>
</template>

<script>
export default {
  name: 'MovieRecommend',
  props: {
    recommendMovie: Object
  },
  methods: {
    // 해당하는 영화의 상세정보로 route
    moveToMovieDetail: function () {
      this.$router.push({ name: 'MovieDetail', params: { movieId: this.recommendMovie.id }}).catch(()=>{})

      // 영화 상세 정보 요청 (params 의 movieId 에 해당하는 영화)
      this.$store.dispatch('loadMovieDetail', this.$route.params.movieId)
      this.$store.dispatch('loadRecommendMovie', this.$route.params.movieId)
      this.$store.dispatch('loadMovieActors', this.$route.params.movieId)
      this.$store.dispatch('loadMovieImages', this.$route.params.movieId)
      this.$store.dispatch('loadMovieVideos', this.$route.params.movieId)

      // 영화의 댓글 정보 요청
      this.$store.dispatch('loadMovieComments', this.$route.params.movieId)

      // 스크롤 상단으로 이동
      window.scrollTo(0, 0)
    }
  },
  computed: {
    // 해당하는 영화의 포스터 url 생성
    imgUrl () {
      return `https://image.tmdb.org/t/p/w500${this.recommendMovie.poster_path}`
    }
  }
}
</script>

<style scoped>
</style>