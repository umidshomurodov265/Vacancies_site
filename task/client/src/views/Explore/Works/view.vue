<script setup>
import { useRouter, useRoute } from "vue-router";
import { ProductsService } from "@/ApiServices/Products/products.service.js";
import { WorksService } from "@/ApiServices/Works/works.service.js";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
const router = useRouter();
const route = useRoute();
const store = useStore();
function ToastError(data) {
  toast.error(data.msg, {
    autoClose: 1500,
  });
}
function ToastSuccess(data) {
  toast.success(data.msg, {
    autoClose: 1500,
  });
}
const loading = computed(() => {
  return store.state.loading;
});
const token = JSON.parse(localStorage.getItem("AccessToken"));
const rateValue = ref("");

const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const rating = ref();
const post = ref();
const items = ref({});
const comments = ref({});

const goBack = () => {
  router.go(-1);
};

const GetById = async () => {
  try {
    const res = await WorksService.GetById(route.params.id);
    items.value = res.data.data;
  } catch (err) {
    console.log(err.message);
  }
};

onMounted(() => {
  GetById();
});
</script>

<template>
  <div class="mb-10 pb-6 container admin-panel">
    <div class="admin-header">
      <div class="title shadow p-1 rounded flex justify-between">
        <div class="flex flex-wrap">
          <h4
            class="text-[18px] mt-1 text-gray-400 font-bold text-center align-middle ml-2"
          >
            {{ items.title }}
          </h4>

          <div class="ml-6">
            <el-rate
              v-model="items.level"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            />
          </div>
        </div>
        <div class="text-center align-middle">
          <router-link
            to="/explore/works/edit/add"
            class="mr-4 inline-flex text-[12px] items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#42aae6] hover:bg-[#42aae6] rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >+ Add</router-link
          >
          <router-link class="" to="" @click="goBack">
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
      <div class="mb-5 shadow mt-8 bg-white md:rounded-lg">
        <div
          class="rounded-lg md:grid md:grid-cols-1 gap-1 sm:flex sm:flex-wrap bg-white"
        >
          <div class="p-3 shadow-sm bg-gray-100 rounded-lg">
            <img
              class="h-[100px] rounded-lg md:h-[300px] md:min-w-full"
              :src="items.image"
              alt=""
            />
          </div>
        </div>

        <div class="mt-4">
          <h4
            class="text-[18px] text-gray-400 font-bold text-center align-middle ml-2"
          >
            Details
          </h4>
          <div class="p-4 font-semibold text-gray-500">
            {{ items.description }}
          </div>
        </div>

        <div
          class="md:grid md:grid-cols-5 gap-2 p-4 mx-auto sm:columns-1 xl:container sm:flex sm:flex-wrap"
        >
          <div class="p-3 shadow-sm bg-gray-200 font-semibold rounded-lg">
            <h4 class="text-[16px] text-gray-900 font-bold align-middle ml-2">
              Company
            </h4>
            <div class="flex space-x-2 ml-2 p-2 bg-gray-50 mt-1 rounded-lg">
              <svg
                class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>

              <p class="ml-6 text-[14px] text-gray-700 font-semibold">
                Company
              </p>
            </div>
          </div>
          <div class="p-3 shadow-sm bg-gray-200 font-semibold rounded-lg">
            <h4 class="text-[16px] text-gray-900 font-bold align-middle ml-2">
              Category
            </h4>
            <div class="flex space-x-2 ml-2 p-2 bg-gray-50 mt-1 rounded-lg">
              <svg
                class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>

              <p class="ml-6 text-[14px] text-gray-700 font-semibold">
                {{ items.category }}
              </p>
            </div>
          </div>
          <div class="p-3 shadow-sm bg-gray-200 font-semibold rounded-lg">
            <h4 class="text-[16px] text-gray-900 font-bold align-middle ml-2">
              Price
            </h4>
            <div class="flex space-x-2 ml-2 p-2 bg-gray-50 mt-1 rounded-lg">
              <svg
                class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>

              <p class="ml-6 text-[14px] text-gray-700 font-semibold">
                {{ items.price }}$
              </p>
            </div>
          </div>
          <div class="p-3 shadow-sm bg-gray-200 font-semibold rounded-lg">
            <h4 class="text-[16px] text-gray-900 font-bold align-middle ml-2">
              Discount
            </h4>
            <div class="flex space-x-2 ml-2 p-2 bg-gray-50 mt-1 rounded-lg">
              <svg
                class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>

              <p class="ml-6 text-[14px] text-gray-700 font-semibold">
                {{ 12.9 }}%
              </p>
            </div>
          </div>

          <div class="p-3 shadow-sm bg-gray-200 font-semibold rounded-lg">
            <h4 class="text-[16px] text-gray-900 font-bold align-middle ml-2">
              Stock
            </h4>
            <div class="flex space-x-2 ml-2 p-2 bg-gray-50 mt-1 rounded-lg">
              <svg
                class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>

              <p class="ml-6 text-[14px] text-gray-700 font-semibold">
                {{ 10 }}%
              </p>
            </div>
          </div>
          <div class="p-3 shadow-sm bg-gray-200 font-semibold rounded-lg">
            <h4 class="text-[16px] text-gray-900 font-bold align-middle ml-2">
              Reting
            </h4>
            <div class="flex space-x-2 ml-2 p-2 bg-gray-50 mt-1 rounded-lg">
              <svg
                class="flex-shrink-0 mt-1 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>

              <p class="ml-6 text-[14px] text-gray-700 font-semibold">
                {{ items.level }} point
              </p>
            </div>
          </div>
        </div>
        <div class="flex justify-between border-t-2">
          <div class="m-4">
            <router-link
              :to="`/explore/works/edit/${items._id}`"
              class="inline-flex items-center mt-4 text-white bg-[#42aae6] hover:bg-[#42aae6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-4 py-4 text-center"
            >
              <i class="fa-solid fa-pen fa-xs text-black"></i>
            </router-link>
            <router-link
              to=""
              @click="deleteWorks(items._id)"
              class="inline-flex items-center mt-4 ml-2 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-4 py-4 text-center"
            >
              <i class="text-black fa-sharp fa-solid fa-trash fa-xs"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-show="token" class="comment p-2 shadow-sm rounded-lg bg-white">
      <section class="bg-white dark:bg-gray-900 py-2 lg:py-2">
        <div class="max-w-full mx-auto px-2">
          <div class="flex justify-between items-center mb-2">
            <h2
              class="text-lg lg:text-xl font-bold text-gray-600 dark:text-white"
            >
              Send an offer...
            </h2>
          </div>
          <form class="mb-6" @submit.prevent="">
            <div class="md:grid md:grid-cols-4 gap-4 sm:flex sm:flex-wrap">
              <div
                class="col-span-3 py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                <label for="comment" class="sr-only">Your comment</label>
                <textarea
                  id="comment"
                  rows="2"
                  class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>
              <div
                class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                <label for="comment" class="sr-only">Your comment</label>
                <el-rate allow-half />
              </div>
            </div>
            <button
              @click="AddComment"
              type="submit"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#42aae6] rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Post comment
            </button>
            <router-link
              @click="Comments"
              to=""
              class="ml-4 inline-flex items-center mt-4 text-white bg-yellow-300 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-4 py-[17px] text-center"
            >
              <i class="text-black fa-solid fa-message fa-beat fa-xs"></i>
            </router-link>
          </form>
          <article
            v-show="isComments"
            v-for="comment in comments"
            :key="comment"
            class="p-6 mb-6 border-t-[1px] text-base bg-white rounded-lg dark:bg-gray-900"
          >
            <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p
                  class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"
                >
                  <img
                    class="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                    alt="Michael Gough"
                  />{{ comment.user.username }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <time pubdate datetime="2022-02-08" title="February 8th, 2022"
                    >Avgust. 13, 2023</time
                  >
                </p>
              </div>
              <button
                id="dropdownComment1Button"
                data-dropdown-toggle="dropdownComment1"
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                  ></path>
                </svg>
                <span class="sr-only">Comment settings</span>
              </button>
              <!-- Dropdown menu -->
              <div
                v-show="dropdown"
                @click="dropdownComment(comment.id)"
                id="dropdownComment1"
                class="z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  class="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Edit</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Remove</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Report</a
                    >
                  </li>
                </ul>
              </div>
            </footer>
            <p class="text-gray-500 dark:text-gray-400">
              {{ comment.body }}
            </p>
            <div class="flex items-center mt-4 space-x-4">
              <button
                type="button"
                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
              >
                <svg
                  aria-hidden="true"
                  class="mr-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                Reply
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style></style>
