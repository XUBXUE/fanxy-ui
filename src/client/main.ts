import { createApp } from "vue";
import App from "./App.vue";
import { componentsInstall } from "../index";

createApp(App).use(componentsInstall()).mount("#app");
