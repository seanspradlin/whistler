import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Account from '@/components/Account';
import CreateProject from '@/components/CreateProject';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Users from '@/components/Users';
import ViewProject from '@/components/ViewProject';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
    },
    {
      path: '/projects/new',
      name: 'CreateProject',
      component: CreateProject,
    },
    {
      path: '/projects/:projectId',
      name: 'ViewProject',
      component: ViewProject,
    },
    {
      path: '/services',
      name: 'Services',
      component: Services,
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
    },
  ],
});

