// Applications submitted by users for gram panchayat services.
// Status is updated by admin/staff.

import { db } from '../firebase/config.js';

const COLLECTION_NAME = 'applications';

export const APPLICATION_STATUS = [
  'Submitted',
  'Under Review',
  'Pending Documents',
  'Forwarded to Officer',
  'Approved',
  'Rejected',
  'In Progress',
  'Completed',
  'Closed'
];

function getCollection() {
  if (!db) throw new Error('Firebase is not configured.');
  return db.collection(COLLECTION_NAME);
}

class ApplicationModel {
  static async create(data) {
    const col = getCollection();
    const doc = {
      userId: data.userId,
      userName: data.userName || '',
      userEmail: data.userEmail || '',
      serviceId: data.serviceId,
      serviceName: data.serviceName || '',
      formData: data.formData || {},
      status: 'Submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...(data.remarks && { remarks: data.remarks })
    };
    const ref = await col.add(doc);
    return ref.id;
  }

  static async getByUserId(userId) {
    const snapshot = await getCollection().where('userId', '==', userId).get();
    const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    return list;
  }

  static async getAll() {
    const snapshot = await getCollection().get();
    const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    return list;
  }

  static async getById(id) {
    const doc = await getCollection().doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  static async updateStatus(id, status, remarks = '') {
    const ref = getCollection().doc(id);
    const update = {
      status,
      updatedAt: new Date().toISOString()
    };
    if (remarks) update.remarks = remarks;
    await ref.update(update);
  }
}

export default ApplicationModel;
