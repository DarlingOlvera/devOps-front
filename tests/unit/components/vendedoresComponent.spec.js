import { flushPromises, shallowMount } from "@vue/test-utils";
import vendedores from '@/components/vendedoresComponent.vue'
import axios from 'axios'

const mockVendedores = [
  {
    id:1,
    nombre:'Pedro Ramirez',
    email:'pedro@email.com',
    num_ventas:10,
    hora_entrada:'09:00:00',
    hora_salida:'18:00:00'
  },
  {
    id:2,
    nombre:'Maria Perez',
    email:'maria@email.com',
    num_ventas:11,
    hora_entrada:'09:00:00',
    hora_salida:'18:00:00'
  }
]

jest.mock('vuetify', () => ({
  useDisplay: jest.fn(() => ({ xs: true })),
}));

jest.mock('vue-router',()=>({
  useRouter: jest.fn(()=>({router:'login'}))
}))

jest.spyOn(axios, 'get').mockResolvedValue(mockVendedores)

describe('Pruebas en vendedoresComponent', () => {

  test('Get vendedores debe devolver un arreglo de vendedores', async() => {
    const wrapper = shallowMount(vendedores)

    expect(axios.get).toHaveBeenCalled()

    expect(axios.get).toHaveBeenCalledWith('vendedores')

  });
});
