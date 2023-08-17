<script setup>
import { ref } from "vue";
const user = JSON.parse(localStorage.getItem("UserInfo"));
const totalQuantity = JSON.parse(localStorage.getItem("totalQuantity"));
const showSiteBar = ref(true);
const isShowInfoLink = ref(false);
const isShowSetingLink = ref(false);
const isShowCountLink = ref(false);

function logOut() {
  localStorage.removeItem("AccessToken");
  localStorage.removeItem("UserInfo");
  window.location.reload();
}
const toggleSideBar = () => {
  showSiteBar.value = !showSiteBar.value;
};
const toggleInfoLinks = () => {
  isShowInfoLink.value = !isShowInfoLink.value;
};
const toggleSetingLinks = () => {
  isShowSetingLink.value = !isShowSetingLink.value;
};
const toggleCountLinks = () => {
  isShowCountLink.value = !isShowCountLink.value;
};
</script>

<template>
  <div class="w-full h-screen overscroll-contain flex fixed">
    <!-- Side  bare -->
    <div
      class="max-w-[220px] min-w-[220px] overflow-y-scroll h-full bg-gray-200 text-white"
      v-show="showSiteBar"
    >
      <div
        class="h-[60px] bg-gray-800 flex justify-between items-center border-b-[1px] text-white"
      >
        <div class="px-[20px] flex justify-between">
          <img
            class="w-[35px] cursor-pointer h-[35px]"
            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/quiz-11-381014.png?f=avif&w=256"
            alt=""
          />
          <h4 class="text-[14px] font-bold text-xl pl-2 text-[#fff]">Works</h4>
        </div>
      </div>
      <div class="h-[calc(100vh)] text-white bg-gray-700 py-[10px]">
        <div class="flex flex-col justify-between h-full">
          <div class="px-[13px] flex flex-col justify-between space-y-[10px]">
            <div class="router-link h-[100vh-50px]">
              <router-link
                to="/explore/works"
                class="my-1 text-[14px] text-white inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-[#42aae6] hover:text-white"
              >
                <i class="mr-2 fa-solid fa-paste fa-lg"></i>
                Works
              </router-link>

              <div
                class="info_sidbar_links my-1 text-[14px] text-white items-center"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto w-full h-full bg-white">
      <div class="w-full bg-gray-100">
        <div class="flex justify-between items-center h-[50px]">
          <div class="px-4 cursor-pointer w-[30]" @click="toggleSideBar">
            <svg
              fill="#000000"
              width="23px"
              height="23px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M2,4A1,1,0,0,1,3,3H21a1,1,0,0,1,0,2H3A1,1,0,0,1,2,4Zm1,9H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Zm0,8H21a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z"
                ></path>
              </g>
            </svg>
          </div>
          <div class="flex space-x-3 items-center justify-center px-6">
            <div class="flex gap-2">
              <div><i class="fa-solid fa-calendar-days fa-md"></i></div>
              <div>
                {{ new Date().getDate() }}.{{ new Date().getMonth() }}.{{
                  new Date().getFullYear()
                }}
              </div>
            </div>
            <router-link
              :to="`/explore/works`"
              class="relative inline-flex items-center p-4 text-sm font-medium text-center text-white rounded-lg hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <i
                class="fa-solid fa-cart-shopping fa-xl"
                style="color: #000000"
              ></i>
              <span class="sr-only">Notifications</span>
              <div
                class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900"
              >
                {{ 5 }}
              </div>
            </router-link>

            <div
              @click="logOut"
              class="inline-flex relative items-center py-[14px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-white hover:text-gray-900"
            >
              <i
                class="cursor-pointer fa-solid fa-right-from-bracket fa-lg"
              ></i>
            </div>
            <div class="text-sm">Admin</div>
            <router-link
              to="/explore/account"
              class="text-white inline-flex relative items-center py-[14px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-white hover:text-gray-900"
            >
              <i class="fa-solid fa-user fa-xl" style="color: #213454"></i>
            </router-link>
          </div>
        </div>
      </div>
      <div class="mx-auto overflow-auto w-full h-[calc(100vh-50px)] p-[10px]">
        <div class="p-[15px] h-full">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.router-link a.router-link-exact-active {
  background: #42aae6;
}
</style>
