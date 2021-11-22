<template>
  <div class="col-1">
    <p @click="moveToGenreMovies">{{ genre.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'GenreList',
  props: {
    genre: Object,
  },
  methods: {
    moveToGenreMovies: function () {
      this.$router.push({ name: 'GenreMovie', params: { genreId: this.genre.id }}),
      console.log(this.genre.id)
    },
  }
}
</script>
