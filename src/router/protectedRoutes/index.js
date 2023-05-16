import usComponent from '@/components/usuariosComponent.vue'
import cliComponent from '@/components/clientesComponent.vue'
import venComponent from '@/components/vendedoresComponent.vue'
import plComponent from '@/components/planesComponent.vue'
import telComponent from '@/components/telefonosComponent.vue'
export default {

  name:'admin',
  children:[
    {
      path:'/usuarios',
      name:'usuarios',
      component:usComponent
    },
    {
      path:'/clientes',
      name:'clientes',
      component:cliComponent
    },
    {
      path:'/vendedores',
      name:'vendedores',
      component:venComponent
    },
    {
      path:'/planes',
      name:'planes',
      component:plComponent
    },
    {
      path:'/telefonos',
      name:'telefonos',
      component:telComponent
    },
  ]


}
