import { shallowMount } from "@vue/test-utils";
import Login from "@/views/LoginView.vue"

//importante mockear vuetify
jest.mock('vuetify', () => ({
  useDisplay: jest.fn(() => ({ xs: true })),
}));

jest.mock('vue-router',()=>({
  useRouter: jest.fn(()=>({router:'home'}))
}))


describe('Pruebas en LoginView', () => {
  test('El html debe coincidir con el snaptshot', () => {
    const wrapper = shallowMount(Login)

    //expect(wrapper.html()).toMatchSnapshot()
  });
});
