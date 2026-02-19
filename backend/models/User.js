// This file saves and finds users in Firebase (for registration).

import { db } from '../firebase/config.js';

const USERS_COLLECTION = 'users';

function getUsersCollection() {
  if (!db) {
    throw new Error('Firebase is not configured.');
  }
  return db.collection(USERS_COLLECTION);
}

class UserModel {
  // Save a new user (name, email, passwordHash)
  static async create(userData) {
    const collection = getUsersCollection();
    const newUser = {
      name: userData.name,
      email: userData.email.toLowerCase().trim(),
      passwordHash: userData.passwordHash,
      createdAt: new Date().toISOString()
    };
    const ref = await collection.add(newUser);
    console.log('[UserModel] User registered with ID:', ref.id);
    return ref.id;
  }

  // Find a user by email (for login later)
  static async findByEmail(email) {
    const snapshot = await getUsersCollection()
      .where('email', '==', email.toLowerCase().trim())
      .limit(1)
      .get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
}

export default UserModel;
