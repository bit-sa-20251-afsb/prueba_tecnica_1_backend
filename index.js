
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const api = require('./routes/api.routes');
dotenv.config();
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/database');
connectDB();
// Inciar la corrida del servidor y escuchar en el puerto que indiqué
app.use('/',api);
app.listen(PORT, () =>{
    console.log(`Escuchando en el punto de entrada: http://localhost:${PORT}`);
})