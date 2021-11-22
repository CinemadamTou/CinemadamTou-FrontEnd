<template>
  <div class="container">
    <h3>검색 결과</h3>
    <hr>
    <div v-if="resultMovie.length" class="row">
      <movie-card
        v-for="movieCard in resultMovie"
        :key="movieCard.id"
        :movieCard="movieCard"
      >
      </movie-card>
    </div>
    <div v-else>
      <h4>해당 영화가 없습니다.</h4>
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