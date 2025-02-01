const express = require('express');
const router = express.Router();
// Lista de distintas rutas
const user = require('./user.routes');
const parentPath = '/api'

router.use(parentPath,user);
module.exports = router;