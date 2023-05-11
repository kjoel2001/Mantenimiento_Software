const express = require('express');
const app = express();
const sendGridMail = require('@sendgrid/mail');
const cors = require('cors');
app.use(cors());
sendGridMail.setApiKey(''); // Reemplaza con tu API Key de SendGrid

app.use(express.json());

app.post('/enviar-correo', (req, res) => {
  const { destinatario, remitente, asunto, contenido } = req.body;

  const msg = {
    to: destinatario,
    from: remitente,
    subject: asunto,
    text: contenido,
  };

  sendGridMail
    .send(msg)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error al enviar el correo:', error);
      res.sendStatus(500);
    });
});

app.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
});
