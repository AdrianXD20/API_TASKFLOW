const tareas = require('../model/tareaModel');
const { Op } = require('sequelize');

class TareasService {

  async obtenerTareas(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return tareas.findAll({ limit, offset });
  }

  async obtenerTareaId(id) {
    return tareas.findByPk(id);
  }

  async crearTarea(newTarea) {
    return tareas.create(newTarea);
  }

  async actualizarTarea(id, datosActualizados) {
    const tarea = await tareas.findByPk(id);
    if (!tarea) return null;

    await tareas.update(datosActualizados, { where: { id } });
    return tareas.findByPk(id);
  }

  async eliminarTarea(id) {
    const tarea = await tareas.findByPk(id);
    if (!tarea) return null;

    await tareas.destroy({ where: { id } });
    return true;
  }

  async obtenerTareasPorNombre(nombre) {
    return tareas.findAll({
      where: {
        nombre: {
          [Op.like]: `%${nombre}%`
        }
      }
    });
  }
}

module.exports = TareasService;

