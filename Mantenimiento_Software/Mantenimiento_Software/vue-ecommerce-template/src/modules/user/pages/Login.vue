<template>
  <main class="main">
    <div class="account">
      <div class="container">
        <h1 class="account__title">Inicio de Sesion</h1>
        <div class="account__form">
          <form @submit.prevent="login">
            <input v-model="email" type="text" class="txt txt--left" placeholder="usuario o email" />
            <input v-model="password" type="password" class="txt txt--left" placeholder="contraseña" />
            <label class="ui-checkbox">
              <input type="checkbox" class="ui-checkbox__input" />
              <span class="ui-checkbox__mark"></span>
              recordar
            </label>
            <router-link :to="{ name: 'ResetPass' }" class="account__recoverpass">Olvide mi contraseña</router-link>
            <button type="submit" class="btn btn--brand btn--boxshadow w--100">iniciar</button>

          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { auth } from '@/firebase.js'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const userCredential = await auth.signInWithEmailAndPassword(this.email, this.password)
        // Si el inicio de sesión es exitoso, redirige al usuario a la página de inicio
        this.$router.push({ name: 'Home' })
        alert('Se inicio sesion')
      } catch (error) {
        // Si ocurre un error durante el inicio de sesión, muestra un mensaje de error
        alert(error.message)
      }
    }
  }
}
</script>

<style></style>
