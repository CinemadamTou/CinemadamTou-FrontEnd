<template>
  <div>
    <h6>유저 id : {{ user.id }}</h6>
    <h6>좋아하는 영화 : {{ user.like_movies }}</h6>
    <h6>좋아하는 리뷰 : {{ user.like_reviews }}</h6>
    <h6>팔로잉 : {{ user.followings }}</h6>
    <h6>팔로워 : {{ user.followers }}</h6>
    <h4>유저 username : {{ username }}</h4>
    <p>여기까진 나의 정보</p>
    <hr>
    <h3 v-if="profile[0]">{{ profile[0].username }} 님의 프로필 페이지</h3>
    <img v-if="profile[0]" id="p4" :src="imgUrl" alt="image">
    <hr>
    <!-- 유저 팔로우 -->
    <div v-if="user.id && profile[0] && user.id !== profile[0].id">
      <button
        v-if="!user.followings.includes(profile[0].id)"
        @click="userFollow"
      >팔로우</button>
      <button
        v-if="user.followings.includes(profile[0].id)"
        @click="userFollow"
      >팔로우 취소</button>
      <hr>
    </div>
    <span id='sm'>팔로워 :</span>
    <span v-if="user.followers" id='lg'>{{ user.followers.length }}</span>
    <span id='sm'>팔로우 :</span>
    <span v-if="user.followings" id='lg'>{{ user.followings.length }}</span>
    <hr>
    <h4>좋아하는 영화</h4>
    <hr>
    <div v-if="profile[1]" class="row">
      <movie-card
        v-for="movieCard in profile[1]"
        :key="movieCard.id"
        :movieCard="movieCard"
      >
      </movie-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MovieCard from '@/components/movies/MovieCard.vue'

export default {
  name: 'Profile',
  components: {
    MovieCard,
  },
  methods: {
    // 유저 팔로우
    userFollow: function () {
      this.$store.dispatch('userFollow', this.$route.params.userId)
    },
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  created: function () {
    this.$store.dispatch('loadProfile', this.$route.params.userId)
  },
  computed: {
    imgUrl () {
      return `http://127.0.0.1:8000${this.profile[0].img}`
    },
    ...mapState(['user', 'username', 'profile',]),
  }
}
</script>

<style scoped>
#lg {
  font-size: 200%;
}

#p4 {
  width: 20%;
}
</style>