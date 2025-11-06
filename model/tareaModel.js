const { DataTypes } = require('sequelize');

const sequelize = require('../db/conexion'); // Asegúrate que este sea tu archivo de conexión

const Tarea = sequelize.define('Tarea', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(120),
    allowNull: true
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  fecha_limite: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  prioridad: {
    type: DataTypes.ENUM('Importante', 'Poco Importante'),
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('Entregado', 'No Entregado'),
    allowNull: true
  }
}, {
  tableName: 'tareas',
  timestamps: false // si tu tabla no tiene createdAt y updatedAt
});

module.exports = Tarea;
