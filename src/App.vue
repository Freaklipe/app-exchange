<template>
  <main>
    <px-header :links="links" />
    <router-view class="container px-5 sm:px-20 py-20 flex justify-center" />
  </main>
</template>

<script>
  import PxHeader from '@/components/PxHeader'

  export default {
    name: 'App',
    components: {
      PxHeader,
    },
    data() {
      return {
        links: [
          { title: 'BTC', to: { name: 'coin-detail', params: { coinId: 'bitcoin' } } },
          { title: 'ETH', to: { name: 'coin-detail', params: { coinId: 'ethereum' } } },
          { title: 'ADA', to: { name: 'coin-detail', params: { coinId: 'cardano' } } },
          { title: 'DOGE', to: { name: 'coin-detail', params: { coinId: 'dogecoin' } } },
          { title: 'SOL', to: { name: 'coin-detail', params: { coinId: 'solana' } } },
          { title: 'XRP', to: { name: 'coin-detail', params: { coinId: 'xrp' } } },
        ],
      }
    },
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
