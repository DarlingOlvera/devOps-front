import { shallowMount } from "@vue/test-utils";
import Home from '@/views/HomeView.vue'

jest.mock('vue-router',()=>({
  useRouter: jest.fn(()=>({router:'login'}))
}))

describe('Pruebas en HomeView', () => {
  test('El html debe coincidir con el snaptshot', () => {
    const wrapper = shallowMount(Home)

   // expect(wrapper.html()).toMatchSnapshot()
  });
});
