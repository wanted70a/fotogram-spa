import Vue from 'vue'
import Router from 'vue-router'
import Test from './components/Test.vue'
import TestChild from './components/TestChild.vue'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Terms from './views/Terms.vue'
import User from './views/User.vue'
import EditUserProfile from './views/EditUserProfile.vue'
import NewPost from './views/NewPost.vue'
import Notifications from './views/Notifications.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
      children:[
          {
            path:'/new-post',
            name:'newPost',
            component: NewPost,
            meta: { requiresAuth: true }
          },
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path:'/login',
      name:'login',
      component: Login
    },
    {
      path:'/terms',
      name:'terms',
      component: Terms
    },

    {
      path:'/user/:id',
      name:'user',
      component: User,
      meta: { requiresAuth: true }
    },
    {
      path:'/editprofile',
      name:'editProfile',
      component: EditUserProfile,
      meta: { requiresAuth: true }
    },
    {
      path:'/notifications',
      name:'notifications',
      component: Notifications,
      meta: { requiresAuth: true }
    },
    {
        path:'/test',
        name:'test',
        component: Test,
        children: [
            {
              path: '2',
              name: 'testchild',
              component: TestChild,
            },
        ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some( (record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    if (!localStorage.hasOwnProperty('token')) {
        //if user is loged in
      next({
        path: '/login',
        //query: { redirect: to.fullPath }
      })
    } else {
        //if user is loged in
      next()
    }
  } else {
      //route does not require aithorization
    next() // make sure to always call next()!
  }
})

export default router;
