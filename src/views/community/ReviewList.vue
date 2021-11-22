<template>
  <div>
    <h2 class="my-5">영화 리뷰 목록</h2>

    <v-sheet
      class="shadow my-4 mx-auto px-4"
      color="white"
      height="550"
      outlined
      rounded
      width="1000"
    >

      <!-- vuetify 활용 -->
      <v-simple-table class="my-2">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                number
              </th>
              <th>|</th>
              <th class="text-left">
                movie
              </th>
              <th>|</th>
              <th class="text-left">
                title
              </th>
              <th>|</th>
              <th class="text-left">
                user
              </th>
            </tr>
          </thead>
          <tbody>
            <review
              v-for="(review, index) in reviews"
              :key="review.id"
              :review="review"
              :index="index + (currentPage - 1) * 10"
            >
            </review>
          </tbody>
        </template>
      </v-simple-table>

      <!-- bootstrap 활용 -->
      <!-- <table class="table">
        <thead>
          <tr>
            <th scope="col">number</th>
            <th scope="col">|</th>
            <th scope="col">movie</th>
            <th scope="col">|</th>
            <th scope="col">title</th>
            <th scope="col">|</th>
            <th scope="col">user</th>
          </tr>
        </thead>
        <tbody>
          <review
            v-for="review in reviews"
            :key="review.id"
            :review="review"
          >
          </review>
        </tbody>
      </table> -->

    </v-sheet>

    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
        first-number
        last-number
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import Review from '@/components/community/Review.vue'
import { mapState } from 'vuex'

export default {
  name: 'ReviewList',
  components: {
    Review,
  },
  data: function () {
    return {
      rows: 100,
      perPage: 10,
      currentPage: 1
    }
  },
  created: function () {
    // 전체 리뷰 불러오기
    this.$store.dispatch('loadReviews', this.currentPage)
    this.$store
    .dispatch('loadReviewCnt', this.currentPage)
    .then(res => {
      this.rows = res.data.review_cnt
    })
  },
  watch: {
    currentPage: function () {
      this.$router.push({ name: 'ReviewList', params: { page: this.currentPage }})
      this.$store.dispatch('loadReviews', this.$route.params.page)
      this.$store
      .dispatch('loadReviewCnt')
      .then(res => {
        this.rows = res.data.review_cnt
      })
    }
  },
  computed: {
    ...mapState(['reviews'])
  },
}
</script>

<style>

</style>