<template>
  <div class="box">
    <div class="doc-ijroci">
      <h4
        class="mt-4 text-[18px] text-gray-400 font-bold text-center mb-5 shadow p-1 rounded"
      >
        Ахборот хати
      </h4>
      <div class="mb-10 container admin-panel">
        <div class="admin-header">
          <form class="grid grid-cols-4 gap-2" @submit.prevent="createQuestion">
            <div class="mb-6">
              <label
                name="resul"
                for=""
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Меъёрий ҳужжат санаси</label
              >
              <input
                type="date"
                id="question"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Savolni kiriting..."
                required
              />
            </div>
            <div class="mb-6 col-span-3">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Ҳужжат қисқача мазмуни</label
              >
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ҳужжат қисқача мазмуни..."
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="doc-vazirlik">
      <h4
        class="mt-4 text-[18px] text-gray-400 font-bold text-center mb-5 shadow p-1 rounded"
      >
        Келишилаётган вазирликлар
      </h4>

      <div class="flex justify-between">
        <div></div>

        <router-link
          to="/explore/create/visae_adder"
          class="text-[12px] inline-flex items-center px-3 py-2 mb-4 text-sm font-medium text-center text-white bg-[#2cce7d] hover:bg-[#36d887] rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >+ Қўшиш</router-link
        >
      </div>

      <div class="rounded shadow">
        <table
          class="w-full text-[12px] text-left dark:text-gray-400 border border-gray-400"
        >
          <thead
            class="text-[11px] text-gray-700 bg-gray-300 dark:bg-gray-700 dark:text-gray-400 border border-gray-400"
          >
            <tr class="">
              <th
                scope="col"
                class="px-2 py-2 text-center border border-gray-400"
              >
                T/p
              </th>
              <th
                scope="col"
                class="px-2 py-2 text-center border border-gray-400"
              >
                Ташкилот
              </th>
              <th
                scope="col"
                class="px-2 py-2 text-center border border-gray-400"
              >
                Виза қўйувчи Ф.И.Ш.
              </th>
              <th
                scope="col"
                class="px-2 py-2 text-center border border-gray-400"
              >
                Масъул ходим
              </th>
              <th
                scope="col"
                class="px-2 py-2 text-center border border-gray-400"
              >
                Телефон рақам
              </th>
              <th
                scope="col"
                class="px-2 py-2 text-center border border-gray-400"
              >
                Виза қўйилган сана
              </th>

              <th
                colspan="2"
                scope="col"
                class="px-2 py-2 text-center border border-gray-400"
              >
                Амаллар
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border border-b-gray-400 dark:bg-gray-800 dark: hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td
                class="px-2 py-2 text-center font-bold border border-gray-400"
              >
                1
              </td>
              <td class="px-2 py-2 text-center border border-gray-400">
                organization
              </td>
              <td class="px-2 py-2 text-center border border-gray-400">
                organization
              </td>
              <td class="px-2 py-2 text-center border border-gray-400">
                no info
              </td>
              <td class="px-2 py-2 text-center border border-gray-400">
                no info
              </td>
              <td class="px-2 py-2 text-center border border-gray-400">
                organization
              </td>

              <td
                scope="col"
                class="flex justify-center gap-1 px-2 py-2 text-center"
              >
                <router-link
                  to=""
                  class="inline-flex items-center mt-4 text-white bg-[#2cce7d] hover:bg-[#36d887] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-1 text-center"
                >
                  <i class="fa-regular fa-pen-to-square text-black"></i>
                </router-link>
                <router-link
                  to=""
                  class="inline-flex items-center mt-4 text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-1 text-center"
                >
                  <i class="text-black fa-regular fa-eye fa-xs"></i>
                </router-link>

                <router-link
                  to=""
                  class="inline-flex items-center mt-4 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-2 py-1 text-center"
                >
                  <i class="text-black fa-sharp fa-solid fa-trash fa-xs"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- <h4
        class="text-[18px] text-gray-400 font-bold text-center py-2"
        v-show="organizations.length === 0"
      >
        Result Empty...
      </h4> -->
    </div>
    <div class="mt-6 flex justify-between">
      <div></div>
      <div class="">
        <router-link
          to=""
          class="text-[12px] inline-flex items-center px-3 py-2 mb-4 text-sm font-medium text-center text-white bg-[#2cce7d] hover:bg-[#36d887] rounded focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            aria-hidden="true"
            class="w-4 h-4 mr-2 fill-current"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Сақлаш</router-link
        >
      </div>
    </div>
  </div>
</template>

<script></script>

<style></style>
