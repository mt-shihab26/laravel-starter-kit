---
paths:
    - 'resources/js/**/*.ts,resources/js/**/*.tsx'
---

# Js

## Arrow functions + named exports for frontend code

All components, hooks, and utility functions in resources/js are declared as arrow functions assigned to `const` (`const Foo = (...) => {...}`), never `function Foo() {}` declarations.

Every export is a named export (`export const Foo = ...`), never `export default` — EXCEPT files under `resources/js/pages/**`, which must keep a default export because Inertia's `@inertiajs/vite` plugin auto-resolves page components by default export. Even there, the component itself is still an arrow-function const, just default-exported by reference at the bottom of the file (`const Login = (...) => {...}; export default Login;`).

Exemptions (leave as-is, do not convert): `resources/js/components/ui/**` (shadcn/ui vendor primitives — kept close to upstream so `shadcn` CLI updates stay low-diff) and `resources/js/types/**` (ambient type-only `.d.ts` files).

## Grouped import order in resources/js

Imports in each file are arranged into groups, in this order, separated by one blank line between groups (no blank line within a group):

1. Long imports — any import statement whose named-import list is long enough that Prettier wraps it across multiple lines (regardless of source or what it imports).
2. Type imports — `import type { ... } from '...'`.
3. Function imports — single-line imports of camelCase-named values (hooks/utility functions, e.g. `useState`, `router`).
4. Component imports — single-line imports of PascalCase-named React components (e.g. `Button`).
5. Constant imports — single-line imports of UPPER_SNAKE_CASE constants (e.g. `OTP_MAX_LENGTH`).

Example:

```tsx
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import type { TTeam, TTeamInvitation } from '@/types/models';

import { router } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
```

Do NOT run `bun run format` after manually applying this grouping — `prettier-plugin-organize-imports` re-sorts/flattens imports and will undo the grouping.

Exempt: `resources/js/components/ui/**` (shadcn vendor primitives, kept close to upstream).

## Inline non-exported component Props types

A component's props type is declared inline in its function parameter annotation, not as a standalone `type Props = {...}` / `type FooProps = {...}` above it — unless that type is exported and reused by another file, in which case it stays a named `export type`.

```tsx
// Not this:
type Props = {
    foo: string;
};

const Comp = ({ foo }: Props) => { ... };

// This:
const Comp = ({ foo }: { foo: string }) => { ... };
```

Exported examples that correctly stay as standalone types: `TManagePasskeysProps` (resources/js/components/screens/settings/manage-passkeys.tsx) and `TManageTwoFactorProps` (resources/js/components/screens/settings/manage-two-factor.tsx), both consumed by resources/js/pages/settings/security.tsx.

Exempt: `resources/js/components/ui/**` (shadcn vendor primitives, kept close to upstream).
