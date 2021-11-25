<template>
  <div id="reviewList">
    <h1 style="margin-top: 3.5rem; margin-bottom: 4rem">리뷰 게시판</h1>
    <v-sheet
      class="shadow my-4 mx-auto px-4"
      color="white"
      height="550"
      outlined
      rounded
      width="1100"
    >
      <!-- vuetify 활용 -->
      <v-simple-table class="my-3">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                number
              </th>
              <th>|</th>
              <th class="text-left">
                title
              </th>
              <th>|</th>
              <th class="text-left">
                user
              </th>
              <th>|</th>
              <th class="text-left">
                date
              </th>
            </tr>
          </thead>
          <tbody>
            <review
              v-for="(review, index) in reviews"
              :key="review.id"
              :review="review"
              :index="index + (currentPage- 1) * 10"
            >
            </review>
          </tbody>
        </template>
      </v-simple-table>
    </v-sheet>

    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
        first-number
        last-number
        pills
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
    this.currentPage = this.$route.params.page
    // 전체 리뷰 불러오기
    this.$store.dispatch('loadReviews', this.$route.params.page)
    this.$store
    .dispatch('loadReviewCnt', this.$route.params.page)
    .then(res => {
      this.rows = res.data.review_cnt
    })
  },
  watch: {
    currentPage: function () {
      if (this.currentPage !== this.$route.params.page) {
        this.$router.push({ name: 'ReviewList', params: { page: this.currentPage }})
        this.$store.dispatch('loadReviews', this.$route.params.page)
        this.$store
        .dispatch('loadReviewCnt')
        .then(res => {
          this.rows = res.data.review_cnt
        })
      }
    },
  },
  computed: {
    ...mapState(['reviews'])
  },
}
</script>

<style>
.theme--light.v-sheet--outlined {
  border: 0px;
}

.page-item.active .page-link {
  background-color: silver;
  border-color: white;
}

.page-link {
  border: 0px;
  color: black;
}
.pagination {
  margin-top: 1rem;
}

.drop-in-underline {
  position: relative;
  padding-bottom: 10px;
}
.drop-in-underline:before{
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0; right: 0;
  height: 2px;
  background-color: blue;
}
.drop-in-underline:before{
  opacity: 0;
  -webkit-transform: translateY(-8px);
  transform: translateY(-8px);
  -webkit-transition: opacity 0s, -webkit-transform 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: opacity 0s, -webkit-transform 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: transform 0s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0s;
    transition: transform 0s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0s, -webkit-transform 0s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.drop-in-underline:hover:before{
  opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  -webkit-transition: opacity 0.2s, -webkit-transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: opacity 0.2s, -webkit-transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s;
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s, -webkit-transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>