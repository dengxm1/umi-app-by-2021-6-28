import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '../layouts/index', ///layouts/index
      routes: [
        { path: '/', component: '../pages/flyLine/index' }, ///pages/index
        { path: '/x6', component: '../pages/Index/index' },
        { path: '/ehcarts', component: '../pages/ehcarts/index'},
        { path: '/gdMap', component: '../pages/gdMap/index'},
      ]
    }
  ],
  fastRefresh: {},
});
