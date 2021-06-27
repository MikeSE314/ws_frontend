<template>
  <div>
    <form @submit.prevent="submit">
      <input name='test'/>
      <button>Heyo!</button>
    </form>
  </div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'Upload',
  components: { 
  },
  computed: {
    ...mapState([
      'env'
    ]),
  },
  methods: {
    ...mapActions([
    ]),
    submit: function(event) {
      fetch(this.env.UPLOAD_HOST, {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({ test: event.target.test.value })
      }).then(response => response.text()).then(text => {
        console.log(text)
      })
    },
  }
}
</script>

<style>
</style>
