import { createStore } from "vuex";

export default createStore({
  state: {
    loading: false,
    toast: {
      show: false,
      type: "",
      msg: "",
    },

    ministryTableItems: [],
    ministryTableItemsTwo: [],
    isShowModalOne: null,

    // FILTER OPTIONS
    options: [
      {
        value: "20",
        label: "20",
      },
      {
        value: "30",
        label: "30",
      },
      {
        value: "50",
        label: "50",
      },
      {
        value: "80",
        label: "80",
      },
      {
        value: "100",
        label: "100",
      },
    ],
    // END FILTER OPTIONS
  },

  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    ToastError(data) {
      toast.error(data.msg, {
        autoClose: 1000,
      });
    },
    ToastSuccess(data) {
      toast.success(data.msg, {
        autoClose: 1000,
      });
    },

    ToastInfo(data) {
      toast.info(data.msg, {
        autoClose: 1000,
      });
    },

    Ministry_Table(state, items) {
      state.ministryTableItems.push(items);
    },
    Ministry_Table_Two(state, items) {
      state.ministryTableItemsTwo.push(items);
    },
    removeItem(state, id) {
      state.ministryTableItems.pop(id);
    },
    removeItemTwo(state, id) {
      state.ministryTableItemsTwo.pop(id);
    },
    ModalOne(state, data) {
      state.isShowModalOne = data;
      console.log(state.isShowModalOne);
    },
  },

  actions: {
    Ministry_Table({ commit }, items) {
      commit("Ministry_Table", items);
      console.log(items);
    },
    Ministry_Table_Two({ commit }, items) {
      commit("Ministry_Table_Two", items);
    },
    removeItem({ commit }, id) {
      commit("removeItem", id);
    },
    removeItemTwo({ commit }, id) {
      commit("removeItemTwo", id);
    },
    ModalOne({ commit }, data) {
      commit("ModalOne", data);
    },
  },
});
