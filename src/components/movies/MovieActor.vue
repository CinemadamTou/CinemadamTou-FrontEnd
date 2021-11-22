<template>
  <div class="col-3 text-center">
    <img :src="imgUrl" alt="img" style="width: 50%;">
    <p>{{ movieActor.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'MovieActor',
  props: {
    movieActor: Object
  },
  methods: {
  },
  computed: {
    // 해당하는 영화의 포스터 url 생성
    imgUrl () {
      return `https://image.tmdb.org/t/p/w500${this.movieActor.profile_path}`
    }
  }
}
</script>

<style>

</style>