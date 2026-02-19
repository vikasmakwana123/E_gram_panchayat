import ApplicationModel, { APPLICATION_STATUS } from '../models/Application.js';

export const submitApplication = async (req, res) => {
  try {
    const { userId, userName, userEmail, serviceId, serviceName, formData } = req.body;
    if (!userId || !serviceId) {
      return res.status(400).json({ success: false, message: 'userId and serviceId are required.' });
    }
    const id = await ApplicationModel.create({
      userId,
      userName: userName || '',
      userEmail: userEmail || '',
      serviceId,
      serviceName: serviceName || '',
      formData: formData || {}
    });
    res.status(201).json({ success: true, applicationId: id });
  } catch (err) {
    console.error('[ApplicationController] submit error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is required.' });
    }
    const applications = await ApplicationModel.getByUserId(userId);
    res.json({ success: true, applications });
  } catch (err) {
    console.error('[ApplicationController] getMy error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await ApplicationModel.getAll();
    res.json({ success: true, applications });
  } catch (err) {
    console.error('[ApplicationController] getAll error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;
    if (!APPLICATION_STATUS.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${APPLICATION_STATUS.join(', ')}`
      });
    }
    await ApplicationModel.updateStatus(id, status, remarks);
    res.json({ success: true });
  } catch (err) {
    console.error('[ApplicationController] updateStatus error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getStatusList = (req, res) => {
  res.json({ success: true, statuses: APPLICATION_STATUS });
};
