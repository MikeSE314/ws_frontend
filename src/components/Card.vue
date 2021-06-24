<template>
  <div class="card">
    <img :src="img_src"/>
    <div class="container">
      <h1>{{ title }}</h1>
      <p>{{ desc }}</p>
      <button @click='update_followed({ cards: followed.cards.filter(card => card.id !== id) })' class="button-primary danger">Delete</button>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex'


export default {
  name: 'card',
  props: {
    img_src: String,
    desc: String,
    title: String,
    id: Number,
  },
  computed: {
    ...mapState([
      'followed',
    ]),
  },
  created: function () {
  },
  methods: {
    ...mapActions([
      'update_followed',
    ]),
  }
}
</script>

<style>
</style>
