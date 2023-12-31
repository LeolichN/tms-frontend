import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import db from '@/utils/localstorage'
import store from '@/store/index'
import loginApi from '@/api/Login.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(Router)

const constRouter = [
  {
    path: '/redirect',
    component: Layout,
    redirect: '/redirect',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/login',
    name: '登录页',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      },
      {
        hidden: true,
        path: '/sms/manage/edit',
        component: () => import('@/views/tms/sms/manage/Edit'),
        name: 'smsEdit',
        meta: {
          title: '发送短信', icon: '', noCache: true
        }
      }
    ]
  },
  {
    path: '/order-manage',
    component: { render: (e) => e("router-view") },
    children: [{
      path: 'list',
      meta: {
        i18n: 'test'
      },
      component: () =>
        import('@/views/tms/order/Index')
    }, {
      path: 'detail',
      meta: {
        i18n: 'test'
      },
      component: () =>
        import('@/views/tms/order/Detail')
    }]
  },
  {
    path: '/transOrder',
    redirect: '/transOrder/list',
    component: { render: (e) => e("router-view") },
    children: [{
      path: 'list',
      meta: {
        i18n: 'test'
      },
      component: () =>
        import('@/views/tms/trans-order/Index')
    }]
  },
  {
    path: '/transport',
    redirect: '/transport/list',
    component: { render: (e) => e("router-view") },
    children: [{
      path: 'list',
      component: () =>
        import('@/views/tms/transport/tasktransport')
    }]
  },
  {
    path: '/transit',
    component: { render: (e) => e("router-view") },
    children: [{
      path: 'car-models',
      component: () =>
        import('@/views/tms/transit/TruckType')
    },
    {
      path: 'motorcade',
      component: () =>
        import('@/views/tms/transit/FleetManage')
    },
    {
      path: 'vehicle',
      component: () =>
        import('@/views/tms/transit/TruckManage')
    },
    {
      path: 'driver',
      component: () =>
        import('@/views/tms/transit/TruckDriver')
    },
    {
      path: 'line-manage',
      component: () =>
        import('@/views/tms/transit/TransportLine')
    },
    {
      path: 'line-type',
      component: () =>
        import('@/views/tms/transit/TransportLineType')
    },]
  },
  {
    path: '/branches',
    component: { render: (e) => e("router-view") },
    children: [{
      path: 'goods-type',
      component: () =>
        import('@/views/tms/goods/Index')
    }, {
      path: 'operational-range',
      component: () =>
        import('@/views/tms/branch/courierScope')
    }, {
      path: 'operational',
      component: () =>
        import('@/views/tms/branch/courierOrder')
    }]
  },
  {
    path: '/organization',
    component: { render: (e) => e("router-view") },
    children: [{
      path: 'institutions-jobs-area',
      component: () =>
        import('@/views/tms/org-area/org-area')
    }]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },
  {
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    children: [{
      path: ":routerPath",
      name: 'iframe',
      component: () => import('@/views/iframe/index'),
      props: true
    }]

  }

]

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constRouter
})
const whiteList = ['/login']

let asyncRouter

// 导航守卫，渲染动态路由
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    const token = db.get('TOKEN')
    const user = db.get('USER')
    const userRouter = get('USER_ROUTER')
    if (token.length && user) {
      if (!asyncRouter) {
        if (!userRouter) {
          loginApi.getRouter({})
            .then((response) => {
              const res = response.data
              asyncRouter = res.data
              store.commit('account/setRoutes', asyncRouter)
              save('USER_ROUTER', asyncRouter)
              go(to, next)
            })
        } else {
          asyncRouter = userRouter
          go(to, next)
        }
      } else {
        next()
      }
    } else {
      if (to.path === '/login') {
        next()
      } else {
        next('/login')
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

function go(to, next) {
  asyncRouter = filterAsyncRouter(asyncRouter)
  router.addRoutes(asyncRouter)
  next({ ...to, replace: true })
}

function save(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

function get(name) {
  return JSON.parse(localStorage.getItem(name))
}

function filterAsyncRouter(routes) {
  return routes.filter((route) => {
    const component = route.component
    if (component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = view(component)
      }
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children)
      }
      return true
    }
  })
}

function view(path) {
  return (resolve) =>
    require([`@/views/${path}`], resolve)

}

export default router
