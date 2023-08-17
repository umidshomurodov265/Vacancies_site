<script setup>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { watch, computed, onMounted, ref } from "vue";
import { ElLoading } from "element-plus";
import { ProductsService } from "@/ApiServices/Products/products.service.js";
import { WorksService } from "@/ApiServices/Works/works.service.js";

import { CartsService } from "@/ApiServices/Carts/carts.service.js";

import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const user = JSON.parse(localStorage.getItem("UserInfo"));
function ToastError(data) {
  toast.error(data.msg, {
    autoClose: 4000,
  });
}
const categories = ref([
  { id: 1, value: 1, text: "IT" },
  { id: 2, value: 2, text: "Accounting" },
  { id: 3, value: 3, text: "Architecture" },
  { id: 4, value: 4, text: "Marketing" },
  { id: 5, value: 5, text: "Manager" },
  { id: 6, value: 6, text: "Translator" },
]);
const stateOptions = ref([
  { id: 1, text: "Active" },
  { id: 2, text: "Passive" },
]);
const levelOptions = ref([
  { id: 1, text: "Junior" },
  { id: 2, text: "Middle" },
  { id: 3, text: "Senior" },
]);
function ToastSuccess(data) {
  toast.success(data.msg, {
    autoClose: 4000,
  });
}
const router = useRouter();
const route = useRoute();
const store = useStore();
const loading = computed(() => {
  return store.state.loading;
});

const options = computed(() => {
  return store.state.options;
});
const discountOptions = ref([
  { text: "Yes", value: 1 },
  { text: "No", value: 0 },
]);
const onChange = (value) => {
  ext.value.limit = value;
  ext.value.skip = 1;
  try {
    LimitAndSkipProducts();
  } catch (err) {
    console.log(err);
  }
};
const product = {
  userId: user.id,
  products: [
    {
      id: "",
      quantity: 1,
    },
  ],
};

const total = ref();
const handleSizeChange = (limit) => {
  return (limit = 12);
};
const handleCurrentChange = (skip) => {
  ext.value.skip = skip;
  ext.value.limit = 12;
  LimitAndSkipProducts();
  return skip;
};
const filter = ref({
  skip: 1,
  total: 100,
  limit: 12,
  search: "",
  title: "",
  level: "",
  price: "",
  state: "",
  category: "",
});
const pageSize = ref("");
const items = ref([]);
const Total = ref("");
const ext = ref({
  skip: 1,
  total: 100,
  limit: 12,
});

const LimitAndSkipProducts = async () => {
  try {
    if (filter.value.brand) {
      const res = await ProductsService.LimitAndSkipProducts(filter.value);
      items.value = res.data.products;
      total.value = res.data.total;
      console.log(res.data);
      store.commit("setLoading", true, { root: true });
    } else {
      const res = await ProductsService.LimitAndSkipProducts(ext.value);
      items.value = res.data.products;
      total.value = res.data.total;
      Total.value = res.data.total;
    }
  } catch (err) {
    console.log(err.message);
  }
};
async function SearchWork() {
  try {
    const res = await WorksService.GetList(filter.value);
    items.value = res.data.data;
  } catch (err) {
    console.log(err.message);
  }
}

const GetList = async () => {
  try {
    const res = await WorksService.GetList(filter.value);
    items.value = res.data.data;
  } catch (err) {
    console.log(err.message);
  }
};

const deleteWork = async (id) => {
  try {
    const res = await WorksService.Delete(id);
    ToastSuccess({ msg: "Job deleted successfully!" });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (err) {
    console.log(err.message);
  }
};

function ReloadPage() {
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

onMounted(async () => {
  try {
    await GetList();
  } catch (err) {
    console.log(err);
  }
});

////
</script>
<template>
  <div class="md:container md:mx-auto pb-8">
    <h4
      class="text-[18px] text-gray-400 font-bold text-center mb-5 shadow p-1 rounded"
    >
      Works
    </h4>
    <div class="flex justify-between border-b-[1px]">
      <router-link
        to="/explore/create/employee"
        class="text-[12px] inline-flex items-center px-3 py-2 mb-4 text-sm font-medium text-center text-white bg-[#42aae6] hover:bg-[#42aae6] rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Total : {{ items.length }}
      </router-link>
      <div class="mt-[-10px]">
        <label
          name="resul"
          class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
        ></label>
        <el-input
          @input="SearchWork()"
          clearable
          class="w-[100%]"
          v-model="filter.search"
          placeholder="Search..."
        />
      </div>
      <router-link
        to="/explore/works/edit/add"
        class="inline-flex text-[12px] items-center px-3 py-2 mb-4 text-sm font-medium text-center text-white bg-[#42aae6] hover:bg-[#42aae6] rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >+ Add</router-link
      >
    </div>

    <div
      class="md:container mx-auto cards md:grid md:grid-flow-row-dense md:grid-cols-5 gap-2 sm:flex sm:flex-wrap sm:gap-3 rounded min-h-[15px] 4xl:grid-cols-1"
    >
      <div
        class="w-full md:h-screen sm:h-[400px] overscroll-contain flex md:col-span-1 sm:col-span-4"
      >
        <div
          class="md:overflow-y-scroll mt-1 sm:w-full h-full sm:overscroll-y-none shadow-sm p-4 mb-4"
        >
          <form
            class="filter-box mb-4 sm:w-full md:flex-col gap-2 sm:flex sm:flex-wrap rounded"
          >
            <div class="mb-2 col-span-1">
              <label
                name="resul"
                class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
                >Title</label
              >
              <el-input
                @input="SearchWork()"
                v-model="filter.title"
                clearable
                class="w-full"
                placeholder=""
              />
            </div>

            <div class="mb-2 col-span-1">
              <label
                name=""
                for=""
                class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
                >Category</label
              >
              <el-select
                @change="SearchWork()"
                v-model="filter.category"
                clearable
                class="w-[100%]"
                placeholder="Select category"
              >
                <el-option
                  v-for="item in categories"
                  :key="item"
                  :label="item.text"
                  :value="item.text"
                />
              </el-select>
            </div>

            <div class="mb-2 col-span-1">
              <label
                name="resul"
                class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
                >Price</label
              >
              <el-input
                @input="SearchWork()"
                clearable
                type="Number"
                class="w-[100%]"
                v-model="filter.price"
                placeholder=""
              />
            </div>
            <div class="mb-2 col-span-1">
              <label
                name="resul"
                class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
                >Level</label
              >
              <el-select
                @change="SearchWork()"
                required
                v-model="filter.level"
                clearable
                class="w-[100%]"
                placeholder="Select level"
              >
                <el-option
                  v-for="item of levelOptions"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id"
                />
              </el-select>
            </div>

            <div class="mb-2 col-span-1">
              <label
                name="resul"
                class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
                >Date</label
              >
              <el-input
                @input="SearchWork()"
                clearable
                type="date"
                class="w-[100%]"
                v-model="filter.date"
                placeholder=""
              />
            </div>
            <div class="mb-2 col-span-1">
              <label
                name="resul"
                class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
                >State</label
              >
              <el-select
                @change="SearchWork()"
                v-model="filter.state"
                clearable
                class="w-[100%]"
                placeholder="Select state"
              >
                <el-option
                  v-for="item in stateOptions"
                  :key="item"
                  :label="item.text"
                  :value="item.text"
                />
              </el-select>
            </div>

            <div class="mb-2 md:mt-16 sm:mt-1 col-span-1">
              <label
                name="resul"
                class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
                >Search</label
              >
              <el-input
                @input="SearchWork()"
                clearable
                class="w-[100%]"
                v-model="filter.search"
                placeholder="Search..."
              />
            </div>

            <div class="flex col-span-2 col-end-7 mt-[22px] gap-2">
              <div>
                <label
                  for=""
                  class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
                ></label>
                <button
                  @click="ReloadPage"
                  class="text-[12px] cursor-pointer px-[55px] inline-flex items-center font-medium text-center text-white bg-[#42aae6] hover:bg-[#42aae6] rounded"
                >
                  <i
                    class="fa-solid fa-arrows-rotate fa-sm px-[19px] py-[15px]"
                    style="color: #ffffff"
                  ></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="w-full h-screen overscroll-contain flex col-span-4">
        <div class="overflow-y-auto col-span-3 h-full mb-4">
          <div
            v-for="item in items"
            :key="item.id"
            class="max-w-full h-full box-content sm:grid-cols-1 xs:columns-1 xs:container sm:xs:columns-1 xl:xs:columns-1 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img class="h-60 w-screen" :src="item.image" alt="" />
            </a>
            <div class="p-4 h-48">
              <a href="#" class="flex gap-4">
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ item.title }}
                </h5>
                <div
                  v-show="item.state && item.state === 'Active'"
                  class="mb-4 mt-1 text-white bg-[#2cce7d] p-1 rounded-sm text-[12px] font-semibold dark:text-gray-400"
                >
                  {{ item.state }}
                </div>
                <div
                  v-show="item.state && item.state === 'Passive'"
                  class="mb-4 mt-1 text-white bg-yellow-300 hover:bg-yellow-300 p-1 rounded-sm text-[12px] font-semibold dark:text-gray-400"
                >
                  {{ item.state }}
                </div>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {{ item.description }}
              </p>
            </div>
            <div
              class="p-4 ml-4 mr-4 rounded flex justify-between bg-white shadow"
            >
              <div
                class="mb-2 text- xl font-semibold text-gray-700 dark:text-gray-400"
              >
                Price : {{ item.price }}$
              </div>

              <div
                class="mb-2 text- xl font-semibold text-gray-700 dark:text-gray-400"
              >
                Level: {{ item.level }}
              </div>
            </div>
            <div class="actions flex justify-between">
              <div class="p-4 mt-4">
                <el-rate
                  v-model="item.level"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                />
              </div>
              <div class="p-4">
                <router-link
                  :to="`/explore/works/edit/${item._id}`"
                  class="inline-flex items-center mt-4 ml-2 text-white bg-[#42aae6] hover:bg-[#42aae6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
                >
                  <i class="fa-solid fa-pen fa-xs text-black"></i>
                </router-link>
                <router-link
                  v-show="item.state === 'Active'"
                  :to="`/explore/works/view/${item._id}`"
                  class="inline-flex ml-2 items-center mt-4 text-white bg-yellow-300 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
                >
                  <i class="text-black fa-regular fa-eye fa-xs"></i>
                </router-link>
                <router-link
                  to=""
                  @click="deleteWork(item._id)"
                  class="inline-flex items-center mt-4 ml-2 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-3 text-center"
                >
                  <i class="text-black fa-sharp fa-solid fa-trash fa-xs"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="pagenation text-[12px] mt-4 py-4 text-center bg-white p-4 shadow hover:shadow-xl md:grid md:grid-cols-2 sm:flex sm:flex-wrap"
    >
      <div class="md:w-[30%] sm:w-[100%] m-auto">
        <el-pagination
          type="success"
          small
          background
          layout="prev, pager, next"
          :total="Total"
          class="pagenation mt-4 mb-3 text-center text-green-600"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div v-show="items">
        <el-select
          @change="onChange(value)"
          v-model="value"
          class="m-2 w-[18%]"
          placeholder="100"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link a.router-link-exact-active {
  background: #2cce7d;
}
.pagenation {
  background: white;
}
.page {
  background: green;
}
</style>
