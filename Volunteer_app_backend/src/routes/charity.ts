import express from 'express';
import {
  getAllCharities,
  createCharity,
  donateToCharity,
  addCharityToCategory,
  getCharitiesByCategoryName,
} from '../controllers/charity';

const router = express.Router();

/**
 * @swagger
 *
 */

/**
 * @swagger
 * 
 */
router.get('/', getAllCharities);

/**
 * @swagger
 * 
 */
router.post('/', createCharity);

/**
 * @swagger
 * 
 */
router.post('/:id/donate', donateToCharity);

/**
 * @swagger
 * 
 */
router.post('/category/:category', addCharityToCategory);

/**
 * @swagger
 * 
 */
router.get('/category/:category', getCharitiesByCategoryName);

export default router;