export default [
  {
    path:'/usuarios',
    name:'usuarios',
    component:() => import('@/components/usuariosComponent.vue')
  },
  {
    path:'/clientes',
    name:'clientes',
    component:() => import('@/components/clientesComponent.vue')
  },
  {
    path:'/vendedores',
    name:'vendedores',
    component:() => import('@/components/vendedoresComponent.vue')
  },
  {
    path:'/planes',
    name:'planes',
    component:() => import('@/components/planesComponent.vue')
  },
  {
    path:'/telefonos',
    name:'telefonos',
    component:() => import('@/components/telefonosComponent.vue')
  },

]
