<template>
  <div>
    <v-text-field
      append-icon="mdi-magnify"
      type="text"
      v-model.trim="inputData"
      @keyup.enter="searchMovie"
    >
    </v-text-field>
    <p v-if="result">{{ result }}</p>
  </div>
</template>

<script>
export default {
  name: 'MovieSearch',
  data: function () {
    return {
      inputData: '',
      result: '',
    }
  },
  methods: {
    searchMovie: function () {
      if (this.inputData) {
        this.$store.dispatch('searchMovie', this.inputData)
        this.$router.push({ name: 'ResultMovie' })
        this.inputData = ''
        this.result = ''
      } else {
        this.result = '검색어를 입력하세요!'
      }
    },
  }
}
</script>

<style scoped>
div {
  margin-left: 200px;
  margin-right: 200px;
}
</style>