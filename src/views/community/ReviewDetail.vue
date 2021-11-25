<template>
  <div>
    <div style="margin-left: 20rem; margin-right: 20rem; margin-top: 5rem; box-shadow: 0 5px 10px -3px rgba(112,112, 112);">
      <div v-if="imgUrl" class="review-movie" style="border: 1px solid black; padding-right: 2rem; padding-left: 2rem; padding-top: 1rem;"
      :style="{ 'background-image': 'linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(' + imgUrl + ')' }">
        <div class="row">
        <div class="col-6">
          <p
            v-if="selectedReview.movie"
            style="text-align: left; color: white; cursor:pointer; font-size: 18px;"
            @click="moveToMovieDetail"
          >{{ selectedReview.movie.title }}
          </p>
        </div>
        <div class="col-6">
          
          <p style="text-align: right;">
          <button
          v-if="selectedReview.user && selectedReview.user.username === username"
          @click="deleteReview"
          class="mx-1"
          >
          <font-awesome-icon :icon="['fas', 'trash-alt']" :style="{ color: 'red' }" />
          </button>
          </p>
        </div>
        </div>
        <div class="review-title">
          <p style="margin-top: 5rem; margin-bottom: 5rem;">{{ selectedReview.title }}</p>
        </div>
        <div class="row">
          <div class="col-6">
            <p class="mt-3" style="text-align: left;">
          <button v-if="selectedReview.user && selectedReview.user.username === username" @click="moveToUpdate">
          <font-awesome-icon :icon="['fas', 'pen']" :style="{ color: 'white' }" />
          </button>
          </p>
        </div>
        <div class="col-6">
          <p
          v-if="selectedReview.user"
          style="text-align: right; color: white; font-size: 18px;"
          ><v-avatar size="40px" style="margin-right: 0.6rem; filter: drop-shadow(1px 1px 1px black);">
            <img
              v-if="userImgUrl"
              :src="userImgUrl"
              :alt="selectedReview.user.username"
              style="cursor:pointer;"
              @click="moveToProfile"
            >
          </v-avatar> {{ selectedReview.user.username }}</p>
        </div>
        </div>
      </div>
      <!-- 리뷰 상세 정보 -->
      <div class="text-start" style="padding: 2rem;">
        <p style="word-break: keep-all; white-space: pre-line;">{{ selectedReview.content }}</p>
      </div>
          <!-- 리뷰 좋아요 -->
      <div style="padding-right: 1rem;" class="text-end">
      <button
        v-if="selectedReview.user && selectedReview.user.username !== username && !selectedReview.like_users.includes(user.id)"
        @click="reviewLike"
      ><font-awesome-icon :icon="['fas', 'heart-broken']" :style="{ color: 'silver' }" /></button>
      <button
        v-if="selectedReview.user && selectedReview.user.username !== username && selectedReview.like_users.includes(user.id)"
        @click="reviewLike"
      ><font-awesome-icon :icon="['fas', 'heart']" :style="{ color: 'red' }" /></button>
      <font-awesome-icon
        v-if="selectedReview.user && selectedReview.user.username === username"
        :icon="['fas', 'heart']"
        :style="{ color: 'red' }"
      />
      <span v-if="selectedReview.like_users" class="ms-2">좋아요 {{ selectedReview.like_users.length }}개</span>
      </div>
      <div style="padding: 1rem;">
        <p style="text-align: right;">작성일 : {{ dateFilter1 }}</p>
        <p style="text-align: right;">수정일 : {{ dateFilter2 }}</p>
      </div>
    </div>
    <!-- 댓글 작성 -->
    <div class="row" style="margin-left: 30rem; margin-right: 30rem; margin-bottom: 1rem; height: 30%;">
      <div class="col-10">
        <v-text-field
        label="comment"
        id="comment"
        v-model="newReviewComment.content"
        @keyup.enter="createReviewComment"
        >
        </v-text-field>
      </div>
      <div class="col-2" style="margin-top: auto; margin-bottom: auto;">
        <v-btn
        class="ma-1"
        color="error"
        plain
        @click="createReviewComment"
        >submit
        </v-btn>
      </div>
    </div>
    <!-- 댓글 목록 -->
    <div v-if="reviewComments.length" style="box-shadow: 0 5px 10px -3px rgba(112,112, 112); padding: 1rem; margin-left: 30rem; margin-right: 30rem; text-align: left;">
      <review-comment
        v-for="reviewComment in reviewComments"
        :key="reviewComment.id"
        :reviewComment="reviewComment"
      >
      </review-comment>
    </div>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >{{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import ReviewComment from '@/components/community/ReviewComment.vue'
import { mapState } from 'vuex'

export default {
  name: 'ReviewDetail',
  data: function () {
    return {
      newReviewComment: {
        reviewId: null,
        content: null,
      },
      snackbar: false,
      text: '',
      timeout: 1500,
    }
  },
  components: {
    ReviewComment,
  },
  methods: {
    // 해당하는 영화의 상세정보로 이동
    moveToMovieDetail: function () {
      this.$router.push({ name: 'MovieDetail', params: { movieId: this.selectedReview.movie.id }})
    },
    // 유저 프로필로 이동
    moveToProfile: function () {
      this.$router.push({ name: 'Profile', params: { userId: this.selectedReview.user.id }})
    },
    // 리뷰 좋아요
    reviewLike: function () {
      if (this.selectedReview.like_users.includes(this.user.id)) {
        this.text = '추천을 취소하였습니다.'
      } else {
        this.text = `${this.selectedReview.user.username} 님의 리뷰를 추천하였습니다.`
      }
      this.snackbar = true
      this.$store.dispatch('reviewLike', this.$route.params.reviewId)
    },
    moveToUpdate: function () {
      // 리뷰 수정 폼으로 route
      this.$router.push({ name: 'ReviewUpdate', params: { reviewId: this.$route.params.reviewId }})
    },
    deleteReview: function () {
      // 해당 리뷰 삭제
      this.$store.dispatch('deleteReview', this.selectedReview.id)
      // 리뷰 목록으로 route
      this.$router.push({ name: 'ReviewList' })
      
    },
    createReviewComment: function () {
      // comment 가 비어있을 경우 alert
      this.newReviewComment.reviewId = this.selectedReview.id
      if (this.newReviewComment.content) {
        this.$store.dispatch('createReviewComment', this.newReviewComment)
        this.text = `${this.user.username}님의 댓글이 작성되었습니다.`
        this.snackbar = true
      } else {
        this.text = '댓글을 작성해 주세요.'
        this.snackbar = true
      }
      this.newReviewComment.content = null
    },
  },
  created: function () {
    // 리뷰 상세 정보 불러오기
    this.$store.dispatch('loadReviewDetail', this.$route.params.reviewId)
    // 리뷰 댓글 목록 불러오기
    this.$store.dispatch('loadReviewComments', this.$route.params.reviewId)	
  },
  computed: {
    // 해당하는 영화의 포스터 url 생성
    imgUrl () {
      if (this.selectedReview.movie) {
        return `https://image.tmdb.org/t/p/original${this.selectedReview.movie.poster_path}`
      } else {
        return null
      }
    },
    userImgUrl () {
      return `https://cinemadamtou.herokuapp.com${this.selectedReview.user.img}`
    },
    dateFilter1 () {
      return `${this.selectedReview.created_at.slice(0,4)}년 ${this.selectedReview.created_at.slice(5,7)}월 ${this.selectedReview.created_at.slice(8,10)}일`
    },
    dateFilter2 () {
      return `${this.selectedReview.updated_at.slice(0,4)}년 ${this.selectedReview.updated_at.slice(5,7)}월 ${this.selectedReview.updated_at.slice(8,10)}일`
    },
    ...mapState(['user', 'username', 'selectedReview', 'reviewComments',]),
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}

.review-movie {
  background-size: cover;
  background-position: 50% 40%;
  background-repeat: no-repeat;
}

.review-title p {
  color: white;
  font-size: 38px;
}
</style>