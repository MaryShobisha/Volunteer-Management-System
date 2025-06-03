import express from 'express';
import { applyToProject, changePassword, forgotPassword, getCategoriesByUsers, getCurrentUser, getLeaderboard, getProjectsByUsers, getProjectsDetailByUsers, getTotalProjectsCount, getTotalUsers, getTotalUsersCount, login, register, resetPassword, updateCurrentUser, updateUserPoints } from '../controllers';
import { authenticate } from '../middlewares';

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
router.post('/register', register);


/**
 * @swagger
 * 
 */
router.post('/login', login);

// Adding a protected route to test authorization
/**
 * @swagger
 * 
 */

router.get('/profile', authenticate,  getCurrentUser);
/**
 * @swagger
 * 
 */

router.put('/profile', authenticate, updateCurrentUser);

/**
 * @swagger
 * 
 */
router.get(
  '/profile/applications/projects',authenticate,getProjectsByUsers
)


/**
 * @swagger
 * 
 */
router.get(
  '/profile/applications/projectsdetail',authenticate,getProjectsDetailByUsers
)

/**
 * @swagger
 *
 */
router.get(
  '/admin/gettotalusercount', authenticate, getTotalUsersCount
);

/**
 * @swagger
 * 
 */
router.get(
  '/admin/gettotalusers', authenticate, getTotalUsers
);

/**
 * @swagger
 * 
 */
router.get(
  '/admin/gettotalprojectcount', authenticate, getTotalProjectsCount
);

/**
 * @swagger
 
 */
router.get(
  '/profile/applications/categories',authenticate,getCategoriesByUsers
)



/**
  @swagger
 
 */
router.post(
  '/profile/applications/:projectId',
  authenticate,
  applyToProject
);


/**
 * @swagger
 * 
 */
router.post('/change-password', authenticate, changePassword);
router.get('/leaderboard', authenticate,getLeaderboard);
router.put('/:userId/points',authenticate, updateUserPoints);
//Adding route for forget password
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:userId/:token', resetPassword);

export default router;