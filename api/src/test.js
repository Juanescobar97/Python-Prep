const { conn } = require('./db');

conn.conn.authenticate()
.then(() => console.log('La conexión a la base de datos está configurada correctamente.'))
.catch((error) => console.error('No se pudo conectar a la base de datos:', error));