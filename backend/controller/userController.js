// Handles user registration, login (name, email, password).

import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !email.trim() || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('[UserController] Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'This email is already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = await UserModel.create({
      name: name.trim(),
      email: email.trim(),
      passwordHash
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      userId
    });
  } catch (error) {
    console.error('[UserController] Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};
