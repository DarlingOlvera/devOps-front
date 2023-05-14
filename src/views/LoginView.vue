<script setup>
import axios from 'axios';
import {ref} from 'vue'
import { Form, Field } from 'vee-validate';
import { useDisplay } from 'vuetify';
import { useRouter } from 'vue-router';


const {xs} = useDisplay()
const router = useRouter()

const email = ref('')
const password = ref('')

const schema = {
  email: 'email|required',
  password:'required'
}

const onSubmit = async() =>{

  let params = {email:email.value, password:password.value}
  try {
    await axios.post('usuarios/signin',params).then(resp =>{
      localStorage.setItem('tokenAuth',resp.data)
      localStorage.setItem('logged',true)

      axios.defaults.headers.common['Authorization'] = `Bearer${resp.data}`
      console.log('Sesion iniciada');
      //reset
      email.value = ''
      password.value = ''

      router.push({name:'home'})

    })
  } catch (error) {
    console.log('ocurrio un problema al iniciar la sesion',error);
  }
}

</script>

<template>
    <v-container fluid>
      <v-row class="d-flex justify-center my-10">
        <h3 class="text-h2 text-title">Iniciar Sesión</h3>
      </v-row>
      <v-row class="d-flex justify-center mt-15">
        <v-card
        class="pa-10 rounded-xl"
        :class="xs ? 'elevation-0' : 'elevation-5'"
        width="100%"
        max-width="500"
        height="auto">
          <Form
          name="loginForm"
          ref="obs"
          :validation-schema="schema"
          @submit ="onSubmit">
            <v-row class="d-flex justify-center">
              <div class="pa-0" style="width: 100%;">
                <h3 class="text-caption text-secondary">Correo</h3>
                <Field
                as="div"
                name="email"
                v-slot="{errorMessage,field}">
                  <v-text-field
                  variant="outlined"
                  color="secondary"
                  placeholder="Email"
                  density="compact"
                  v-model="email"
                  v-bind="field"
                  :error-messages="errorMessage"></v-text-field>
                </Field>
              </div>
            </v-row>
            <v-row class="d-flex justify-center">
            <div class="pa-0" style="width: 100%;">
              <h3 class="text-caption text-secondary">Contraseña</h3>
              <Field
              as="div"
              name="password"
              v-slot="{errorMessage,field}">
                <v-text-field
                variant="outlined"
                color="secondary"
                placeholder="Password"
                density="compact"
                v-model="password"
                v-bind="field"
                :error-messages="errorMessage"></v-text-field>
              </Field>
            </div>
          </v-row>
          <v-row class="d-flex justify-center my-10">
            <v-btn
            color="primary"
            class="rounded-xl boton"
            type="submit">Iniciar Sesión</v-btn>
          </v-row>
          </Form>
        </v-card>
      </v-row>
    </v-container>
</template>

<style scoped>

</style>
