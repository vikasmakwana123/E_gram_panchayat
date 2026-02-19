// This file has all the functions to add, get, update and delete services from Firebase.

import { db } from '../firebase/config.js';

// The name of the collection in Firebase where we store services
const COLLECTION_NAME = 'services';

// Helper function to get the services collection

function getServicesCollection() {
  if (!db) {
    throw new Error('Firebase is not configured. Please add GOOGLE_APPLICATION_CREDENTIALS in .env file.');
  }
  return db.collection(COLLECTION_NAME);
}

class ServiceModel {
  // Add a new service to the database
  static async create(serviceData) {
    const collection = getServicesCollection();

    const newService = {
      name: serviceData.name,
      description: serviceData.description || '',
      fields: serviceData.fields || [],
      createdBy: serviceData.createdBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    };

    const docRef = await collection.add(newService);
    console.log('[ServiceModel] Service created with ID:', docRef.id);
    return docRef.id;
  }

  // Get all services from the database
  // Passing activeOnly: true to get only active services
  static async getAll(options = {}) {
    const collection = getServicesCollection();
    let snapshot;

    if (options.activeOnly === true) {
      snapshot = await collection.where('isActive', '==', true).get();
    } else {
      snapshot = await collection.get();
    }

    const services = [];
    snapshot.docs.forEach((doc) => {
      services.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Sort by newest first
    services.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    console.log('[ServiceModel] Retrieved', services.length, 'services');
    return services;
  }

  // Get one service by its id
  static async getById(serviceId) {
    const docRef = getServicesCollection().doc(serviceId);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.log('[ServiceModel] Service not found:', serviceId);
      return null;
    }

    return {
      id: doc.id,
      ...doc.data()
    };
  }

  // Update a service
  static async update(serviceId, updateData) {
    const docRef = getServicesCollection().doc(serviceId);
    const dataToUpdate = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    await docRef.update(dataToUpdate);
    console.log('[ServiceModel] Service updated:', serviceId);
  }

  // we don't remove the service, we just mark it as inactive
  static async delete(serviceId) {
    const docRef = getServicesCollection().doc(serviceId);
    await docRef.update({
      isActive: false,
      deletedAt: new Date().toISOString()
    });
    console.log('[ServiceModel] Service deleted (soft):', serviceId);
  }

  // Hard delete - permanently remove from database
  static async hardDelete(serviceId) {
    const docRef = getServicesCollection().doc(serviceId);
    await docRef.delete();
    console.log('[ServiceModel] Service permanently deleted:', serviceId);
  }
}

export default ServiceModel;
