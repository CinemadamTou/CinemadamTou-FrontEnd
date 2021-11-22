<template>
  <div class="col">
    <img :src="imgUrl" alt="img" @click="moveToMovieDetail">
    <p>{{ movieNew.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'MovieNew',
  props: {
    movieNew: Object
  },
  methods: {
    // 해당하는 영화의 상세정보로 route
    moveToMovieDetail: function () {
      this.$router.push({ name: 'MovieDetail', params: { movieId: this.movieNew.id }})
    }
  },
  computed: {
    // 해당하는 영화의 포스터 url 생성
    imgUrl () {
      return `https://image.tmdb.org/t/p/w500${this.movieNew.poster_path}`
    }
    
    }
  }
</script>

<style>

</style>