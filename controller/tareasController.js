class TareasController {
  constructor(tareasService) {
    this.tareasService = tareasService;
  }

  // 🔹 Obtener todas las tareas (con paginación opcional)
  async obtenerTareas(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const tareas = await this.tareasService.obtenerTareas(parseInt(page), parseInt(limit));
      res.status(200).json(tareas);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      res.status(500).json({ message: 'Error al obtener tareas', error: error.message });
    }
  }

  // 🔹 Obtener tarea por ID
  async obtenerTareaId(req, res) {
    try {
      const { id } = req.params;
      const tarea = await this.tareasService.obtenerTareaId(id);
      if (!tarea) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }
      res.status(200).json(tarea);
    } catch (error) {
      console.error('Error al obtener tarea:', error);
      res.status(500).json({ message: 'Error al obtener la tarea', error: error.message });
    }
  }

  // 🔹 Crear nueva tarea
  async crearTarea(req, res) {
    try {
      const nuevaTarea = req.body;
      const tareaCreada = await this.tareasService.crearTarea(nuevaTarea);
      res.status(201).json({
        message: 'Tarea creada correctamente',
        tarea: tareaCreada,
      });
    } catch (error) {
      console.error('Error al crear tarea:', error);
      res.status(500).json({ message: 'Error al crear la tarea', error: error.message });
    }
  }

  // 🔹 Actualizar tarea
  async actualizarTarea(req, res) {
    try {
      const { id } = req.params;
      const datosActualizados = req.body;

      const tareaActualizada = await this.tareasService.actualizarTarea(id, datosActualizados);

      if (!tareaActualizada) {
        return res.status(404).json({ message: 'Tarea no encontrada para actualizar' });
      }

      res.status(200).json({
        message: 'Tarea actualizada correctamente',
        tarea: tareaActualizada,
      });
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      res.status(500).json({ message: 'Error al actualizar la tarea', error: error.message });
    }
  }

  // 🔹 Eliminar tarea
  async eliminarTarea(req, res) {
    try {
      const { id } = req.params;

      const tareaEliminada = await this.tareasService.eliminarTarea(id);

      if (!tareaEliminada) {
        return res.status(404).json({ message: 'Tarea no encontrada para eliminar' });
      }

      res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      res.status(500).json({ message: 'Error al eliminar la tarea', error: error.message });
    }
  }

  // 🔹 Buscar tareas por nombre (usando LIKE)
  async obtenerTareasPorNombre(req, res) {
    try {
      const { nombre } = req.params;
      const tareas = await this.tareasService.obtenerTareasPorNombre(nombre);

      if (tareas.length === 0) {
        return res.status(404).json({ message: 'No se encontraron tareas con ese nombre' });
      }

      res.status(200).json(tareas);
    } catch (error) {
      console.error('Error al buscar tareas por nombre:', error);
      res.status(500).json({ message: 'Error al buscar tareas', error: error.message });
    }
  }
}

module.exports = TareasController;
