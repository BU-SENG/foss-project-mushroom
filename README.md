# Hall Maintenance System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/BU-SENG/foss-project-mushroom)](https://github.com/BU-SENG/foss-project-mushroom/graphs/contributors)
[![Open Source Love](https://badges.frap.codes/a00/oss.svg?v=103)](https://github.com/BU-SENG/foss-project-mushroom)

---

## 💡 About the Project

The **Hall Maintenance System** is a full-stack web application designed to streamline and manage maintenance requests within a hostel or university hall environment. It provides a dedicated portal for **Students** to submit issues and an **Admin Dashboard** for staff to track, manage, and resolve those requests efficiently.

### Key Features

* **Role-Based Authentication:** Separate dashboards and access controls for **Students** and **Admins**.
* **Request Submission:** Students can easily create new maintenance requests, specifying the issue category, room number, and description.
* **Request Tracking:** Students can view the status of their submitted requests (e.g., `pending`, `in progress`, `resolved`).
* **Admin Management:** Admins have full visibility over all maintenance requests and can update their status to reflect progress.
* **Reporting:** Admins can generate and download reports (PDFs) of maintenance data for auditing and analysis.
* **User Settings:** Users can manage their account information and update their password.

---

## 🛠️ Tech Stack

This project is built using modern web technologies:

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React** (with Vite) | A fast, modern library for building the user interface. |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework for rapid UI development. |
| **Backend/DB** | **Supabase** | A powerful open-source Firebase alternative providing database (PostgreSQL) and authentication services. |
| **PDF Generation** | `jspdf`, `jspdf-autotable` | Used for generating comprehensive reports (Admin feature). |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

You will need the following installed:

* Node.js (version 18+)
* npm or yarn
* A **Supabase** account to host the database and authentication.

### Installation

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/BU-SENG/foss-project-mushroom.git](https://github.com/BU-SENG/foss-project-mushroom.git)
    cd foss-project-mushroom
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Setup Environment Variables:**
    Create a file named `.env` in the root directory and add your Supabase credentials. You can find these in your Supabase project settings.

    ```bash
    VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

    *Note: The system requires these variables to connect to the backend.*

4. **Run Locally:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

### Database Setup

The project relies on two main tables in your Supabase instance:

1. `profiles`: Stores user data, linked to `auth.users`, and contains the `role` (`student` or `admin`).
2. `maintenance_requests`: Stores all submitted requests, including `category`, `room`, `description`, and `status`.

You should also ensure **Row Level Security (RLS)** is enabled for role-based access control, as the application uses it to restrict students to only viewing their own requests.

---

## 🤝 Contributing

We welcome contributions to the Hall Maintenance System!

Please refer to the separate **[CONTRIBUTIONS.md](docs/CONTRIBUTIONS.md)** file for detailed guidelines on:

* Branch Naming Convention (e.g., `backend/supabase-setup`).
* Commit Message Convention (e.g., `feat: add maintenance_requests table with RLS policies`).
* Pull Request (PR) and GitHub Issue workflow.

---

## 📄 License

This project is licensed under the **GPL license**.

See the `LICENSE` file for more details.
