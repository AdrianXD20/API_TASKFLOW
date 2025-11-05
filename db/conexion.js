require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.db_name, 
  process.env.db_user, 
  process.env.db_password, 
  {
    host: process.env.db_host,
    dialect: 'mysql'
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Conexión exitosa broski a la base de datos'))
  .catch(err => console.error('❌ Error al conectar a la base de datos menso:', err));


module.exports = sequelize;