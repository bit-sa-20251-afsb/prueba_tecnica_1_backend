const mongoose = require('mongoose');
const url_mongo = process.env.MONGO_URL || "url_default";

const connectDB = async() =>{
    try {
        await mongoose.connect(url_mongo);
        console.log('Base de datos conectada');
    } catch (error) {
        console.log('Hubo un error al intentar conectarse a la base de datos');
    }

}

module.exports = connectDB;