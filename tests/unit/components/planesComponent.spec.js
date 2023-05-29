import { shallowMount } from "@vue/test-utils";
import planes from '@/components/planesComponent.vue'
import axios from 'axios'

jest.mock('vuetify', () => ({
  useDisplay: jest.fn(() => ({ xs: true })),
}));

jest.mock('vue-router',()=>({
  useRouter: jest.fn(()=>({router:'login'}))
}))

const mockPlanes = [
  {
    id:1,
    nombre:'plan200',
    costo:299,
    duracion:'1 año',
    redes_gratuitas:'facebook,whatsapp',
    datos:4
  },

]

jest.spyOn(axios, 'get').mockResolvedValue(mockPlanes)

describe('Pruebas en planesComponent', () => {

  test('should match snaptshot', () => {
    const wrapper = shallowMount(planes)

    //expect(wrapper.html()).toMatchSnapshot()
  });

  test('Get planes debe devolver un arreglo de planes', async() => {
    const wrapper = shallowMount(planes)

    expect(axios.get).toHaveBeenCalled()

    expect(axios.get).toHaveBeenCalledWith('planes')

  });
});
