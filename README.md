# Alcpay Platform

Welcome to the Alcpay Platform!

This is a monorepo for the Alcpay Platform. It contains the code for the Alcpay Platform and its dependencies.  We leverage Nx to manage our workspace.  Our builds are also integrated with Github Actions and Nx Cloud.

This repository contains the following projects:

## Applications

### alcpay-app

This is the main application for the Alcpay Platform. It is a Angular application that uses the Alcpay Components and Services.  Our main application is built with Angular.

### alcpay-admin

This is the admin application for the Alcpay Platform. It is a Angular application that uses the Alcpay Components and Services.  Our admin application is built with Angular.

### alcpay-api

This is the API for the Alcpay Platform. It is a NestJS application that uses the Alcpay Components and Services.  Our API is built with NestJS.

## Libraries (./libs)

### components

Re-usable components for the Alcpay Platform.

### services

Re-usable services for the Alcpay Platform.

### theme

Re-usable theme for the Alcpay Platform.

### tailwind

Re-usable tailwind for the Alcpay Platform.

## Installation

### Installing Node using nvm

We recommend using nvm to install Node.js.  This will allow you to easily switch between versions of Node.js.

```sh
nvm install 20
nvm use 20
```

### Installing dependencies

We recommend using npm to install the dependencies.  This will ensure that you are using the correct version of Node.js and the correct version of npm.

```sh
npm install --legacy-peer-deps
```

## Running and Building the Alcpay Platform

To run and build the Alcpay Platform, you can use the following commands:

```sh
npx nx serve alcpay-app # Starts the main application
npx nx serve alcpay-admin # Starts the admin application
npx nx serve alcpay-api # Starts the API
npx build theme # Builds the reusable theme
npx build services # Builds the reusable services
npx build components # Builds the reusable components
```

Each command has a specific purpose:

- `npx nx serve alcpay-app`: Starts the main application of the Alcpay Platform. This is an Angular application.

- `npx nx serve alcpay-admin`: Starts the admin application of the Alcpay Platform. This is also an Angular application.

- `npx nx serve alcpay-api`: Starts the API for the Alcpay Platform. This is a NestJS application.

- `npx build theme`: Builds the reusable theme for the Alcpay Platform.

- `npx build services`: Builds the reusable services for the Alcpay Platform.

- `npx build components`: Builds the reusable components for the Alcpay Platform.

Please ensure that you have installed all the necessary dependencies before running these commands.

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/Zk6che3ARR)


## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve alcpay-app
```

To create a production bundle:

```sh
npx nx build alcpay-app
```

To see all available targets to run for a project, run:

```sh
npx nx show project alcpay-app
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


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

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
