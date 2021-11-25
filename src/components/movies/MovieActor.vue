<template>
  <div class="col-3 text-center">
    <img
      :id="movieActor.name"
      :src="imgUrl"
      alt="img"
      style="width: 65%;"
    >
    <b-tooltip :target="movieActor.name" triggers="hover">
      <b>{{ movieActor.name }}</b>
      <br>
      {{ movieActor.character }}
    </b-tooltip>
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

<style scoped>
img {
  display: flex;
  width: 100%;
  margin: auto;
  /* border-radius: 10px; */
  filter: drop-shadow(3px 3px 3px gray);
}

@media (hover: hover) {
  img:hover {
    filter: drop-shadow(4px 4px 4px rgb(24, 24, 24));
    transition: 0.1s;
  }
}
</style>