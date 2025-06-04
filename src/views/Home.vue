<template>
  <div>
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <px-assets-table v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
  import PxAssetsTable from '@/components/PxAssetsTable'
  import api from '@/api'

  export default {
    name: 'HomeView',
    components: { PxAssetsTable },
    data() {
      return {
        isLoading: false,
        assets: [],
      }
    },
    created() {
      this.isLoading = true
      this.getAssets()
    },
    methods: {
      getAssets() {
        api
          .getAssets()
          .then((assets) => {
            this.assets = assets
          })
          .finally(() => {
            this.isLoading = false
          })
      },
    },
  }
</script>
