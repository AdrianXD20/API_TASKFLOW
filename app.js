const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); 
const db = require('./db/conexion');
const tareasRoutes = require('./routes/tareasRoutes');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');

const app = express();


app.use(bodyParser.json());
app.use(morgan('dev')); 

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas principales
app.use('/tareas', tareasRoutes); 


app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada', ruta: req.originalUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
