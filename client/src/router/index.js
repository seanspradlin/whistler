import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

const Login = () => import('@/components/Login');

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});

