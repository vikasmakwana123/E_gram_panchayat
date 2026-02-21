Website Live Demo:- [E_Gram_Panchayat](https://e-gram-panchayat-app.netlify.app/)
# 🏛️ E-Gram Panchayat — Digital Citizen Services Portal

A full-stack web application that digitizes Gram Panchayat services, enabling citizens to apply for government schemes and certificates online while providing admin and staff dashboards for application management and status tracking.

> **Unified Mentor Internship Project**

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Demo Credentials](#-demo-credentials)
- [API Endpoints](#-api-endpoints)
- [Application Status Flow](#-application-status-flow)
- [Test Cases](#-test-cases)
- [Screenshots](#-screenshots)

---

## 🎯 Problem Statement

The major goal of this project is to improve the delivery of citizen services in the village by computerizing applications for Gram Panchayat services. The system allows users to submit applications for various services and track their progress online, eliminating the need for physical visits to the Panchayat office.

---

## ✨ Features

### 👤 Citizen (User) Module
- Register with name, email, and password
- Login with email and password
- Browse and search available Gram Panchayat services
- Apply for services with dynamic forms (text, file upload, dropdowns, etc.)
- Track application status in real-time
- View profile and application history

### 🛡️ Admin (Officer) Module
- Secure admin login
- Create new services with dynamic form fields (text, textarea, number, email, date, select, radio, checkbox, file)
- Update and delete (soft delete) services
- View all citizen applications
- Update application status with remarks
- Full service lifecycle management

### 👷 Staff Module
- Separate staff login portal
- View all submitted applications
- Update application status (with remarks)
- Manage applications through the processing pipeline

---

## 🛠️ Tech Stack

| Layer        | Technology                                      |
|-------------|------------------------------------------------|
| **Frontend** | React 19, Vite 7, React Router DOM 7           |
| **Backend**  | Node.js, Express.js 4                          |
| **Database** | Firebase Firestore (NoSQL)                     |
| **Auth**     | Firebase Admin SDK, bcrypt (password hashing)  |
| **Storage**  | Supabase Storage (file uploads)                |
| **Logging**  | Morgan (HTTP request logging)                  |
| **Others**   | CORS, Multer (file handling), UUID, dotenv     |

---

## 📁 Project Structure

```
E-Gram_panchayat/
├── backend/
│   ├── controller/
│   │   ├── adminController.js      # Service CRUD operations
│   │   ├── applicationController.js # Application submit, status, listing
│   │   ├── uploadController.js      # File upload to Supabase Storage
│   │   └── userController.js        # User registration & login
│   ├── firebase/
│   │   └── config.js                # Firebase Admin SDK initialization
│   ├── models/
│   │   ├── Application.js           # Application model (Firestore)
│   │   ├── Service.js               # Service model (Firestore)
│   │   └── User.js                  # User model (Firestore)
│   ├── routes/
│   │   ├── admin.js                 # Admin routes (services + applications)
│   │   ├── upload.js                # File upload route
│   │   └── user.js                  # User routes (register, login, apply)
│   ├── index.js                     # Express server entry point
│   ├── .env.example                 # Environment variables template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Navigation bar
│   │   │   ├── ApplicationDetailsModal.jsx # Application details popup
│   │   │   ├── CitizenFormView.jsx      # Form data display for staff/admin
│   │   │   └── DynamicFormBuilder.jsx   # Dynamic form field renderer
│   │   ├── pages/
│   │   │   ├── EntryPage.jsx        # Landing page
│   │   │   ├── Register.jsx         # Citizen registration
│   │   │   ├── UserLogin.jsx        # Citizen login
│   │   │   ├── Profile.jsx          # User profile & applications
│   │   │   ├── PublicServices.jsx   # Browse services
│   │   │   ├── ApplyService.jsx     # Apply for a service
│   │   │   ├── AdminLogin.jsx       # Admin login
│   │   │   ├── AdminDashboard.jsx   # Admin dashboard
│   │   │   ├── AdminApplications.jsx # Manage applications
│   │   │   ├── ServiceList.jsx      # Admin service list
│   │   │   ├── ServiceCreate.jsx    # Create new service
│   │   │   ├── ServiceEdit.jsx      # Edit existing service
│   │   │   ├── StaffLogin.jsx       # Staff login
│   │   │   └── StaffDashboard.jsx   # Staff dashboard
│   │   ├── services/
│   │   │   └── api.js               # Centralized API client
│   │   ├── config/
│   │   ├── App.jsx                  # Route definitions & auth guards
│   │   └── main.jsx                 # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── TODO.md                          # Project specification & TODO list
└── README.md                        # ← You are here
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and npm
- **Firebase** project with Firestore enabled
- **Supabase** project (for file uploads) with a storage bucket named `applications`

### 1. Clone the Repository

```bash
git clone <repository-url>
cd E-Gram_panchayat
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (refer to `.env.example`):

```env
PORT=3000
GOOGLE_APPLICATION_CREDENTIALS=./your-firebase-service-account-key.json

# Firebase Config
apiKey=your_api_key
authDomain=your_project.firebaseapp.com
projectId=your_project_id
storageBucket=your_project.firebasestorage.app
messagingSenderId=your_sender_id
appId=your_app_id

# Supabase (for file uploads)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_key
```

Place your Firebase service account JSON key file in the `backend/` directory.

Start the backend server:

```bash
npm run dev    # Development (auto-reload)
npm start      # Production
```

The API server runs on `http://localhost:3000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Optionally create a `.env` file for the API URL:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend dev server:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` (default Vite port).

---

## 🔑 Demo Credentials

### Admin Panel

| Field    | Value       |
|----------|-------------|
| **URL**  | `/admin/login` |
| **Username** | `admin`    |
| **Password** | `admin123` |

### Staff Panel

| Field    | Value       |
|----------|-------------|
| **URL**  | `/staff/login` |
| **Username** | `staff`    |
| **Password** | `staff123` |

### Citizen (User)

| Field    | Value       |
|----------|-------------|
| **URL**  | `/login`    |
| **Signup** | `/register` |
| **Credentials** | Register a new account via the signup page |

> ⚠️ **Note:** Admin and Staff credentials is hardcoded for demo purposes. Citizen authentication uses Firebase Firestore with bcrypt password hashing.

---

## 🔗 API Endpoints

### Health Check

| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| GET    | `/api/health`  | Server status check  |

### User (Citizen) Routes — `/api`

| Method | Endpoint                   | Description                    |
|--------|----------------------------|--------------------------------|
| POST   | `/api/register`            | Register a new citizen         |
| POST   | `/api/login`               | Citizen login                  |
| POST   | `/api/applications`        | Submit a new application       |
| GET    | `/api/applications/my?userId=` | Get user's applications    |

### Admin Routes — `/api/admin`

| Method | Endpoint                              | Description                  |
|--------|---------------------------------------|------------------------------|
| POST   | `/api/admin/services`                 | Create a new service         |
| GET    | `/api/admin/services`                 | Get all services             |
| GET    | `/api/admin/services/:id`             | Get a single service         |
| PUT    | `/api/admin/services/:id`             | Update a service             |
| DELETE | `/api/admin/services/:id`             | Soft-delete a service        |
| GET    | `/api/admin/applications`             | Get all applications         |
| GET    | `/api/admin/applications/statuses`    | Get available statuses list  |
| PUT    | `/api/admin/applications/:id/status`  | Update application status    |

### Upload Route

| Method | Endpoint       | Description                         |
|--------|----------------|-------------------------------------|
| POST   | `/api/upload`  | Upload file to Supabase (max 5MB)   |

---

## 🔄 Application Status Flow

```
Submitted → Under Review → Pending Documents → Forwarded to Officer → Approved → In Progress → Completed → Closed
                                                                    ↘ Rejected → Closed
```

| Status                 | Description                                                          |
|------------------------|----------------------------------------------------------------------|
| **Submitted**          | Citizen has successfully submitted the application                   |
| **Under Review**       | Staff/admin is verifying details                                     |
| **Pending Documents**  | Additional documents required from the applicant                     |
| **Forwarded to Officer** | Application escalated to authority for approval                    |
| **Approved**           | Application sanctioned by Gram Panchayat                             |
| **Rejected**           | Application declined with reasons                                    |
| **In Progress**        | Work related to the approved application is ongoing                  |
| **Completed**          | Service delivered or certificate issued                              |
| **Closed**             | Application archived after completion or rejection                   |

---

## 🧪 Test Cases

### TC-01: User Registration

| #  | Test Case                             | Steps                                                                    | Expected Result                              | Status |
|----|---------------------------------------|--------------------------------------------------------------------------|----------------------------------------------|--------|
| 1  | Successful registration               | Go to `/register`, fill name, email, password (6+ chars), submit         | "Registration successful" message, user saved in Firestore | ✅ |
| 2  | Registration with empty name          | Leave name blank, fill rest, submit                                      | Error: "Name is required"                    | ✅ |
| 3  | Registration with empty email         | Leave email blank, fill rest, submit                                     | Error: "Email is required"                   | ✅ |
| 4  | Registration with short password      | Enter password < 6 characters                                           | Error: "Password must be at least 6 characters" | ✅ |
| 5  | Duplicate email registration          | Register with already-used email                                         | Error: "This email is already registered"    | ✅ |

### TC-02: User (Citizen) Login

| #  | Test Case                             | Steps                                                                    | Expected Result                              | Status |
|----|---------------------------------------|--------------------------------------------------------------------------|----------------------------------------------|--------|
| 1  | Successful citizen login              | Go to `/login`, enter valid email & password                             | Redirect to profile page with user info      | ✅ |
| 2  | Login with wrong email                | Enter unregistered email                                                 | Error: "Invalid email or password"           | ✅ |
| 3  | Login with wrong password             | Enter correct email, wrong password                                      | Error: "Invalid email or password"           | ✅ |
| 4  | Login with empty fields               | Leave email or password blank                                            | Error: "Email and password are required"     | ✅ |

### TC-03: Admin Login

| #  | Test Case                             | Steps                                                                    | Expected Result                              | Status |
|----|---------------------------------------|--------------------------------------------------------------------------|----------------------------------------------|--------|
| 1  | Successful admin login                | Go to `/admin/login`, enter `admin` / `admin123`                         | Redirect to `/admin/dashboard`               | ✅ |
| 2  | Admin login with wrong credentials    | Enter incorrect username or password                                     | Error: "Invalid credentials"                 | ✅ |
| 3  | Access admin route without login      | Navigate directly to `/admin/dashboard` without logging in               | Redirect to `/admin/login`                   | ✅ |

### TC-04: Staff Login

| #  | Test Case                             | Steps                                                                    | Expected Result                              | Status |
|----|---------------------------------------|--------------------------------------------------------------------------|----------------------------------------------|--------|
| 1  | Successful staff login                | Go to `/staff/login`, enter `staff` / `staff123`                         | Redirect to `/staff/dashboard`               | ✅ |
| 2  | Staff login with wrong credentials    | Enter incorrect username or password                                     | Error: "Invalid credentials"                 | ✅ |
| 3  | Access staff route without login      | Navigate directly to `/staff/dashboard` without logging in               | Redirect to `/staff/login`                   | ✅ |

### TC-05: Service Management (Admin)

| #  | Test Case                             | Steps                                                                    | Expected Result                              | Status |
|----|---------------------------------------|--------------------------------------------------------------------------|----------------------------------------------|--------|
| 1  | Create a new service                  | Admin → Create Service → fill name, description, add form fields, submit | Service created, appears in service list     | ✅ |
| 2  | Create service without name           | Submit form with empty name                                              | Error: "Service name is required"            | ✅ |
| 3  | Create service without fields         | Submit form with no form fields added                                    | Error: "At least one form field is required" | ✅ |
| 4  | Create service with invalid field type | Add a field with unsupported type                                       | Error: "Invalid field type"                  | ✅ |
| 5  | Select/radio field without options    | Add a select field without providing options                             | Error: "Field requires options"              | ✅ |
| 6  | Edit an existing service              | Admin → Services → Edit → modify details, save                          | Service updated successfully                 | ✅ |
| 7  | Delete a service                      | Admin → Services → Delete                                                | Service soft-deleted (marked inactive)       | ✅ |

### TC-06: Browse & Search Services (Citizen)

| #  | Test Case                             | Steps                                                                    | Expected Result                              | Status |
|----|---------------------------------------|--------------------------------------------------------------------------|----------------------------------------------|--------|
| 1  | View all active services              | Go to `/services`                                                        | All active services displayed                | ✅ |
| 2  | Search for a service                  | Type in search bar on services page                                      | Services filtered by search term             | ✅ |
| 3  | View service details                  | Click on a service card                                                  | Service details and apply button shown       | ✅ |

### TC-07: Application Submission (Citizen)

| #  | Test Case                             | Steps                                                                    | Expected Result                              | Status |
|----|---------------------------------------|--------------------------------------------------------------------------|----------------------------------------------|--------|
| 1  | Submit application (logged in)        | Login → Browse Services → Apply → Fill dynamic form → Submit            | Application created with status "Submitted"  | ✅ |
| 2  | Submit without required fields        | Leave required fields empty and submit                                   | Form validation prevents submission          | ✅ |
| 3  | Upload file with application          | Attach file (≤ 5MB) in a file field                                      | File uploaded to Supabase, URL stored        | ✅ |
| 4  | Upload file exceeding 5MB             | Attach file > 5MB                                                        | Error: upload rejected by Multer limit       | ✅ |

### TC-08: Application Tracking (Citizen)

| #  | Test Case                             | Steps                                                                    | Expected Result                              | Status |
|----|---------------------------------------|--------------------------------------------------------------------------|----------------------------------------------|--------|
| 1  | View my applications                  | Login → Profile page                                                     | List of user's applications with status      | ✅ |
| 2  | Application shows correct status      | After admin updates status                                               | Updated status reflected on profile page     | ✅ |

### TC-09: Application Management (Admin/Staff)

| #  | Test Case                             | Steps                                                                    | Expected Result                              | Status |
|----|---------------------------------------|--------------------------------------------------------------------------|----------------------------------------------|--------|
| 1  | View all applications                 | Admin/Staff → Applications page                                          | All submitted applications listed            | ✅ |
| 2  | Update application status             | Select application → Change status → Add remarks → Save                  | Status updated in Firestore                  | ✅ |
| 3  | Update with invalid status            | API call with wrong status value                                         | Error: "Invalid status"                      | ✅ |
| 4  | View application details              | Click on an application row                                              | Modal shows form data and status history     | ✅ |

### TC-10: API & Error Handling

| #  | Test Case                             | Steps                                                                    | Expected Result                              | Status |
|----|---------------------------------------|--------------------------------------------------------------------------|----------------------------------------------|--------|
| 1  | Health check API                      | `GET /api/health`                                                        | `{ status: "ok" }` response                 | ✅ |
| 2  | 404 for unknown routes                | `GET /api/unknown`                                                       | `{ message: "Route not found" }`, status 404 | ✅ |
| 3  | Request timeout                       | Backend unreachable for 15+ seconds                                      | "Request timed out" error on frontend        | ✅ |
| 4  | CORS handling                         | Frontend on different port calls backend                                 | Request succeeds (CORS enabled)              | ✅ |

### TC-11: Route Guards & Auth Protection

| #  | Test Case                             | Steps                                                                    | Expected Result                              | Status |
|----|---------------------------------------|--------------------------------------------------------------------------|----------------------------------------------|--------|
| 1  | Admin routes protected                | Access any `/admin/*` URL without `adminAuth` in sessionStorage          | Redirect to `/admin/login`                   | ✅ |
| 2  | Staff routes protected                | Access any `/staff/*` URL without `staffAuth` in sessionStorage          | Redirect to `/staff/login`                   | ✅ |
| 3  | Unknown routes redirect               | Navigate to any undefined route                                          | Redirect to home page (`/`)                  | ✅ |

---

## 👨‍💻 Author

**Vikas Makwana** — Unified Mentor Internship

