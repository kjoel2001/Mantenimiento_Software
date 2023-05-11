<template>
  <main class="main">
    <div class="container">
      <div class="cart">
        <h1 class="cart__title">Carrito</h1>
        <form action="">
          <p v-if="items.length < 1">tu carrito esta vacio</p>
          <CartItem v-for="item in items" :key="item.id" :item="item" />
        </form>
        <div class="cart__info">
          <div class="cart__coupon">
            <form action="">
              <div class="cart__coupon-div">
                <input
                  type="text"
                  placeholder="ingresar codigo de cupon"
                  class="cart__coupon-input"
                />
                <button class="btn-coupon">aplicar</button>
              </div>
            </form>
          </div>
          <div class="cart__table">
            <table>
              <tbody>
                <tr>
                  <th>subtotal</th>
                  <td>{{ formattedPrice(subtotal) }}</td>
                </tr>
                <tr>
                  <th>tax</th>
                  <td>{{ formattedPrice(tax) }}</td>
                </tr>
                <tr>
                  <th>descuento</th>
                  <td class="text-red">0</td>
                </tr>
                <tr>
                  <th>total</th>
                  <td class="text-blue">{{ formattedPrice(total) }}</td>
                </tr>
              </tbody>
            </table> 
            <input
              type="text"
              placeholder="Ingresar correo"
              class="cart__coupon-input"
              v-model="correoDestinatario"
            />  
            <button class="btn-coupon" @click="enviarCorreo">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';
import { mapState, mapGetters } from 'vuex'
import CartItem from '../components/CartItem'
export default {
  name: 'Cart',
  data() {
    return {
      correoDestinatario: '' // Valor inicial vacío
    };
  },
  components: {
    CartItem
  },

  computed: {
    ...mapState('cart', ['items']),
    ...mapGetters('cart', ['subtotal', 'tax', 'total'])
  },
  methods: {
      enviarCorreo() {
  // Construir el contenido del correo con los detalles de los productos
  let contenidoCorreo = 'Detalles de los productos:\n';
  this.items.forEach((item) => {
    contenidoCorreo += `Producto: ${item.name}, Precio: ${item.price}\n`;
  });   

  // Agregar el total al contenido del correo
  contenidoCorreo += `\nSubtotal: ${this.formattedPrice(this.subtotal)}`;
  contenidoCorreo += `\nTax: ${this.formattedPrice(this.tax)}`;
  contenidoCorreo += `\nTotal: ${this.formattedPrice(this.total)}`;


  // Construir los datos del correo 
  const correo = {
    destinatario: this.correoDestinatario, // Usar el valor ingresado por el usuario
    remitente: 'dustgaming25@gmail.com',
    asunto: 'Carrito de compras',
    contenido: contenidoCorreo,
  };

  // Realizar la solicitud POST al servidor para enviar el correo
  axios.post('http://localhost:3000/enviar-correo', correo)
    .then(() => {
      console.log('Correo enviado con éxito');
    })
    .catch((error) => {
      console.error('Error al enviar el correo:', error);
    });
},

    formattedPrice(price) {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD'
      }).format(price)
    }
  }
}
</script>

<style></style>