import { shallowMount } from "@vue/test-utils";
import clientes from '@/components/clientesComponent.vue'


jest.mock('vuetify', () => ({
  useDisplay: jest.fn(() => ({ xs: true })),
}));

jest.mock('vue-router',()=>({
  useRouter: jest.fn(()=>({router:'login'}))
}))

describe('Pruebas en clientesComponent', () => {

  test('should match snaptshot', () => {
    const wrapper = shallowMount(clientes)

    expect(wrapper.html()).toMatchSnapshot()
  });
});
