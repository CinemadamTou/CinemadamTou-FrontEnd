<template>
  <div class='container' style="margin-top: 5rem">
    <div class="row" v-if="!inResult">
      <div class="col-4 profileimg" style="margin-bottom: 3rem;">
        <div class="mx-auto">
          <img v-if="profile[0]" id="p4" :src="imgUrl" alt="image">
        </div>
        <div class="mx-auto" style="margin-left: 7rem; margin-right: 7rem;">
          <label for="upload" style="cursor:pointer">
            <v-btn
              class="mt-2"
              color="error"
              plain
              disabled
            >change
            </v-btn>
          </label>
          <input
            v-if="user.id === profile[0].id"
            id="upload" class="mt-2"
            type="file"
            accept="image/*"
            @change="uploadImage"
          >
        </div>
      </div>
      <div class="col-8 contents">
        <h1 v-if="profile[0]">{{ profile[0].username }} 
          <v-btn
          class="ms-3"
          elevation="2"
          @click="changePhrase"
          >
          {{ phrase }}</v-btn></h1>
        <v-divider style="margin-right: 5rem;"></v-divider>
        <div style="margin-top: 1rem;">
          <span class="align-middle" v-if="user.followers">팔로워 :</span>
          <span class="me-3 align-middle"> {{ user.followings.length }}</span>
          <span class="align-middle" v-if="user.followings">팔로우 :</span>
          <span class="me-3 align-middle"> {{ user.followers.length }}</span>
          <span v-if="user.id && profile[0] && user.id !== profile[0].id">
            <v-btn
              class="mx-2"
              elevation="2"
              color= "#e2e2e2"
              v-if="!user.followings.includes(profile[0].id)"
              @click="userFollow"
            >FOLLOW</v-btn>
            <v-btn
              class="mx-2"
              elevation="2"
              color= "#e2e2e2"
              v-if="user.followings.includes(profile[0].id)"
              @click="userFollow"
            >UNFOLLOW</v-btn>
          </span>
        </div>
        <v-divider style="margin-right: 5rem;"></v-divider>
        <!-- 자기소개 -->
        <div id="intro" style="margin-top: 2rem;">
          <v-textarea
            v-if="user.id === profile[0].id"
            name="input-7-1"
            background-color="#FFFFF5"
            counter="50"
            @change="changeIntro"
            height="10vw"
            spellcheck="false"
            label="소개"
            v-model="userIntro"
          ></v-textarea>
          <v-textarea
            v-else
            name="input-7-1"
            background-color="#FFFFF5"
            counter="50"
            @change="changeIntro"
            height="10vw"
            spellcheck="false"
            disabled
            v-model="userIntro"
          ></v-textarea>
        </div>
      </div>
      <div id="profile-tinder" >
        <p style="font-size: x-large;"><span class="spread-underline"><span style="font-weight: 800;">{{ profile[0].username }}</span>님의 영화 취향 분석</span></p>
        <p class="text-start genre-text" style="margin-left: 2rem;" v-if="profile[0].best_genres[0]"><span style="font-weight: 800; margin-right: 3px;">{{ profile[0].username }}</span>님의 최애 장르 :<span style="font-weight: 800; margin-left:1rem;">{{ profile[0].best_genres[0].name }}<span style="font-weight: 800; margin-left: 5px;">,</span></span><span style="font-weight: 800; margin-left: 10px;">{{ profile[0].best_genres[1].name }}</span></p>
        <v-sparkline
          :labels="genreList"
          :value="genreScores"
          :gradient="gradient"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :gradient-direction="gradientDirection"
          :fill="fill"
          :type="type"
          label-size="4"
          :auto-line-width="autoLineWidth"
          auto-draw
        >
        </v-sparkline>
      </div>
    </div>
    <v-tabs
      grow
      class="mt-4 mb-4"
      v-if="!inResult"
    >
      <v-tab @click="showLikeMovies">플레이리스트</v-tab>
      <v-tab @click="showRecommendMovies">추천 영화</v-tab>
    </v-tabs>
    <div
      v-if="nowList === 'playList' && !inResult"
      v-masonry
      transition-duration="1s"
      item-selector=".item"
      gutter="15"
      class="mx-auto"
      fit-width="true"
    >
      <movie-card
        v-for="movieCard in profile[1]"
        :key="movieCard.id"
        :movieCard="movieCard"
        class="item maincard"
        v-masonry-tile
      >
      </movie-card>
    </div>
    <div
      v-if="nowList === 'recommendList' && !inResult"
      v-masonry
      transition-duration="1s"
      item-selector=".item"
      gutter="15"
      class="mx-auto"
      fit-width="true"
    >
      <movie-card
        v-for="movieCard in profile[2]"
        :key="movieCard.id"
        :movieCard="movieCard"
        class="item maincard"
        v-masonry-tile
      >
      </movie-card>
    </div>
  </div>
</template>

<script>
import _ from "lodash"
import { mapState } from 'vuex'
import MovieCard from '@/components/movies/MovieCard.vue'

const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]

export default {
  name: 'Profile',
  data: function () {
    return {
      phrase: '',
      userIntro: '',
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[4],
      genreList: ['모험', '판타지', '애니', '드라마', '공포', '액션', '코미디', '스릴러', '범죄', 'SF', '미스터리', '로맨스', '가족',],
      genreScores: [],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
      nowList: 'playList',
    }
  },
  props: {
    inResult: Boolean,
  },
  components: {
    MovieCard,
  },
  methods: {
    // 관심 영화 표시
    showLikeMovies: function () {
      this.nowList = 'playList'
    },
    // 추천 영화 표시
    showRecommendMovies: function () {
      this.nowList = 'recommendList'
    },
    // 프로필 사진 업로드
    uploadImage: function (event) {
      if (this.user.id === this.profile[0].id) {
        this.$store
        .dispatch('uploadImage', event.target.files[0])
        .then(() => {
          this.$store.dispatch('loadProfile', this.$route.params.userId)
        })
      }
    },
    // 문구 변경
    changePhrase: function () {
      if (this.user.id == this.profile[0].id) {
        this.phrase = _.sampleSize(this.userPhrases, 1)[0]
        this.$store.dispatch('changePhrase', this.phrase)
      }
    },
    // 자기소개 변경
    changeIntro: function () {
      this.$store.dispatch('changeIntro', this.userIntro)
    },
    // 유저 팔로우
    userFollow: function () {
      this.$store.dispatch('userFollow', this.$route.params.userId)
    },
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  created: function () {
    this.$store
    .dispatch('loadProfile', this.$route.params.userId)
    .then(() => {
      this.phrase = this.profile[0].user_phrase
      this.userIntro = this.profile[0].user_intro
      this.genreScores = Object.values(this.profile[0].user_genre)
    })
  },
  computed: {
    imgUrl () {
      return `https://cinemadamtou.herokuapp.com${this.profile[0].img}`
    },
    ...mapState(['user', 'username', 'genres', 'profile', 'userPhrases',]),
  }
}
</script>

<style scoped>
.contents {
  text-align: left;
}

.hidden {
  display: none;
}

#sm {
  font-size: 110%;
}

#lg {
  font-size: 180%;
}

.profileimg div {
  width: 65%;
  border-radius: 0px;
  filter: drop-shadow(3px 3px 3px rgb(126, 126, 126));
  max-height: 400px;
  overflow: hidden;
}

.profileimg img {
  width: 100%;
}

#intro {
  margin: 1rem 5rem 2rem 0;
  height: 10vw;
}

#profile-tinder {
  margin-top: 5rem;;
  border-radius: 3px;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-bottom: 5rem;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  transition:all 1s;
  background-color: #fcfcfc;
  box-shadow: 0 3px 8px -3px rgb(112, 112, 112);
}

#profile-tinder:hover {
  background-color: #f9f8ff;
  box-shadow: 0 7px 10px -3px rgb(54, 54, 54);
}

#profile-tinder:hover .spread-underline:after {
  width: 100%; 
  left: 0; 
}

.spread-underline {
  color: #333;
  text-decoration: none;
  display: inline-block;
  padding: 15px 0;
  position: relative;
}

.spread-underline:after {
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 1px;
  left: 50%;
  position: absolute;
  background: black;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
  transition:all .8s;
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
  .profile-movie-card:hover {
    filter: grayscale(0%);
    transition: 0.2s;
  }
  .maincard:hover {
    filter: drop-shadow(10px 10px 10px rgb(126, 126, 126));
    transition: 0.1s;
  }
}

input[type="file"] {
  display: none;
}
</style>