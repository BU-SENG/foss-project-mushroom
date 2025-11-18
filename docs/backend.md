# Hostel Maintenance Backend Documentation

## Tables

### 1. `profiles` — Stores user info

| Column      | Type    | Constraints                                      | Description                       |
|------------|---------|-------------------------------------------------|-----------------------------------|
| id         | uuid    | PRIMARY KEY, references `auth.users(id)`        | Unique ID from Supabase Auth      |
| full_name  | text    |                                                 | Full name of the user             |
| role       | text    | NOT NULL, CHECK in ('student','admin') | Role of the user                  |
| created_at | timestamptz | DEFAULT now()                                | Account creation timestamp        |

### 2. `maintenance_requests` — Stores student maintenance requests

| Column       | Type         | Constraints                                                      | Description                        |
|-------------|--------------|-----------------------------------------------------------------|------------------------------------|
| id          | bigserial    | PRIMARY KEY                                                      | Unique request ID                  |
| student_id  | uuid         | NOT NULL, references `profiles(id)`                              | Student who submitted the request |
| category    | text         | NOT NULL                                                         | Type of issue (Electrical, Plumbing, etc.) |
| room        | text         | NOT NULL                                                         | Student's room number              |
| description | text         |                                                                 | Description of the issue           |
| status      | text         | NOT NULL, DEFAULT 'pending', CHECK in ('pending','in_progress','resolved') | Current status of the request      |
| created_at  | timestamptz  | DEFAULT now()                                                    | When the request was created       |
| updated_at  | timestamptz  | DEFAULT now(), updated via trigger `trg_set_updated_at`          | When the request was last updated  |

## RLS Policies

- Students: can insert and select **only their own requests** (via `auth.uid() = student_id`)  
- Admins: full access to all requests  

## Triggers

- `trg_set_updated_at`: updates `updated_at` on `maintenance_requests` before any update  

## Test Accounts

| Name        | Role   | UUID                                   | Email                  | Password     |
|------------|--------|---------------------------------------|-----------------------|-------------|
| Roni       | Admin  | 2f6e1069-bf1f-40c4-9ddc-bf7dc3caf435 | <ronniiiip@gmail.com>    | ronron19    |
| Jane Student | Student | eac064b2-e1ce-43a0-a6e4-cf8db2959e95 | <student@example.com>   | student     |

**Notes:**

- Admin can view/update all maintenance requests.  
- Student can insert/select only their own requests (RLS enforced).  
- Use these accounts to test inserts, selects, and role-specific access.

## Endpoints

- TBD
