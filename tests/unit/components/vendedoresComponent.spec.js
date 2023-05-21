import { shallowMount } from "@vue/test-utils";
import vendedores from '@/components/vendedoresComponent.vue'

jest.mock('vuetify', () => ({
  useDisplay: jest.fn(() => ({ xs: true })),
}));

jest.mock('vue-router',()=>({
  useRouter: jest.fn(()=>({router:'login'}))
}))

describe('Pruebas en vendedoresComponent', () => {

  test('should match snaptshot', () => {
    const wrapper = shallowMount(vendedores)

    expect(wrapper.html()).toMatchSnapshot()
  });
});
