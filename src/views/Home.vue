<template>
  <div  style="margin-top: 1rem;">
    <v-carousel
      cycle :show-arrows="false"
      hide-delimiters
      height="350px"
    >
      <!-- 영화 목록 -->
      <v-carousel-item
        src="@/assets/home1.png"
        reverse-transition="fade-transition"
        transition="fade-transition"
        style="cursor:pointer"
        @click="moveToMovieList"
      >
        <div id="main-center">
          <h1 style="font-size: 50px; margin-top: 2rem; margin-bottom: 2rem" >MOVIE</h1>
          <p style="font-size: 18px;">다양한 영화를 만나보세요</p>
        </div>
      </v-carousel-item>
      <!-- 리뷰 목록 -->
      <v-carousel-item
        src="@/assets/b2.png"
        reverse-transition="fade-transition"
        transition="fade-transition"
        style="cursor:pointer"
        @click="moveToReview"
      ><div id="main-center"><h1 style="font-size: 50px; margin-top: 2rem; margin-bottom: 2rem">REVIEW</h1><p style="font-size: 18px;">영화에 대한 감상을 공유하세요</p></div></v-carousel-item>
      <!-- 영화 추천 -->
      <v-carousel-item
        src="@/assets/home3.png"
        reverse-transition="fade-transition"
        transition="fade-transition"
        style="cursor:pointer"
        @click="moveToMovieRecommend"
      ><div id="main-center"><h1 style="font-size: 50px; margin-top: 2rem; margin-bottom: 2rem">RECOMMEND</h1><p style="font-size: 18px;">{{ user.username }}님의 취향에 맞는 영화를 찾아보세요</p></div></v-carousel-item>
    </v-carousel>
    <div style="margin-top: 8rem;">
      <h1>
        "보고 싶은 영화가 없어도,<br>
        <span style="padding-left:100px">영화를 좋아하지 않아도,</span><br>
        <span style="padding-right:110px">우리와 함께라면,</span><br>
        <span style="padding-left:-20px">당신은 이미 영화를 보고있다."</span>
      </h1>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
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
  computed: {
    ...mapState(['user',]) 
  }
}
</script>

<style scoped>
.v-image__image--cover {
  filter: blur(2px);
  background-size: 100%;
}

#main-center {
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 60%;
  padding-top : auto;
  padding-bottom : auto;
  padding-left : auto;
  padding-right : auto;
  background-color: rgba(7, 7, 7, 0.7);
  color: white;
}
</style>