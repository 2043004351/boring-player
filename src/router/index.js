import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/Main.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
  {
    path: "/detail",
    component: () => import("@/views/detail/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
