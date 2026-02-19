import ServiceModel from '../models/Service.js';

/**
 * Admin Controller - Handles all admin-related operations
 * Includes logging for every action as per requirements
 */

/**
 * Create a new service with dynamic form fields
 * Admin can define:
 * - Service name and description
 * - Dynamic form fields with:
 *   - Label
 *   - Input type (text, textarea, checkbox, radio, select, file)
 *   - Placeholder text
 *   - Required validation
 *   - Options for select/radio/checkbox
 */
const createService = async (req, res) => {
  try {
    console.log('[AdminController] Creating new service:', req.body.name);

    const { name, description, fields, createdBy } = req.body;

    // Validation
    if (!name || !name.trim()) {
      console.log('[AdminController] Error: Service name is required');
      return res.status(400).json({
        success: false,
        message: 'Service name is required'
      });
    }

    if (!fields || !Array.isArray(fields) || fields.length === 0) {
      console.log('[AdminController] Error: At least one field is required');
      return res.status(400).json({
        success: false,
        message: 'At least one form field is required'
      });
    }

    // Validating each field
    const validFieldTypes = ['text', 'textarea', 'number', 'email', 'tel', 'date', 'checkbox', 'radio', 'select', 'file', 'textarea'];

    for (const field of fields) {
      if (!field.label || !field.label.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Each field must have a label'
        });
      }

      if (!field.type || !validFieldTypes.includes(field.type)) {
        return res.status(400).json({
          success: false,
          message: `Invalid field type: ${field.type}`
        });
      }

      // For select and radio fields, options are required
      if ((field.type === 'select' || field.type === 'radio') &&
        (!field.options || !Array.isArray(field.options) || field.options.length === 0)) {
        return res.status(400).json({
          success: false,
          message: `Field "${field.label}" requires options`
        });
      }
    }

    const serviceId = await ServiceModel.create({
      name: name.trim(),
      description: description ? description.trim() : '',
      fields,
      createdBy: createdBy || 'admin'
    });

    console.log(`[AdminController] Service created successfully with ID: ${serviceId}`);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      serviceId
    });
  } catch (error) {
    console.error('[AdminController] Error creating service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create service',
      error: error.message
    });
  }
};

/**
 * Get all services
 * Can filter by active status
 */
const getAllServices = async (req, res) => {
  try {
    console.log('[AdminController] Fetching all services');

    const { active } = req.query;
    const options = {};

    if (active !== undefined) {
      options.activeOnly = active === 'true';
    }

    const services = await ServiceModel.getAll(options);

    console.log(`[AdminController] Retrieved ${services.length} services`);

    res.status(200).json({
      success: true,
      services
    });
  } catch (error) {
    console.error('[AdminController] Error fetching services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch services',
      error: error.message
    });
  }
};

/**
 * Get a single service by ID
 */
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[AdminController] Fetching service with ID: ${id}`);

    const service = await ServiceModel.getById(id);

    if (!service) {
      console.log(`[AdminController] Service not found: ${id}`);
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    console.log(`[AdminController] Service retrieved: ${id}`);

    res.status(200).json({
      success: true,
      service
    });
  } catch (error) {
    console.error('[AdminController] Error fetching service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service',
      error: error.message
    });
  }
};

/**
 * Update a service
 */
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, fields, isActive } = req.body;

    console.log(`[AdminController] Updating service: ${id}`);

    // Check if service exists
    const existingService = await ServiceModel.getById(id);
    if (!existingService) {
      console.log(`[AdminController] Service not found for update: ${id}`);
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Validation for fields if provided
    if (fields) {
      const validFieldTypes = ['text', 'textarea', 'number', 'email', 'tel', 'date', 'checkbox', 'radio', 'select', 'file'];

      for (const field of fields) {
        if (!field.label || !field.label.trim()) {
          return res.status(400).json({
            success: false,
            message: 'Each field must have a label'
          });
        }

        if (!field.type || !validFieldTypes.includes(field.type)) {
          return res.status(400).json({
            success: false,
            message: `Invalid field type: ${field.type}`
          });
        }

        if ((field.type === 'select' || field.type === 'radio') &&
          (!field.options || !Array.isArray(field.options) || field.options.length === 0)) {
          return res.status(400).json({
            success: false,
            message: `Field "${field.label}" requires options`
          });
        }
      }
    }

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (fields) updateData.fields = fields;
    if (isActive !== undefined) updateData.isActive = isActive;

    await ServiceModel.update(id, updateData);

    console.log(`[AdminController] Service updated successfully: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Service updated successfully'
    });
  } catch (error) {
    console.error('[AdminController] Error updating service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update service',
      error: error.message
    });
  }
};

/**
 * Delete a service (soft delete)
 */
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[AdminController] Deleting service: ${id}`);

    // Check if service exists
    const existingService = await ServiceModel.getById(id);
    if (!existingService) {
      console.log(`[AdminController] Service not found for deletion: ${id}`);
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    await ServiceModel.delete(id);

    console.log(`[AdminController] Service deleted successfully: ${id}`);

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('[AdminController] Error deleting service:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete service',
      error: error.message
    });
  }
};

export {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
};
