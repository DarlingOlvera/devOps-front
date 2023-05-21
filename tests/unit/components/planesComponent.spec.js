import { shallowMount } from "@vue/test-utils";
import planes from '@/components/planesComponent.vue'

jest.mock('vuetify', () => ({
  useDisplay: jest.fn(() => ({ xs: true })),
}));

jest.mock('vue-router',()=>({
  useRouter: jest.fn(()=>({router:'login'}))
}))


describe('Pruebas en planesComponent', () => {

  test('should match snaptshot', () => {
    const wrapper = shallowMount(planes)

    expect(wrapper.html()).toMatchSnapshot()
  });
});
