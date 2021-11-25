<template>
  <div class="container" style="width: 80%;">
    <!-- 영화 상세 정보 -->
    <div class="row" style="margin-top: 3rem; margin-bottom: 2rem;">
      <div class="col-4"></div>
      <div class="col-4"><h2>{{ selectedMovie.title }}</h2></div>
      <div class="col-4 text-end" style="padding-right: 2rem; vertical-align: middle;">
         <!-- 영화 북마크 -->
        <span style="font-size:2rem;" v-if="user.id">
          <button
            v-if="!user.like_movies.includes(selectedMovie.id)"
            @click="movieLike"
          ><font-awesome-icon :icon="['fas', 'bookmark']" :style="{ color: 'c3cfe4' }" /></button>
          <button
            v-if="user.like_movies.includes(selectedMovie.id)"
            @click="movieLike"
          ><font-awesome-icon :icon="['fas', 'bookmark']" :style="{ color: '546bb0' }" /></button>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-3 text-center">
          <!-- 영화 포스터 -->
          <img id="detailposter" class="mb-3" :src="imgUrl" alt="img">
          <!-- 영화 평가 -->
          <div style="box-shadow: 0 5px 10px -3px rgb(112, 112, 112); padding: 1rem;">
          <div style="filter: drop-shadow(2px 2px 2px rgb(112, 112, 112)); margin-bottom: 1rem;">
          <v-rating
            v-model="voteScore"
            color="#ffd700"
            length="10"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            dense
            hover
            size="1.2vw"
            @input="sendUpdateScore"
          ></v-rating>
          </div>
          <!-- 평점 개봉일 리뷰 -->
          <div class="text-start ms-2 mb-4">
          <p class="my-2">⭐ 평점 : <span v-if="selectedMovie.score" style="font-weight: 550">{{ selectedMovie.score.toFixed(2) }}</span></p>
          <p class="my-2">📅 개봉일 : <span style="font-weight: 550">{{ selectedMovie.release_date }}</span></p>
          <!-- 영화 리뷰 작성 -->
          </div>
          <v-btn
            elevation="2"
            @click="moveToCreate"
            >✏️ 리뷰 작성</v-btn>
        </div>
      </div>
      <div class="col-6 text-start">
        <!-- 영화 이미지 -->
        <div id="movie-image" class="mx-4">
          <b-carousel
            id="carousel-1"
            :interval="6000"
            controls
            background="black"
            img-width="1024"
            img-height="480"
            style="filter: drop-shadow(3px 3px 3px gray);"
          >
            <movie-image
              v-for="(movieImage, index) in movieImages"
              :key="index"
              :movieImage="movieImage"
            ></movie-image>
          </b-carousel>
        </div>
        <!-- 영화 줄거리 -->
        <p class="p-4 mx-4 mt-4" style="word-break: keep-all; box-shadow: 7px 7px 7px -2px rgb(0, 0, 0); background-color: #3d3d3d; color: white;">{{ selectedMovie.overview }}</p>
      </div>
      <!-- 영화 관련 추천 영화 -->
      <div class="col-3">
        <p><span style="font-weight: 550;">{{ selectedMovie.title }}</span> 관련 영화</p>
        <hr>
        <div class="container p-1">
          <div class="row">
            <movie-recommend
              v-for="(recommendMovie, index) in recommendMovies"
              :key="index"
              :recommendMovie="recommendMovie"
              class="col-6 p-2"
            >
            </movie-recommend>
          </div>
        </div>
      </div>
    </div>
    <br>
    <!-- 영화 배우 목록 -->
    <div class="mb-5 mt-2">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>출연 배우</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="row mb-2">
              <movie-actor
                v-for="(movieActor, index) in movieActors"
                :key="index"
                :movieActor="movieActor"
                class="col-3"
              >
              </movie-actor>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <!-- 영화 관련 영상 -->
    <movie-video v-if="movieVideos[0]" :movieVideo="movieVideos[0]"></movie-video>
    <!-- 댓글 작성 -->
    <hr>
    <div class="row" style="margin-left: 15rem; margin-right: 15rem; margin-bottom: 1rem; height: 30%;">
      <div class="col-10">
        <v-text-field
        label="comment"
        v-model="newMovieComment.content"
        @keyup.enter="createMovieComment"
        >
        </v-text-field>
      </div>
      <div class="col-2" style="margin-top: auto; margin-bottom: auto;">
        <v-btn
        class="ma-1"
        color="error"
        plain
        @click="createMovieComment"
        >submit
        </v-btn>
      </div>
    </div>
    <!-- 댓글 목록 -->
    <div v-if="movieComments.length" style="box-shadow: 0 5px 10px -3px rgba(112,112, 112); padding: 1rem; margin-left: 10rem; margin-right: 10rem; text-align: left; margin-bottom:5rem;">
      <movie-comment
      v-for="(movieComment, index) in movieComments"
      :key="index"
      :movieComment="movieComment"
    >
    </movie-comment>
    </div>
    <hr>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >{{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import MovieComment from '@/components/movies/MovieComment.vue'
import MovieRecommend from '@/components/movies/MovieRecommend'
import MovieActor from '@/components/movies/MovieActor'
import MovieImage from '@/components/movies/MovieImage'
import MovieVideo from '@/components/movies/MovieVideo'
import { mapState } from 'vuex'

export default {
  name: 'MovieDetail',
  data: function () {
    return {
      newMovieComment: {
        movieId: null,
        content: null,
      },
      voteScore: null,
      snackbar: false,
      text: '',
      timeout: 1500,
    }
  },
  components: {
    MovieComment,
    MovieRecommend,
    MovieActor,
    MovieImage,
    MovieVideo,
  },
  methods: {
    // 영화 좋아요
    movieLike: function () {
      if (this.user.like_movies.includes(this.selectedMovie.id)) {
        this.text = `${this.selectedMovie.title} (을/를) 플레이리스트에서 삭제되었습니다.`
      } else {
        this.text = `${this.selectedMovie.title} (이/가) 플레이리스트에 등록되었습니다.`
      }
      this.snackbar = true
      this.$store.dispatch('movieLike', this.$route.params.movieId)
    },
    // 영화 평가하기
    sendUpdateScore: function () {
      this.text = `${this.selectedMovie.title}(을/를) ${this.voteScore}점으로 평가하셨습니다.`
      this.snackbar = true
      if (this.selectedMovieUserScore !== this.voteScore) {
        if (this.selectedMovieUserScore) {
          this.$store
          .dispatch('updateScore', { movie: this.$route.params.movieId, score: this.voteScore })
          .then(() => {
            this.$store
            .dispatch('getScore', this.$route.params.movieId)
            .then(res => {
              if (res.data.score) {
                this.voteScore = res.data.score
                this.$store.dispatch('loadMovieDetail', this.$route.params.movieId)
              }
            })
          })
          // 처음 평가 시 평가는 되는데 501 에러가 뜨면서 진행된다.
        } else {
          this.$store
          .dispatch('sendScore', { movie: this.$route.params.movieId, score: this.voteScore })
          .then(() => {
            this.$store
            .dispatch('getScore', this.$route.params.movieId)
            .then(res => {
              if (res.data.score) {
                this.voteScore = res.data.score
                this.$store.dispatch('loadMovieDetail', this.$route.params.movieId)
              }
            })
          })
        }
      }
    },
    // 리뷰 작성 페이지로 이동
    moveToCreate: function () {
      this.$router.push({ name: 'ReviewCreate', params: { movieId: this.$route.params.movieId }})
    },
    createMovieComment: function () {
      // comment 가 비어있을 경우 alert
      this.newMovieComment.movieId = this.selectedMovie.id
      if (this.newMovieComment.content) {
        this.$store.dispatch('createMovieComment', this.newMovieComment)
        this.text = `${this.user.username}님의 댓글이 작성되었습니다.`
        this.snackbar = true
      } else {
        this.text = '댓글을 작성해 주세요.'
        this.snackbar = true
      }
      this.newMovieComment.content = null
    }
  },
  created: function () {
    window.scrollTo(0, 0)
    // 영화 상세 정보 요청 (params 의 movieId 에 해당하는 영화)
    this.$store.dispatch('loadMovieDetail', this.$route.params.movieId)
    this.$store.dispatch('getScore', this.$route.params.movieId)
    .then(res => {
      if (res.data.score) {
        this.voteScore = res.data.score
      }
    })
    this.$store.dispatch('loadRecommendMovie', this.$route.params.movieId)
    this.$store.dispatch('loadMovieActors', this.$route.params.movieId)
    this.$store.dispatch('loadMovieImages', this.$route.params.movieId)
    this.$store.dispatch('loadMovieVideos', this.$route.params.movieId)

    // 영화의 댓글 정보 요청
    this.$store.dispatch('loadMovieComments', this.$route.params.movieId)
  },
  watch: {
    selectedMovieUserScore: function () {
      this.voteScore = this.selectedMovieUserScore
    }
  },
  computed: {
    // 영화의 포스터 url 생성
    imgUrl () {
      return `https://image.tmdb.org/t/p/w500${this.selectedMovie.poster_path}`
    },
    ...mapState(['user', 'selectedMovie', 'selectedMovieUserScore', 'movieComments', 'recommendMovies', 'movieActors', 'movieVideos', 'movieImages',])
  }
}
</script>

<style scoped>
#detailposter {
  display: flex;
  width: 100%;
  margin: auto;
  filter: drop-shadow(3px 3px 3px gray);
}
</style>