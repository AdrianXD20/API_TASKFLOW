const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // 👈 importa Morgan
const db = require('./db/conexion');
const tareasRoutes = require('./routes/tareasRoutes');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev')); // 👈 muestra logs en consola tipo GET /tareas 200 12ms

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas principales
app.use('/tareas', tareasRoutes); // 👈 ojo, así defines correctamente el prefijo

// Error 404 catch-all
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada', ruta: req.originalUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
