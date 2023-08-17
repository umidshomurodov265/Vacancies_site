<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { AgancyService, AgencyVisaEmployeeService } from "@/ApiServices";

const router = useRouter();
const route = useRoute();

const store = useStore();
const loading = computed(() => {
  return store.state.loading;
});

const AgencyVisaEmployeBindingSelectList = (value) => {
  AgencyVisaEmployeeServiceSelectList(value);
};

const AgencyVisaEmployeeServiceOptions = ref([]);
const AgencyVisaEmployeeServiceSelectList = async (id) => {
  store.commit("setLoading", true, { root: true });
  store.commit("setLoading", true, { root: true });
  try {
    const res = await AgencyVisaEmployeeService.GetAsSelectList(id);
    AgencyVisaEmployeeServiceOptions.value = res.data;
    store.commit("setLoading", false, { root: true });
  } catch (err) {
    console.log(err.message);
    store.commit("setLoading", false, { root: true });
  }
};
const AgencyOptions = ref([]);
const AgencySelectList = async () => {
  store.commit("setLoading", true, { root: true });
  store.commit("setLoading", true, { root: true });
  try {
    const res = await AgancyService.GetAsSelectList();
    AgencyOptions.value = res.data;
    store.commit("setLoading", false, { root: true });
  } catch (err) {
    console.log(err.message);
    store.commit("setLoading", false, { root: true });
  }
};
const items = ref({
  id: 0,
  agencyVisaEmployeeId: 0,
  agencyId: "",
  responsibleEmployee: "",
  prepareToVisaOn: "",
  phoneNumber: "",
  visaSetOn: "",
});

const isShowModalTwo = ref(true);
const ModalTwo = () => {
  isShowModalTwo.value = !isShowModalTwo.value;
};

const Ministry_Table_Two = () => {
  if (
    (items.value.agencyVisaEmployeeId,
    items.value.agencyId &&
      items.value.responsibleEmployee &&
      items.value.prepareToVisaOn &&
      items.value.phoneNumber &&
      items.value.visaSetOn)
  ) {
    console.log(items.value);
    store.dispatch("Ministry_Table_Two", items.value);
    ModalTwo();
    items.value = {};

    store.commit("setLoading", false, { root: true });
    store.commit(
      "setToast",
      {
        show: true,
        msg: "Ма'лумот қушилди!",
        type: "success",
      },
      { root: true }
    );
  } else {
    store.commit("setLoading", false, { root: true });
    store.commit(
      "setToast",
      { show: true, msg: "Майдонлар тйлиқ тйлдирилиши жоиз !", type: "error" },
      { root: true }
    );
  }
};

function goBack() {
  router.back();
}
onMounted(() => {
  AgencySelectList();
});
</script>

<template>
  <div class="modal" v-show="isShowModalTwo">
    <div class="">
      <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <div
              class="w-[400px] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-12 sm:w-full sm:max-w-2xl"
            >
              <div class="bg-white sm:px-8 sm:pb-4">
                <h4
                  class="text-[18px] text-gray-400 font-bold text-center my-4"
                >
                  Виза қўйувчи қўшиш
                </h4>
                <div class="sm:flex sm:items-start">
                  <form
                    @submit.prevent=""
                    class="w-full grid grid-cols-2 gap-2"
                  >
                    <div class="">
                      <label
                        name="role"
                        for=""
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Ташкилот</label
                      >
                      <el-select
                        clearable
                        @change="
                          AgencyVisaEmployeBindingSelectList(items.agencyId)
                        "
                        required
                        v-model="items.agencyId"
                        class="w-[100%]"
                        placeholder="Танланг"
                      >
                        <el-option
                          v-for="item in AgencyOptions"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                    <div class="">
                      <label
                        name="role"
                        for=""
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Виза қўйувчи Ф.И.Ш.
                      </label>
                      <el-select
                        clearable
                        required
                        v-model="items.agencyVisaEmployeeId"
                        class="w-[100%]"
                        placeholder="Танланг"
                      >
                        <el-option
                          v-for="item in AgencyVisaEmployeeServiceOptions"
                          :key="item.value"
                          :label="item.text"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                    <div class="">
                      <label
                        for=""
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Масъул ходим</label
                      >
                      <input
                        v-model="items.responsibleEmployee"
                        type="text"
                        id=""
                        class="bg-white border border-gray-300 text-gray-900 text-[13px] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-[6px] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                      />
                    </div>

                    <div class="">
                      <label
                        for=""
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Телефон рақам</label
                      >
                      <input
                        mask="(+998)"
                        v-model="items.phoneNumber"
                        type="tel"
                        id="question"
                        class="bg-white border border-gray-300 text-gray-900 text-[13px] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-[6px] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                      />
                    </div>
                    <div class="">
                      <label
                        for=""
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Виза учун киритилган сана</label
                      >
                      <el-date-picker
                        v-model="items.prepareToVisaOn"
                        type="date"
                        placeholder="сана"
                        format="DD.MM.YYYY"
                        value-format="DD.MM.YYYY"
                      />
                    </div>
                    <div class="">
                      <label
                        for=""
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Виза қўйилган сана</label
                      >
                      <el-date-picker
                        v-model="items.visaSetOn"
                        type="date"
                        placeholder="сана"
                        format="DD.MM.YYYY"
                        value-format="DD.MM.YYYY"
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  @click="ModalTwo"
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Ёпиш
                </button>
                <button
                  @click="Ministry_Table_Two"
                  type="submit"
                  class="text-white bg-[#2cce7d] hover:bg-[#36d887] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Сақлаш
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
