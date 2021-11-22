<template>
  <div class="col-3">
    <img :src="imgUrl" alt="img">
  </div>
</template>

<script>
export default {
  name: 'MovieImage',
  props: {
    movieImage: Object
  },

  computed: {
    imgUrl () {
      return `https://image.tmdb.org/t/p/w500${this.movieImage.file_path}`
    }
  }
}
</script>

<style>

</style>