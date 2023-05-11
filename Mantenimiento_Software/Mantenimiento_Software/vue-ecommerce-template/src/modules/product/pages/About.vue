<template>
  <div>
    <button @click="enviarCorreo">Enviar Correo</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    enviarCorreo() {
      const correo = {
        destinatario: 'kjoel2001gamer@gmail.com',
        remitente: 'dustgaming25@gmail.com',
        asunto: 'Asunto del correo',
        contenido: 'Contenido del correo',
      };

      axios 
        .post('http://localhost:3000/enviar-correo', correo)
        .then(() => {
          console.log('Correo enviado con éxito');
        })
        .catch((error) => {
          console.error('Error al enviar el correo:', error);
        });
    },
  },
};
</script>
