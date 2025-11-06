const express = require('express');
const router = express.Router();

const TareasService = require('../services/tareasServices');
const TareasController = require('../controller/tareasController');

const tareasService = new TareasService();
const tareasController = new TareasController(tareasService);
/**
 * @swagger
 * tags:
 *   - name: Tareas
 *     description: API para gestionar tareas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tarea:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Entregar reporte final"
 *         descripcion:
 *           type: string
 *           example: "Elaborar y entregar el reporte final del proyecto de investigación"
 *         fecha_limite:
 *           type: string
 *           format: date
 *           example: "2025-11-15"
 *         prioridad:
 *           type: string
 *           enum: ['Alta', 'Media', 'Baja']
 *           example: "Alta"
 *         estado:
 *           type: string
 *           enum: ['Pendiente', 'Completado', 'En proceso']
 *           example: "En proceso"
 *         estrategia:
 *           type: string
 *           example: "Dividir el trabajo en secciones y asignar fechas límite para cada una"
 */

/**
 * @swagger
 * /tareas:
 *   get:
 *     summary: Obtener lista de tareas (paginado)
 *     tags: [Tareas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarea'
 */
router.get('/', (req, res) => tareasController.obtenerTareas(req, res));
/**
   * @swagger
   * /tareas/{id}:
   *   get:
   *     summary: Obtener tarea por id
   *     tags: [Tareas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Tarea encontrada
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Tarea'
   *       404:
   *         description: Tarea no encontrada
   */
router.get('/:id', (req, res) => tareasController.obtenerTareaId(req, res));
 /**
   * @swagger
   * /tareas:
   *   post:
   *     summary: Crear una nueva tarea
   *     tags: [Tareas]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Tarea'
   *     responses:
   *       201:
   *         description: Tarea creada exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Tarea'
   *       400:
   *         description: Datos inválidos
   */
router.post('/', (req, res) => tareasController.crearTarea(req, res));

  /**
   * @swagger
   * /tareas/{id}:
   *   put:
   *     summary: Actualizar tarea por id
   *     tags: [Tareas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Tarea'
   *     responses:
   *       200:
   *         description: Tarea actualizada correctamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Tarea'
   *       404:
   *         description: Tarea no encontrada
   */
router.put('/:id', (req, res) => tareasController.actualizarTarea(req, res));

  /**
   * @swagger
   * /tareas/{id}:
   *   delete:
   *     summary: Eliminar tarea por id
   *     tags: [Tareas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Tarea eliminada correctamente
   *       404:
   *         description: Tarea no encontrada
   */
router.delete('/:id', (req, res) => tareasController.eliminarTarea(req, res));


router.get('/buscar/:nombre', (req, res) => tareasController.obtenerTareasPorNombre(req, res));

module.exports = router;
