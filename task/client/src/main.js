import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
import router from "./router";
import store from "./store";
import "./index.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
app.use(ElementPlus);

app.use(store).use(router).mount("#app");
