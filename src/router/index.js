import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import MovieList from '@/views/movies/MovieList'
import MovieDetail from '@/views/movies/MovieDetail'
import ResultMovie from '@/views/movies/ResultMovie'
import Signup from '@/views/accounts/Signup'
import Login from '@/views/accounts/Login'
import Profile from '@/views/accounts/Profile'
import ReviewList from '@/views/community/ReviewList'
import ReviewCreate from '@/views/community/ReviewCreate'
import ReviewDetail from '@/views/community/ReviewDetail'
import ReviewUpdate from '@/views/community/ReviewUpdate'
import GenreMovie from '@/views/movies/GenreMovie'
import MovieTinder from '@/views/movies/MovieTinder'

Vue.use(VueRouter)

const routes = [
  {
    path: '/*',
    component: 404
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/movies',
    name: 'MovieList',
    component: MovieList,
  },
  {
    path: '/movies/tinder',
    name: 'MovieTinder',
    component: MovieTinder,
  },
  {
    path: '/movies/genre/:genreId/movies',
    name: 'GenreMovie',
    component: GenreMovie,
  },
  {
    path: '/movies/search',
    name: 'ResultMovie',
    component: ResultMovie,
  },
  {
    path: '/movies/:movieId',
    name: 'MovieDetail',
    component: MovieDetail,
  },
  {
    path: '/accounts/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/accounts/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/accounts/profile/:userId',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/community/page/:page',
    name: 'ReviewList',
    component: ReviewList,
  },
  {
    path: '/movies/:movieId/reviews',
    name: 'ReviewCreate',
    component: ReviewCreate,
  },
  {
    path: '/community/:reviewId',
    name: 'ReviewDetail',
    component: ReviewDetail,
  },
  {
    path: '/community/:reviewId',
    name: 'ReviewUpdate',
    component: ReviewUpdate,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
