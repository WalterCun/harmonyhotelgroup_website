<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from './components/core/Header.vue'
import Footer from './components/core/Footer.vue'
</script>