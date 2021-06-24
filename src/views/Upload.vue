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
    ]),
  },
  methods: {
    ...mapActions([
    ]),
    submit: function(event) {
      fetch('http://localhost:3000/Upload', {
        method: 'post',
        mode: 'cors',
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin': 'http://localhost:3000'
        //   // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        body: JSON.stringify({ test: event.target.test.value })
      // }).then(response => {
      //   console.log(response)
      // })
      }).then(response => response.text()).then(text => {
        console.log(text)
      })
    },
  }
}
</script>

<style>
</style>
