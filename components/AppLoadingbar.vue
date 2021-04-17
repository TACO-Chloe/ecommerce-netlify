<template>
  <div v-if="loading">
    <van-popup v-model="show"><img src="/icon-loading.svg"></van-popup>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>


<style scoped>

.van-popup {
	background-color: transparent;
}
  
</style>