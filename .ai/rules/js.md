---
paths:
    - 'resources/js/**/*.ts,resources/js/**/*.tsx'
---

# Js

## Arrow functions + named exports for frontend code

All components, hooks, and utility functions in resources/js are declared as arrow functions assigned to `const` (`const Foo = (...) => {...}`), never `function Foo() {}` declarations.

Every export is a named export (`export const Foo = ...`), never `export default` — EXCEPT files under `resources/js/pages/**`, which must keep a default export because Inertia's `@inertiajs/vite` plugin auto-resolves page components by default export. Even there, the component itself is still an arrow-function const, just default-exported by reference at the bottom of the file (`const Login = (...) => {...}; export default Login;`).

Exemptions (leave as-is, do not convert): `resources/js/components/ui/**` (shadcn/ui vendor primitives — kept close to upstream so `shadcn` CLI updates stay low-diff) and `resources/js/types/**` (ambient type-only `.d.ts` files).
