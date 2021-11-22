<template>
  <div id="app">
    <Tinder
      ref="tinder"
      key-name="poster_path"
      :queue.sync="queue"
      :max="3"
      :offset-y="10"
      allow-down
      @submit="onSubmit"
    >
      <template slot-scope="scope">
        <div
          class="pic"
          :style="{
            'background-image': `url(https://image.tmdb.org/t/p/w500${scope.data.poster_path})`
          }"
        >
        <span class="info"><span class="title">{{scope.data.title}}</span>
        </span>
        </div>
      </template>
      <img class="like-pointer" slot="like" src="@/assets/like.png" />
      <img class="nope-pointer" slot="nope" src="@/assets/nope.png" />
      <img class="super-pointer" slot="super" src="@/assets/super-like.png" />
      <img class="down-pointer" slot="down" src="@/assets/help.png" />
      <img class="rewind-pointer" slot="rewind" src="@/assets/history.png" />
    </Tinder>
    <div class="btns">
      <img src="@/assets/history.png" @click="decide('rewind')" />
      <img src="@/assets/nope.png" @click="decide('nope')" />
      <img src="@/assets/super-like.png" @click="decide('super')" />
      <img src="@/assets/like.png" @click="decide('like')" />
      <img src="@/assets/help.png" @click="decide('help')" />
    </div>
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
    history: []
  }),
  created() {
    this.$store.dispatch('loadTinderMovie')
    this.mock()
  },
   watch: {
    tinderMovies() {
      this.mock()
    }
  },
  computed: {
    ...mapState(['tinderMovies', 'user']),
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
      if (type === 'super') {
        this.$store.dispatch('movieLike', item.id)
      }
      else if (type === 'like') {
        this.$store.commit("ADD_TINDER_LIKE", item.id);
      }
      if (this.queue.length < 3) {
        this.mock()
      }
      this.history.push(item)
      if (this.history.length === 15) {
        this.$store.dispatch('', { score: this.voteScore })
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
      } else {
        this.$refs.tinder.decide(choice)
      }
    },
  },
}
</script>

<style>
#app .vue-tinder {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 200px;
  margin: auto;
  width: calc(100% - 20px);
  height: calc(100% - 400px);
  min-width: 300px;
  max-width: 355px;
}


.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
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
  bottom: 30px;
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
  font-size: 24px;
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
  width: 65px;
}

.btns img:nth-last-child(1) {
  margin-right: 0;
}
</style>