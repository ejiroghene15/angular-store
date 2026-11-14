# Simple Store

A modern e-commerce demo application built with **Angular 22** that showcases the latest Angular features including signals, resource APIs, `@defer` blocks, and signal-based forms.

The app allows users to browse products, add items to a cart, and complete purchases through a Stripe-powered checkout flow. It's styled with **Tailwind CSS** and **daisyUI** for a clean, themeable UI that supports both light and dark modes.

## Features

- **Product Browsing** — Fetches products from the FakeStore API and displays them in a responsive grid with skeleton loading states using Angular's `@defer` for code splitting.
- **Shopping Cart** — Add products to the cart with real-time quantity management and toast notifications.
- **Checkout with Stripe** — Complete orders with shipping details validation using Angular Signals Forms and payment processing via Stripe Checkout.
- **Settings** — User profile and security settings pages with nested routing.
- **Theme Switching** — Toggle between light and dark themes using daisyUI theme controller.
- **Responsive Design** — Mobile-first layout built with Tailwind CSS and daisyUI components.

## Tech Stack

- **Angular 22** — Standalone components, signals, `resource()`, `@defer`, and signal-based forms
- **Tailwind CSS 4** — Utility-first CSS framework
- **daisyUI 5** — Component-based UI library built on Tailwind CSS
- **Stripe** — Payment processing integration
- **NgIcons** — Icon library with Heroicons support
- **Vitest** — Unit testing framework

## Screenshots

The home page displays a product grid with skeleton placeholders while data loads, and a clean card layout with hover-to-add interactions.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
