import { shallowMount } from "@vue/test-utils";
import telefonos from '@/components/telefonosComponent.vue'

jest.mock('vuetify', () => ({
  useDisplay: jest.fn(() => ({ xs: true })),
}));

jest.mock('vue-router',()=>({
  useRouter: jest.fn(()=>({router:'login'}))
}))


describe('Pruebas en telefonosComponent', () => {
  test('should match snaptshot', () => {
    const wrapper = shallowMount(telefonos)

    expect(wrapper.html()).toMatchSnapshot()
  });
});
