<template>
  <div class="container text-start">
    <div style="margin: 2rem;">
    <h3>검색 결과</h3>
    <hr>
    </div>
    <div
      v-if="resultMovie.length"
      v-masonry
      transition-duration="1s"
      item-selector=".item"
      gutter="15"
      class="maincard mx-auto"
      fit-width="true"
      horizontalOrder: true
    >
      <movie-card
        v-for="movieCard in resultMovie"
        :key="movieCard.id"
        :movieCard="movieCard"
        class="item maincard"
        v-masonry-tile
      >
      </movie-card>
    </div>
    <div v-else style="margin: 2rem; margin-bottom: 13rem;">
      <h4>해당 조건을 만족하는 영화가 없습니다.</h4>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MovieCard from '@/components/movies/MovieCard.vue'

export default {
  name: 'ResultMovie',
  components: {
    MovieCard,
  },
  computed: {
    ...mapState(['resultMovie']),
  }
}
</script>

<style>
.maincard {
  padding: 0;
  margin-bottom: 15px;
  overflow: hidden;
}

.maincard img {
  display: inline-block;
  overflow: hidden;
  -ms-interpolation-mode: bicubic;
  filter: grayscale(100%);
  transition: filter 10s;
}

@media (hover: hover) {
  img:hover {
    filter: grayscale(0%);
    transition: 0.5s;
  }
}
</style>