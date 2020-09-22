import Vue from "vue";
import VueRouter from "vue-router";
import Welcome from "../views/Welcome.vue";
import Create from "../views/Create.vue";
import Calendar from "../views/Calendar.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (
    (to.name == "Create" && store.state.user == null) ||
    (to.name == "Calendar" && store.state.user == null)
  ) {
    next("/");
  } else {
    next();
  }
  next();
});

export default router;
