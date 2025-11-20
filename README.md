# 🍄 foss-project-mushroom

A modern, full-stack web application built as an open-source project to demonstrate best practices in application development, user authentication, and data reporting. This project emphasizes a component-based architecture and features seamless integration with a powerful Backend as a Service (BaaS) platform.

## ✨ Features

* **User Authentication**: Secure sign-up, login, and protected routes powered by the **Supabase** client library and a custom `useAuth` hook.
* **Intuitive Routing**: Uses `react-router-dom` to manage public routes (`/`, `/about`, `/features`, `/contact`) and protected user routes (`/dashboard`, `/settings`).
* **Client-Side PDF Generation**: Ability to generate reports or export data documents directly from the browser using **jsPDF** and **jspdf-autotable**.
* **Responsive & Modern UI**: Styled using **Tailwind CSS** for a utility-first, responsive, and easily customizable design.
* **Modern Tooling**: Built with **Vite** for a fast development experience and efficient production bundling.

***

## ⚙️ Tech Stack

This project is built using the following core technologies:

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React** (v19.x) | Core JavaScript library for building the user interface. |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework for rapid UI development. |
| **Backend/BaaS** | **Supabase** | Open-source Firebase alternative for database and authentication. |
| **Tooling** | **Vite** | Next-generation build tool for development and production. |
| **Reporting**| **jsPDF** | Library for generating PDF documents in the browser. |

***

## 🚀 Getting Started

To get a local copy of the project up and running, follow these simple steps.

### Prerequisites

* **Node.js** (LTS version recommended)
* **npm** (or Yarn/pnpm)

### Installation

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/BU-SENG/foss-project-mushroom.git](https://github.com/BU-SENG/foss-project-mushroom.git)
    cd foss-project-mushroom
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Environment Variables

This project requires connection details for your Supabase instance. Create a file named **`.env`** in the root directory and add the following keys, replacing the placeholders:
VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_PUBLIC_KEY"

### Running the Project

Run the development server:

```bash
npm run dev
```

The application will be accessible at the address logged by Vite (typically http://localhost:5173).

### Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
|Start Dev Server | npm run dev | Starts the development server with HMR. |
|Build | npm run build | Compiles the project for production. |
|Lint | npm run lint | Runs ESLint for code quality and style checking. |
|Preview | npm run preview | Serves the production build locally. |

## 🤝 Contributing

Contributions are what make the open-source community an incredible place to learn and build. Your help is greatly appreciated!

Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to submit bug reports, suggest features, and contribute code via pull requests.

## 📄 License

Distributed under the MIT License. See the LICENSE file for more details.
