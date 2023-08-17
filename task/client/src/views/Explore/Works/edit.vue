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
    autoClose: 1000,
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
    autoClose: 1000,
  });
}
const items = ref([]);
const goBack = () => {
  router.go(-1);
};

const GetById = async () => {
  try {
    const res = await WorksService.GetById(route.params.id);
    items.value = res.data.data;
    console.log(items.value);
  } catch (err) {
    console.log(err.message);
  }
};
const GetModel = async () => {
  try {
    const res = await WorksService.GetModel();
    items.value = res.data.work;
  } catch (err) {
    console.log(err.message);
  }
};

const CreateWork = async () => {
  try {
    if (route.params.id === "add") {
      const res = await WorksService.Add(items.value);
      ToastSuccess({ msg: "Job added successfully!" });
      setTimeout(() => {
        router.push("/explore/works");
      }, 2000);
    } else {
      const res = await WorksService.Update(items.value, route.params.id);
      ToastSuccess({ msg: "Job updated successfully!" });
      setTimeout(() => {
        router.push("/explore/works");
      }, 2000);
    }
  } catch (err) {
    ToastError({ msg: err.message });
  }
};

onMounted(() => {
  if (route.params.id === "add") {
    GetModel();
  } else {
    GetById();
  }
});
const labelPosition = ref("top");
</script>

<template>
  <div class="mb-10 pb-2 container admin-panel">
    <div class="admin-header">
      <h4
        class="text-[18px] text-gray-400 font-bold text-center mb-5 shadow p-1 rounded"
      >
        {{ route.params.id == "add" ? "Create Work" : "Edit Work" }}
      </h4>

      <div class="p-5 mb-5 shadow-md mt-8 bg-white rounded">
        <el-form
          :label-position="labelPosition"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
          @submit.prevent=""
        >
          <div class="grid grid-cols-3 gap-4">
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
                >Title
              </label>
              <el-form-item>
                <el-input
                  class="w-[100%]"
                  v-model="items.title"
                  clearable
                  placeholder="title"
                />
              </el-form-item>
            </div>
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
                >level
              </label>
              <el-form-item>
                <el-select
                  required
                  v-model="items.level"
                  clearable
                  class="w-[100%]"
                  placeholder="Select level"
                >
                  <el-option
                    v-for="item of levelOptions"
                    :key="item"
                    :label="item.text"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="mb-6 col-span-1">
              <label
                name=""
                for=""
                class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
                >Category</label
              >
              <el-form-item>
                <el-select
                  required
                  v-model="items.category"
                  clearable
                  class="w-[100%]"
                  placeholder="Select category"
                >
                  <el-option
                    v-for="item of categories"
                    :key="item.value"
                    :label="item.text"
                    :value="item.text"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
                >Price ($)
              </label>
              <el-form-item>
                <el-input
                  v-model="items.price"
                  clearable
                  placeholder="999.... $"
                />
              </el-form-item>
            </div>

            <div class="mb-6">
              <label
                for=""
                class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
                >image
              </label>
              <el-form-item>
                <el-input
                  v-model="items.image"
                  clearable
                  placeholder="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                />
              </el-form-item>
            </div>
            <div class="mb-6 col-span-1">
              <label
                name=""
                for=""
                class="block mb-2 text-[12px] font-medium text-gray-900 dark:text-white"
                >State</label
              >
              <el-form-item>
                <el-select
                  required
                  v-model="items.state"
                  clearable
                  class="w-[100%]"
                  placeholder="Select state"
                >
                  <el-option
                    v-for="item of stateOptions"
                    :key="item.value"
                    :label="item.text"
                    :value="item.text"
                  />
                </el-select>
              </el-form-item>
            </div>
            <div class="mb-6 col-span-3">
              <label
                class="block mb-3 text-[13px] font-medium text-gray-900 dark:text-white"
                >Description</label
              >
              <el-form-item>
                <el-input
                  v-model="items.description"
                  maxlength="200"
                  placeholder="typing..."
                  show-word-limit
                  type="textarea"
                />
              </el-form-item>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-6">
            <div>
              <label
                for=""
                class="block mb-2 text-[13px] font-medium text-gray-900 dark:text-white"
              ></label>
              <el-form-item>
                <el-button type="primary" @click="CreateWork">Save</el-button>
                <el-button @click="router.go(-1)">Back</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style></style>
