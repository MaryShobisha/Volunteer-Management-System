import express from 'express';
import Category from '../models/Category';
import { addProjectToCategory, getProjectsByCategoryName } from '../controllers/project';

const router = express.Router();

/**
 * @swagger
 * 
 */

/**
 * @swagger
 * 
 */
router.post('/', async (req, res) => {
  try {
    const newProject = await Category.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

/**
 * @swagger
 * 
 */
router.get('/', async (_req, res) => {
  try {
    const data = await Category.find().populate({
      path: 'projects',
      populate: { path: 'users' }
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});


/**
 * @swagger
 * 
 */
router.post('/:category/projects', addProjectToCategory);

/**
 * @swagger
 *
 */
router.get('/:category/projects', getProjectsByCategoryName);


export default router;
