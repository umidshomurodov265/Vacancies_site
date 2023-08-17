<script setup>
import { useStore } from "vuex";
import TheLoading from "./components/TheLoading.vue";
import TheToast from "./components/TheToast.vue";
import { computed } from "vue";

const store = useStore();

const loading = computed(() => {
  return store.state.loading;
});

const toastShow = computed(() => {
  return store.state.toast.show;
});
</script>

<template>
  <div class="parent h-[calc(100vh-50px)]">
    <div class="bg-white">
      <TheLoading v-show="loading" />
      <TheToast v-show="toastShow" />
      <div class="h-[100vh]">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.parent {
  max-height: 100vh;
}
</style>
