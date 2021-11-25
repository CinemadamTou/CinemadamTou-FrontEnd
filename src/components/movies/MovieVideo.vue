<template>
  <div data-aos="zoom-in-down">
    <iframe id="ytplayer" style="height: 45vw;" width="100%" :src="videoUrl" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'MovieVideo',
  props: {
    movieVideo: Object
  },
  computed: {
    // 해당하는 영화의 영상 url 생성
    videoUrl: function () {
      return `https://www.youtube.com/embed/${this.movieVideo.key}?autoplay=1&mute=1`
    },
  }
}
</script>

<style>

</style>