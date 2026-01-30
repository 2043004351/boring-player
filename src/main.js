import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Varlet from "@varlet/ui";
import router from "./router";

import 'uno.css'
import "@varlet/ui/es/style";

const app = createApp(App);

app.use(Varlet);
app.use(router);
app.mount("#app");
