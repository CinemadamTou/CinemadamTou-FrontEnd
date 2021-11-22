<template>
  <div>
    <iframe id="ytplayer" height="100%" width="100%" :src="videoUrl" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'MovieVideo',
  props: {
    movieVideo: Object
  },
  methods: {
  },
  computed: {
    // 해당하는 영화의 영상 url 생성
    videoUrl: function () {
      return `https://www.youtube.com/embed/${this.movieVideo.key}`
    },
  }
}
</script>

<style>

</style>