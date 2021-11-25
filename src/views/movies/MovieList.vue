<template>
  <div class="container">
    <div style="margin-top: 2rem;">
      <movie-search>
      </movie-search>
    </div>
    <div class="row" style="margin-left: 1rem; margin-right: 1rem; margin-top: 1rem;">
      <div class="col-2">
        <div data-app>
          <v-select
            dense
            v-model="selectedGenre"
            :items="['전체', ...genres.map(genre => genre.name)]"
            label="장르별"
            @change="loadGenreMovies"
            solo
          ></v-select>
        </div>
      </div>
      <div class="col-10 text-end">
        <div class="mt-1">
          <v-btn
            class="ma-1"
            plain
            color="error"
            @click="scoreHigh"
          >score high</v-btn>
          <v-btn
            class="ma-1"
            plain
            @click="newMovie"
          >new</v-btn>
          <v-btn
            class="ma-1"
            plain
            @click="scoreLow"
          >score low</v-btn>
        </div>
      </div>
    </div>
    <div
      v-if="isShow"
      v-masonry
      transition-duration="1s"
      item-selector=".item"
      gutter="15"
      class="mx-auto"
      fit-width="true"
    >
      <movie-card
        v-for="movieCard in showMovieList"
        :key="movieCard.id"
        :movieCard="movieCard"
        class="item maincard"
        v-masonry-tile
      >
      </movie-card>
    </div>
    <div v-if="isShow && !movieList.length">
      <h4>해당 영화가 없습니다.</h4>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MovieCard from '@/components/movies/MovieCard.vue'
import MovieSearch from '@/components/movies/MovieSearch.vue'

export default {
  name: 'MovieList',
  data: function () {
    return {
      showMovieList: [],
      movieList: [],
      selectedGenre: '전체',
      isShow: false,
    }
  },
  components: {
    MovieCard,
    MovieSearch,
  },
  methods : {
    loadGenreMovies () {
      this.isShow = false
      if (this.selectedGenre === '전체') {
        this.isShow = true
        this.movieList = this.movieCards
        this.showMovieList = this.movieCards
      } else {
        this.$store
        .dispatch('loadGenreMovies', this.genres.find(genre => {
          return genre.name === this.selectedGenre
        }))
        .then(() => {
          this.isShow = true
          this.movieList = this.genreMovie
          this.showMovieList = this.genreMovie
        })
      }
    },
    scoreLow () {
      this.isShow = false
      this.movieList.sort(function (a, b) {
        return a.score - b.score
      })
      this.isShow = true
      this.showMovieList = this.movieList
      setTimeout(() => {
        this.$redrawVueMasonry()
      }, 0)
    },
    scoreHigh () {
      this.isShow = false
      this.movieList.sort(function (a, b) {
        return b.score - a.score
      })
      this.isShow = true
      this.showMovieList = this.movieList
      setTimeout(() => {
        this.$redrawVueMasonry()
      }, 0)
    },
    newMovie () {
      this.isShow = false
      this.movieList.sort(function (a, b) {
        return new Date(b.release_date) - new Date(a.release_date)
      })
      this.isShow = true
      this.showMovieList = this.movieList
      setTimeout(() => {
        this.$redrawVueMasonry()
      }, 0)
    },
  },
  // vue 생성될 때 영화 목록 불러오기
  created: function () {
    this.$store
    .dispatch('loadMovieCards')
    .then(() => {
      this.movieList = this.movieCards
      this.showMovieList = this.movieCards
      this.isShow = true
    })
    this.$store.dispatch('loadGenres')
  },
  computed: {
    ...mapState(['movieCards', 'movieNews', 'genres', 'genreMovie']),
  }
}
</script>

<style>
#list {
  margin: 0px;
}

.hidden {
  display: none;
}

.maincard {
  padding: 0;
  margin-bottom: 15px;
  overflow: hidden;
  transition: filter 10s;
}

.maincard img {
  display: inline-block;
  overflow: hidden;
  -ms-interpolation-mode: bicubic;
  filter: grayscale(100%);
  transition: filter 15s;
}

@media (hover: hover) {
  img:hover {
    filter: grayscale(0%);
    transition: 0.2s;
  }
  .maincard:hover {
    filter: drop-shadow(10px 10px 10px rgb(126, 126, 126));
    transition: 0.1s;
  }
}
.vb > .vb-dragger { z-index: 5; width: 12px; right: 0; } .vb > .vb-dragger > .vb-dragger-styler { -webkit-backface-visibility: hidden; backface-visibility: hidden; -webkit-transform: rotate3d(0,0,0,0); transform: rotate3d(0,0,0,0); -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out; transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out; background-color: rgba(244, 88, 88,.1); margin: 5px 5px 5px 0; border-radius: 20px; height: calc(100% - 10px); display: block; } .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler { background-color: rgba(244, 88, 88,.3); } .vb > .vb-dragger:hover > .vb-dragger-styler { background-color: rgba(244, 88, 88,.5); margin: 0px; height: 100%; } .vb.vb-dragging > .vb-dragger > .vb-dragger-styler { background-color: rgba(244, 88, 88,.5); margin: 0px; height: 100%; } .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler { background-color: rgba(244, 88, 88,.5);
}
</style>