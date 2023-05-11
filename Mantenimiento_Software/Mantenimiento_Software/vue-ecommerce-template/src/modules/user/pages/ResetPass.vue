<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">Cambiar contraseña</h1>
        <div class="account__form">
          <form @submit.prevent="sendResetLink">
            <input v-model="email" type="text" class="txt txt--left" placeholder="Email o celular" required />
            <button type="submit" class="btn btn--brand btn--boxshadow w--100">Enviar mensaje de cambio de contraseña</button>
            <div class="account__footer">
              <span>¿Ya tienes una cuenta?</span>
              <router-link :to="{ name: 'Login' }" class="account__router">Iniciar sesión</router-link>
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
    }
  },
  methods: {
    sendResetLink() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.$router.push({ name: 'Home' })
          alert('Se ha enviado un correo electrónico para restablecer la contraseña')
        })
        .catch(error => {
          console.error(error)
          alert('Error al enviar correo electrónico de restablecimiento de contraseña')
        })
    }
  }
}
</script>

<style></style>
