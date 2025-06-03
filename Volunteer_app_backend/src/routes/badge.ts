import express from 'express';
import {
  createBadge,
  getAllBadges,
  getBadgeById,
  assignBadgeToUser,
  removeBadgeFromUser
} from '../controllers/badge';

const router = express.Router();

/**
 * @swagger
 * 
 */

/**
 * @swagger
 * 
 */

/**
 * @swagger
 * 
 */
router.post('/', createBadge);

/**
 * @swagger
 * 
 */
router.get('/', getAllBadges);

/**
 * @swagger
 * 
 */
router.get('/:id', getBadgeById);

/**
 * @swagger
 * 
 */
router.post('/:badgeId/users/:userId', assignBadgeToUser);

/**
 * @swagger
 * 
 */
router.delete('/:badgeId/users/:userId', removeBadgeFromUser);

export default router;