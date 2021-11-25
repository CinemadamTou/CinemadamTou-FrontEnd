import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import _ from 'lodash'

// const API_KEY = process.env.VUE_APP_TMDB_API_KEY

// JWT 토큰 header 생성
const setHeader = function () {
  const token = localStorage.getItem('JWT')
  const header = {
    Authorization: `Bearer ${token}`
  }
  return header
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}, // 사용자 object 정보
    username: '',  // 사용자 이름
    movieCards: [],  // 전체 영화 목록
    movieUserScore: [],  // 전체 영화에 유저가 준 점수
    selectedMovie: {},  // 선택한 영화 (상세 정보)
    // 나중에 전체 영화 점수로 가져오기
    selectedMovieUserScore: null,  // 선택한 영화에 유저가 준 점수
    movieComments: [],  // 전체 영화 댓글
    reviews: [],  // 전체 리뷰 목록
    selectedReview: {},  // 선택한 리뷰 (상세 정보)
    reviewComments: [],  // 전체 리뷰 댓글
    recommendMovies: [],  // 추천 영화 목록
    movieNews: [],  // 개봉 예정 영화 목록
    movieActors: [],  // 영화 배우 목록
    movieImages: [], // 영화 관련 이미지 목록
    movieVideos: [],  // 영화 관련 영상 목록
    resultMovie: [],  // 검색 영화 목록
    genres: [],  // 장르들
    genreMovie: [],  // 장르별 영화
    profile: [],  // 프로필 데이터 [{ 유저 }, { 유저가 좋아하는 영화들 }]
    scores: [],  // 평가 목록
    tinderMovies: [],  // 틴더 영화 목록
    tinderLikes: [],  // 틴더에서 선택한 영화
    userPhrases: [
      '일진과의 로맨스를 꿈꾸는 애니덕후',
      '아이맥스가 아니면 영화 안 보는 사람',
      '혼자서라도 영화관에 가는 영화덕후',
      '애인과 영화 데이트하는 나쁜 사람',
      '양옆 자리까지 예매하는 예민보스',
      '1년에 영화관 100번 가는 사람',
      '영화관보단 넷플릭스로 보는 사람',
      '영화배우만큼 잘생긴 사람',
      '영화배우만큼 예쁜 사람',
      '바보',
      '영화관 가본 적 없는 사람',
      '러브라이브보다가 지진 일으킨 흰수염',
      '영화관 못 가서 코로나가 미운 사람',
      '조조영화만 보는 스크루지',
      '영화관에서 국밥 먹는 사람',
      '상태 메시지로 스포일러하는 사람',
      '영화보다가 퇴실 체크 못 한 사람',
    ],  // 사용자 문구 목록
  },
  mutations: {
    // 틴더 좋아요 눌렀을 때 임시 저장소로 이동
    ADD_TINDER_LIKE(state, movie) {
      state.tinderLikes.push(movie);
    },

    // 
    DELETE_TINDER_LIKE(state) {
      state.tinderLikes.splice(state.tinderLikes.length-1)
    },

    RESET_TINDER_LIKE(state) {
      state.tinderLikes = [];
    },

    // 사용자 이름 불러오기
    SET_USERNAME: function (state, data) {
      state.user = data
      state.username = data.username
    },

    // 로그아웃
    LOGOUT: function (state) {
      state.user = {}
      state.username = ''
    },

    // 프로필
    LOAD_PROFILE: function (state, data) {
      state.profile = data
    },

    // 영화 목록 불러오기
    LOAD_MOVIE_CARDS: function (state, data) {
      state.movieCards = data
    },

    // 틴더무비 불러오기
    LOAD_TINDER_MOVIE: function (state, data) {
      state.tinderMovies = data
    },

    // 개봉 예정 영화 목록 불러오기
    LOAD_MOVIE_NEWS: function (state, data) {
      state.movieNews = data
    },

    // 영화 상세 정보 불러오기
    LOAD_MOVIE_DETAIL: function (state, data) {
      state.selectedMovie = data
    },

    // 영화 댓글 생성
    CREATE_MOVIE_COMMENT: function (state, data) {
      state.movieComments.push(data)
    },

    // 영화 댓글 목록 불러오기
    LOAD_MOVIE_COMMENTS: function (state, data) {
      state.movieComments = data
    },

    // 리뷰 목록 불러오기
    LOAD_REVIEWS: function (state, data) {
      state.reviews = data
    },

    // 리뷰 상세 정보 불러오기
    LOAD_REVIEW_DETAIL: function (state, data) {
      state.selectedReview = data
    },

    // 추천 영화 불러오기
    LOAD_RECOMMEND_MOVIE: function (state, data) {
      state.recommendMovies = data
    },

    // 리뷰 생성
    CREATE_REVIEW: function (state, data) {
      state.reviews.push(data)
    },

    // 리뷰 댓글 생성
    CREATE_REVIEW_COMMENT: function (state, data) {
      state.reviewComments.push(data)
    },

    // 리뷰 댓글 목록 불러오기
    LOAD_REVIEW_COMMENTS: function (state, data) {
      state.reviewComments = data
    },

    // 배우 목록 불러오기
    LOAD_MOVIE_ACTORS: function (state, data) {
      state.movieActors = data
    },

    // 영화 이미지
    LOAD_MOVIE_IMAGES: function (state, data) {
      state.movieImages = data
    },

    // 영화 관련 영상
    LOAD_MOVIE_VIDEOS: function (state, data) {
      state.movieVideos = data
      console.log(state.movieVideos)
    },

    // 검색 영화 불러오기
    SAVE_RESULT: function (state, data) {
      state.resultMovie = data
    },

    // 장르 목록 불러오기
    LOAD_GENRES: function (state, data) {
      state.genres = data
    },

    // 장르별 영화 불러오기
    LOAD_GENREMOVIES: function (state, data) {
      state.genreMovie = data
    },

    // 영화 스코어 불러오기
    GET_SCORE: function (state, data) {
      state.selectedMovieUserScore = data
    },

    // 스코어 생성
    CREATE_SCORE: function (state, data) {
      state.scores.push(data)
    },

  },
  actions: {

    // 틴더 결과 보내기
    saveTinder: function (context, data) {
      axios({
        method: 'post',
        url: `https://cinemadamtou.herokuapp.com/movies/research/`,
        data: {
          'tinderLikes': data
        },
        headers: setHeader(),
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 사용자 이름 불러오기
    setUsername: function ({ commit }) {
      axios({
        method: 'get',
        url: `https://cinemadamtou.herokuapp.com/accounts/username/`,
        headers: setHeader(),
      })
      .then(res => {
        commit('SET_USERNAME', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 회원가입
    signup: function (context, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `https://cinemadamtou.herokuapp.com/accounts/signup/`,
          data: data,
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    // 로그인
    login: function ({ dispatch }, data) {
      // actions 에서 .then 과 .catch 여부에 따라 components로 .then, .catch 여부 전달
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `https://cinemadamtou.herokuapp.com/accounts/api/token/`,
          data: data
        })
        .then(res => {
          // 토큰 정보 localStorage에 저장
          localStorage.setItem('JWT', res.data.access)
          // 유저 정보 state에 설정
          dispatch('setUsername')
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    // 로그아웃
    logout: function ({ commit }) {
      localStorage.removeItem('JWT')
      commit('LOGOUT')
    },

    // 프로필 불러오기
    loadProfile: function ({ commit }, user_id) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `https://cinemadamtou.herokuapp.com/accounts/profile/${user_id}/`,
          headers: setHeader(),
        })
        .then(res => {
          commit('LOAD_PROFILE', res.data)
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },

    // 유저 프로필 사진 업로드
    uploadImage: function (context, image) {
      return new Promise((resolve, reject) => {
        var formData = new FormData()
        formData.append('image', image)
        const token = localStorage.getItem('JWT')
        axios({
          method: 'post',
          url: `https://cinemadamtou.herokuapp.com/accounts/profile/image/`,
          data: formData,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    // 유저 문구 변경
    changePhrase: function (context, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `https://cinemadamtou.herokuapp.com/accounts/profile/phrase/`,
          data: {
            phrase: data
          },
          headers: setHeader()
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },

    // 유저 소개 변경
    changeIntro: function (context, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `https://cinemadamtou.herokuapp.com/accounts/profile/intro/`,
          data: {
            intro: data
          },
          headers: setHeader()
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },

    // 유저 팔로우
    userFollow: function ({ dispatch }, user_id) {
      axios({
        method: 'post',
        url: `https://cinemadamtou.herokuapp.com/accounts/profile/${user_id}/follow/`,
        headers: setHeader(),
      })
      .then(res => {
        dispatch('loadProfile', user_id)
        dispatch('setUsername')
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 영화 목록 불러오기
    loadMovieCards: function ({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: 'https://cinemadamtou.herokuapp.com/movies/',
          headers: setHeader(),
        })
        .then(res => {
          commit('LOAD_MOVIE_CARDS', res.data)
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },

    // 틴더에 넣을 영화 불러오기
    loadTinderMovie: function ({ commit, dispatch }) {
      axios({
        method: 'get',
        url: 'https://cinemadamtou.herokuapp.com/movies/tindermovie',
        headers: setHeader(),
      })
      .then(res => {
        dispatch('setUsername')
        commit('LOAD_TINDER_MOVIE', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 장르 목록 불러오기
    loadGenres: function ({ commit }) {
      axios({
        method: 'get',
        url: 'https://cinemadamtou.herokuapp.com/movies/genre/',
        headers: setHeader(),
      })
      .then(res => {
        commit('LOAD_GENRES', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 장르별 영화 불러오기
    loadGenreMovies: function ({ commit }, genre) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `https://cinemadamtou.herokuapp.com/movies/genre/${genre.id}/movies/`,
          headers: setHeader(),
        })
        .then(res => {
          commit('LOAD_GENREMOVIES', res.data)
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },

    // 개봉 예정 영화 불러오기
    loadMovieNews: function ({ commit }) {
      axios({
        method: 'get',
        url: 'https://cinemadamtou.herokuapp.com/movies/new/',
        headers: setHeader(),
      })
      .then(res => {
        commit('LOAD_MOVIE_NEWS', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 영화 상세 정보 불러오기
    loadMovieDetail: function ({ commit }, movie_id) {
      axios({
        method: 'get',
        url: `https://cinemadamtou.herokuapp.com/movies/${movie_id}/`,
        headers: setHeader(),
      })
      .then(res => {
        commit('LOAD_MOVIE_DETAIL', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 영화 좋아요
    movieLike: function ({ dispatch }, movie_id) {
      axios({
        method: 'post',
        url: `https://cinemadamtou.herokuapp.com/movies/${movie_id}/like/`,
        headers: setHeader(),
      })
      .then(res => {
        dispatch('loadMovieDetail', movie_id)
        dispatch('setUsername')
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 추천 영화 불러오기
    loadRecommendMovie: function ({ commit }, movie_id) {
      axios({
        method: 'get',
        url: `https://cinemadamtou.herokuapp.com/movies/${movie_id}/recommend/`,
        headers: setHeader(),
      })
      .then(res => {
        commit('LOAD_RECOMMEND_MOVIE', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 영화 댓글 목록 불러오기
    loadMovieComments: function ({ commit }, movie_id) {
      axios({
        method: 'get',
        url: `https://cinemadamtou.herokuapp.com/movies/${movie_id}/comments/`,
        headers: setHeader(),
      })
      .then(res => {
        commit('LOAD_MOVIE_COMMENTS', res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 영화 배우 목록 불러오기
    loadMovieActors: function ({ commit }, movie_id) {
      axios({
        method: 'get',
        url: `https://cinemadamtou.herokuapp.com/movies/${movie_id}/actors/`,
        headers: setHeader(),
      })
      .then(res => {
        commit('LOAD_MOVIE_ACTORS', res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 영화 관련 이미지 불러오기
    loadMovieImages: function ({ commit }, movie_id) {
      axios({
        method: 'get',
        url: `https://cinemadamtou.herokuapp.com/movies/${movie_id}/images/`,
        headers: setHeader(),
      })
      .then(res => {
        commit('LOAD_MOVIE_IMAGES', res.data)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 영화 관련 영상 불러오기
    loadMovieVideos: function ({ commit }, movie_id) {
      axios({
        method: 'get',
        url: `https://cinemadamtou.herokuapp.com/movies/${movie_id}/videos/`,
        headers: setHeader(),
      })
      .then(res => {
        commit('LOAD_MOVIE_VIDEOS', res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 영화 댓글 생성
    createMovieComment: function ({ commit }, data) {
      axios({
        method: 'post',
        url: `https://cinemadamtou.herokuapp.com/movies/${data.movieId}/comments/`,
        data: {
          content: data.content,
        },
        headers: setHeader(),
      })
      .then(res => {
        commit('CREATE_MOVIE_COMMENT', res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 영화 댓글 수정
    updateMovieComment: function (context, data) {
      axios({
        method: 'put',
        url: `https://cinemadamtou.herokuapp.com/movies/${data.movie}/comments/${data.id}/`,
        data: {
          content: data.content,
        },
        headers: setHeader(),
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 영화 댓글 삭제
    deleteMovieComment: function ({ dispatch }, data) {
      axios({
        method: 'delete',
        url: `https://cinemadamtou.herokuapp.com/movies/${data.movie}/comments/${data.id}/`,
        headers: setHeader(),
      })
      .then(res => {
        dispatch('loadMovieComments', data.movie)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // Page 리뷰 목록 불러오기
    loadReviews: function ({ commit }, new_page) {
      axios({
        method: 'get',
        url: `https://cinemadamtou.herokuapp.com/community/?page=${new_page}`,
        headers: setHeader(),
      })
      .then(res => {
        commit('LOAD_REVIEWS', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 전체 리뷰 갯수 불러오기
    loadReviewCnt: function () {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: 'https://cinemadamtou.herokuapp.com/community/cnt/',
          headers: setHeader(),
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },

    // 리뷰 상세 정보 불러오기
    loadReviewDetail: function ({ commit }, review_id) {
      axios({
        method: 'get',
        url: `https://cinemadamtou.herokuapp.com/community/${review_id}/`,
        headers: setHeader(),
      })
      .then(res => {
        commit('LOAD_REVIEW_DETAIL', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 리뷰 생성
    createReview: function ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `https://cinemadamtou.herokuapp.com/movies/${data.movie}/reviews/`,
          data: {
            title: data.title,
            content: data.content,
          },
          headers: setHeader(),
        })
        .then(res => {
          commit('CREATE_REVIEW', res.data)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    // 스코어 불러오기
    getScore: function ({ commit }, movie_id) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `https://cinemadamtou.herokuapp.com/movies/${movie_id}/vote/`,
          headers: setHeader(),
        })
        .then(res => {
          commit('GET_SCORE', res.data.score)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    // 스코어 생성
    sendScore: function ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `https://cinemadamtou.herokuapp.com/movies/${data.movie}/vote/`,
          data: {
            score: Number(data.score),
          },
          headers: setHeader(),
        })
        .then(res => {
          commit('CREATE_SCORE', res.data)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    // 스코어 수정
    updateScore: function ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `https://cinemadamtou.herokuapp.com/movies/${data.movie}/vote/`,
          data: {
            score: Number(data.score),
          },
          headers: setHeader(),
        })
        .then(res => {
          commit('CREATE_SCORE', res.data)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    // 리뷰 수정
    updateReview: function ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: `https://cinemadamtou.herokuapp.com/community/${data.id}/`,
          data: {
            title: data.title,
            content: data.content,
          },
          headers: setHeader(),
        })
        .then(res => {
          dispatch('loadReviewDetail', data.id)
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
      })
    },

    // 리뷰 삭제
    deleteReview: function ({ dispatch }, review_id) {
      axios({
        method: 'delete',
        url: `https://cinemadamtou.herokuapp.com/community/${review_id}/`,
        headers: setHeader(),
      })
      .then(res => {
        dispatch('loadReviews')
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 리뷰 좋아요
    reviewLike: function ({ dispatch }, review_id) {
      axios({
        method: 'post',
        url: `https://cinemadamtou.herokuapp.com/community/${review_id}/like/`,
        headers: setHeader(),
      })
      .then(res => {
        dispatch('loadReviewDetail', review_id)
        dispatch('setUsername')
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 리뷰 댓글 목록 불러오기
    loadReviewComments: function ({ commit }, review_id) {
      axios({
        method: 'get',
        url: `https://cinemadamtou.herokuapp.com/community/${review_id}/comments/`,
        headers: setHeader(),
      })
      .then(res => {
        commit('LOAD_REVIEW_COMMENTS', res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 리뷰 댓글 생성
    createReviewComment: function ({ dispatch }, data) {
      axios({
        method: 'post',
        url: `https://cinemadamtou.herokuapp.com/community/${data.reviewId}/comments/`,
        data: {
          content: data.content,
        },
        headers: setHeader(),
      })
      .then(res => {
        // commit('CREATE_REVIEW_COMMENT', res.data)
        dispatch('loadReviewComments', data.reviewId)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 리뷰 댓글 수정
    updateReviewComment: function (context, data) {
      axios({
        method: 'put',
        url: `https://cinemadamtou.herokuapp.com/community/${data.review}/comments/${data.id}/`,
        data: {
          content: data.content,
        },
        headers: setHeader(),
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 리뷰 댓글 삭제
    deleteReviewComment: function ({ dispatch }, data) {
      axios({
        method: 'delete',
        url: `https://cinemadamtou.herokuapp.com/community/${data.review}/comments/${data.id}/`,
        headers: setHeader(),
      })
      .then(res => {
        dispatch('loadReviewComments', data.review)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 영화 검색 결과 저장
    searchMovie: function ({ commit }, data) {
      axios({
        method: 'POST',
        url: 'https://cinemadamtou.herokuapp.com/movies/search/',
        data: {
          inputData: data
        },
        headers: setHeader(),
      })
      .then(res => {
        commit('SAVE_RESULT', res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
  },
  getters: {
    // 로그인 여부 확인
    isLogin: function (state) {
      if (state.username) {
        return true
      } else {
        return false
      }
    },
  },
  modules: {
  }
})
