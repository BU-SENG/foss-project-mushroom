# System Flow Overview

This document explains how the Hostel Maintenance Management System works from a high-level perspective. It covers the roles, authentication flow, request lifecycle, admin operations and how data moves through the system. Anyone reading this should immediately understand what the system does and how users interact with it.

---

## 1. User Types

### Student

- Creates maintenance requests for issues in their room.
- Can view only the requests they submitted.

### Admin

- Views all maintenance requests.
- Can filter, update, and manage requests.
- Can assign vendors or mark issues as resolved.

---

## 2. Authentication Flow

1. User opens the application.
2. User signs in using email and password.
3. Supabase returns an authenticated session.
4. The frontend loads the user profile based on the authenticated session.
5. RLS (Row Level Security) ensures the user only sees the data they are allowed to see.

---

## 3. Student Request Flow

1. Student navigates to the “Create Request” page.
2. The system loads the logged-in student's profile via the `useAuth` hook.
3. Student fills out the request form (category, room number, description).
4. Student submits the form.
5. The request is inserted into the `maintenance_requests` table.
6. RLS policies ensure:
   - The student can only insert requests using their own `student_id`
   - The student can only view their own previously submitted requests
7. The student is redirected to their dashboard or request history page.

---

## 4. Admin Flow

1. Admin signs in.
2. Admin dashboard loads with a list of all maintenance requests.
3. Admin can:
   - Filter by category, status or date.
   - Open a single request to view details.
   - Assign vendors or update request status (e.g., "In Progress", "Completed").
4. All changes are saved to the database.
5. The `updated_at` trigger automatically updates timestamps whenever an admin modifies a request.

---

## 5. Data Flow Summary

### From Student Submission

- User fills form
- Frontend sends `insert()` call to Supabase
- RLS validates:
  - Is this user allowed to insert a request?
  - Is the `student_id` theirs?
- DB stores request
- UI refreshes or redirects

### For Admin Dashboard

- Frontend sends `select('*')` query
- Admin RLS policy allows full access
- DB returns all records
- UI renders dashboard

---

## 6. Error Handling Flow

### Authentication Errors

- Incorrect credentials
- Expired session
- Missing session

### Validation Errors

- Empty form fields
- Invalid category or room number

### Database Errors

- RLS rejection (e.g., inserting a request for another student_id)
- Network issues
- Insert/select failure

### UI Handling

- Show error messages
- Highlight problematic fields
- Retry options when needed
