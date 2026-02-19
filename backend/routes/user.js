import express from 'express';
import { register, login } from '../controller/userController.js';
import { submitApplication, getMyApplications } from '../controller/applicationController.js';

const router = express.Router();

// POST /api/register - User registration
router.post('/register', register);
// POST /api/login - User (citizen) login
router.post('/login', login);

// POST /api/applications - Submit new application (requires userId in body)
router.post('/applications', submitApplication);
// GET /api/applications/my?userId= - Get current user's applications
router.get('/applications/my', getMyApplications);

export default router;
