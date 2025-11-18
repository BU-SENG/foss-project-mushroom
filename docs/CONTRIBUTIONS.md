# Contributions Guide

This document outlines the rules and conventions for contributing to the Hostel Maintenance System project. Following these guidelines ensures a smooth workflow, clear commit history, and proper tracking for GitHub Classroom.

---

## 1. Branch Naming Convention

Branches must follow the format:

```markdown
  
type/feature-or-task-name

```

### Types

- `backend` → Supabase, database logic, API endpoints
- `frontend` → React components, pages, UI logic
- `docs` → Documentation, README, CONTRIBUTIONS.md, QA reports
- `qa` → Testing, bug reports, sample data

### Examples

- `backend/supabase-setup` → initial database schema & RLS  
- `frontend/student-dashboard` → student dashboard page  
- `docs/readme` → update README with setup instructions 
- `qa/sample-data` → prepared test data

> **Tip:** Use hyphens `-` instead of spaces, all lowercase.

---

## 2. Commit Message Convention

Commits should be **short, clear, and descriptive**. Use the following format:

```markdown

[type]: brief description

````

### Types

- `feat` → new feature or functionality  
- `fix` → bug fix  
- `docs` → documentation changes  
- `style` → formatting, spacing, code style  
- `refactor` → code restructuring without changing functionality  
- `test` → adding or updating tests  
- `chore` → miscellaneous tasks, setup, config

### Examples

- `feat: add maintenance_requests table with RLS policies`  
- `fix: update trigger for updated_at on maintenance_requests`  
- `docs: add backend schema and test accounts`  
- `style: fix indentation in AdminDashboard.jsx`  

---

## 3. Pull Requests

- Always create a PR from your branch into `main`  
- Include a **short description** of what the PR does  
- Link PR to related issue, e.g., `Closes #3`  
- Wait for at least one teammate to review before merging  
- Delete the branch after merge

---

## 4. GitHub Issues

- Each task must have a **GitHub Issue** assigned  
- All code, docs, or testing must reference the issue in commit messages or PR  
- Example: `feat: implement student request form (#2)`

---

## 5. Workflow

1. Pull latest `main` before starting work:  

   ```bash
   git checkout main
   git pull origin main
   ```

2. Create a new branch using the naming conventions:

   ```bash
   git checkout -b backend/supabase-setup
   ```

3. Stage changes:

   ```bash
   git add .
   ```

4. Commit using the message conventions:

   ```bash
   git commit -m "feat: add maintenance_requests table with RLS policies"
   ```

5. Push branch to remote:

   ```bash
   git push origin backend/supabase-setup
   ```

6. Open a PR to `main`, link the issue, and request review

---

## 6. Non-Developer Contributions

Non-dev team members should also use branches and issues:

- `docs` → documentation, README
- `qa` → sample data prep, screenshots
- Always commit changes referencing the related issue

---

## 7. Notes

- Never push directly to `main` unless merging an approved PR
- Keep commit history clean and meaningful
- Follow the branch and commit conventions to ensure consistency across the team