<script setup>
import { useRouter, useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { AuthService } from "@/ApiServices/Auth/login.service";
import { useStore } from "vuex";
const router = useRouter();
const route = useRoute();
const store = useStore();
const loading = computed(() => {
  return store.state.loading;
});
const items = ref([]);
const ext = ref({
  username: "",
  password: "",
});

const AccountGenerateToken = async () => {
  store.commit("setLoading", true, { root: true });
  try {
    const res = await AuthService.GetToken(ext.value);
    items.value = res.data;

    if (res.data.token) {
      localStorage.setItem("AccessToken", JSON.stringify(res.data.token));
      localStorage.setItem("UserInfo", JSON.stringify(res.data));

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }

    store.commit("setLoading", false, { root: true });
    store.commit(
      "setToast",
      {
        show: true,
        msg: "Тизимга муваффақиятли кирдингиз !",
        type: "success",
      },
      { root: true }
    );
  } catch (err) {
    store.commit("setLoading", false, { root: true });
    store.commit(
      "setToast",
      { show: true, msg: err.message, type: "error" },
      { root: true }
    );
  }
};
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Login
          </h1>
          <form
            class="space-y-4 md:space-y-6"
            @submit.prevent="AccountGenerateToken"
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username</label
              >
              <input
                v-model="ext.username"
                type="text"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="jhondoe"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                v-model="ext.password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>

            <button
              type="submit"
              class="w-full text-white bg-[#36d887] hover:bg-[#36d887] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Enter
            </button>
            <!-- <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Ҳали рўйхатдан ўтмаганмисиз ?
              <router-link
                to="/registration"
                class="font-medium text-[#36d887] hover:underline dark:text-primary-500"
                Рўйхатдан
                ўтиш
                >Рўйхатдан ўтиш</router-link
              >
            </p> -->
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
