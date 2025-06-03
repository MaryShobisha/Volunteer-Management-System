import express from 'express';
import Project from '../models/Project';

const router = express.Router();

/**
 * @swagger
 * 
 */

/**
 * @swagger
 * 
 */
router.get('/', async (_req, res) => {
  try {
    const data = await Project.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});



export default router;
