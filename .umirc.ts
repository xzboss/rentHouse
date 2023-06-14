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
  proxy: {
    '/proxy': {
      'target': 'http://127.0.0.1:9999/',
      'changeOrigin': true,
      'pathRewrite': { '^/proxy': '' }
    }
  },
  routes: [
    { path: '/', redirect: "/all" },
    { path: "/:type", component: "index" },
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
