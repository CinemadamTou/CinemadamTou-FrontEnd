<template>
  <div class="container" style="width: 80%;">
    <!-- 영화 상세 정보 -->
    <div class="mt-4 mb-5">
      <span class="shadow-sm mx-auto p-2 fs-2 rounded-3">{{ selectedMovie.title }}</span>
    </div>
    <!-- <hr> -->
    <div class="row">
      <div class="col-3 text-start">
        <img class="mb-3" :src="imgUrl" alt="img">
        <span class="mb-1 ms-3">
          <select v-model="voteScore">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
          <button @click="sendUpdateScore">평가하기</button>
        </span>
        <span class="mb-1 ms-3">{{ voteScore }}</span>
          <!-- 영화 좋아요 -->
        <span class="ms-3" v-if="user.id">
          <button
            v-if="!user.like_movies.includes(selectedMovie.id)"
            @click="movieLike"
          >좋아요</button>
          <button
            v-if="user.like_movies.includes(selectedMovie.id)"
            @click="movieLike"
          >좋아요 취소</button>
        </span>
        <p class="mb-1 ms-3">평점 : {{ selectedMovie.score }}</p>
        <p class="mb-1 ms-3">개봉 : {{ selectedMovie.release_date }}</p>
      </div>
      <!-- 영화 줄거리, 배우, 사진 -->
      <div class="col-6 text-start">
        <p class="shadow-sm p-3 m-3 mt-0 rounded-3">{{ selectedMovie.overview }}</p>
        <!-- 영화 배우 목록 -->
        <p>배우 목록</p>
        <div class="row">
          <movie-actor
            v-for="movieActor in movieActors"
            :key="movieActor.id"
            :movieActor="movieActor"
            class="col-3"
          >
          </movie-actor>
        </div>
      </div>
      <!-- 영화 관련 추천 영화 -->
      <div class="col-3">
        <h5>추천 영화</h5>
        <hr>
        <div class="container">
          <div class="row">
            <movie-recommend
              v-for="recommendMovie in recommendMovies"
              :key="recommendMovie.id"
              :recommendMovie="recommendMovie"
              class="col-6"
            >
            </movie-recommend>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <!-- 영화 이미지 -->
    <h3>관련 이미지</h3>
    <hr>
    <div class="row">
      <movie-image
        v-for="movieImage in movieImages"
        :key="movieImage.id"
        :movieImage="movieImage"
      >
      </movie-image>
    </div>
    <!-- 영화 관련 영상 -->
    <hr>
    <movie-video :movieVideo="movieVideos[0]"></movie-video>
    <!-- 영화 리뷰 작성 -->
    <button @click="moveToCreate">리뷰 작성하기</button>
    <hr>
    <!-- 댓글 작성 -->
    <label for="comment">내용 : </label>
    <input type="text" id="comment" v-model="newMovieComment.content" @keyup.enter="createMovieComment">
    <button @click="createMovieComment">댓글 작성</button>
    <hr>
    <!-- 댓글 목록 -->
    <movie-comment
      v-for="movieComment in movieComments"
      :key="movieComment.id"
      :movieComment="movieComment"
    >
    </movie-comment>
  </div>
</template>

<script>
import MovieComment from '@/components/movies/MovieComment.vue'
import MovieRecommend from '@/components/movies/MovieRecommend'
import MovieActor from '@/components/movies/MovieActor'
import MovieVideo from '@/components/movies/MovieVideo'
import MovieImage from '@/components/movies/MovieImage'
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
    }
  },
  components: {
    MovieComment,
    MovieRecommend,
    MovieActor,
    MovieVideo,
    MovieImage,
  },
  methods: {
    // 영화 좋아요
    movieLike: function () {
      this.$store.dispatch('movieLike', this.$route.params.movieId)
    },
    // 영화 평가하기
    sendUpdateScore: function () {
      if (this.selectedMovieUserScore) {
        this.$store
        .dispatch('updateScore', { movie: this.$route.params.movieId, score: this.voteScore })
        .then(() => {
          this.$store
          .dispatch('getScore', this.$route.params.movieId)
          .then(res => {
            if (res.data.score) {
              this.voteScore = res.data.score
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
            }
          })
        })
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
      } else {
        alert('댓글을 작성해주세요.')
      }
      this.newMovieComment.content = null
    }
  },
  created: function () {
    // 영화 상세 정보 요청 (params 의 movieId 에 해당하는 영화)
    this.$store.dispatch('loadMovieDetail', this.$route.params.movieId)
    this.$store
    .dispatch('getScore', this.$route.params.movieId)
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
img {
  display: flex;
  width: 100%;
  margin: auto;
  filter: drop-shadow(5px 5px 5px #000);
  border-radius: 5%;
}
</style>