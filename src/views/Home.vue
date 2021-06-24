<template>
  <div>
    <input v-model="message"/>
    <p>{{ followed.message }}</p>
    <button class="button-primary" @click="() => num_clicks = num_clicks + 1">Increase!</button>
    <button class="button-primary" @click="() => num_clicks = num_clicks - 1">Decrease!</button>
    <p>{{ followed.num_clicks }}</p>
    <div class="row">
      <card v-for='card in followed.cards'
        :key='card.id'
        :id='card.id'
        :img_src='card.img_src'
        :title='card.title'
        :desc='card.desc'
        class="four columns"
      />
    </div>
  </div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex'
import Card from '../components/Card.vue'

export default {
  name: 'Home',
  components: { 
    Card: Card,
  },
  computed: {
    ...mapState([
      'followed',
    ]),
    message: {
      get () { return this.followed.message },
      set (value) { this.update_followed({ message: value }) }
    },
    num_clicks: {
      get () { return this.followed.num_clicks },
      set (value) { this.update_followed({ num_clicks: value }) }
    },
  },
  created: function () {
    this.creation()
  },
  methods: {
    ...mapActions([
      'creation',
      'update_followed',
    ]),
  }
}
</script>

<style>
</style>
