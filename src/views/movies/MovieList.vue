<template>
  <div class="container">
    <div>
      <movie-search>
      </movie-search>
    </div>
    <div id="list" class="row">
      <genre-list
        v-for="genre in genres"
        :key="genre.id"
        :genre="genre"
      >
      </genre-list>
    </div>
    <div>
    <v-btn
      @click="scoreHigh"
      elevation="2"
    >평점 높은 순</v-btn>
    <v-btn
      @click="scoreLow"
      elevation="2"
    >평점 낮은 순</v-btn>
    <v-btn
      @click="newMovie"
      elevation="2"
    >최신 순</v-btn>
    </div>
    <div class="row">
      <ul class="maincard">
        <movie-card
          v-for="movieCard in newMovieCards"
          :key="movieCard.id"
          :movieCard="movieCard"
        >
        </movie-card>
      </ul>
    </div>
    <div class="row">
      <movie-new
        v-for="movieNew in movieNews"
        :key="movieNew.id"
        :movieNew="movieNew"
      >
      </movie-new>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MovieCard from '@/components/movies/MovieCard.vue'
import MovieNew from '@/components/movies/MovieNew.vue'
import MovieSearch from '@/components/movies/MovieSearch.vue'
import GenreList from '@/components/movies/GenreList.vue'

export default {
  name: 'MovieList',
  data: function () {
    return {
    }
  },
  components: {
    MovieCard,
    MovieNew,
    MovieSearch,
    GenreList,
  },
  methods : {
    scoreLow () {
      this.newMovieCards.sort(function(a,b){
        return a.score - b.score
      })
    },
    scoreHigh () {
      this.newMovieCards.sort(function(a,b){
        return b.score - a.score
      })
    },
    newMovie () {
      this.newMovieCards.sort(function(a,b){
        return new Date(b.release_date) - new Date(a.release_date)
      })
    },
  },
  // vue 생성될 때 영화 목록 불러오기
  created: function () {
    this.$store.dispatch('loadMovieCards')
    this.$store.dispatch('loadMovieNews')
    this.$store.dispatch('loadGenres')
  },
  computed: {
    newMovieCards () {
      return this.movieCards
    },
    ...mapState(['movieCards', 'movieNews', 'genres']),
  }
}
</script>

<style>
#list {
  margin: 0px;
}
.maincard {
  padding: 0;
  margin: 0;
  list-style: none;
}
.maincard li {
  float: left;
  height: 500px;
  width: 310px;
  margin: 5px;
  overflow: hidden;
}

.maincard img {
  display: inline-block;
  min-width: 100%;
  min-height: 100%;
  -ms-interpolation-mode: bicubic;
  filter: grayscale(70%);
}

@media (hover: hover) {
  img:hover {
    filter: grayscale(0%);
  }
}
</style>