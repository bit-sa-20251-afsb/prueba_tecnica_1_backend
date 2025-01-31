
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3001;

// Inciar la corrida del servidor y escuchar en el puerto que indiqué
app.listen(PORT, () =>{
    console.log(`Escuchando en el punto de entrada: http://localhost:${PORT}`);
})