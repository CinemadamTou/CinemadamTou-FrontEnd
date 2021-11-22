<template>
  <div class="container">
    <h3>리스트</h3>
    <hr>
    <div v-if="genreMovie.length" class="row">
      <movie-card
        v-for="movieCard in genreMovie"
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
  name: 'GenreMovie',
  components: {
    MovieCard,
  },
  created: function () {
    this.$store.dispatch('loadGenreMovies', this.$route.params.genreId)
    console.log()
  },

  computed: {
    ...mapState(['genreMovie']),
  }
}
</script>