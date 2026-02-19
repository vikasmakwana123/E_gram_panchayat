# E-Gram Panchayat – Project TODO & Specification

## Problem Statement

The major goal of this project is to improve the delivery of citizen services in the village by computerizing applications for gram panchayat services. Gram panchayat is a decentralized institution that manages applications and provides information about gram panchayat services. The suggested system will allow users to submit applications for various services and track their progress.

The suggested system **E-Services for Gram Panchayath** develops a web application with the goal of providing government information about services or schemes, and public users can apply for services using an online application. Admin and staff will manage the application for approval and creation of the scheme.

---

## System Modules

- **User** (Citizen)
- **Staff**
- **Officer / Admin**

---

## Module List

### Officer / Admin

- [ ] Login
- [ ] Create Services
- [ ] Update / Delete services
- [ ] Update application status
- [ ] Logout

### User (Citizen)

- [ ] Register
- [ ] Login
- [ ] Search services
- [ ] Apply for services
- [ ] My application status
- [ ] My profile
- [ ] Logout

### Staff

- [ ] Login
- [ ] View services
- [ ] Update application status
- [ ] Logout

---

## Application Status (for tracking)

| Status | Description |
|--------|-------------|
| **Submitted** | Citizen has successfully submitted the application online. |
| **Under Review** | Staff/admin has received the application and is verifying details. |
| **Pending Documents** | Additional documents or information are required from the applicant. |
| **Forwarded to Officer** | Application has been escalated to the appropriate authority for approval. |
| **Approved** | Application has been sanctioned by the Gram Panchayat. |
| **Rejected** | Application has been declined, with reasons provided. |
| **In Progress** | Work related to the approved application (e.g., issuing a certificate, implementing a scheme) is ongoing. |
| **Completed** | Service has been delivered or certificate issued. |
| **Closed** | Application is archived after completion or rejection. |

---

## Implementation Phases (Technical TODO)

### Phase 1: Backend

- [x] Firebase config, User model, Service model
- [x] User registration, Admin login
- [x] Admin: create/update/delete services
- [ ] User login (citizen)
- [ ] Application model (userId, serviceId, formData, status)
- [ ] Submit application, get my applications, get all applications (admin/staff)
- [ ] Update application status (admin/staff)

### Phase 2: Frontend – Common & User

- [ ] Common navbar (Home, Services, Login / Avatar dropdown → My Profile, Logout)
- [ ] User login page
- [ ] Profile page: “Hi [username]”, My Applications list with status
- [ ] Public Services page (search, browse, apply when logged in)
- [ ] Apply-for-service form → creates application with status “Submitted”

### Phase 3: Frontend – Admin / Staff

- [ ] Admin/Staff: list applications, update application status
- [ ] (Optional) Staff-specific login and dashboard

### Phase 4: Testing & Polish

- [ ] End-to-end tests
- [ ] UI/UX polish and accessibility
