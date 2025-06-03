<template>
  <div>
    <px-assets-table :assets="assets" />
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
      assets: [],
    }
  },
  created() {
    this.getAssets()
  },
  methods: {
    getAssets() {
      api.getAssets().then((assets) => {
        this.assets = assets
      })
    },
  },
}
</script>
