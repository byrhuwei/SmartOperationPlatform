import Vue from 'vue'
import Router from 'vue-router'

//主页
import index from '@/components/index/index'
//默认首页
import defaultIndex from '@/components/layout/main/defaultIndex/defaultIndex'
//转售系统首页
import zsIndex from '@/components/layout/main/zs/zsIndex/zsIndex'
import zsType1 from '@/components/layout/main/zs/zsType/zsType1'
import zsType2 from '@/components/layout/main/zs/zsType/zsType2'
import zsType3 from '@/components/layout/main/zs/zsType/zsType3'
import zsType4 from '@/components/layout/main/zs/zsType/zsType4'
//内容计费系统首页
import basIndex from '@/components/layout/main/bas/basIndex/basIndex'
import basType1 from '@/components/layout/main/bas/basType/basType1'
import basType2 from '@/components/layout/main/bas/basType/basType2'
import basType3 from '@/components/layout/main/bas/basType/basType3'
import dashboard from '@/components/layout/main/bas/basType/dashboard'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: index,
    children: [
      {
        path: '',
        component: defaultIndex
      },
      {
        path: 'zsIndex',
        component: zsIndex,
        children: [
          { path: '', redirect: 'zsType1' },
          { path: 'zsType1', name: 'zsType1', component: zsType1 },
          { path: 'zsType2', name: 'zsType2', component: zsType2 },
          { path: 'zsType3', name: 'zsType3', component: zsType3 },
          { path: 'zsType4', name: 'zsType4', component: zsType4 }
        ]
      },
      {
        path: 'basIndex',
        component: basIndex,
        children: [
          { path: '', redirect: 'basType1' },
          { path: 'basType1', name: 'basType1', component: basType1 },
          { path: 'basType2', name: 'basType2', component: basType2 },
          { path: 'basType3', name: 'basType3', component: basType3 },
					{ path: 'dashboard', name: 'dashboard', component: dashboard }
        ]
      }
    ]
  },
  ],
  mode: 'history'
})
