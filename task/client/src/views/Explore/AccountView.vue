<script setup>
import Cookies from "js-cookie";
import { computed, reactive } from "vue";
import api from "@/helpers/api";
import { useStore } from "vuex";
const info = JSON.parse(localStorage.getItem("UserInfo"));
const store = useStore();

const loading = computed(() => {
  return store.state.loading;
});

// const account = reactive(JSON.parse(Cookies.get("account")));

// const updateAccount = async () => {
//   store.commit("setLoading", true, { root: true });
//   try {
//     const res = await api.put(`/accounts/${account._id}`, { account });

//     if (res.data.status === "ok") {
//       Cookies.remove("account");
//       Cookies.set("account", JSON.stringify(res.data.account));

//       store.commit("setLoading", false, { root: true });
//       store.commit(
//         "setToast",
//         { show: true, msg: res.data.msg, type: "success" },
//         { root: true }
//       );
//       setTimeout(() => {
//         window.location.reload();
//       }, 1000);
//     } else {
//       store.commit("setLoading", false, { root: true });
//       store.commit(
//         "setToast",
//         { show: true, msg: res.data.msg, type: "success" },
//         { root: true }
//       );
//       // setTimeout(() => {
//       //   window.location.reload();
//       // }, 1000);
//     }
//   } catch (error) {
//     store.commit("setLoading", false, { root: true });
//     store.commit(
//       "setToast",
//       { show: true, msg: error.message, type: "error" },
//       { root: true }
//     );
//   }
// };

const logOut = () => {
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("UserInfo");
  window.location.reload();
};

// const deleteAccount = async () => {
//   store.commit("setLoading", true, { root: true });
//   try {
//     const res = await api.delete(`/accounts/${account._id}`);
//     Cookies.remove("account");
//     Cookies.remove("token");
//     store.commit("setLoading", false, { root: true });
//     store.commit(
//       "setToast",
//       { show: true, msg: res.data.msg, type: "success" },
//       { root: true }
//     );

//     setTimeout(() => {
//       window.location.reload();
//     }, 2000);
//   } catch (error) {
//     store.commit("setLoading", false, { root: true });
//     store.commit(
//       "setToast",
//       { show: true, msg: error.message, type: "error" },
//       { root: true }
//     );
//   }
// };
</script>

<template>
  <div class="account-container">
    <div class="title shadow p-1 rounded flex justify-between mb-4">
      <div class="flex flex-wrap">
        <h4
          class="text-[18px] mt-1 text-gray-400 font-bold text-center align-middle ml-2"
        >
          Account
        </h4>
      </div>
      <div class="text-center align-middle">
        <router-link class="" to="/explore/works" @click="router.go(-1)">
          <el-radio-button label="top">
            <i
              class="mr-3 fa-solid fa-arrow-left fa-sm"
              style="color: #111"
            ></i>
            Back</el-radio-button
          >
        </router-link>
      </div>
    </div>

    <div
      class="account-page w-full flex justify-center items-start bg-white pb-8"
    >
      <div
        class="account flex py-12 flex-col justify-center items-center w-full bg-white p-4 shadow-md"
      >
        <div class="account-img shadow-sm rounded-lg border">
          <img
            class="w-[250px] h-[120px] object-cover rounded p-2"
            :src="info.image"
            alt=""
          />
        </div>
        <div>
          <div class="account-content grid grid-cols-2 gap-4 col-12 mt-4">
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >First Name</label
              >
              <input
                v-model="info.firstName"
                disabled
                type="text"
                id=""
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Last Name
              </label>
              <input
                v-model="info.lastName"
                disabled
                type="text"
                id="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Username
              </label>
              <input
                v-model="info.username"
                disabled
                type="text"
                id="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email
              </label>
              <input
                v-model="info.email"
                disabled
                type="text"
                id="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </div>
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Gender</label
              >
              <select
                v-model="info.gender"
                disabled
                id="resul"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div
              class="account-buttons mb-6 col-12 flex flex-row justify-start mt-6 items-center space-x-4"
            >
              <button
                @click="updateAccount()"
                :disabled="loading"
                class="save-btn transition bg-gre px-4 py-2 rounded bg-[#42aae6] hover:bg-[#42aae6] text-white disabled:bg-gray-50"
              >
                Update
              </button>

              <button
                @click="logOut"
                :disabled="loading"
                class="logout-btn transition hover:bg-gray-500 px-4 py-2 rounded bg-gray-600 text-white disabled:bg-gray-50"
              >
                Logout
              </button>

              <button
                @click="deleteAccount()"
                :disabled="loading"
                class="delete-btn transition hover:bg-red-400 px-4 py-2 rounded bg-red-500 text-white disabled:bg-gray-50"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-page {
  max-height: 50vh;
  box-sizing: border-box;
}
</style>
