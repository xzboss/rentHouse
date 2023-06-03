import { defineConfig } from "umi";

export default defineConfig({
  plugins: [
    '@umijs/plugins/dist/antd',
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/initial-state'
  ],
  antd: {},
  model: {},
  /* initialState: {}, */
  routes: [
    {
      path: '/', redirect: '/沙滩'
    },
    { path: "/:type", component: "index", },
    {
      path: "/myFavorites", component: "myFavorites", wrappers: [
        '@/wrappers/auth',
      ],
    },
    {
      path: "/myProperties", component: "myProperties", wrappers: [
        '@/wrappers/auth',
      ],
    },
    {
      path: "/myReservations", component: "myReservations", wrappers: [
        '@/wrappers/auth',
      ],
    },
    {
      path: "/myTrips", component: "myTrips", wrappers: [
        '@/wrappers/auth',
      ],
    },
    { path: "/detail", component: "detail" },
    { path: '/*', component: '404' }
  ],
  npmClient: 'pnpm',
});
