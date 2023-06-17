import { defineConfig } from "umi";
import { PROXYURL } from './src/constants'
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
      'target': PROXYURL,
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
