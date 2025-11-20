# 🤝 Contributing to foss-project-mushroom

Thank you for your interest in contributing to **foss-project-mushroom**! We are committed to fostering a welcoming, diverse, and open community. We appreciate all contributions, whether it's a small documentation fix, a bug report, or a significant feature addition.

***

## 📝 Code of Conduct

By participating in this project, you agree to abide by our **[Code of Conduct](CODE_OF_CONDUCT.md)**. Please ensure you read and understand it before making any contributions.

***

## 💡 Ways to Contribute

There are many ways to contribute to the project:

1. **Report Bugs**: Open an issue if you encounter any bugs.
2. **Suggest Enhancements**: Propose new features or improvements to existing ones.
3. **Improve Documentation**: Fix typos or clarify sections in the `README.md`, comments, or other documentation.
4. **Answer Questions**: Help others by answering questions on issues.

***

## 🐛 Reporting Issues (Bugs and Feature Requests)

Before submitting an issue, please search **existing issues** to see if your problem has already been reported.

### Submitting a Bug Report

Please include:

* A **clear and descriptive title**.
* The **steps to reproduce** the issue (the simpler, the better).
* The **expected behavior** and the **actual behavior**.
* Your environment details (OS, browser, Node.js version, etc.).
* Screenshots or recordings if possible.

### Suggesting an Enhancement

Please include:

* A clear and concise **description** of the feature.
* An explanation of the **use case** and why this feature would be useful or necessary.

***

## 💻 Submitting a Pull Request (PR)

Follow these steps to submit a code contribution:

1. **Fork** the repository and clone your fork locally.
2. Create a new branch for your feature or fix:

    ```bash
    git checkout -b feature/your-awesome-feature
    # OR
    git checkout -b fix/correct-login-bug
    ```

3. **Make your changes** and ensure your code adheres to the existing architecture (e.g., utilize the `useAuth` hook for authentication logic).
4. Run the linter and fix any warnings/errors before committing:

    ```bash
    npm run lint
    ```

5. Commit your changes using a descriptive **Conventional Commit** message (e.g., `feat: add user profile page`, `fix: correct login redirect`).
6. Push your branch to your fork.
7. Open a Pull Request (PR) against the **`main`** branch of the original repository.
8. In the PR description, reference any related issues (e.g., `Closes #123`).

***

## 🛠️ Development Style Guide

* **Code Style**: We use **ESLint** (via `npm run lint`) to enforce code style. Please ensure all checks pass.
* **React Components**: Components should be functional and use hooks. Maintain separation of concerns.
* **Styling**: Use **Tailwind CSS** utility classes for styling. Avoid writing custom CSS unless absolutely necessary.
* **Testing**: (If tests are added later) All new features must include appropriate tests.

Refer to the **[`README.md`](README.md)** for detailed steps on setting up the local environment.

We look forward to your contributions!
