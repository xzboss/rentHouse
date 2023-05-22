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
      path: "/", component: "index",
      routes: [
        { path: "/:id", component: "index", }
      ]
    },
    
    { path: "/myFavorites", component: "myFavorites" },
    { path: "/myProperties", component: "myProperties" },
    { path: "/myReservations", component: "myReservations" },
    { path: "/myTrips", component: "myTrips" }
  ],
  npmClient: 'pnpm',
});
