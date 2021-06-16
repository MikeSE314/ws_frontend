<template>
  <div>
    <nav>
      <div class="container">
        <ul>
          <li><a href="/">Home</a></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <!-- <form @submit.prevent="handle_form">
        <div class="row">
          <div class="six columns">
            <label for="inp1">Message</label>
            <input name="message" id="inp1">
          </div>
        </div>
        <button class="button-primary">Send!</button>
      </form> -->
      <input v-model="message"/>
      <p>{{ followed.message }}</p>
      <!-- <p>{{ channels }}</p> -->
      <button class="button-primary" @click="() => update_followed({ num_clicks: followed.num_clicks + 1 })">Increase!</button>
      <button class="button-primary" @click="() => update_followed({ num_clicks: followed.num_clicks - 1 })">Decrease!</button>
      <p>{{ followed.num_clicks }}</p>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'Home',
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
@import './assets/styles/normalize.css';
@import './assets/styles/skeleton.css';
@import './assets/styles/custom.css';
</style>
