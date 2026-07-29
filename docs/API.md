# REST API Documentation - DigiPass

This document details the API endpoints exposed by the backend server. All requests must carry JSON payloads (where applicable) and use the base URL (e.g. `http://localhost:3000/api`).

---

## Authentication APIs

### Sign In
*   **Method**: `POST`
*   **Route**: `/signIn`
*   **Purpose**: Authenticate user credentials and retrieve a JWT access token.
*   **Authentication Required**: None (Public)
*   **Request Body**:
    ```json
    {
      "email": "student@college.edu",
      "password": "securepassword"
    }
    ```
*   **Success Response (200 OK)**:
    ```json
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Email or password not entered.
    *   `401 Unauthorized`: Incorrect email/password or email not found.

---

## User APIs

### Get Current User Profile
*   **Method**: `GET`
*   **Route**: `/users/me`
*   **Purpose**: Get profile details for the authenticated user session.
*   **Authentication Required**: Yes (Bearer Token - Any Role)
*   **Success Response (200 OK)**:
    ```json
    {
      "_id": "60d000000000000000000001",
      "name": "Jane Doe",
      "email": "jane@college.edu",
      "phoneNumber": "1234567890",
      "role": "student",
      "createdAt": "2026-08-16T10:00:00.000Z",
      "updatedAt": "2026-08-16T10:00:00.000Z"
    }
    ```
*   **Error Responses**:
    *   `401 Unauthorized`: Missing/invalid token.
    *   `404 Not Found`: User data not found.

### Get User Stats
*   **Method**: `GET`
*   **Route**: `/users/getStats`
*   **Purpose**: Get count statistics for registered users in the database.
*   **Authentication Required**: Yes (Bearer Token - Guard or Admin)
*   **Success Response (200 OK - Admin view)**:
    ```json
    {
      "userCount": 42,
      "studentCount": 30,
      "guardCount": 4,
      "wardenCount": 7
    }
    ```
*   **Success Response (200 OK - Warden view)**: Returns a raw number representing the total student count.
    ```json
    30
    ```

### Get User Profile By ID
*   **Method**: `GET`
*   **Route**: `/users/:id`
*   **Purpose**: Get general profile details by user ObjectID.
*   **Authentication Required**: Yes (Bearer Token - Any Role; Students can only query their own ID)
*   **Success Response (200 OK)**:
    ```json
    {
      "_id": "60d000000000000000000001",
      "name": "Jane Doe",
      "email": "jane@college.edu",
      "phoneNumber": "1234567890",
      "role": "student"
    }
    ```
*   **Error Responses**:
    *   `403 Forbidden`: Access denied (if student queries another user ID).
    *   `404 Not Found`: User not found.

---

## Student APIs

### Get Current Student Metadata
*   **Method**: `GET`
*   **Route**: `/student/me`
*   **Purpose**: Retrieve specific academic profile details for the authenticated student.
*   **Authentication Required**: Yes (Bearer Token - Student)
*   **Success Response (200 OK)**:
    ```json
    {
      "_id": "60d000000000000000000005",
      "userId": "60d000000000000000000001",
      "rollNumber": "CS202609",
      "branch": "Computer Science",
      "hostel": "Block A",
      "roomNumber": 204,
      "createdAt": "2026-08-16T10:00:00.000Z",
      "updatedAt": "2026-08-16T10:00:00.000Z"
    }
    ```

### Get Student Metadata By ID
*   **Method**: `GET`
*   **Route**: `/student/:id`
*   **Purpose**: Retrieve academic details by base User ObjectID.
*   **Authentication Required**: Yes (Bearer Token - Any Role; Students can only query their own ID)
*   **Success Response (200 OK)**: Same structure as `/student/me`.
*   **Error Responses**:
    *   `403 Forbidden`: Access denied.
    *   `404 Not Found`: Student not found.

### Create Outpass Request
*   **Method**: `POST`
*   **Route**: `/outpass/createOutpass`
*   **Purpose**: Submit a new outpass permission request.
*   **Authentication Required**: Yes (Bearer Token - Student)
*   **Request Body**:
    ```json
    {
      "purpose": "Medical checkup",
      "location": "City General Hospital",
      "fromTime": "2026-08-16T16:00:00.000Z",
      "toTime": "2026-08-16T20:00:00.000Z"
    }
    ```
*   **Success Response (201 Created)**:
    ```json
    {
      "message": "Outpass Created successfully",
      "outPass": {
        "_id": "60d000000000000000000100",
        "requestedBy": "60d000000000000000000001",
        "purpose": "Medical checkup",
        "location": "City General Hospital",
        "fromTime": "2026-08-16T16:00:00.000Z",
        "toTime": "2026-08-16T20:00:00.000Z",
        "status": "Pending",
        "createdAt": "2026-08-16T15:45:00.000Z"
      }
    }
    ```

### Get Personal Outpass History
*   **Method**: `GET`
*   **Route**: `/outpass/getOutpasses`
*   **Purpose**: Retrieve all outpasses requested by the logged student.
*   **Authentication Required**: Yes (Bearer Token - Student)
*   **Success Response (200 OK)**:
    ```json
    {
      "message": "Outpasses fetched successfully",
      "outpasses": [
        {
          "_id": "60d000000000000000000100",
          "purpose": "Medical checkup",
          "location": "City General Hospital",
          "fromTime": "2026-08-16T16:00:00.000Z",
          "toTime": "2026-08-16T20:00:00.000Z",
          "status": "Pending"
        }
      ]
    }
    ```

---

## Warden APIs

### Get All Outpasses
*   **Method**: `GET`
*   **Route**: `/outpass/getAllOutpasses`
*   **Purpose**: Get all outpasses in the system for review.
*   **Authentication Required**: Yes (Bearer Token - Warden or Admin)
*   **Success Response (200 OK)**:
    ```json
    {
      "message": "Outpasses fetched successfully",
      "outPasses": [ ... ]
    }
    ```

### Update Outpass Status
*   **Method**: `PATCH`
*   **Route**: `/outpass/:id/status`
*   **Purpose**: Approve or Reject a student outpass. Approving generates the secure QR token.
*   **Authentication Required**: Yes (Bearer Token - Warden)
*   **Request Body**:
    ```json
    {
      "status": "Approved"
    }
    ```
*   *(Allowed values: `"Approved"`, `"Rejected"`)*
*   **Success Response (200 OK)**:
    ```json
    {
      "message": "Outpass updated successfully",
      "outpass": {
        "_id": "60d000000000000000000100",
        "status": "Approved",
        "eventTime": "2026-08-16T15:50:00.000Z",
        "eventBy": "60d000000000000000000002",
        "qrToken": "a3b98c5f6e2d1a8c0f7b4e5d6c8b9a2f"
      }
    }
    ```

### Get Outpass Stats Summary
*   **Method**: `GET`
*   **Route**: `/outpass/getStats`
*   **Purpose**: Get statistical counts for each outpass status.
*   **Authentication Required**: Yes (Bearer Token - Warden or Admin)
*   **Success Response (200 OK)**:
    ```json
    {
      "total": 120,
      "approved": 85,
      "rejected": 15,
      "pending": 5,
      "expired": 10,
      "completed": 5
    }
    ```

### Get Movement Log Stats
*   **Method**: `GET`
*   **Route**: `/log/movementStats`
*   **Purpose**: Retrieve metrics detailing the count of students currently inside vs outside.
*   **Authentication Required**: Yes (Bearer Token - Warden or Admin)
*   **Success Response (200 OK)**:
    ```json
    {
      "outCount": 0,
      "inCount": 30
    }
    ```

---

## Guard APIs

### Verify Outpass QR Token
*   **Method**: `GET`
*   **Route**: `/outpass/verify/:token`
*   **Purpose**: Scan a student outpass. It registers an `EXIT` log on the first scan, and an `ENTRY` log on the second scan (which completes the outpass).
*   **Authentication Required**: Yes (Bearer Token - Guard)
*   **Success Response (200 OK - Exit scan)**:
    ```json
    {
      "message": "EXIT recorded",
      "outpass": {
        "_id": "60d000000000000000000100",
        "status": "Approved",
        "qrToken": "a3b98c5f6e2d1a8c0f7b4e5d6c8b9a2f"
      }
    }
    ```
*   **Success Response (200 OK - Entry scan)**:
    ```json
    {
      "message": "ENTRY recorded",
      "outpass": {
        "_id": "60d000000000000000000100",
        "status": "Completed",
        "qrToken": "a3b98c5f6e2d1a8c0f7b4e5d6c8b9a2f"
      }
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request`: Token not passed / Invalid QR / Outpass already used / Expired / Not approved.
    *   `403 Forbidden`: Guard not found.

---

## Admin APIs

### Create Base User
*   **Method**: `POST`
*   **Route**: `/users/createUser`
*   **Purpose**: Create a base user profile. Returns user payload with ID.
*   **Authentication Required**: Yes (Bearer Token - Admin)
*   **Request Body**:
    ```json
    {
      "name": "Alex Warden",
      "email": "alex@college.edu",
      "password": "password123",
      "phoneNumber": "9876543210",
      "role": "warden"
    }
    ```
*   **Success Response (201 Created)**:
    ```json
    {
      "message": "User created successfully",
      "user": {
        "id": "60d000000000000000000002",
        "name": "Alex Warden",
        "email": "alex@college.edu",
        "phoneNumber": "9876543210",
        "role": "warden"
      }
    }
    ```

### Create Warden Details
*   **Method**: `POST`
*   **Route**: `/users/createWarden`
*   **Purpose**: Link Warden metadata to an existing base user.
*   **Authentication Required**: Yes (Bearer Token - Admin)
*   **Request Body**:
    ```json
    {
      "userId": "60d000000000000000000002",
      "S_ID": "W-909",
      "designation": "Assistant Warden",
      "block": "Block A"
    }
    ```

### Create Student Details
*   **Method**: `POST`
*   **Route**: `/users/createStudent`
*   **Purpose**: Link Student metadata to an existing base user.
*   **Authentication Required**: Yes (Bearer Token - Admin)
*   **Request Body**:
    ```json
    {
      "userId": "60d000000000000000000001",
      "rollNumber": "CS202609",
      "branch": "Computer Science",
      "hostel": "Block A",
      "roomNumber": 204
    }
    ```

### Create Guard Details
*   **Method**: `POST`
*   **Route**: `/users/createGuard`
*   **Purpose**: Link Security Guard metadata to an existing base user.
*   **Authentication Required**: Yes (Bearer Token - Admin)
*   **Request Body**:
    ```json
    {
      "userId": "60d000000000000000000003",
      "S_ID": "G-505",
      "gate": "Main Gate 1"
    }
    ```

### Get Aggregated Admin Stats
*   **Method**: `GET`
*   **Route**: `/admin/stats`
*   **Purpose**: Aggregates User metrics, Outpass stats, and Movement stats into a single payload.
*   **Authentication Required**: Yes (Bearer Token - Admin)
*   **Success Response (200 OK)**:
    ```json
    {
      "userStats": {
        "userCount": 42,
        "studentCount": 30,
        "guardCount": 4,
        "wardenCount": 7
      },
      "outpassStats": {
        "total": 120,
        "approved": 85,
        "rejected": 15,
        "pending": 5,
        "expired": 10,
        "completed": 5
      },
      "movementStats": {
        "outCount": 0,
        "inCount": 30
      }
    }
    ```
