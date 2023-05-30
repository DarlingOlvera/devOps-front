import { shallowMount } from "@vue/test-utils";
import clientes from '@/components/clientesComponent.vue'
import axios from 'axios'

jest.mock('vuetify', () => ({
  useDisplay: jest.fn(() => ({ xs: true })),
}));

jest.mock('vue-router',()=>({
  useRouter: jest.fn(()=>({router:'login'}))
}))

const mockClientes = [
  {
    id:1,
    nombre:'Bob Esponja',
    edad:18,
    telefono:'999134730',
    tipo_compra:'equipo android',
    fecha_compra:'2023-05-12'
  },

]

jest.spyOn(axios, 'get').mockResolvedValue(mockClientes)

describe('Pruebas en clientesComponent', () => {

  test('should match snaptshot', () => {
    const wrapper = shallowMount(clientes)

    //expect(wrapper.html()).toMatchSnapshot()
  });

  test('Get telefonos debe devolver un arreglo de telefonos', async() => {
    const wrapper = shallowMount(clientes)

    expect(axios.get).toHaveBeenCalled()

    expect(axios.get).toHaveBeenCalledWith('clientes')

  });

});
