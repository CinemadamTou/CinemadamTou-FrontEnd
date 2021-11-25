<template>
  <div style="height: 90vh;">
    <div id="tinderhome">
      <Tinder
        ref="tinder"
        key-name="poster_path"
        :queue.sync="queue"
        :max="3"
        :offset-y="10"
        allow-down
        @submit="onSubmit"
        v-if="!snackbar"
      >
        <template slot-scope="scope">
          <div
            class="pic"
            :style="{
              'background-image': `url(https://image.tmdb.org/t/p/w500${scope.data.poster_path})`
            }"
          >
          </div>
        </template>
      </Tinder>
      <div v-if="!snackbar" class="btns">
        <img src="@/assets/history.png" @click="decide('rewind')" />
        <img src="@/assets/nope.png" @click="decide('nope')" />
        <img src="@/assets/like.png" @click="decide('like')" />
        <img src="@/assets/super-like.png" @click="decide('super')" />
        <img src="@/assets/help.png" @click="decide('help')" />
      </div>
    </div>
    <v-snackbar
      style="margin-bottom: 5rem;"
      v-model="snackbar"
      :multi-line="multiLine"
      color="#0d5172"
      timeout="-1"
      tile
    ><div style="padding: 3rem;">
      <h1 class="text-center">📖 사용 설명서</h1>
      <div style="border: 1px solid white; padding: 2rem; margin-top: 2rem; border-radius: 5px;">
      <p style="font-size: large; margin-top: 2rem; margin-bottom: 3rem;">1. 영화가 마음에 든다면 ⏩으로 넘기세요.</p>
      <p style="font-size: large; margin-top: 3rem; margin-bottom: 3rem;">2. {{user.username}}의 취향이 아니라면 ⏪으로 넘기세요.</p>
      <p style="font-size: large; margin-top: 3rem; margin-bottom: 3rem;">3. ⏫로 넘기면 플레이리스트에 바로 저장됩니다.</p>
      <p style="font-size: large; margin-top: 3rem; margin-bottom: 3rem;">4. 아래의 버튼으로도 선택할 수 있습니다.</p>
      <p style="font-size: large; margin-top: 3rem; margin-bottom: 2rem;">5. 시계 버튼을 누르면 이전 선택을 취소할 수 있습니다.</p>
      </div>
      <div class="text-center" style="margin-top: 2rem;">
        <v-btn
          @click="snackbar = false"
          elevation="2"
          color="#11283e"
          style="padding-left: 2rem; padding-right: 2rem; padding-top: 1rem; padding-bottom: 1rem;"
        >시작하기</v-btn>
      </div>
      </div>
    </v-snackbar>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import Tinder from 'vue-tinder'
export default {
  name: 'MovieTinder',
  components: { 
    Tinder,
  },
  data: () => ({
    queue: [],
    offset: 0,
    history: [],
    multiLine: true,
    snackbar: false,
  }),
  created() {
    this.snackbar = true
    this.$store.dispatch('loadTinderMovie')
    this.mock()
  },
   watch: {
    tinderMovies() {
      this.mock()
    }
  },
  computed: {
    ...mapState(['tinderMovies', 'tinderLikes', 'user',]),
  },
  methods: {
    mock(count = 5, append = true) {
      const list = []
      for (let i = 0; i < count; i++) {
        list.push({ title: this.tinderMovies[this.offset].title, poster_path: this.tinderMovies[this.offset].poster_path, id: this.tinderMovies[this.offset].id})
        this.offset++
      }
      if (append) {
        this.queue = this.queue.concat(list)
      } else {
        this.queue.unshift(...list)
      }
    },
    onSubmit({ type, item }) {
      console.log(this.$store.state.tinderLikes)
      console.log(this.tinderLikes)
      if (type === 'super') {
        this.$store.dispatch('movieLike', item.id)
        this.$store.commit("ADD_TINDER_LIKE", item.id);
      }
      else if (type === 'like') {
        this.$store.commit("ADD_TINDER_LIKE", item.id);
      }
      if (this.queue.length < 3) {
        this.mock()
      }
      this.history.push(item)
      if (this.history.length === 15) {
        this.$store.dispatch('saveTinder', this.tinderLikes)
        this.$store.commit("RESET_TINDER_LIKE");
        this.$router.push({ name: 'Profile', params: { userId: this.user.id }})
      }
    },
    async decide(choice) {
      if (choice === 'rewind') {
        if (this.history.length) {
          this.$store.commit("DELETE_TINDER_LIKE");
          this.$refs.tinder.rewind(
            this.history.splice(this.history.length-1)
          )
        }
      } else if (choice === 'help') {
          this.snackbar = true
      } else {
        this.$refs.tinder.decide(choice)
      }
    },
  },
}
</script>

<style>
#tinderhome .vue-tinder {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 170px;
  margin: auto;
  width: calc(100% - 100px);
  height: calc(100% - 350px);
  min-width: 300px;
  max-width: 355px;
}

.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  top: 100px;
  width: 64px;
  height: 64px;
}

.nope-pointer {
  right: 10px;
}

.like-pointer {
  left: 10px;
}

.super-pointer,
.down-pointer {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  margin: auto;
  width: 112px;
  height: 78px;
}

.super-pointer {
  bottom: 40px;
}

.down-pointer {
  top: 40px;
}

.rewind-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 10px;
  width: 112px;
  height: 78px;
}

.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.btns {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 70px;
  margin: auto;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  max-width: 355px;
}

.btns img {
  margin-right: 12px;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.title {
  text-transform: uppercase;
  font-size: 30px;
  width: 100%;
  display: block;
}
.info {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  width: 100%;
  font-family: sans-serif;
  font-size: 18px;
  color: #fff;
  text-shadow: 0 0 1px #000;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(255, 255, 255, 0) 100%
  );
}
.btns img:nth-child(2n + 1) {
  width: 53px;
}

.btns img:nth-child(2n) {
  width: 53px;
}

.btns img:nth-last-child(1) {
  margin-right: 0;
}
</style>