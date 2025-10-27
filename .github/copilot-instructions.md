
# Copilot Instructions for Recipe Costing Nx Monorepo

## Project Overview
This repository is an Nx monorepo for a recipe costing application. It includes an Angular frontend (using Material Design 3) and a NestJS backend. The workspace is organized for strict maintainability, testability, and best practices.

## Copilot Coding & Architectural Rules

- **Angular Application**
  - Use Angular Material Design 3 (MD3) expressive components and styles throughout the UI.
  - **Do NOT use standalone components or standalone APIs.** All components, directives, and pipes must be declared in NgModules (classic structure).
  - **Do NOT use Promises or async/await in templates.** All data flows in templates must use RxJS hot observables (e.g., BehaviorSubject, ReplaySubject, or Subjects with shareReplay). Use the `async` pipe only with observables. No direct use of Promises in services or components exposed to templates.
  - **No direct use of Promises in services or components exposed to templates.** Convert all async data to RxJS observables at the boundary.
  - **No direct use of `async`/`await` in Angular templates.**
  - **Strict separation of concerns:**
    - UI logic in components only
    - Data access in services
    - State management via RxJS
  - **Routing:**
    - Four main views: Costing, Ingredients, Recipes, Recipe Editor
    - All views must be routed using Angular Router (NgModule-based configuration)
  - **Testing:**
    - All components, services, and utilities must have unit tests
    - Use Jest for all tests
    - All code must be lintable and pass linting

- **Backend (NestJS)**
  - Use Nx NestJS plugin for backend apps and libraries
  - Organize backend code into feature and data-access libraries
  - All endpoints and services must have unit and integration tests
  - Use strict TypeScript settings

- **General Workspace Rules**
  - All code and architecture decisions must be documented in `README.md` and relevant markdown files
  - All items must be testable and lintable
  - Use Nx generators and best practices for all new code
  - No unused variables, dead code, or broken imports
  - All scripts (build, lint, test, serve) must work via Nx

## Required Steps for Copilot

1. **Scaffold the Project**
2. **Customize the Project** (enforce all above rules)
3. **Install Required Extensions**
4. **Compile the Project**
5. **Create and Run Nx Tasks**
6. **Launch the Project**
7. **Ensure Documentation is Complete**

## Acceptance Criteria

- No standalone Angular components or APIs
- No Promise or async/await in templates; all data flows use RxJS hot observables
- All main views are routed and implemented
- All code is covered by tests and passes linting
- All scripts work via Nx
- All architecture decisions are documented
