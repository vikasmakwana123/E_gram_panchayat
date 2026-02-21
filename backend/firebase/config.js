import admin from "firebase-admin";
import dotenv from "dotenv";
import { readFileSync } from "fs";

dotenv.config();

let serviceAccount;

if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  try {
    serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  } catch (error) {
    console.error("Error parsing GOOGLE_APPLICATION_CREDENTIALS env variable:", error);
    process.exit(1);
  }
} else {
  try {
    serviceAccount = JSON.parse(
      readFileSync("./e-gram-panchayat-bd8a6-firebase-adminsdk-fbsvc-e629356f06.json", "utf8")
    );
  } catch (error) {
    console.error("Error reading e-gram-panchayat-bd8a6-firebase-adminsdk-fbsvc-e629356f06.json file:", error);
    process.exit(1);
  }
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const auth = admin.auth();
export const db = admin.firestore();
