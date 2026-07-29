<div align="center">

# 🎫 DigiPass

### *Digital Outpass & Permission Management System*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[![MongoDB](https://img.shields.io/badge/MongoDB-green.svg)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-lightgrey.svg)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-cyan.svg)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-brightgreen.svg)](https://nodejs.org/)

**DigiPass** is a secure, mobile-first web application designed to digitize, streamline, and secure the outpass leave approval process in college dormitories and hostels. It replaces archaic paper slip systems with a secure, cryptographically verifiable, role-based digital workflow.

[System Architecture](docs/ARCHITECTURE.md) • [REST API Docs](docs/API.md)

</div>

---

## Overview

In residential universities and hostels, tracking the movements of students in and out of campus is vital for safety, accountability, and administration. Traditional systems rely on paper outpasses signed by wardens and collected by security guards. 

**DigiPass** solves these challenges by providing a fully digital process. Students request leave online, wardens approve or reject requests instantly, and security guards verify student exits and entries using a web-camera QR code scanner that validates the outpass token against the database in real-time.

---

## The Problem: Paper-Based Systems

*   **Forged Signatures**: Paper passes are easily forged or tampered with.
*   **Poor Security Verification**: Security guards at the gate cannot easily verify if a warden's signature is authentic or if the pass has expired.
*   **Lost & Illegible Records**: Physical receipts are lost, damaged, or hard to read, creating a compliance and audit nightmare.
*   **Administrative Friction**: Students waste hours searching for wardens to sign slips, and wardens lack high-level visibility over who is currently off-campus.

---

## The Solution: DigiPass

*   **Stateless Cryptographic Tokens**: Outpasses generate unique, randomly generated 16-byte hex tokens encoded as secure QR codes upon warden approval.
*   **Real-Time Camera Scan Verification**: Security guards scan the student's QR code using any smartphone or web camera. The system automatically cross-references validity windows in the database.
*   **Tamper-Proof Audit Trail**: All entry and exit scans are logged permanently with timestamp, gate number, and guard ID, generating clean audit trails.
*   **Role-Based Dashboards**: Customized interfaces optimized for Students, Wardens, Security Guards, and Administrators.


---

## User Roles & Responsibilities

| Role | Core Responsibilities | Key Views |
| :--- | :--- | :--- |
| **Student** | Requests permissions, views pass status history, and displays QR codes at the gate. | Leave Request Form, Personal History list, QR Canvas |
| **Warden** | Reviews pending leave requests, approves/rejects passes, and monitors student records. | Warden Dashboard, Outpass Detail actions |
| **Security Guard** | Scans QR codes at physical gates, verifies validity, and logs exit and entry events. | Camera Scanner view, Verification Result screen |
| **Admin** | Manages system accounts, provisions user roles, and monitors system metrics. | Admin Dashboard, User Creator |

---

## System Architecture

DigiPass uses a mobile-first, single-page application frontend that connects to an Express server and MongoDB.

```
+--------------------------------------------------------------+
|                   Frontend (React Client)                    |
|  - Login / Dashboards   - Outpass Forms   - QR Code Canvas  |
|  - Protected Routing    - Camera QR Code Scanner            |
+--------------------------------------------------------------+
                               |
                               |  JSON APIs / HTTPS
                               v
+--------------------------------------------------------------+
|                  Backend (Express REST API)                  |
|  - JWT Auth Service     - Outpass Coordinator               |
|  - QR Code Generator    - Log & Audit Service                |
+--------------------------------------------------------------+
                               |
                               |  Mongoose ODM
                               v
+--------------------------------------------------------------+
|                      Database (MongoDB)                      |
|  - Users Collection     - Students/Wardens/Guards Metadata  |
|  - Outpasses Collection - Logs Collection                    |
+--------------------------------------------------------------+
```

*For a detailed breakdown of architectural decisions, state-machines, request sequences, and implementation limits, see the [Architecture Document](docs/ARCHITECTURE.md).*

---

## Database Design

The database schema utilizes Mongoose relationships. The system model inherits role-specific details from a base `User` document:

![DigiPass ER Diagram](docs/assets/er_diagram.png)

---

## Core Outpass Lifecycle Workflow

```
[Student Request] ➔ [Warden Review] ➔ [QR Generation] ➔ [Guard Scan 1: Exit] ➔ [Guard Scan 2: Entry] ➔ [Completed]
```

1.  **Leave Submission**: The Student submits an outpass request specifying location, purpose, and date-time parameters.
2.  **State Initialization**: The outpass is saved in the database in a `Pending` state.
3.  **Warden Review**: The Warden views the pending list on their dashboard and selects "Approve" or "Reject".
4.  **QR Allocation**: If approved, the backend generates a random 16-byte token and saves it in the outpass record as `qrToken`.
5.  **Dynamic Render**: The student's dashboard displays the approved pass and renders a QR code representing the verification URL.
6.  **Exit Scan**: At the gate, the Guard scans the QR. The server verifies that the status is `Approved` and the time window is valid, logs an `EXIT` movement, and allows the student out.
7.  **Entry Scan**: When the student returns, the Guard scans the QR again. The server checks that one log exists (`EXIT`), creates an `ENTRY` movement log, and marks the outpass status as `Completed`.

---

## Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19, Vite, Axios | Single-Page Application client client |
| **Styling** | Vanilla CSS, Framer Motion, GSAP | Fluid layout variables with micro-animations |
| **Backend** | Node.js, Express.js | REST APIs with route-specific middleware |
| **Database** | MongoDB, Mongoose ODM | Document database utilizing role relations |
| **Authentication** | JWT, Bcrypt | Signed stateless authentication tokens (30m) |
| **QR Engine** | qrcode, html5-qrcode | Dynamic QR generation and browser-camera decoding |
| **PDF Generation** | html2pdf.js | Exports signed outpass documents locally to PDF |

---

## Security Implementations

*   **Stateless Session Validation**: Routes are protected on both the client (via React Router `ProtectedRoute`) and server (via `validateToken` and `authorizeRoles` middlewares) using JWTs.
*   **Cryptographic Password Salting**: Passwords are saved as one-way salted hashes using `bcrypt` (10 rounds).
*   **Dynamic Expiry Checking**: The outpass validity is evaluated on-demand during scans, automatically expiring passes that exceed the `toTime` window.
*   **Secure QR Token**: QR codes encapsulate a cryptographically random hex token instead of database IDs to prevent URL spoofing.

---

## Project Structure

```
DigiPass/
├── backend/                  # Node/Express API Server
│   ├── src/
│   │   ├── config/           # DB connection setup
│   │   ├── constants/        # Error codes
│   │   ├── controllers/      # Route controllers (Auth, Outpass, User)
│   │   ├── middleware/       # Token validation & role checks
│   │   ├── models/           # Mongoose schemas (User, Student, Outpass, Log)
│   │   ├── routes/           # Express router files
│   │   └── utils/            # Shared helper functions
│   └── package.json
├── frontend/                 # React SPA Client
│   ├── src/
│   │   ├── assets/           # Logos, titles, images
│   │   ├── components/       # Forms, animations, headers, card displays
│   │   ├── pages/            # View pages (Login, Student, Warden, Guard, Admin)
│   │   ├── routes/           # Client-side protected route boundaries
│   │   ├── services/         # API HTTP communication services
│   │   ├── styles/           # CSS design files
│   │   └── utils/            # HTTP and API action utility wrappers
│   └── package.json
└── docs/                     # Project diagrams and documents
    ├── assets/               # ER diagrams, logos
    ├── ARCHITECTURE.md       # Developer architectural deep-dive
    └── API.md                # API endpoints and payloads reference
```

---

## Getting Started

### Prerequisites
*   Node.js (>= 18.0.0)
*   npm (>= 9.0.0)
*   MongoDB database instance (Local or Atlas)

### Setup Instructions

#### 1. Clone & Set Up Environments
Clone the repository and configure your environment variables:

##### Backend Environment Setup:
Create a `.env` file inside `backend/`:
```env
PORT=3000
CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster0.mongodb.net/digipass
ACCESS_TOKEN_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:5173
```

##### Frontend Environment Setup:
Create a `.env` file inside `frontend/`:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

#### 2. Run Database & Backend
```bash
cd backend
npm install
npm run dev
```

#### 3. Run Frontend Client
Open a new terminal session:
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

#### 4. Production Build
To build the static assets for deployment:
```bash
cd frontend
npm run build
```
The compiled files will be output to the `frontend/dist` folder, ready to be served or hosted on Vercel/Netlify.
