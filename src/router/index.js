import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/main'},
    { path: '/main', component: resolve => require(['@/components/main.vue'], resolve),
      children:[
        {path: '/', redirect: '/mycomplain'},
        {path: '/mycomplain',name:"mycomplain", component: resolve => require(['@/components/children/mycomplain.vue'], resolve), },
        {path: '/addcomplain',name:"addcomplain", component: resolve => require(['@/components/children/addcomplain.vue'], resolve),},
        {path: '/mysalve', name:"mysalve",component: resolve => require(['@/components/children/mysalve.vue'], resolve),},
      ]
    },
    {path: '/complainItem', component: resolve => require(['@/components/complainItem.vue'], resolve)},
    {path: '/nodeList', component: resolve => require(['@/components/nodeList.vue'], resolve)},
  ]
})
