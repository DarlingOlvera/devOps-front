import { shallowMount } from "@vue/test-utils";
import telefonos from '@/components/telefonosComponent.vue'
import axios from 'axios'

jest.mock('vuetify', () => ({
  useDisplay: jest.fn(() => ({ xs: true })),
}));

jest.mock('vue-router',()=>({
  useRouter: jest.fn(()=>({router:'login'}))
}))

const mockTelefonos = [
  {
    id:1,
    modelo:'Redmi Note 9',
    marca:'xiaomi',
    procesador:'MediaTek Helio G85',
    ram_gb:4,
    almacenamiento_gb:128
  },

]

jest.spyOn(axios, 'get').mockResolvedValue(mockTelefonos)

describe('Pruebas en telefonosComponent', () => {
  test('should match snaptshot', () => {
    const wrapper = shallowMount(telefonos)

    //expect(wrapper.html()).toMatchSnapshot()
  });
  test('Get telefonos debe devolver un arreglo de telefonos', async() => {
    const wrapper = shallowMount(telefonos)

    expect(axios.get).toHaveBeenCalled()

    expect(axios.get).toHaveBeenCalledWith('telefonos')

  });
});
