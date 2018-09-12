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

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
          {
            path:'/new-post',
            name:'newPost',
            component: NewPost
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
      component: User
    },
    {
      path:'/editprofile',
      name:'editProfile',
      component: EditUserProfile
    },
    {
      path:'/notifications',
      name:'notifications',
      component: Notifications
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
})
