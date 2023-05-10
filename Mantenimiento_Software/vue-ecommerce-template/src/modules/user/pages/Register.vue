<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">Formulario de registro</h1>
        <div class="account__form">
          <form @submit.prevent="register">
            <input v-model="email" type="email" class="txt txt--left" placeholder="email" required />
            <input v-model="password" type="password" class="txt txt--left" placeholder="contraseña" required />
            <button type="submit" class="btn btn--brand btn--boxshadow w--100 margin--bottom-10">
              registrarse
            </button>
            <button type="button" class="btn btn--cancel btn--cancel w--100" @click="cancel">
              cancelar
            </button>

            <div class="account__footer">
              <span>ya tienes una cuenta? </span>
              <router-link :to="{ name: 'Login' }" class="account__router">
                Inicio de Sesion
              </router-link>
            </div>
            <div v-if="registered" class="alert alert-success" role="alert">
              Registro completado exitosamente.
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import firebase from '@/firebase.js'
import 'firebase/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
      registered: false // nuevo estado para comprobar si el usuario se ha registrado con éxito
    }
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(userCredential => {
          console.log(userCredential.user)
          // Aquí podríamos redirigir al usuario a la página de inicio
          this.$router.push({ name: 'Home' })
          this.registered = true // cambia el valor de "registered" a "true"
          alert('Se completo el registro')
        })
        .catch(error => {
          console.error(error)
        })
    },
    cancel() {
      this.$router.push({ name: 'Home' })
    },
  },
}
</script>

<style>
.alert {
  padding: 1rem;
  border-radius: 0.25rem;
}
.alert-success {
  background-color: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
}
</style>
