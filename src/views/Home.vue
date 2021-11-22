<template>
  <div>
    <v-carousel :show-arrows="false">
      <!-- 영화 목록 -->
      <v-carousel-item
        :src="items2[0].src"
        reverse-transition="fade-transition"
        transition="fade-transition"
        @click="moveToMovieList"
      ></v-carousel-item>
      <!-- 리뷰 목록 -->
      <v-carousel-item
        :src="items2[1].src"
        reverse-transition="fade-transition"
        transition="fade-transition"
        @click="moveToReview"
      ></v-carousel-item>
      <!-- 영화 추천 -->
      <v-carousel-item
        :src="items2[2].src"
        reverse-transition="fade-transition"
        transition="fade-transition"
        @click="moveToMovieRecommend"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        items2: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
        ],
      }
    },
    methods: {
      // 영화 목록 페이지로 이동
      moveToMovieList: function () {
        this.$router.push({ name: 'MovieList' })
      },
      // 리뷰 목록 페이지로 이동
      moveToReview: function () {
        this.$router.push({ name: 'ReviewList', params: { page: 1 }})
      },
      // 영화 추천 페이지로 이동
      moveToMovieRecommend: function () {
        this.$router.push({ name: 'MovieTinder' })
      },
    },
  }
</script>

<style>

</style>