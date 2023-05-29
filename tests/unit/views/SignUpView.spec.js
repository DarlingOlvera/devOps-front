import { shallowMount } from "@vue/test-utils";
import Signup from '@/views/SignUpView.vue'


jest.mock('vuetify', () => ({
  useDisplay: jest.fn(() => ({ xs: true })),
}));


jest.mock('vue-router',()=>({
  useRouter: jest.fn(()=>({router:'login'}))
}))

describe('Pruebas en SignUpView', () => {

  test('should match snaptshot', () => {
     const wrapper = shallowMount(Signup)

      //expect(wrapper.html()).toMatchSnapshot()
  });
});
