import express from 'express';
import usersController from '../controllers/usersController';

const router = express.Router();

// GET all users
router.get('/users', usersController.getAllUsers);

// GET user by ID
router.get('/users/:userId', usersController.getUserById);

// POST new user
router.post('/users', usersController.createUser);

// PUT update user by ID
router.put('/users/:userId', usersController.updateUser);

// DELETE user by ID
router.delete('/users/:userId', usersController.deleteUser);

export default router;
