<template></template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import { useStore } from "vuex";
import { reactive, computed } from "vue";
import api from "@/helpers/api";

const store = useStore();

const user = reactive({
  email: "",
  userName: "",
  password: "",
});

const loading = computed(() => {
  return store.state.loading;
});

const login = async (e) => {
  try {
    e.preventDefault();
    if (!user.userName || !user.password) {
      alert("Hamma qatorlarni to'ldiring");
    } else {
      const NewUser = reactive({
        email: user.email,
        userName: user.userName,
        password: user.password,
        personId: Number(route.params.id),
      });
      const res = await axios.post(
        "http://construction-api.apptest.uz/User/CreateUser",
        NewUser
      );
      router.push("/login");
    }
  } catch (err) {
    console.log(err);
  }
};
</script>

<style></style>
