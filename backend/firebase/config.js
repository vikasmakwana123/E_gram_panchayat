
import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db = null;

try {
  if (admin.apps.length === 0) {

    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    } else {

      let credPath = (process.env.GOOGLE_APPLICATION_CREDENTIALS || '').trim();

      if (credPath && !path.isAbsolute(credPath)) {

        const projectRoot = path.join(__dirname, '..');
        credPath = path.resolve(projectRoot, credPath);
      }
      if (credPath) {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = credPath;
        console.log('[Firebase] Loading credentials from:', credPath);
      }

      admin.initializeApp({
        credential: admin.credential.applicationDefault()
      });
    }
  }

  db = admin.firestore();
} catch (err) {
  console.warn('[Firebase] Not configured:', err.message);
  console.warn('Add GOOGLE_APPLICATION_CREDENTIALS in .env with the path to your .json file.');
}

export { admin, db };
