# Development Workflow

## Running the Frontend

From the workspace root:

```bash
npm run serve:frontend
```

## Running the Backend (NestJS)

**Important:** Backend must be served from the `apps/costing-api` directory for the NestJS CLI to find its TypeScript config.

```bash
cd apps/costing-api
npm run serve:costing-api
```

## Running Both Apps in Development

Use two terminals:

- Terminal 1 (workspace root):

  ```bash
  npm run serve:frontend
  ```

- Terminal 2 (`apps/costing-api`):

  ```bash
  npm run serve:costing-api
  ```

## Build, Lint, and Test All Projects

From the workspace root:

```bash
npm run build:all
npm run lint:all
npm run test:all
```

## Nx Limitations (NestJS)

- Nx `serve:all` cannot reliably serve the backend due to NestJS CLI config requirements.
- Always run backend serve/build/test from `apps/costing-api` for best results.

## CI/CD and Release

- Use Nx run-many for build, lint, and test in CI workflows.
- Document release and deployment steps in your CI config.

## Security

- Monitor GitHub security alerts and update dependencies as needed.

## RecipeCosting

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve costing-frontend
```

To create a production bundle:

```sh
npx nx build costing-frontend
```

To see all available targets to run for a project, run:

```sh
npx nx show project costing-frontend
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

---

## Best-Practice Architecture & Rules

### Nx Monorepo

- All projects generated with Nx CLI; each lib in its own subfolder (feature/, data-access/, ui/, util/, api/, server/).
- Every project must declare "tags" in project.json for module boundaries.
- Dependency boundaries enforced with ESLint @nx/enforce-module-boundaries:
  - apps:* → feature, data-access, ui, util, api
  - feature → data-access, ui, util, api
  - data-access → util, api
  - ui → util
  - api → util, api
  - util → util
- Only use Nx commands for build/lint/test/serve. CI: npx nx run-many -t lint test build --parallel=3.


### Angular (Classic NgModules, No Standalone)

- **NO standalone components or APIs.** All components, directives, and pipes must be declared in NgModules.
- App root uses AppModule with RouterModule.forRoot(...).
- Feature modules use RouterModule.forChild(...) for lazy routes.
- Use @angular/material with Material Design 3 (Expressive) tokens and density.
- Global theme SCSS (see below) for vibrant colors, rounded corners, soft elevation, generous white space.
- Mobile-first: fluid containers, breakpoints, touch targets  48x48dp.
- Data-access libs own HttpClient services; no direct HttpClient calls in components.
- Provide API_BASE_URL injection token; use interceptors for base URL/auth.
- Color contrast WCAG AA, OnPush change detection, route-level lazy loading.
- **NO Promises or async/await in templates.** All data flows in templates must use RxJS hot observables (BehaviorSubject, ReplaySubject, or Subjects with shareReplay). Use the async pipe only with observables.
- **NO direct use of Promises in services or components exposed to templates.** Convert all async data to RxJS observables at the boundary.
- **Strict separation of concerns:** UI logic in components, data access in services, state management via RxJS.

### NestJS

- Layered modules: Infra (DB), Domain (ingredients/recipes/costing), Interface (controllers).
- DTOs: class-based, with class-validator and class-transformer.
- Global ValidationPipe({ whitelist: true, transform: true }).
- Mongoose models: one schema per domain lib, registered via MongooseModule.forFeature.
- In-memory Mongo (dev): InfraMongoMemoryModule boots mongodb-memory-server.
- Seeding: SeedModule seeds only when collections are empty and SEED !== 'false'.
- Swagger enabled at /api/docs.
- Unit tests for services, e2e tests for controllers with in-memory Mongo.

### Material Design 3 (Expressive) UI

- Vibrant palette, rounded corners (--radius:16px), soft elevation (--elev-1).
- Typography: M3 defaults or custom scale.
- Use Angular Material components for all controls.
- Mobile-first grid: single column → 2 cols ≥ 600px → 3 cols ≥ 960px.
- App shell: MatToolbar top nav, MatSidenav optional.
- Hit areas padded; dense tables only ≥ 960px, otherwise cards list.
- One light expressive theme mandatory; optional dark theme.
- No inline colors; use tokens and Material mixins.

### "Definition of Done" Checklists

- Angular Feature: NgModule with RouterModule.forChild lazy route(s), Material components, responsive forms, OnPush, unit tests.
- Nest Endpoint: DTO classes with validation, controller/service/model separation, unit/e2e tests, Swagger updated.
- Library: tags, module boundary rules, public API via index.ts, no circular deps.

---

## Example: Material Theme SCSS

```scss
/* apps/web/src/styles/material-theme.scss */
@use '@angular/material' as mat;

$brand-primary: #6750A4; /* Vibrant */
$brand-secondary: #006874;
$brand-tertiary: #7B5800;
$brand-error: #B3261E;

$theme: mat.define-theme((
 color: (
  theme-type: light,
  primary: $brand-primary,
  secondary: $brand-secondary,
  tertiary: $brand-tertiary,
  error: $brand-error,
 ),
 density: (
  scale: -2 // Expressive: taller controls; set -2 (roomy) to 0 as needed
 ),
));

@include mat.core();
:root { @include mat.all-component-themes($theme); }
```

---
Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
