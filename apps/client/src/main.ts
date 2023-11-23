import { createApp } from "vue";
import "./assets/main.css";
import App from "./App.vue";
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import VueConfetti from "vue-confetti";
import 'vue3-toastify/dist/index.css';

createApp(App)
  .use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions)
  .use(VueConfetti)
  .mount("#app");
