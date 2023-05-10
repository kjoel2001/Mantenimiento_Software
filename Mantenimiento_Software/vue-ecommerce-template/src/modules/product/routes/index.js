export default [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../pages/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue')
  },
  {
    path: '/juegos',
    name: 'Juegos',
    component: () => import(/* webpackChunkName: "juegos" */ '../pages/Juegos.vue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import(/* webpackChunkName: "product" */ '../pages/Product.vue')
  },
  {
    path: '/consolas',
    name: 'Consolas',
    component: () => import(/* webpackChunkName: "consolas" */ '../pages/Consolas.vue')
  },
  {
    path: '/perifericos',
    name: 'Perifericos',
    component: () => import(/* webpackChunkName: "perifericos" */ '../pages/Perifericos.vue')
  },
  {
    path: '/mandos',
    name: 'Mandos',
    component: () => import(/* webpackChunkName: "mandos" */ '../pages/Mandos.vue')
  },
  {
    path: '/productos',
    name: 'Productos',
    component: () => import(/* webpackChunkName: "productos" */ '../pages/Productos.vue')
  },
]