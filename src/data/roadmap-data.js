export const PHASES = [
  {
    id: "p1",
    label: "Phase 1",
    title: "Frontend Foundations",
    subtitle: "Weeks 1–4 · JS + TS + React",
    weeks: ["w1", "w2", "w3", "w4"],
  },
  {
    id: "p2",
    label: "Phase 2",
    title: "Full-Stack Engineering",
    subtitle: "Weeks 5–8 · Next.js + MERN + Testing",
    weeks: ["w5", "w6", "w7", "w8"],
  },
  {
    id: "p3",
    label: "Phase 3",
    title: "AI + Production",
    subtitle: "Weeks 9–12 · AI + DevOps + System Design",
    weeks: ["w9", "w10", "w11", "w12"],
  },

  {
    id: "dsa",
    label: "Phase 4",
    title: "DSA 12 weeks",
    subtitle: "Weeks 1–12 · Data Structures and Algorithms",
    weeks: [],
  },
];

export const WEEKS = [
  {
    id: "w1",
    n: 1,
    phase: "p1",
    title: "JS Basics + TS Basics + React Intro",
    milestone: "Answer basic JS / TS / React interview questions",
    outcome: "Typed React app with hooks deployed",
  },
  {
    id: "w2",
    n: 2,
    phase: "p1",
    title: "JS Advanced + TS Advanced + React Intermediate",
    milestone: "Closures, event loop, generics, re-renders confident",
    outcome: "React dashboard with TanStack Query + Zustand",
  },
  {
    id: "w3",
    n: 3,
    phase: "p1",
    title: "React Advanced — Patterns + Performance",
    milestone: "TanStack Query, Suspense, machine coding ready",
    outcome: "Production-grade React SaaS UI",
  },
  {
    id: "w4",
    n: 4,
    phase: "p1",
    title: "React Projects + Interview Prep",
    milestone: "Frontend interview ready — SD1 level",
    outcome: "2 deployed portfolio projects",
  },
  {
    id: "w5",
    n: 5,
    phase: "p2",
    title: "Next.js Fundamentals + App Router",
    milestone: "SSR vs SSG vs ISR explained confidently",
    outcome: "Next.js SaaS with auth + dashboard",
  },
  {
    id: "w6",
    n: 6,
    phase: "p2",
    title: "Next.js Advanced + Node.js + Express",
    milestone: "Server Actions, REST API design, caching layers",
    outcome: "Full-stack Next.js + Express API",
  },
  {
    id: "w7",
    n: 7,
    phase: "p2",
    title: "Backend — Auth, Redis, BullMQ, Security",
    milestone: "JWT, Redis patterns, background jobs, RBAC",
    outcome: "Production-grade API with auth + caching",
  },
  {
    id: "w8",
    n: 8,
    phase: "p2",
    title: "Testing + CI/CD + Docker",
    milestone: "Testing pyramid, CI pipeline, Docker basics",
    outcome: "Full test suite + CI/CD + Docker Compose",
  },
  {
    id: "w9",
    n: 9,
    phase: "p3",
    title: "AI — OpenAI + Vercel AI SDK + Streaming",
    milestone: "Streaming chat, function calling, cost optimization",
    outcome: "AI chat feature with streaming UI",
  },
  {
    id: "w10",
    n: 10,
    phase: "p3",
    title: "AI Advanced — RAG + Vector DBs + Agents",
    milestone: "RAG pipeline, embeddings, agent design",
    outcome: "Document Q&A app with citations",
  },
  {
    id: "w11",
    n: 11,
    phase: "p3",
    title: "DevOps — AWS + Nginx + Monitoring",
    milestone: "Deployment pipeline, AWS basics, observability",
    outcome: "SaaS on AWS EC2 with Sentry + monitoring",
  },
  {
    id: "w12",
    n: 12,
    phase: "p3",
    title: "System Design + Mock Interviews + Job Apps",
    milestone: "International product company ready — SD3 level",
    outcome: "Portfolio polished + 20+ applications sent",
  },
];

export const MODULES = [
  // ── WEEK 1 ──────────────────────────────────────────────────
  {
    id: "m-js-basic",
    weekId: "w1",
    tag: "JS",
    level: "Beginner",
    title: "JavaScript — Fundamentals",
    resources: [
      {
        label: "The Net Ninja",
        note: "Modern JavaScript Tutorial playlist — start here",
      },
      {
        label: "Programming with Mosh",
        note: "JavaScript in 1 Hour — clean structured intro",
      },
      {
        label: "Web Dev Simplified",
        note: "Array methods, closures, async explained clearly",
      },
      {
        label: "freeCodeCamp",
        note: "Full JS Course (7h) — bootcamp style, free",
      },
    ],
    topics: [
      {
        id: "js-b-1",
        text: "var vs let vs const — scoping differences",
        interview: false,
      },
      {
        id: "js-b-2",
        text: "Primitive types and type coercion (== vs ===)",
        interview: false,
      },
      {
        id: "js-b-3",
        text: "Destructuring arrays and objects",
        interview: false,
      },
      { id: "js-b-4", text: "Spread and rest operators", interview: false },
      {
        id: "js-b-5",
        text: "Function declarations vs expressions vs arrow functions",
        interview: true,
      },
      {
        id: "js-b-6",
        text: "Lexical scope, block scope, hoisting rules",
        interview: true,
      },
      {
        id: "js-b-7",
        text: "Array methods: map, filter, reduce, find, flat, flatMap",
        interview: true,
      },
      {
        id: "js-b-8",
        text: "Object methods: keys, values, entries, assign, freeze",
        interview: false,
      },
      { id: "js-b-9", text: "Shallow vs deep copy problem", interview: true },
      {
        id: "js-b-10",
        text: "DOM APIs: querySelector, event listeners, delegation",
        interview: false,
      },
      {
        id: "js-b-11",
        text: "Callbacks → Promises → async/await progression",
        interview: true,
      },
      {
        id: "js-b-12",
        text: "fetch API with try/catch error handling",
        interview: false,
      },
    ],
  },
  {
    id: "m-ts-basic",
    weekId: "w1",
    tag: "TS",
    level: "Beginner",
    title: "TypeScript — Fundamentals",
    resources: [
      {
        label: "Traversy Media",
        note: "TypeScript Crash Course — fast onboarding",
      },
      {
        label: "The Net Ninja",
        note: "TypeScript for Beginners playlist — structured",
      },
      { label: "Fireship", note: "TypeScript in 100 Seconds + basics video" },
      {
        label: "Matt Pocock",
        note: "totaltypescript.com free tutorials — best overall resource",
      },
    ],
    topics: [
      {
        id: "ts-b-1",
        text: "Type annotations on variables and function params",
        interview: false,
      },
      {
        id: "ts-b-2",
        text: "Primitive types, arrays, tuples",
        interview: false,
      },
      {
        id: "ts-b-3",
        text: "any vs unknown vs never vs void — differences",
        interview: true,
      },
      {
        id: "ts-b-4",
        text: "Type inference — when TS infers automatically",
        interview: false,
      },
      {
        id: "ts-b-5",
        text: "interface vs type alias — when to use each",
        interview: true,
      },
      {
        id: "ts-b-6",
        text: "Union | and intersection & types",
        interview: true,
      },
      {
        id: "ts-b-7",
        text: "Optional ? and Readonly properties",
        interview: false,
      },
      {
        id: "ts-b-8",
        text: "typeof, instanceof, in — type narrowing",
        interview: true,
      },
      {
        id: "ts-b-9",
        text: "Discriminated unions — most useful TS pattern",
        interview: true,
      },
      {
        id: "ts-b-10",
        text: "Strict mode — always enable it and why",
        interview: false,
      },
    ],
  },
  {
    id: "m-react-basic",
    weekId: "w1",
    tag: "React",
    level: "Beginner",
    title: "React — Fundamentals",
    resources: [
      { label: "The Net Ninja", note: "React Tutorial for Beginners playlist" },
      {
        label: "Programming with Mosh",
        note: "React Full Course for Beginners",
      },
      {
        label: "Traversy Media",
        note: "React JS Crash Course — best single-video intro",
      },
      {
        label: "Web Dev Simplified",
        note: "React hooks series — clear explanations per hook",
      },
    ],
    topics: [
      {
        id: "r-b-1",
        text: "JSX — what it compiles to and why",
        interview: false,
      },
      {
        id: "r-b-2",
        text: "Functional components — plain functions returning JSX",
        interview: false,
      },
      {
        id: "r-b-3",
        text: "Props — passing data parent to child",
        interview: false,
      },
      {
        id: "r-b-4",
        text: "Conditional rendering with && and ternary",
        interview: false,
      },
      {
        id: "r-b-5",
        text: "List rendering with .map() and key prop rules",
        interview: true,
      },
      {
        id: "r-b-6",
        text: "useState — state updates and batching in React 18",
        interview: true,
      },
      {
        id: "r-b-7",
        text: "useEffect — timing, cleanup, dependency array rules",
        interview: true,
      },
      {
        id: "r-b-8",
        text: "useRef — DOM access and mutable value without re-render",
        interview: true,
      },
      {
        id: "r-b-9",
        text: "Controlled vs uncontrolled inputs",
        interview: true,
      },
      {
        id: "r-b-10",
        text: "Lifting state up to common parent",
        interview: true,
      },
      {
        id: "r-b-11",
        text: "useContext — avoid prop drilling",
        interview: true,
      },
      {
        id: "r-b-12",
        text: "React Hook Form + Zod — typed form validation",
        interview: false,
      },
    ],
  },
  // ── WEEK 2 ──────────────────────────────────────────────────
  {
    id: "m-js-adv",
    weekId: "w2",
    tag: "JS",
    level: "Advanced",
    title: "JavaScript — Advanced",
    resources: [
      {
        label: "Fireship",
        note: "JS Pro Tips, Event Loop explained, 100 JS Concepts",
      },
      {
        label: "Fun Fun Function",
        note: "Functional Programming in JS playlist — FP patterns",
      },
      {
        label: "JSConf — Philip Roberts",
        note: "What the heck is the event loop? — watch this first",
      },
      {
        label: "Jake Archibald (YouTube)",
        note: "In The Loop — microtasks vs macrotasks deep dive",
      },
    ],
    topics: [
      {
        id: "js-a-1",
        text: "Call stack and execution context — creation vs execution phase",
        interview: true,
      },
      {
        id: "js-a-2",
        text: "Event loop — macrotask queue vs microtask queue",
        interview: true,
      },
      {
        id: "js-a-3",
        text: "Trace execution order: setTimeout, Promise, queueMicrotask",
        interview: true,
      },
      {
        id: "js-a-4",
        text: "Closures — definition, private state, module pattern",
        interview: true,
      },
      {
        id: "js-a-5",
        text: "Implement debounce from scratch",
        interview: true,
      },
      {
        id: "js-a-6",
        text: "Implement throttle from scratch",
        interview: true,
      },
      {
        id: "js-a-7",
        text: "Prototype chain — how property lookup works",
        interview: true,
      },
      {
        id: "js-a-8",
        text: "this keyword — 4 binding rules (default, implicit, explicit, new)",
        interview: true,
      },
      {
        id: "js-a-9",
        text: "Implement bind, call, apply from scratch",
        interview: true,
      },
      {
        id: "js-a-10",
        text: "Promise internals — states, implement Promise.all from scratch",
        interview: true,
      },
      {
        id: "js-a-11",
        text: "Functional patterns: compose, pipe, curry, memoize",
        interview: false,
      },
      {
        id: "js-a-12",
        text: "Memory leaks — common causes and detection in DevTools",
        interview: false,
      },
      {
        id: "js-a-13",
        text: "WeakMap and WeakRef — weak references explained",
        interview: false,
      },
    ],
  },
  {
    id: "m-ts-adv",
    weekId: "w2",
    tag: "TS",
    level: "Advanced",
    title: "TypeScript — Advanced",
    resources: [
      {
        label: "Matt Pocock",
        note: "Generics, conditional types, mapped types — the best channel",
      },
      {
        label: "Jack Herrington",
        note: "TypeScript with React, generic component patterns",
      },
      {
        label: "Codevolution",
        note: "TypeScript Tutorial playlist — comprehensive coverage",
      },
    ],
    topics: [
      {
        id: "ts-a-1",
        text: "Generic functions — T as type parameter with constraints",
        interview: true,
      },
      {
        id: "ts-a-2",
        text: "Generic interfaces and generic classes",
        interview: false,
      },
      {
        id: "ts-a-3",
        text: "Utility types: Partial, Required, Readonly, Pick, Omit, Record",
        interview: true,
      },
      {
        id: "ts-a-4",
        text: "Exclude, Extract, ReturnType, Parameters, NonNullable",
        interview: true,
      },
      {
        id: "ts-a-5",
        text: "Conditional types: T extends U ? X : Y",
        interview: true,
      },
      {
        id: "ts-a-6",
        text: "infer keyword inside conditional types",
        interview: true,
      },
      {
        id: "ts-a-7",
        text: "Mapped types: { [K in keyof T]: ... }",
        interview: true,
      },
      { id: "ts-a-8", text: "Template literal types", interview: false },
      {
        id: "ts-a-9",
        text: "Build DeepPartial and DeepReadonly recursive utility types",
        interview: false,
      },
      {
        id: "ts-a-10",
        text: "Zod — schema, safeParse, z.infer, refinements",
        interview: false,
      },
      {
        id: "ts-a-11",
        text: "Zod + React Hook Form — full typed form integration",
        interview: false,
      },
    ],
  },
  {
    id: "m-react-mid",
    weekId: "w2",
    tag: "React",
    level: "Intermediate",
    title: "React — Intermediate",
    resources: [
      {
        label: "Web Dev Simplified",
        note: "Custom hooks + useMemo/useCallback deep dives",
      },
      {
        label: "TkDodo (blog/talks)",
        note: "TanStack Query patterns — written by the maintainer",
      },
      {
        label: "Codevolution",
        note: "React Query full playlist + Zustand intro",
      },
      { label: "Jack Herrington", note: "Advanced React patterns series" },
    ],
    topics: [
      {
        id: "r-m-1",
        text: "Custom hooks — extract shared stateful logic with naming convention",
        interview: true,
      },
      {
        id: "r-m-2",
        text: "useLocalStorage, useFetch, useDebounce, useMediaQuery hooks",
        interview: false,
      },
      {
        id: "r-m-3",
        text: "React.memo — skip re-render if props shallowly equal",
        interview: true,
      },
      {
        id: "r-m-4",
        text: "useMemo — memoize expensive computed values",
        interview: true,
      },
      {
        id: "r-m-5",
        text: "useCallback — stable function reference across renders",
        interview: true,
      },
      {
        id: "r-m-6",
        text: "When NOT to optimize — premature optimization cost",
        interview: true,
      },
      {
        id: "r-m-7",
        text: "TanStack Query: useQuery, query keys, staleTime, gcTime",
        interview: true,
      },
      {
        id: "r-m-8",
        text: "TanStack Query: useMutation + optimistic updates with onMutate",
        interview: true,
      },
      {
        id: "r-m-9",
        text: "TanStack Query: useInfiniteQuery for infinite scroll / pagination",
        interview: false,
      },
      {
        id: "r-m-10",
        text: "Zustand: create store, slices, persist + devtools middleware",
        interview: true,
      },
      {
        id: "r-m-11",
        text: "State decision: local vs Context vs Zustand vs TanStack Query",
        interview: true,
      },
    ],
  },
  // ── WEEK 3 ──────────────────────────────────────────────────
  {
    id: "m-react-adv",
    weekId: "w3",
    tag: "React",
    level: "Advanced",
    title: "React — Advanced",
    resources: [
      {
        label: "Jack Herrington",
        note: "Fiber internals, concurrent React, advanced patterns",
      },
      {
        label: "Fireship",
        note: "React 18 concurrent features explained quickly",
      },
      {
        label: "Web Dev Simplified",
        note: "Suspense + Error boundary patterns step by step",
      },
    ],
    topics: [
      {
        id: "r-a-1",
        text: "Fiber architecture — unit of work, render vs commit phase",
        interview: true,
      },
      {
        id: "r-a-2",
        text: "Reconciliation — diffing rules, keys, element type check",
        interview: true,
      },
      {
        id: "r-a-3",
        text: "Automatic batching in React 18 — how it changed",
        interview: false,
      },
      {
        id: "r-a-4",
        text: "useTransition — mark state update as non-urgent",
        interview: true,
      },
      {
        id: "r-a-5",
        text: "useDeferredValue — defer a value update",
        interview: false,
      },
      {
        id: "r-a-6",
        text: "Compound components — Select+Option example with context",
        interview: true,
      },
      { id: "r-a-7", text: "Render props pattern", interview: false },
      {
        id: "r-a-8",
        text: "HOC — higher-order component pattern",
        interview: false,
      },
      {
        id: "r-a-9",
        text: "Suspense boundaries — granular loading, prevent waterfalls",
        interview: true,
      },
      {
        id: "r-a-10",
        text: "Error boundaries — react-error-boundary lib and patterns",
        interview: true,
      },
      {
        id: "r-a-11",
        text: "React.lazy + dynamic import — component-level code splitting",
        interview: true,
      },
      {
        id: "r-a-12",
        text: "React DevTools Profiler — flamegraph, why-did-you-render",
        interview: true,
      },
      {
        id: "r-a-13",
        text: "Accessibility: ARIA, focus trap, keyboard navigation",
        interview: false,
      },
    ],
  },
  // ── WEEK 4 ──────────────────────────────────────────────────
  {
    id: "m-react-interview",
    weekId: "w4",
    tag: "React",
    level: "Interview",
    title: "React — Machine Coding + Interview Q&A",
    resources: [
      {
        label: "Jack Herrington",
        note: "Machine coding walkthroughs — real engineering depth",
      },
      {
        label: "GreatFrontEnd",
        note: "Practice problems + frontend system design guides",
      },
      {
        label: "Codevolution",
        note: "React interview Q&A playlist — comprehensive",
      },
    ],
    topics: [
      {
        id: "r-i-1",
        text: "Build autocomplete — debounced input, dropdown, keyboard nav",
        interview: true,
      },
      {
        id: "r-i-2",
        text: "Build infinite scroll — IntersectionObserver + useInfiniteQuery",
        interview: true,
      },
      {
        id: "r-i-3",
        text: "Build accessible modal — focus trap, Escape key, aria-modal",
        interview: true,
      },
      {
        id: "r-i-4",
        text: "Build accordion — animated, accessible, single/multi open",
        interview: true,
      },
      {
        id: "r-i-5",
        text: "Build multi-select dropdown — search + check/uncheck + tags",
        interview: true,
      },
      {
        id: "r-i-6",
        text: "Build data table — sortable columns, filter, pagination",
        interview: true,
      },
      {
        id: "r-i-7",
        text: "Interview Q: What is reconciliation?",
        interview: true,
      },
      {
        id: "r-i-8",
        text: "Interview Q: Rules of hooks and why they exist",
        interview: true,
      },
      {
        id: "r-i-9",
        text: "Interview Q: When does a component re-render?",
        interview: true,
      },
      {
        id: "r-i-10",
        text: "Interview Q: useMemo vs useCallback — difference",
        interview: true,
      },
      {
        id: "r-i-11",
        text: "Interview Q: What is the virtual DOM?",
        interview: true,
      },
      {
        id: "r-i-12",
        text: "Interview Q: Explain concurrent rendering in React 18",
        interview: true,
      },
    ],
  },
  // ── WEEK 5 ──────────────────────────────────────────────────
  {
    id: "m-next-basic",
    weekId: "w5",
    tag: "Next.js",
    level: "Beginner",
    title: "Next.js — Fundamentals",
    resources: [
      {
        label: "Lee Robinson (Vercel)",
        note: "App Router patterns — from the framework team itself",
      },
      {
        label: "ByteGrad",
        note: "Practical App Router course — Server Actions + TS",
      },
      {
        label: "Jack Herrington",
        note: "RSC deep dives, caching series, performance",
      },
      {
        label: "The Net Ninja",
        note: "Next.js Tutorial playlist — structured beginner series",
      },
    ],
    topics: [
      {
        id: "n-b-1",
        text: "File-based routing — folder = route segment",
        interview: false,
      },
      {
        id: "n-b-2",
        text: "layout.tsx, loading.tsx, error.tsx, not-found.tsx purpose",
        interview: true,
      },
      {
        id: "n-b-3",
        text: "Server Components vs Client Components — boundary rules",
        interview: true,
      },
      {
        id: "n-b-4",
        text: "Async Server Components — await directly in component body",
        interview: true,
      },
      {
        id: "n-b-5",
        text: "fetch cache options: force-cache vs no-store vs revalidate",
        interview: true,
      },
      {
        id: "n-b-6",
        text: "Four caching layers: request memo, data, full-route, router",
        interview: true,
      },
      {
        id: "n-b-7",
        text: "Server Actions — use server, form actions, revalidatePath",
        interview: true,
      },
      {
        id: "n-b-8",
        text: "useOptimistic — optimistic UI updates with Server Actions",
        interview: false,
      },
      {
        id: "n-b-9",
        text: "ISR: revalidatePath, revalidateTag, on-demand revalidation",
        interview: true,
      },
      {
        id: "n-b-10",
        text: "Auth.js v5 — providers, sessions, middleware route guard",
        interview: false,
      },
      {
        id: "n-b-11",
        text: "Metadata API — generateMetadata, OG images, sitemap.ts",
        interview: false,
      },
      {
        id: "n-b-12",
        text: "Middleware — auth redirect, i18n detection, edge runtime",
        interview: false,
      },
    ],
  },
  // ── WEEK 6 ──────────────────────────────────────────────────
  {
    id: "m-next-adv",
    weekId: "w6",
    tag: "Next.js",
    level: "Advanced",
    title: "Next.js — Advanced",
    resources: [
      {
        label: "Lee Robinson",
        note: "Streaming, parallel routes, production tips",
      },
      {
        label: "Jack Herrington",
        note: "Next.js performance, caching deep dives",
      },
      {
        label: "Theo (t3.gg)",
        note: "Architecture opinions, real product-level Next.js",
      },
    ],
    topics: [
      {
        id: "n-a-1",
        text: "Streaming with Suspense — progressive HTML flush to browser",
        interview: false,
      },
      {
        id: "n-a-2",
        text: "Parallel routes — @folder convention, dashboard tab panels",
        interview: false,
      },
      {
        id: "n-a-3",
        text: "Intercepting routes — modal pattern with URL state",
        interview: false,
      },
      {
        id: "n-a-4",
        text: "next/image — optimization, WebP, blur placeholder",
        interview: false,
      },
      {
        id: "n-a-5",
        text: "next/font — self-host fonts, eliminate FOUT",
        interview: false,
      },
      {
        id: "n-a-6",
        text: "Bundle analysis with @next/bundle-analyzer",
        interview: false,
      },
      {
        id: "n-a-7",
        text: "Interview Q: SSR vs SSG vs ISR vs CSR — when to choose each",
        interview: true,
      },
      {
        id: "n-a-8",
        text: "Interview Q: Server Component vs Client Component decision",
        interview: true,
      },
      {
        id: "n-a-9",
        text: "Interview Q: How does Next.js caching work end-to-end?",
        interview: true,
      },
    ],
  },
  {
    id: "m-node-basic",
    weekId: "w6",
    tag: "Node.js",
    level: "Beginner",
    title: "Node.js + Express — Fundamentals",
    resources: [
      {
        label: "Dave Gray",
        note: "Node.js full series — most thorough on YouTube",
      },
      {
        label: "Traversy Media",
        note: "Node.js & Express Crash Course — fastest start",
      },
      {
        label: "Programming with Mosh",
        note: "Node.js Tutorial for Beginners — clean intro",
      },
      {
        label: "MongoDB Official",
        note: "Schema design talks — straight from the source",
      },
    ],
    topics: [
      {
        id: "nd-b-1",
        text: "Node.js event loop — libuv, non-blocking I/O, thread pool",
        interview: true,
      },
      {
        id: "nd-b-2",
        text: "process.nextTick vs setImmediate vs setTimeout order",
        interview: true,
      },
      {
        id: "nd-b-3",
        text: "Express: routing, middleware chain, req/res/next pattern",
        interview: false,
      },
      {
        id: "nd-b-4",
        text: "Error handling middleware — 4 arguments (err, req, res, next)",
        interview: true,
      },
      {
        id: "nd-b-5",
        text: "Async error wrapper — avoid try/catch in every controller",
        interview: false,
      },
      {
        id: "nd-b-6",
        text: "MongoDB: embedding vs referencing — trade-offs",
        interview: true,
      },
      {
        id: "nd-b-7",
        text: "Mongoose: schema, virtuals, hooks, lean(), populate()",
        interview: false,
      },
      {
        id: "nd-b-8",
        text: "Aggregation pipeline: $match, $group, $project, $lookup",
        interview: false,
      },
      {
        id: "nd-b-9",
        text: "REST API design: resource naming, status codes, versioning",
        interview: true,
      },
      {
        id: "nd-b-10",
        text: "Request validation with Zod middleware",
        interview: false,
      },
    ],
  },
  // ── WEEK 7 ──────────────────────────────────────────────────
  {
    id: "m-node-adv",
    weekId: "w7",
    tag: "Node.js",
    level: "Advanced",
    title: "Node.js + Express — Advanced",
    resources: [
      {
        label: "Dave Gray",
        note: "JWT auth series + RBAC deep dive — best on YouTube",
      },
      { label: "Traversy Media", note: "MERN stack full projects with auth" },
      {
        label: "Academind",
        note: "Node.js REST API + security patterns full course",
      },
    ],
    topics: [
      {
        id: "nd-a-1",
        text: "JWT — header.payload.signature structure explained",
        interview: true,
      },
      {
        id: "nd-a-2",
        text: "Access token (15min) + refresh token (7d) rotation pattern",
        interview: true,
      },
      {
        id: "nd-a-3",
        text: "bcrypt — hashing, salting rounds, timing attack prevention",
        interview: true,
      },
      {
        id: "nd-a-4",
        text: "RBAC middleware — admin / user / guest role checks",
        interview: true,
      },
      {
        id: "nd-a-5",
        text: "Redis: strings, hashes, TTL, eviction policies",
        interview: true,
      },
      {
        id: "nd-a-6",
        text: "Cache-aside pattern — check cache → miss → fetch → store",
        interview: true,
      },
      {
        id: "nd-a-7",
        text: "Rate limiting — Redis sliding window counter implementation",
        interview: true,
      },
      {
        id: "nd-a-8",
        text: "BullMQ: queue + worker, job lifecycle, retry strategies",
        interview: false,
      },
      {
        id: "nd-a-9",
        text: "File uploads: Multer → Cloudinary / S3 presigned URLs",
        interview: false,
      },
      {
        id: "nd-a-10",
        text: "Helmet.js, CORS config, NoSQL injection, input sanitization",
        interview: false,
      },
      {
        id: "nd-a-11",
        text: "PM2 cluster mode — all CPU cores, zero-downtime reload",
        interview: false,
      },
    ],
  },
  // ── WEEK 8 ──────────────────────────────────────────────────
  {
    id: "m-testing",
    weekId: "w8",
    tag: "Testing",
    level: "Intermediate",
    title: "Testing — Unit + Integration + E2E",
    resources: [
      {
        label: "Web Dev Simplified",
        note: "Jest + RTL series — clear and practical",
      },
      { label: "Jack Herrington", note: "RTL + MSW patterns in real apps" },
      {
        label: "Laith Academy",
        note: "Testing React applications full course",
      },
    ],
    topics: [
      {
        id: "t-1",
        text: "Jest: describe, it, expect, matchers, beforeEach/afterEach",
        interview: false,
      },
      {
        id: "t-2",
        text: "jest.fn(), jest.spyOn(), jest.mock() — three mock strategies",
        interview: false,
      },
      {
        id: "t-3",
        text: "RTL: render, screen, getByRole, userEvent — a11y-first queries",
        interview: true,
      },
      {
        id: "t-4",
        text: "getBy vs queryBy vs findBy — when to use each",
        interview: true,
      },
      {
        id: "t-5",
        text: "waitFor, findBy — testing async state updates",
        interview: false,
      },
      {
        id: "t-6",
        text: "MSW — mock HTTP at network level, not function level",
        interview: true,
      },
      {
        id: "t-7",
        text: "renderHook + act — testing custom hooks",
        interview: false,
      },
      {
        id: "t-8",
        text: "Vitest — Jest-compatible, faster in Vite projects",
        interview: false,
      },
      {
        id: "t-9",
        text: "Supertest — test Express routes without running a server",
        interview: false,
      },
      {
        id: "t-10",
        text: "Cypress: cy.visit, cy.get, cy.intercept — E2E flows",
        interview: false,
      },
      {
        id: "t-11",
        text: "Playwright: locators, page objects, trace viewer, cross-browser",
        interview: false,
      },
      {
        id: "t-12",
        text: "Interview Q: Testing philosophy — pyramid, TDD, what not to test",
        interview: true,
      },
    ],
  },
  {
    id: "m-cicd",
    weekId: "w8",
    tag: "DevOps",
    level: "Intermediate",
    title: "CI/CD + Docker",
    resources: [
      {
        label: "TechWorld with Nana",
        note: "Docker full course + GitHub Actions CI/CD playlist",
      },
      {
        label: "NetworkChuck",
        note: "Docker for beginners — fun accessible intro",
      },
      { label: "Fireship", note: "Docker in 100 Seconds — quick mental model" },
    ],
    topics: [
      {
        id: "ci-1",
        text: "Docker: image vs container — the distinction",
        interview: false,
      },
      {
        id: "ci-2",
        text: "Dockerfile: FROM, WORKDIR, COPY, RUN, EXPOSE, CMD",
        interview: false,
      },
      {
        id: "ci-3",
        text: "Multi-stage builds — separate build and production stages",
        interview: false,
      },
      {
        id: "ci-4",
        text: "Docker Compose — multi-service: API + MongoDB + Redis",
        interview: false,
      },
      {
        id: "ci-5",
        text: "Volumes and networks in Docker Compose",
        interview: false,
      },
      {
        id: "ci-6",
        text: "GitHub Actions: workflow YAML, triggers, jobs, steps",
        interview: false,
      },
      {
        id: "ci-7",
        text: "CI pipeline: lint → type-check → unit test → build",
        interview: false,
      },
      {
        id: "ci-8",
        text: "Secrets — store API keys securely in GitHub Actions",
        interview: false,
      },
      {
        id: "ci-9",
        text: "CD pipeline — auto-deploy to Render/Vercel on main push",
        interview: false,
      },
    ],
  },
  // ── WEEK 9 ──────────────────────────────────────────────────
  {
    id: "m-ai-basic",
    weekId: "w9",
    tag: "AI",
    level: "Beginner",
    title: "AI Integration — Fundamentals",
    resources: [
      {
        label: "Jack Herrington",
        note: "Vercel AI SDK series — best for React/Next.js + AI",
      },
      { label: "Fireship", note: "OpenAI API intro + AI app build videos" },
      {
        label: "Sam Witteveen",
        note: "Function calling, embeddings, prompt engineering",
      },
      {
        label: "DeepLearning.AI",
        note: "Free short courses at learn.deeplearning.ai — start here",
      },
    ],
    topics: [
      {
        id: "ai-b-1",
        text: "OpenAI chat completions — models, roles, temperature, tokens",
        interview: false,
      },
      {
        id: "ai-b-2",
        text: "Token counting, cost calculation, model tiering (4o vs 4o-mini)",
        interview: true,
      },
      {
        id: "ai-b-3",
        text: "Streaming responses — SSE + ReadableStream in Next.js",
        interview: true,
      },
      {
        id: "ai-b-4",
        text: "Vercel AI SDK: streamText, useChat, useCompletion hooks",
        interview: false,
      },
      {
        id: "ai-b-5",
        text: "Function calling — tool definitions, multi-step reasoning",
        interview: true,
      },
      {
        id: "ai-b-6",
        text: "generateObject with Zod — structured type-safe LLM output",
        interview: false,
      },
      {
        id: "ai-b-7",
        text: "Prompt engineering: zero-shot, few-shot, chain-of-thought",
        interview: false,
      },
      {
        id: "ai-b-8",
        text: "Context window management — truncation and summarization",
        interview: false,
      },
      {
        id: "ai-b-9",
        text: "Prompt injection risks and mitigations",
        interview: true,
      },
      {
        id: "ai-b-10",
        text: "AI error handling — retry on 429, fallback on 5xx",
        interview: false,
      },
    ],
  },
  // ── WEEK 10 ──────────────────────────────────────────────────
  {
    id: "m-ai-adv",
    weekId: "w10",
    tag: "AI",
    level: "Advanced",
    title: "AI — RAG + Vector DBs + Agents",
    resources: [
      {
        label: "Sam Witteveen",
        note: "RAG pipeline construction, embeddings deep dive",
      },
      {
        label: "LangChain Official",
        note: "LangGraph agents, RAG evaluation series",
      },
      {
        label: "AI Jason",
        note: "Practical agent construction + real project walkthroughs",
      },
      {
        label: "Jack Herrington",
        note: "RAG with Next.js — full implementation",
      },
    ],
    topics: [
      {
        id: "ai-a-1",
        text: "RAG: chunk → embed → store → retrieve → augment → generate",
        interview: true,
      },
      {
        id: "ai-a-2",
        text: "Chunking: fixed-size vs sentence vs semantic strategies",
        interview: true,
      },
      {
        id: "ai-a-3",
        text: "Embeddings with text-embedding-3-small",
        interview: false,
      },
      {
        id: "ai-a-4",
        text: "Pinecone / Supabase pgvector — upsert, query, metadata filter",
        interview: false,
      },
      {
        id: "ai-a-5",
        text: "Hybrid search — combine BM25 keyword + vector similarity",
        interview: false,
      },
      {
        id: "ai-a-6",
        text: "Citation tracking — show source passages alongside answer",
        interview: false,
      },
      {
        id: "ai-a-7",
        text: "ReAct agent: Reason → Act → Observe → Repeat loop",
        interview: true,
      },
      {
        id: "ai-a-8",
        text: "Agent memory — short-term (conversation) vs long-term (DB)",
        interview: false,
      },
      {
        id: "ai-a-9",
        text: "Semantic caching with Redis — avoid redundant LLM calls",
        interview: true,
      },
      {
        id: "ai-a-10",
        text: "Interview Q: Design a scalable AI chat system",
        interview: true,
      },
      {
        id: "ai-a-11",
        text: "Interview Q: Walk through a RAG pipeline end-to-end",
        interview: true,
      },
    ],
  },
  // ── WEEK 11 ──────────────────────────────────────────────────
  {
    id: "m-devops",
    weekId: "w11",
    tag: "DevOps",
    level: "Intermediate",
    title: "DevOps — AWS + Nginx + Monitoring",
    resources: [
      {
        label: "TechWorld with Nana",
        note: "Docker, K8s, CI/CD, Prometheus — full DevOps catalog",
      },
      {
        label: "freeCodeCamp",
        note: "AWS full course for beginners — free, long-form",
      },
      { label: "KodeKloud", note: "Lab-based Kubernetes + CKA exam prep" },
      {
        label: "DevOps Directive",
        note: "Production Docker + Terraform walkthroughs",
      },
    ],
    topics: [
      {
        id: "dv-1",
        text: "EC2 — launch, SSH, security groups, Elastic IP",
        interview: false,
      },
      {
        id: "dv-2",
        text: "Nginx — reverse proxy, proxy_pass to Node.js app",
        interview: false,
      },
      {
        id: "dv-3",
        text: "SSL with Certbot — free HTTPS from Let's Encrypt",
        interview: false,
      },
      {
        id: "dv-4",
        text: "S3 — bucket policies, IAM, presigned URLs for uploads",
        interview: false,
      },
      {
        id: "dv-5",
        text: "CloudFront — CDN distribution in front of S3 or EC2",
        interview: false,
      },
      {
        id: "dv-6",
        text: "Sentry — error tracking in Next.js and Express",
        interview: false,
      },
      {
        id: "dv-7",
        text: "PM2 — cluster mode, zero-downtime reload, log management",
        interview: false,
      },
      {
        id: "dv-8",
        text: "Health check endpoint + uptime monitoring + alerting",
        interview: false,
      },
      {
        id: "dv-9",
        text: "Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms",
        interview: true,
      },
      {
        id: "dv-10",
        text: "Interview Q: Walk through your entire deployment pipeline",
        interview: true,
      },
    ],
  },

  // ── WEEK 12 ──────────────────────────────────────────────────
  {
    id: "m-system-design",
    weekId: "w12",
    tag: "System Design",
    level: "Advanced",
    title: "System Design + Mock Interviews",
    resources: [
      {
        label: "GreatFrontEnd",
        note: "Frontend system design framework + practice problems",
      },
      {
        label: "ByteByteGo",
        note: "System design newsletter + YouTube — HLD patterns",
      },
      {
        label: "Jack Herrington",
        note: "Feature-sliced design, frontend architecture",
      },
      {
        label: "Gaurav Sen",
        note: "Scalability, CAP theorem, distributed systems concepts",
      },
    ],
    topics: [
      {
        id: "sd-1",
        text: "Feature-sliced design: app/pages/widgets/features/entities/shared",
        interview: true,
      },
      {
        id: "sd-2",
        text: "Design token system: colors, spacing, typography, semantic tokens",
        interview: false,
      },
      {
        id: "sd-3",
        text: "API abstraction layer — service/repository pattern",
        interview: true,
      },
      {
        id: "sd-4",
        text: "Error handling architecture — global + feature-level boundaries",
        interview: false,
      },
      {
        id: "sd-5",
        text: "Bundle optimization: splitting, tree shaking, performance budget",
        interview: true,
      },
      {
        id: "sd-6",
        text: "RADIO: Requirements → Architecture → Data → Interface → Optimization",
        interview: true,
      },
      {
        id: "sd-7",
        text: "Practice: Design Twitter Feed frontend architecture",
        interview: true,
      },
      {
        id: "sd-8",
        text: "Practice: Design Autocomplete component end-to-end",
        interview: true,
      },
      {
        id: "sd-9",
        text: "Practice: Design a Design System for 50 engineers",
        interview: true,
      },
      {
        id: "sd-10",
        text: "Behavioral STAR stories — 10 scenarios prepared and practiced",
        interview: false,
      },
      {
        id: "sd-11",
        text: "Mock loop x5: DSA → Machine coding → System design → Behavioral",
        interview: true,
      },
      {
        id: "sd-12",
        text: "Resume final — ATS-optimized, achievements quantified",
        interview: false,
      },
    ],
  },
];

export const DSA = [
  {
    id: "dsa-1",
    week: "W1",
    title: "Arrays & Hashing",
    level: "Beginner",
    pattern: "Lookup optimization · Prefix sums · Frequency maps",

    topics: [
      {
        id: "dsa-1-1",
        text: "Array traversal patterns",
        diff: "Easy",
      },
      {
        id: "dsa-1-2",
        text: "HashMap frequency counting",
        diff: "Easy",
      },
      {
        id: "dsa-1-3",
        text: "Prefix sum technique",
        diff: "Medium",
      },
      {
        id: "dsa-1-4",
        text: "Sliding window basics",
        diff: "Medium",
      },
      {
        id: "dsa-1-5",
        text: "Kadane’s Algorithm",
        diff: "Medium",
      },
      {
        id: "dsa-1-6",
        text: "Two pointer optimization",
        diff: "Medium",
      },
    ],
  },

  {
    id: "dsa-2",
    week: "W2",
    title: "Stack, Queue & Linked Lists",
    level: "Beginner",
    pattern: "Monotonic stack · Pointer manipulation",

    topics: [
      {
        id: "dsa-2-1",
        text: "Stack implementation",
        diff: "Easy",
      },
      {
        id: "dsa-2-2",
        text: "Queue & deque concepts",
        diff: "Easy",
      },
      {
        id: "dsa-2-3",
        text: "Fast & slow pointer technique",
        diff: "Medium",
      },
      {
        id: "dsa-2-4",
        text: "Linked list reversal",
        diff: "Easy",
      },
      {
        id: "dsa-2-5",
        text: "Cycle detection",
        diff: "Medium",
      },
      {
        id: "dsa-2-6",
        text: "Monotonic stack problems",
        diff: "Medium",
      },
    ],
  },

  {
    id: "dsa-3",
    week: "W3",
    title: "Binary Search & Trees",
    level: "Intermediate",
    pattern: "DFS · BFS · Divide & conquer",

    topics: [
      {
        id: "dsa-3-1",
        text: "Binary search template",
        diff: "Easy",
      },
      {
        id: "dsa-3-2",
        text: "Search space reduction",
        diff: "Medium",
      },
      {
        id: "dsa-3-3",
        text: "DFS traversals",
        diff: "Easy",
      },
      {
        id: "dsa-3-4",
        text: "BFS level order traversal",
        diff: "Medium",
      },
      {
        id: "dsa-3-5",
        text: "Binary Search Trees",
        diff: "Medium",
      },
      {
        id: "dsa-3-6",
        text: "Lowest Common Ancestor",
        diff: "Hard",
      },
    ],
  },

  {
    id: "dsa-4",
    week: "W4",
    title: "Graphs & Backtracking",
    level: "Intermediate",
    pattern: "DFS/BFS graph traversal · State space exploration",

    topics: [
      {
        id: "dsa-4-1",
        text: "Graph representations",
        diff: "Easy",
      },
      {
        id: "dsa-4-2",
        text: "DFS on graphs",
        diff: "Medium",
      },
      {
        id: "dsa-4-3",
        text: "BFS shortest path",
        diff: "Medium",
      },
      {
        id: "dsa-4-4",
        text: "Topological sorting",
        diff: "Hard",
      },
      {
        id: "dsa-4-5",
        text: "Backtracking template",
        diff: "Medium",
      },
      {
        id: "dsa-4-6",
        text: "Subset & permutation generation",
        diff: "Medium",
      },
    ],
  },

  {
    id: "dsa-5",
    week: "W5",
    title: "Dynamic Programming I",
    level: "Intermediate",
    pattern: "Memoization · Tabulation",

    topics: [
      {
        id: "dsa-5-1",
        text: "1D DP fundamentals",
        diff: "Easy",
      },
      {
        id: "dsa-5-2",
        text: "Memoization recursion",
        diff: "Medium",
      },
      {
        id: "dsa-5-3",
        text: "Bottom-up DP",
        diff: "Medium",
      },
      {
        id: "dsa-5-4",
        text: "Knapsack-style problems",
        diff: "Hard",
      },
      {
        id: "dsa-5-5",
        text: "Coin change pattern",
        diff: "Medium",
      },
    ],
  },

  {
    id: "dsa-6",
    week: "W6",
    title: "Dynamic Programming II",
    level: "Advanced",
    pattern: "State transitions · 2D DP",

    topics: [
      {
        id: "dsa-6-1",
        text: "2D DP grids",
        diff: "Medium",
      },
      {
        id: "dsa-6-2",
        text: "Longest Common Subsequence",
        diff: "Hard",
      },
      {
        id: "dsa-6-3",
        text: "Palindrome DP",
        diff: "Hard",
      },
      {
        id: "dsa-6-4",
        text: "State machine DP",
        diff: "Hard",
      },
    ],
  },

  {
    id: "dsa-7",
    week: "W7",
    title: "Greedy, Heaps & Intervals",
    level: "Advanced",
    pattern: "Priority queues · Greedy choice",

    topics: [
      {
        id: "dsa-7-1",
        text: "Heap fundamentals",
        diff: "Medium",
      },
      {
        id: "dsa-7-2",
        text: "Top K problems",
        diff: "Medium",
      },
      {
        id: "dsa-7-3",
        text: "Greedy strategy design",
        diff: "Hard",
      },
      {
        id: "dsa-7-4",
        text: "Interval merge patterns",
        diff: "Medium",
      },
      {
        id: "dsa-7-5",
        text: "Scheduling problems",
        diff: "Hard",
      },
    ],
  },

  {
    id: "dsa-8",
    week: "W8",
    title: "Tries & Advanced Structures",
    level: "Advanced",
    pattern: "Efficient lookup structures",

    topics: [
      {
        id: "dsa-8-1",
        text: "Trie insert/search",
        diff: "Medium",
      },
      {
        id: "dsa-8-2",
        text: "LRU cache design",
        diff: "Hard",
      },
      {
        id: "dsa-8-3",
        text: "Union Find / DSU",
        diff: "Hard",
      },
      {
        id: "dsa-8-4",
        text: "Segment tree basics",
        diff: "Hard",
      },
    ],
  },

  {
    id: "dsa-9",
    week: "W9",
    title: "Bit Manipulation",
    level: "Advanced",
    pattern: "Binary optimization",

    topics: [
      {
        id: "dsa-9-1",
        text: "Bitwise operators",
        diff: "Easy",
      },
      {
        id: "dsa-9-2",
        text: "XOR tricks",
        diff: "Medium",
      },
      {
        id: "dsa-9-3",
        text: "Bitmasking",
        diff: "Hard",
      },
      {
        id: "dsa-9-4",
        text: "Bitmask DP",
        diff: "Hard",
      },
    ],
  },

  {
    id: "dsa-10",
    week: "W10",
    title: "System Design Foundations",
    level: "Advanced",
    pattern: "Scalability · Tradeoffs",

    topics: [
      {
        id: "dsa-10-1",
        text: "Caching strategies",
        diff: "Medium",
      },
      {
        id: "dsa-10-2",
        text: "Load balancing",
        diff: "Medium",
      },
      {
        id: "dsa-10-3",
        text: "Rate limiting",
        diff: "Hard",
      },
      {
        id: "dsa-10-4",
        text: "Database sharding",
        diff: "Hard",
      },
    ],
  },

  {
    id: "dsa-11",
    week: "W11",
    title: "High Level System Design",
    level: "Expert",
    pattern: "Distributed systems",

    topics: [
      {
        id: "dsa-11-1",
        text: "CAP theorem",
        diff: "Hard",
      },
      {
        id: "dsa-11-2",
        text: "Message queues",
        diff: "Hard",
      },
      {
        id: "dsa-11-3",
        text: "Distributed caching",
        diff: "Hard",
      },
      {
        id: "dsa-11-4",
        text: "Designing scalable APIs",
        diff: "Hard",
      },
    ],
  },

  {
    id: "dsa-12",
    week: "W12",
    title: "Interview Mastery & Revision",
    level: "Expert",
    pattern: "Speed · Pattern recognition · Mock rounds",

    topics: [
      {
        id: "dsa-12-1",
        text: "Blind 75 revision",
        diff: "Mixed",
      },
      {
        id: "dsa-12-2",
        text: "NeetCode 150 revision",
        diff: "Mixed",
      },
      {
        id: "dsa-12-3",
        text: "Timed mock interviews",
        diff: "Hard",
      },
      {
        id: "dsa-12-4",
        text: "Pattern recognition drills",
        diff: "Hard",
      },
    ],
  },
];

export const TAG_STYLE = {
  JS: "bg-yellow-100 text-yellow-800",
  TS: "bg-blue-100 text-blue-800",
  React: "bg-cyan-100 text-cyan-800",
  "Next.js": "bg-gray-900 text-white",
  "Node.js": "bg-green-100 text-green-800",
  Testing: "bg-purple-100 text-purple-800",
  AI: "bg-emerald-100 text-emerald-800",
  DevOps: "bg-orange-100 text-orange-800",
  "System Design": "bg-rose-100 text-rose-800",
};

export const DIFF_STYLE = {
  Easy: "text-green-600",
  Medium: "text-yellow-600",
  Hard: "text-red-600",
  Mixed: "text-gray-400",
  Design: "text-blue-600",
};

export const PHASE_BORDER = {
  p1: "border-blue-200 bg-blue-50",
  p2: "border-green-200 bg-violet-50",
  p3: "border-emerald-200 bg-emerald-50",
  dsa: "border-violet-200 bg-yellow-50",
};

export const PHASE_BADGE = {
  p1: "bg-blue-600 text-white",
  p2: "bg-violet-600 text-white",
  p3: "bg-emerald-600 text-white",
  dsa: "bg-yellow-600 text-yellow-50",
};
