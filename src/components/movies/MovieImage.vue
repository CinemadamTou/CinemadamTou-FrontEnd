<template>
  <b-carousel-slide :img-src="imgUrl"></b-carousel-slide>
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

<style scoped>

</style>