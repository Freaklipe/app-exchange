<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th>
          <span>Ranking</span>
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block"></td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="asset in assets"
        :key="asset.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            alt="asset.name"
            class="w-8 h-8"
          />
        </td>
        <td>
          <b>#{{ asset.rank }}</b>
        </td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            :to="{ name: 'coin-detail', params: { coinId: asset.id } }"
          >
            {{ asset.name }}
          </router-link>
          <small class="ml-1 text-gray-500">{{ asset.symbol }}</small>
        </td>
        <td>{{ asset.priceUsd | dollar }}</td>
        <td>{{ asset.marketCapUsd | dollar }}</td>
        <td>
          <span :class="[asset.changePercent24Hr.includes('-') ? 'text-red-600' : 'text-green-600']">
            {{ asset.changePercent24Hr | percent }}
          </span>
        </td>
        <td class="hidden sm:block">
          <px-button @custom-click="handleDetailClick(asset.id)">
            <span>Detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import PxButton from '@/components/PxButton'

  export default {
    name: 'PxAssetsTable',
    components: { PxButton },
    props: {
      assets: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      handleDetailClick(id) {
        this.$router.push({ name: 'coin-detail', params: { coinId: id } })
      },
    },
  }
</script>

<style scoped>
  .up::before {
    content: '👆';
  }

  .down::before {
    content: '👇';
  }

  td {
    padding: 20px 0px;
    font-size: 0.6rem;
    text-align: center;
  }

  th {
    padding: 5px;
    font-size: 0.6rem;
  }

  @media (min-width: 640px) {
    td,
    th {
      padding: 20px;
      font-size: 1rem;
    }

    th {
      padding: 12px;
    }
  }
</style>
