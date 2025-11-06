/**00 

const db = require('../db/conexion');

// ...existing code...
class TareasRepository {
  constructor(db) {
    this.db = db;
  }

  obtenerTareas(limit = 10, offset = 0) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM tareas LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
        if (err) {
          console.error('Error en obtenerTareas query:', err);
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  obtenerTareaPorId(id) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM tareas WHERE id = ?', [id], (err, results) => {
        if (err) {
          console.error('Error en obtenerTareaPorId query:', err);
          return reject(err);
        }
        resolve(results[0] || null);
      });
    });
  }

  crearTarea(nuevaTarea) {
   return new Promise ((resolve,reject)=>{
            this.db.query('INSERT INTO tareas SET ?', nuevaTarea,(err,result)=>{
                if(err){
                    console.error('Error al crear una nueva Tarea(repositorie w): ', err);
                    return reject(err)
                }
                resolve ({id:result.insertId, ...nuevaTarea})
            })
        })
}

  actualizarTarea(id, datosActualizados) {
    return new Promise((resolve, reject) => {
      this.db.query('UPDATE tareas SET ? WHERE id = ?', [datosActualizados, id], (err, result) => {
        if (err) {
          console.error('Error en actualizarTarea query:', err);
          return reject(err);
        }
        resolve(result.affectedRows > 0 ? { id: Number(id), ...datosActualizados } : null);
      });
    });
  }

  eliminarTarea(id) {
    return new Promise((resolve, reject) => {
      this.db.query('DELETE FROM tareas WHERE id = ?', [id], (err, result) => {
        if (err) {
          console.error('Error en eliminarTarea query:', err);
          return reject(err);
        }
        resolve(result.affectedRows > 0);
      });
    });
  }
}

module.exports = TareasRepository;
// ...existing code...*/