import express from 'express';
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} from '../controller/adminController.js';
import { getAllApplications, updateApplicationStatus, getStatusList } from '../controller/applicationController.js';

const router = express.Router();

/**
 * Admin Routes

 */

// POST /api/admin/services - Create a new service
router.post('/services', createService);

// GET /api/admin/services - Get all services
router.get('/services', getAllServices);

// GET /api/admin/services/:id - Get a single service
router.get('/services/:id', getServiceById);

// PUT /api/admin/services/:id - Update a service
router.put('/services/:id', updateService);

// DELETE /api/admin/services/:id - Delete a service
router.delete('/services/:id', deleteService);

// Applications (admin/staff) – define /statuses before /:id
router.get('/applications/statuses', getStatusList);
router.get('/applications', getAllApplications);
router.put('/applications/:id/status', updateApplicationStatus);

export default router;
