<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>
        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Cambiar</button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>

      <line-chart class="my-10" :colors="['orange']" :min="min" :max="max" :data="chartData" />
    </template>

    <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
    <table>
      <tr class="border-b" v-for="market in markets" :key="`${market.exchangeId}-${market.priceUsd}`">
        <td>
          <b>{{ market.exchangeId }}</b>
        </td>
        <td>{{ market.priceUsd | dollar }}</td>
        <td>{{ market.baseSymbol }} / {{ market.quoteSymbol }}</td>
        <td>
          <px-button :is-loading="market.isLoading || false" v-if="!market.url" @custom-click="getWebSite(market)">
            <slot>Obtener Link</slot>
          </px-button>
          <a v-else class="hover:underline text-green-600" target="_blanck">{{ market.url }}</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import api from '@/api'
  import PxButton from '@/components/PxButton'

  export default {
    name: 'CoinDetailView',
    components: { PxButton },
    data() {
      return {
        asset: {},
        history: [],
        markets: [],
        isLoading: false,
      }
    },
    computed: {
      min() {
        return Math.min(...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2)))
      },

      max() {
        return Math.max(...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2)))
      },

      avg() {
        return Math.abs(...this.history.map((h) => parseFloat(h.priceUsd).toFixed(2)))
      },

      chartData() {
        const data = []
        this.history.map((h) => {
          data.push([h.date, parseFloat(h.priceUsd).toFixed(2)])
        })
        return data
      },
    },

    created() {
      this.isLoading = true
      this.getCoin()
    },
    methods: {
      getCoin() {
        const id = this.$route.params.coinId

        Promise.all([api.getAsset(id), api.getAssetHistory(id), api.getMarkets(id)])
          .then(([asset, history, markets]) => {
            this.asset = asset
            this.history = history
            this.markets = markets
          })
          .finally(() => {
            this.isLoading = false
          })
      },

      // async getWebSiteX(exchange) {
      //   try {
      //     this.$set(exchange, 'isLoading', true)
      //     const res = await api.getExchange(exchange.exchangeId)

      //     if (res && res.exchangeUrl) {
      //       this.$set(exchange, 'url', res.exchangeUrl)
      //     }
      //   } catch (error) {
      //     console.error('Error getting exchange:', error)
      //   } finally {
      //     this.$set(exchange, 'isLoading', false)
      //   }
      // },
      getWebSite(exchange) {
        this.$set(exchange, 'isLoading', true)
        return api
          .getExchange(exchange.exchangeId)
          .then(({ data }) => {
            this.$set(exchange, 'url', data.exchangeUrl)
          })
          .finally(() => {
            this.$set(exchange, 'isLoading', false)
          })
      },
    },
  }
</script>
