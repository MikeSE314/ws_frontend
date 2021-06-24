<template>
  <div>
    <nav>
      <div class="container">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/upload">Upload</router-link></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
    <footer/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import './assets/styles/normalize.css';
@import './assets/styles/skeleton.css';
@import './assets/styles/custom.css';
</style>
