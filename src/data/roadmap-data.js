export const PHASES = [
  //********************** ************ Phase 1 ************ ************ /
  {
    id: "p1",
    label: "Phase 1",
    title: "Frontend Foundations",
    subtitle: "Weeks 1–4 · JS + TS + React",
    weeks: ["w1", "w2", "w3", "w4"],
  },

  //********************** ************ phase 2 ************ ************ /
  {
    id: "p2",
    label: "Phase 2",
    title: "Full-Stack Engineering",
    subtitle: "Weeks 5–8 · Next.js + MERN + Testing",
    weeks: ["w5", "w6", "w7", "w8"],
  },

  //********************** ************ Phase 3 ************ ************ /
  {
    id: "p3",
    label: "Phase 3",
    title: "AI + Production",
    subtitle: "Weeks 9–12 · AI + DevOps + System Design",
    weeks: ["w9", "w10", "w11", "w12"],
  },

  //********************** ************ Phase 4 ************ ************ /

  {
    id: "react_native",
    label: "Phase 4",
    title: "React Native",
    subtitle: "Weeks 1–12 · React native beginners to Advance",
    weeks: [],
  },
];

export const WEEKS = [
  //********************** ************ WEEK 1 ************ ************ /
  {
    id: "w1",
    n: 1,
    phase: "p1",
    title: "JS Basics + TS Basics + React Intro",
    milestone: "Answer basic JS / TS / React interview questions",
    outcome: "Typed React app with hooks deployed",
  },

  //********************** ************ WEEK 2 ************ ************ /
  {
    id: "w2",
    n: 2,
    phase: "p1",
    title: "JS Advanced + TS Advanced + React Intermediate",
    milestone: "Closures, event loop, generics, re-renders confident",
    outcome: "React dashboard with TanStack Query + Zustand",
  },

  //********************** ************ WEEK 3 ************ ************ /
  {
    id: "w3",
    n: 3,
    phase: "p1",
    title: "React Advanced — Patterns + Performance",
    milestone: "TanStack Query, Suspense, machine coding ready",
    outcome: "Production-grade React SaaS UI",
  },

  //********************** ************ WEEK 4 ************ ************ /
  {
    id: "w4",
    n: 4,
    phase: "p1",
    title: "React — Machine Coding Engineering",
    milestone: "Frontend interview ready — SDE-1 level",
    outcome: "Production-ready component library & 12 optimized UI patterns",
  },

  //********************** ************ WEEK 5 ************ ************ /
  {
    id: "w5",
    n: 5,
    phase: "p2",
    title: "Next.js Fundamentals to advance + App Router Architecture",
    milestone:
      "SSR, SSG, ISR, and PPR paradigms explained confidently at an architectural level",
    outcome:
      "Production-grade, highly cached Next.js SaaS UI with custom dashboards and edge auth",
  },

  //********************** ************ WEEK 6 ************ ************ /
  {
    id: "w6",
    n: 6,
    phase: "p2",
    title: "Backend Core — Node.js Engine, Express & Database Architecture",
    milestone:
      "Event Loop mastery, advanced aggregation pipelines, and runtime query optimizations",
    outcome:
      "Production-ready Node.js + Express REST API backed by optimized MongoDB schemas",
  },

  //********************** ************ WEEK 7 ************ ************ /
  {
    id: "w7",
    n: 7,
    phase: "p2",
    title:
      "Backend Infra — Security, Token Cryptography, Distributed Caching & Async Workers",
    milestone:
      "JWT security protocols, sliding window rate limits, and event-driven background job queues",
    outcome:
      "Enterprise-grade, security-hardened API scaling with decoupled job workers and caching layouts",
  },
  //********************** ************ WEEK 8 ************ ************ /
  {
    id: "w8",
    n: 8,
    phase: "p2",
    title: "Testing + CI/CD + Docker",
    milestone: "Testing pyramid, CI pipeline, Docker basics",
    outcome: "Full test suite + CI/CD + Docker Compose",
  },

  //********************** ************ WEEK 9 ************ ************ /
  {
    id: "w9",
    n: 9,
    phase: "p3",
    title: "AI Integration — OpenAI, Vercel AI SDK & Streaming Architecture",
    milestone:
      "Mastery of Server-Sent Events (SSE), type-safe structured outputs, and autonomous function-calling pipelines",
    outcome:
      "Production-grade generative AI chat companion with real-time UI streaming and adaptive cost controls",
  },

  //********************** ************ WEEK 10 ************ ************ /
  {
    id: "w10",
    n: 10,
    phase: "p3",
    title: "AI Advanced — RAG Architecture + Autonomous Agents",
    milestone:
      "Production RAG evaluation, semantic search tuning, and graph-based agent orchestration",
    outcome:
      "Enterprise Document Q&A workspace with context citations and tool-augmented agents",
  },

  //********************** ************ WEEK 11 ************ ************ /
  {
    id: "w11",
    n: 11,
    phase: "p3",
    title: "DevOps — AWS + Nginx + Monitoring",
    milestone: "Deployment pipeline, AWS basics, observability",
    outcome: "SaaS on AWS EC2 with Sentry + monitoring",
  },

  //********************** ************ WEEK 12 ************ ************ /
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
  //********************** ************ WEEK 1 ************ ************ /

  //----JS basics -------
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

  //----TS advance -------
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

  //----React Fundamentals -------
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

  //********************** ************ WEEK 2 ************ ************ /

  //----JS advance -------
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
  //----TS advance -------
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
  //----React Intermediate -------
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

  //********************** ************ WEEK 3 ************ ************ /

  //----React Advance P-1 -------
  {
    id: "m-react-adv-1",
    weekId: "w3",
    tag: "React",
    level: "Advanced",
    title: "React Advanced (Part 1) — Architecture & Concurrent Performance",
    resources: [
      {
        label: "Jack Herrington",
        note: "Fiber internals, concurrent React, and profiler deep-dives",
      },
      {
        label: "Fireship",
        note: "React 18/19 concurrent features explained quickly",
      },
      {
        label: "TkDodo's Blog",
        note: "The definitive guide to TanStack Query architecture and caching",
      },
    ],
    topics: [
      {
        id: "r-a1-1",
        text: "Fiber architecture — the unit of work, singly-linked fiber trees, and the cooperative scheduling work loop",
        interview: true,
      },
      {
        id: "r-a1-2",
        text: "Render vs Commit phase — side-effects isolation, double buffering strategy, and DOM mutations execution",
        interview: true,
      },
      {
        id: "r-a1-3",
        text: "Reconciliation engine — O(n) diffing heuristic, rules of keys, element type checks, and component unmounting mechanics",
        interview: true,
      },
      {
        id: "r-a1-4",
        text: "The React Compiler — how automatic build-time memoization works, dependency array elimination, and code rules required to prevent compiler opt-out",
        interview: true,
      },
      {
        id: "r-a1-5",
        text: "useTransition & useDeferredValue — prioritizing high-urgency user inputs over non-urgent expensive background UI updates",
        interview: true,
      },
      {
        id: "r-a1-6",
        text: "React 19 Actions API — managing async pending states natively via form action props, useActionState, and useFormStatus",
        interview: true,
      },
      {
        id: "r-a1-7",
        text: "TanStack Query Engine — query keys, state lifecycle (stale, fresh, fetching, inactive), and automatic garbage collection",
        interview: true,
      },
      {
        id: "r-a1-8",
        text: "TanStack Query Mutations — optimistic updates, cache invalidation strategies, and request deduplication flows",
        interview: true,
      },
      {
        id: "r-a1-9",
        text: "React DevTools Profiler — reading flamegraphs, interaction tracking, and identifying commit phase performance bottlenecks",
        interview: true,
      },
    ],
  },

  //----React Advance P-2 -------
  {
    id: "m-react-adv-2",
    weekId: "w3",
    tag: "React",
    level: "Advanced",
    title: "React Advanced (Part 2) — Design Patterns & Resilient Architecture",
    resources: [
      {
        label: "Web Dev Simplified",
        note: "Suspense + Error boundary patterns step by step",
      },
      {
        label: "Frontend Masters",
        note: "Advanced React Component Patterns (Compound, Controlled/Uncontrolled)",
      },
    ],
    topics: [
      {
        id: "r-a2-1",
        text: "Compound components — structural flexibility using React Context, explicit vs implicit child state sharing (Select/Option, Tabs)",
        interview: true,
      },
      {
        id: "r-a2-2",
        text: "Control Props & State Reducer patterns — building highly customizable design system elements with external state overrides",
        interview: true,
      },
      {
        id: "r-a2-3",
        text: "Global Client State Architecture — lightweight atomic state management via Zustand vs legacy Redux Toolkit/Context solutions",
        interview: true,
      },
      {
        id: "r-a2-4",
        text: "React Server Components (RSC) — data fetching on the server, zero-bundle-size components, and defining the client-server serialization boundary ('use client' vs 'use server')",
        interview: true,
      },
      {
        id: "r-a2-5",
        text: "The use() Hook — handling un-awaited promises and Context values conditionally inside loops or early returns",
        interview: true,
      },
      {
        id: "r-a2-6",
        text: "Suspense & Streaming SSR — data-fetching orchestration, avoiding network waterfalls, and handling skeleton screen states",
        interview: true,
      },
      {
        id: "r-a2-7",
        text: "Error Boundaries — catching runtime rendering crashes, react-error-boundary integration, fallbacks, and boundary-reset actions",
        interview: true,
      },
      {
        id: "r-a2-8",
        text: "Code splitting at scale — React.lazy, dynamic import syntax, and route-level vs conditional-level boundary chunking",
        interview: true,
      },
      {
        id: "r-a2-9",
        text: "Enterprise Accessibility & WAI-ARIA — managing dynamic focus traps, screen reader announcements, and keyboard navigation profiles",
        interview: false,
      },
    ],
  },

  //********************** ************ WEEK 4 ************ ************ /
  // --- PART 1: MACHINE CODING FUNDAMENTALS --- //
  {
    id: "m-react-mc-1",
    weekId: "w4",
    tag: "React",
    level: "Interview",
    title:
      "React Machine Coding (Part 1) — UI Fundamentals & DOM Interactivity",
    resources: [
      {
        label: "Jack Herrington",
        note: "Machine coding walkthroughs — compound components and DOM state",
      },
      {
        label: "GreatFrontEnd",
        note: "Component practice problems and core interaction specs",
      },
    ],
    topics: [
      {
        id: "r-i-1",
        text: "Build accordion — animated transitions, full keyboard accessibility, single vs multi-open toggles, utilizing compound component design pattern",
        interview: true,
      },
      {
        id: "r-i-2",
        text: "Build multi-select dropdown — internal text filtering/search input, managed check/uncheck token states, removable selection tags, click-outside-to-close event handling",
        interview: true,
      },
      {
        id: "r-i-3",
        text: "Build star rating component — tracking interactive hover states vs actual selection states, supporting fraction/half stars, read-only display mode, custom configuration injecting SVG icons",
        interview: true,
      },
      {
        id: "r-i-4",
        text: "Build tabs component — dynamic panel switching, state-driven active markers, supporting vertical vs horizontal orientation, and automatic tab-key focus shifting",
        interview: true,
      },
    ],
  },

  // --- PART 2: MACHINE CODING INTERMEDIATE --- //
  {
    id: "m-react-mc-2",
    weekId: "w4",
    tag: "React",
    level: "Interview",
    title:
      "React Machine Coding (Part 2) — Performance, Portals & Async UI Data",
    resources: [
      {
        label: "GreatFrontEnd",
        note: "Frontend system design guidelines for autocomplete and infinite lists",
      },
      {
        label: "Codevolution",
        note: "State optimization and async lifecycle management blueprints",
      },
    ],
    topics: [
      {
        id: "r-i-5",
        text: "Build autocomplete — debounced network input execution, clientside cache map structure, dynamic result list layout, comprehensive keyboard navigation control (Arrow keys + Enter)",
        interview: true,
      },
      {
        id: "r-i-6",
        text: "Build accessible modal — implementing programmatic focus trapping, Escape key event listener bindings, document body scroll locking mechanisms, aria-modal setup injected through React Portals",
        interview: true,
      },
      {
        id: "r-i-7",
        text: "Build data table — sortable alpha/numeric columns, multi-field global filtering/search parsing, client-side pagination pagination calculation controls, useMemo optimization over large row arrays",
        interview: true,
      },
      {
        id: "r-i-8",
        text: "Build infinite scroll — direct viewport tracking using IntersectionObserver API, handling dynamic asynchronous network image assets, building an isolated useInfiniteQuery-style custom state engine hook",
        interview: true,
      },
    ],
  },

  // --- PART 3: MACHINE CODING ADVANCED --- //
  {
    id: "m-react-mc-3",
    weekId: "w4",
    tag: "React",
    level: "Interview",
    title:
      "React Machine Coding (Part 3) — Advanced Data Flows & Complex Architectures",
    resources: [
      {
        label: "Jack Herrington",
        note: "Deep production engineering architectural challenges from scratch",
      },
    ],
    topics: [
      {
        id: "r-i-9",
        text: "Build global toast system — creating an out-of-component global notifier state machine (Zustand or Event Emitter/Pub-Sub model), programmatic auto-hide tracking timers, stacked dynamic positioning, and slide-in entry animations",
        interview: true,
      },
      {
        id: "r-i-10",
        text: "Build nested file explorer — deep recursive directory folder mapping, building CRUD controls directly on UI nodes (create/rename/delete files/folders), syncing structure transformations to persistent local storage",
        interview: true,
      },
      {
        id: "r-i-11",
        text: "Build Kanban board with Drag & Drop — using native HTML5 DnD interface or tracking custom MouseEvents, multi-column task/subtask status sorting, implementing optimistic UI mutation state rollbacks on mock server error failures",
        interview: true,
      },
      {
        id: "r-i-12",
        text: "Build real-time data dashboard — handling persistent high-frequency webSocket stream pipelines, list windowing/virtualization rendering engine optimization for 10k+ continuous incoming items, useTransition integration preventing heavy filter recalculation UI freeze",
        interview: true,
      },
    ],
  },

  //********************** ************ WEEK 5 ************ ************ /
  // --- PART 1: NEXT.JS FUNDAMENTALS (HYBRID ARCHITECTURE & ASYNC LAYOUTS) --- //
  {
    id: "m-next-fund-1",
    weekId: "w5",
    tag: "Next.js",
    level: "Beginner",
    title:
      "Next.js Fundamentals (Part 1) — Hybrid Architecture & Component Layouts",
    resources: [
      {
        label: "The Net Ninja",
        note: "Next.js App Router playlist — structured beginner fundamentals",
      },
      {
        label: "Lee Robinson (Vercel)",
        note: "Mastering the mental shift between Server and Client routing trees",
      },
    ],
    topics: [
      {
        id: "n-f-1",
        text: "File-based routing mechanics — folder hierarchies, nested segments, dynamic slots [id], catch-all workflows, and optional routing arrays",
        interview: false,
      },
      {
        id: "n-f-2",
        text: "Special file conventions — hierarchical evaluation order and structural containment of layout.tsx, page.tsx, loading.tsx, error.tsx, and not-found.tsx",
        interview: true,
      },
      {
        id: "n-f-3",
        text: "React Server Components (RSC) vs Client Components — defining serialization boundaries, asset import restrictions, and tree composition rules",
        interview: true,
      },
      {
        id: "n-f-4",
        text: "Modern Async Lifecycle Rules — adapting to asynchronous environments by explicitly awaiting component props like params and searchParams",
        interview: true,
      },
    ],
  },

  // --- PART 2: NEXT.JS INTERMEDIATE (THE NEXT 15/16 CACHING & DATA LAYER) ---//
  {
    id: "m-next-int-2",
    weekId: "w5",
    tag: "Next.js",
    level: "Intermediate",
    title: "Next.js Intermediate (Part 2) — Caching Ecosystem & Server Actions",
    resources: [
      {
        label: "ByteGrad",
        note: "Practical App Router patterns — Server Actions + Explicit Data Flow",
      },
      {
        label: "Jack Herrington",
        note: "Navigating the Next.js 15/16 uncached-by-default architecture shifts",
      },
    ],
    topics: [
      {
        id: "n-i-1",
        text: "The Uncached-by-Default Shift — understanding why modern fetch requests and GET Route Handlers default to no-store to eliminate implicit caching bugs",
        interview: true,
      },
      {
        id: "n-i-2",
        text: "Explicit Cache Control — configuring cache: 'force-cache', setting explicit interval revalidation timers, or using top-level route-segment overrides",
        interview: true,
      },
      {
        id: "n-i-3",
        text: "Modern Cache Components Engine — enabling cacheComponents config in next.config.ts, using the native 'use cache' directive, and managing cacheLife parameters",
        interview: true,
      },
      {
        id: "n-i-4",
        text: "Core Rendering Paradigms — contrasting execution contexts of Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR via revalidatePath/Tag), and Partial Prerendering (PPR)",
        interview: true,
      },
      {
        id: "n-i-5",
        text: "Server Actions Architecture — mutating database targets directly via inline 'use server' bindings, handling dynamic errors, and executing immediate path purging",
        interview: true,
      },
      {
        id: "n-i-6",
        text: "Native Form UI Hooks — tracking action pipeline executions natively using React hooks like useActionState and useFormStatus without manual local states",
        interview: false,
      },
    ],
  },

  // --- PART 3: NEXT.JS ADVANCED (ENTERPRISE ROUTING, UX & PERFORMANCE) ---//
  {
    id: "m-next-adv-3",
    weekId: "w5",
    tag: "Next.js",
    level: "Advanced",
    title:
      "Next.js Advanced (Part 3) — Enterprise Architecture & Optimization Guards",
    resources: [
      {
        label: "Lee Robinson",
        note: "Streaming, parallel layouts, and real-world edge routing solutions",
      },
      {
        label: "Theo (t3.gg)",
        note: "Production architectures, security bounds, and deployment profiles",
      },
    ],
    topics: [
      {
        id: "n-a-1",
        text: "HTML Streaming Architecture — splitting component paint weight via Suspense boundaries to flush raw HTML skeletons progressively down the wire",
        interview: true,
      },
      {
        id: "n-a-2",
        text: "Parallel Routes UI — organizing dashboard matrix slots with the @folder convention and mastering mandatory default.js fallback matching patterns",
        interview: false,
      },
      {
        id: "n-a-3",
        text: "Intercepting Routing Contexts — capturing routing navigations to present overlays matching specific URL paths without replacing current client state",
        interview: false,
      },
      {
        id: "n-a-4",
        text: "Performance Asset Tuning — configuring next/image layout boundaries, addressing local IP authorization constraints, and embedding zero-layout-shift self-hosted typography via next/font",
        interview: false,
      },
      {
        id: "n-a-5",
        text: "Edge-Authenticated Router Shields — deploying Auth.js v5 frameworks to isolate token payloads, execute cookie storage verification, and build cross-route interceptors in Edge Middleware",
        interview: true,
      },
      {
        id: "n-a-6",
        text: "Bundle Auditing & Compiler Performance — profiling distribution sizes via @next/bundle-analyzer and observing Turbopack compilation traces",
        interview: false,
      },
    ],
  },

  //********************** ************ WEEK 6 ************ ************ /
  // --- WEEK 6, PART 1: RUNTIME ARCHITECTURE & APPLICATION PIPELINES --- //
  {
    id: "m-node-core-1",
    weekId: "w6",
    tag: "Node.js",
    level: "Beginner",
    title: "Node.js Core (Part 1) — Runtime Architecture & Express Pipelines",
    resources: [
      {
        label: "Dave Gray",
        note: "Node.js full architectural series — exceptionally thorough execution",
      },
      {
        label: "Traversy Media",
        note: "Node.js & Express HTTP lifecycle and middleware crash course",
      },
    ],
    topics: [
      {
        id: "nd-b1-1",
        text: "Node.js Event Loop architecture — diving deep into libuv, non-blocking asynchronous I/O execution, and the kernel thread pool worker limits",
        interview: true,
      },
      {
        id: "nd-b1-2",
        text: "Phases of the Event Loop — explicitly tracing microtask execution priority across process.nextTick vs setImmediate vs setTimeout queues",
        interview: true,
      },
      {
        id: "nd-b1-3",
        text: "Express framework mechanics — analyzing route-matching engines, the middleware execution chain, and the isolated req/res/next execution pipeline",
        interview: false,
      },
      {
        id: "nd-b1-4",
        text: "Express centralized error handling — creating dedicated error-interception boundaries using the 4-argument signature (err, req, res, next)",
        interview: true,
      },
      {
        id: "nd-b1-5",
        text: "Async controller error wrapper patterns — implementing un-caught promise catchers to cleanly eliminate try/catch blocks from router controllers",
        interview: false,
      },
      {
        id: "nd-b1-6",
        text: "Declarative request payload validation — constructing reusable Express middleware abstractions using Zod schema parsing and structural type matching",
        interview: false,
      },
    ],
  },

  // --- WEEK 6, PART 2: ADVANCED DATA LAYER & REST SYSTEM DESIGN --- //
  {
    id: "m-node-core-2",
    weekId: "w6",
    tag: "Node.js",
    level: "Intermediate",
    title: "Node.js Core (Part 2) — Database Modeling & Advanced Aggregations",
    resources: [
      {
        label: "Programming with Mosh",
        note: "Clean backend API architecture and clean database mapping fundamentals",
      },
      {
        label: "MongoDB Official",
        note: "Schema design principles, performance implications, and anti-patterns directly from the core team",
      },
    ],
    topics: [
      {
        id: "nd-b2-1",
        text: "Data modeling trade-offs — contrasting embedding documents vs referenced normalization models based on read/write operation ratios",
        interview: true,
      },
      {
        id: "nd-b2-2",
        text: "Mongoose ODM architecture — utilizing model schemas, document virtual properties, pre/post save query hooks, and index definitions",
        interview: false,
      },
      {
        id: "nd-b2-3",
        text: "Query execution optimization — unlocking higher memory performance using .lean() flags to bypass full Mongoose document hydration, and multi-collection .populate() steps",
        interview: true,
      },
      {
        id: "nd-b2-4",
        text: "MongoDB aggregation pipelines — writing multi-stage data operations manipulating $match, $group, $project, and relational $lookup operations",
        interview: true,
      },
      {
        id: "nd-b2-5",
        text: "Enterprise REST API blueprinting — formalizing resource naming conventions, semantic HTTP status codes, routing structures, and API path versioning",
        interview: true,
      },
    ],
  },

  //********************** ************ WEEK 7 ************ ************ /
  // --- WEEK 7, PART 1: PRODUCTION AUTHENTICATION & ACCESS CONTROLS ---//
  {
    id: "m-node-infra-1",
    weekId: "w7",
    tag: "Node.js",
    level: "Advanced",
    title:
      "Backend Infrastructure (Part 1) — Production Authentication & Authorization Architecture",
    resources: [
      {
        label: "Dave Gray",
        note: "JWT authentication lifecycles and secure role-based access control (RBAC) implementations",
      },
      {
        label: "Academind",
        note: "Node.js REST API security profiles and secure cookie storage layouts",
      },
    ],
    topics: [
      {
        id: "nd-a1-1",
        text: "JSON Web Tokens (JWT) internals — evaluating header.payload.signature compilation, state-less payload hazards, and verification protocols",
        interview: true,
      },
      {
        id: "nd-a1-2",
        text: "Token rotation security frameworks — implementing short-lived Access Tokens paired with sliding long-term Refresh Tokens managed via HTTP-Only cookies",
        interview: true,
      },
      {
        id: "nd-a1-3",
        text: "Cryptographic credential protection — hashing user passwords using bcrypt, tuning cost/salting rounds, and designing protection routines against timing attacks",
        interview: true,
      },
      {
        id: "nd-a1-4",
        text: "Granular authorization middleware — building dynamic Role-Based Access Control (RBAC) validation loops protecting tiered endpoint structures",
        interview: true,
      },
    ],
  },

  // --- WEEK 7, PART 2: SPEED, SCALING & SECURITY HARDENING --- //
  {
    id: "m-node-infra-2",
    weekId: "w7",
    tag: "Node.js",
    level: "Advanced",
    title:
      "Backend Infrastructure (Part 2) — Distributed Memory, Message Queues & Security Hardening",
    resources: [
      {
        label: "Traversy Media",
        note: "Scaling backend layers with caching protocols and asset distribution strategies",
      },
      {
        label: "Redis Official",
        note: "Caching paradigms, real-time metrics storage, and memory optimization tactics",
      },
    ],
    topics: [
      {
        id: "nd-a2-1",
        text: "Redis primitives and mechanics — using strings, hashes, key Time-To-Live (TTL) expiration policies, and least-recently-used (LRU) memory eviction models",
        interview: true,
      },
      {
        id: "nd-a2-2",
        text: "Cache-Aside pattern implementation — orchestrating optimal database check-hits, handling cache-misses, fetching data payloads, and refreshing cache values",
        interview: true,
      },
      {
        id: "nd-a2-3",
        text: "Distributed API rate limiting — building traffic limit thresholds using a Redis sliding-window log counter middleware engine",
        interview: true,
      },
      {
        id: "nd-a2-4",
        text: "Asynchronous job execution — separating expensive workloads (emails, media processing) using BullMQ queue producers, concurrent background workers, tracking lifecycles, and automatic retry back-offs",
        interview: false,
      },
      {
        id: "nd-a2-5",
        text: "Cloud binary asset streaming — managing multi-part file uploads through local disk-bound Multer configurations vs cloud object streaming utilizing AWS S3 Pre-signed URLs",
        interview: false,
      },
      {
        id: "nd-a2-6",
        text: "Security profile hardening — setting up cross-origin security arrays using Helmet.js, customizing CORS permissions, guarding against NoSQL injection vectors, and sterilizing user inputs",
        interview: false,
      },
      {
        id: "nd-a2-7",
        text: "Production scaling optimization — utilizing PM2 cluster execution mode to split node traffic balances symmetrically across multiple host CPU cores with zero-downtime hot reloads",
        interview: false,
      },
    ],
  },

  //********************** ************ WEEK 8 ************ ************ /
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

  //********************** ************ WEEK 9 ************ ************ /
  // --- WEEK 9, PART 1: CHAT COMPLETIONS, SSE STREAMING & BASE SDK HOOKS --- //
  {
    id: "m-ai-core-1",
    weekId: "w9",
    tag: "AI",
    level: "Beginner",
    title: "AI Integration (Part 1) — LLM Runtime Mechanics & Streaming UIs",
    resources: [
      {
        label: "Vercel AI SDK Documentation",
        note: "Official guide on core concepts, streamText, and framework-agnostic providers",
      },
      {
        label: "Jack Herrington",
        note: "Vercel AI SDK playlist — industry-standard Next.js App Router integration patterns",
      },
      {
        label: "DeepLearning.AI",
        note: "Prompt Engineering for Developers — foundational mechanics of system framing and temperature tuning",
      },
    ],
    topics: [
      {
        id: "ai-b1-1",
        text: "OpenAI Chat Completions engine — parsing model selection parameters, adjusting temperature/top_p variation scales, and defining stateful system/user/assistant roles",
        interview: false,
      },
      {
        id: "ai-b1-2",
        text: "Token economy and cost modeling — managing prompt/completion token usage weights, calculating request pricing models, and understanding frontier vs utility cost tiering (e.g., gpt-4o vs gpt-4o-mini)",
        interview: true,
      },
      {
        id: "ai-b1-3",
        text: "Real-time streaming internals — building custom Server-Sent Events (SSE) pipelines utilizing native web ReadableStreams over HTTP network connections in Next.js",
        interview: true,
      },
      {
        id: "ai-b1-4",
        text: "Vercel AI SDK Core abstractions — migrating legacy endpoint logic to clean streamText wrappers backed by the standardized AI provider interface layer",
        interview: false,
      },
      {
        id: "ai-b1-5",
        text: "AI UI Hooks integration — managing automatic client-side message parsing, input state tracking, and error retry operations using useChat and useCompletion hooks",
        interview: false,
      },
      {
        id: "ai-b1-6",
        text: "Prompt engineering frameworks — designing scalable operational wrappers utilizing zero-shot contextual guidelines, few-shot structural examples, and chain-of-thought reasonings",
        interview: false,
      },
      {
        id: "ai-b1-7",
        text: "Resilient AI network exception handling — implementing global middleware controllers handling 429 rate limits with exponential backoff and 5xx upstream fallback safety rules",
        interview: false,
      },
    ],
  },

  // --- WEEK 9, PART 2: STRUCTURED OUTPUTS, FUNCTION CALLING & RUNTIME GUARDS ---//
  {
    id: "m-ai-infra-2",
    weekId: "w9",
    tag: "AI",
    level: "Intermediate",
    title:
      "AI Integration (Part 2) — Structured Generation, Function Tools & Agent Guards",
    resources: [
      {
        label: "Sam Witteveen",
        note: "Advanced LLM engineering — systematic tool execution loops, context boundaries, and agentic workflows",
      },
      {
        label: "Fireship",
        note: "AI Tool Calling & Structured outputs explained through concise real-world software scenarios",
      },
    ],
    topics: [
      {
        id: "ai-b2-1",
        text: "Type-safe structured generation — executing data extractions via generateObject or streamObject validated against schema frameworks like Zod to ensure guaranteed UI rendering shapes",
        interview: false,
      },
      {
        id: "ai-b2-2",
        text: "Autonomous tool execution (Function Calling) — declaring programmatic parameters, managing automated multi-step LLM execution loops, and piping backend data returns back to model contexts",
        interview: true,
      },
      {
        id: "ai-b2-3",
        text: "Context window scaling — engineering proactive retention architectures including sliding messaging queues, token truncation loops, and asynchronous historical background conversation summarizations",
        interview: false,
      },
      {
        id: "ai-b2-4",
        text: "System vulnerability mitigation — securing model pipelines against prompt injection attacks, enforcing structural boundaries within system framing, and calling AI moderation layers to block malicious text payloads",
        interview: true,
      },
      {
        id: "ai-b2-5",
        text: "Generative UI patterns — leveraging advanced Vercel AI SDK tools to automatically render interactive client-side React UI components directly from structural model tool execution payloads",
        interview: true,
      },
    ],
  },

  //********************** ************ WEEK 10 ************ ************ /
  // --- WEEK 10, PART 1: RAG ARCHITECTURE & VECTOR RETRIEVAL NETWORKS ---//

  {
    id: "m-ai-adv-1",
    weekId: "w10",
    tag: "AI",
    level: "Advanced",
    title:
      "AI Advanced (Part 1) — Retrieval-Augmented Generation & Vector Infrastructure",
    resources: [
      {
        label: "Sam Witteveen",
        note: "Deep-dive tutorials on ingestion parsing, chunking math, and hybrid vector indexing",
      },
      {
        label: "Jack Herrington",
        note: "Building enterprise RAG features in Next.js using Vercel AI SDK and vector stores",
      },
    ],
    topics: [
      {
        id: "ai-a1-1",
        text: "The E2E RAG engineering lifecycle — mapping the pipeline from chunking data → computing embeddings → vector ingestion → vector search → prompt augmentation → generation",
        interview: true,
      },
      {
        id: "ai-a1-2",
        text: "Advanced document partitioning strategies — comparing character-count fixed-size, recursive paragraph, token-bound sentence, and modern embedding-driven semantic chunking",
        interview: true,
      },
      {
        id: "ai-a1-3",
        text: "Vector calculation topologies — tokenizing textual metadata payloads using standard open-weights or frontier models like text-embedding-3-small",
        interview: false,
      },
      {
        id: "ai-a1-4",
        text: "Vector storage operations — orchestration of payload upserts, cosine similarity queries, and hard meta-filtering constraints within Pinecone and Supabase pgvector database engines",
        interview: false,
      },
      {
        id: "ai-a1-5",
        text: "Hybrid search infrastructure — combining lexical BM25 token-matching indexes with dense semantic vector searches, and merging rankings via Reciprocal Rank Fusion (RRF)",
        interview: true,
      },
      {
        id: "ai-a1-6",
        text: "Source citation tracking architecture — maintaining relational source context maps down the LLM generation wire to render explicit UI highlighting for referenced source passages",
        interview: false,
      },
    ],
  },

  // --- WEEK 10, PART 2: AUTONOMOUS AGENTS, SYSTEM MEMORY & ENTERPRISE SCALING --- //
  {
    id: "m-ai-adv-2",
    weekId: "w10",
    tag: "AI",
    level: "Advanced",
    title:
      "AI Advanced (Part 2) — Autonomous Agent Design & Enterprise System Engineering",
    resources: [
      {
        label: "LangChain Official",
        note: "LangGraph architectural courses — building stateful, multi-agent execution graphs with explicit memory boundaries",
      },
      {
        label: "AI Jason",
        note: "Production-grade agent frameworks, multi-tool orchestration, and real-world project debugging",
      },
    ],
    topics: [
      {
        id: "ai-a2-1",
        text: "The ReAct agent loop framework — engineering programmatic Reason → Act → Observe → Repeat state execution machines utilizing specialized model prompts",
        interview: true,
      },
      {
        id: "ai-a2-2",
        text: "Stateful agent memory hierarchies — designing sliding short-term transactional contexts vs long-term external persistent storage entities",
        interview: false,
      },
      {
        id: "ai-a2-3",
        text: "Distributed semantic performance layer — intercepting incoming prompt payloads via Redis caching layers using embedding vector distance checks to serve instant cached matches",
        interview: true,
      },
      {
        id: "ai-a2-4",
        text: "AI System Design: Scalability — planning infrastructure limits for large concurrent streaming chat platforms, incorporating event queues, load balancers, and vector index replication",
        interview: true,
      },
      {
        id: "ai-a2-5",
        text: "AI System Design: Evaluation — measuring execution latency benchmarks, prompt processing accuracy margins, retrieval precision metrics, and mitigating hallucination states in enterprise pipelines",
        interview: true,
      },
    ],
  },

  //********************** ************ WEEK 11 ************ ************ /
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

  //********************** ************ WEEK 12 ************ ************ /
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

export const ReactNativeRoadmap = [
  {
    id: "rn-1",
    week: "W1",
    title: "Project 1: Build & Run Your First Expo App",
    level: "Beginner",
    pattern: "Project-based · Expo setup · Threading mental model",
    topics: [
      {
        id: "rn-1-1",
        text: "Quick theory: Bridge vs New Architecture (JSI, Fabric) — 1 diagram, 15 min max",
        diff: "Easy",
      },
      {
        id: "rn-1-2",
        text: "Project: Scaffold an Expo app, run on a real device via Expo Go",
        diff: "Easy",
      },
      {
        id: "rn-1-3",
        text: "Project: Build a 'Counter + Theme Toggle' screen to confirm JS/UI thread updates work",
        diff: "Easy",
      },
      {
        id: "rn-1-4",
        text: "Debug Drill: Intentionally break the bundler, fix Metro cache issues yourself",
        diff: "Medium",
      },
    ],
  },
  {
    id: "rn-2",
    week: "W2",
    title: "Project 2: Profile Card Layout with Flexbox",
    level: "Beginner",
    pattern: "Project-based · Flexbox · Responsive layouts",
    topics: [
      {
        id: "rn-2-1",
        text: "Quick theory: Flexbox defaults in RN (column-first) — compare to CSS web defaults",
        diff: "Easy",
      },
      {
        id: "rn-2-2",
        text: "Project: Build a responsive Profile Card (avatar, name, bio, stats row) using View/Text/Image",
        diff: "Easy",
      },
      {
        id: "rn-2-3",
        text: "Project: Make the card adapt to tablet vs phone using useWindowDimensions",
        diff: "Medium",
      },
      {
        id: "rn-2-4",
        text: "Project: Add platform-specific shadow styling (iOS shadow vs Android elevation) with Platform.select",
        diff: "Medium",
      },
    ],
  },
  {
    id: "rn-3",
    week: "W3",
    title: "Project 3: Searchable Contact List with Forms",
    level: "Beginner",
    pattern: "Project-based · FlatList · Keyboard handling",
    topics: [
      {
        id: "rn-3-1",
        text: "Project: Build a FlatList of 200+ contacts, optimize with keyExtractor and getItemLayout",
        diff: "Medium",
      },
      {
        id: "rn-3-2",
        text: "Project: Add a search bar (TextInput) that filters the list in real time",
        diff: "Easy",
      },
      {
        id: "rn-3-3",
        text: "Project: Add a 'New Contact' form with KeyboardAvoidingView so inputs don't get hidden",
        diff: "Medium",
      },
      {
        id: "rn-3-4",
        text: "Project: Group contacts alphabetically using SectionList with sticky headers",
        diff: "Medium",
      },
    ],
  },
  {
    id: "rn-4",
    week: "W4",
    title: "Project 4: Multi-Screen App with Navigation",
    level: "Beginner",
    pattern: "Project-based · Expo Router · Tab + Stack navigation",
    topics: [
      {
        id: "rn-4-1",
        text: "Project: Convert your contact list app into a file-based routed app (Expo Router)",
        diff: "Easy",
      },
      {
        id: "rn-4-2",
        text: "Project: Add a Stack navigator — tap a contact to open a Detail screen with params",
        diff: "Easy",
      },
      {
        id: "rn-4-3",
        text: "Project: Add Bottom Tabs (Contacts, Favorites, Settings) and a Drawer for extra options",
        diff: "Medium",
      },
      {
        id: "rn-4-4",
        text: "Project: Configure a deep link that opens a specific contact's detail screen directly",
        diff: "Hard",
      },
    ],
  },
  {
    id: "rn-5",
    week: "W5",
    title: "Project 5: API-Connected Feed App",
    level: "Intermediate",
    pattern: "Project-based · TanStack Query · Offline states",
    topics: [
      {
        id: "rn-5-1",
        text: "Project: Connect your MERN backend API and fetch a list of posts with Axios",
        diff: "Easy",
      },
      {
        id: "rn-5-2",
        text: "Project: Replace manual fetching with React Query — add caching, loading, error states",
        diff: "Medium",
      },
      {
        id: "rn-5-3",
        text: "Project: Show an offline banner using NetInfo when connection drops",
        diff: "Easy",
      },
      {
        id: "rn-5-4",
        text: "Project: Implement optimistic 'like' button — update UI instantly, rollback on failure",
        diff: "Medium",
      },
    ],
  },
  {
    id: "rn-6",
    week: "W6",
    title: "Project 6: Camera & Location-Based App Feature",
    level: "Intermediate",
    pattern: "Project-based · Permissions · Hardware APIs · Local storage",
    topics: [
      {
        id: "rn-6-1",
        text: "Project: Save user preferences (theme, name) locally with AsyncStorage",
        diff: "Easy",
      },
      {
        id: "rn-6-2",
        text: "Project: Request camera + photo permissions and let users attach a profile photo",
        diff: "Easy",
      },
      {
        id: "rn-6-3",
        text: "Project: Capture a photo with Expo Camera and upload it to your backend",
        diff: "Medium",
      },
      {
        id: "rn-6-4",
        text: "Project: Add a 'Nearby' feature using foreground location to tag posts with coordinates",
        diff: "Hard",
      },
    ],
  },
  {
    id: "rn-7",
    week: "W7",
    title: "Project 7: Swipeable Cards & Animated Interactions",
    level: "Intermediate",
    pattern: "Project-based · Reanimated · Gesture Handler",
    topics: [
      {
        id: "rn-7-1",
        text: "Project: Animate a button press and a fade-in screen transition with Animated API",
        diff: "Medium",
      },
      {
        id: "rn-7-2",
        text: "Project: Rebuild the same animation using Reanimated worklets — compare performance",
        diff: "Medium",
      },
      {
        id: "rn-7-3",
        text: "Project: Build a Tinder-style swipeable card stack with Gesture Handler + Reanimated",
        diff: "Hard",
      },
      {
        id: "rn-7-4",
        text: "Project: Add pinch-to-zoom on an image viewer screen",
        diff: "Hard",
      },
    ],
  },
  {
    id: "rn-8",
    week: "W8",
    title: "Project 8: Global State Refactor with Zustand",
    level: "Advanced",
    pattern: "Project-based · State management · Persistence",
    topics: [
      {
        id: "rn-8-1",
        text: "Project: Refactor your feed app's auth + user state into a Zustand store",
        diff: "Medium",
      },
      {
        id: "rn-8-2",
        text: "Project: Persist the Zustand store to AsyncStorage so login survives app restarts",
        diff: "Medium",
      },
      {
        id: "rn-8-3",
        text: "Compare Drill: Re-implement the same store slice in Redux Toolkit (RTK) — note tradeoffs",
        diff: "Hard",
      },
    ],
  },
  {
    id: "rn-9",
    week: "W9",
    title: "Project 9: Native Customization with Config Plugins",
    level: "Advanced",
    pattern: "Project-based · Prebuild · Native config",
    topics: [
      {
        id: "rn-9-1",
        text: "Project: Run expo prebuild on your app and explore the generated android/ and ios/ folders",
        diff: "Medium",
      },
      {
        id: "rn-9-2",
        text: "Project: Write a small Expo Config Plugin to add a custom permission string to Info.plist",
        diff: "Hard",
      },
      {
        id: "rn-9-3",
        text: "Optional Stretch: Write a minimal Expo Module in Swift/Kotlin (e.g. expose device battery level)",
        diff: "Expert",
      },
    ],
  },
  {
    id: "rn-10",
    week: "W10",
    title: "Project 10: Offline-First Notes App with Secure Auth",
    level: "Advanced",
    pattern: "Project-based · SQLite · SecureStore · Sync logic",
    topics: [
      {
        id: "rn-10-1",
        text: "Project: Store auth tokens securely using Expo SecureStore instead of AsyncStorage",
        diff: "Medium",
      },
      {
        id: "rn-10-2",
        text: "Project: Build an offline-first Notes app with Expo SQLite (create, read, update, delete locally)",
        diff: "Hard",
      },
      {
        id: "rn-10-3",
        text: "Project: Add a sync queue that pushes local SQLite changes to your MERN API when back online",
        diff: "Hard",
      },
    ],
  },
  {
    id: "rn-11",
    week: "W11",
    title: "Project 11: Testing & Performance Audit",
    level: "Advanced",
    pattern: "Project-based · Jest/RNTL · Profiling · Bug hunting",
    topics: [
      {
        id: "rn-11-1",
        text: "Project: Write unit + component tests for your Notes app (Jest + RNTL)",
        diff: "Medium",
      },
      {
        id: "rn-11-2",
        text: "Audit Drill: Profile your feed app with Flipper, find and fix one unnecessary re-render",
        diff: "Medium",
      },
      {
        id: "rn-11-3",
        text: "Audit Drill: Find and fix a memory leak (dangling listener) you intentionally introduced",
        diff: "Hard",
      },
    ],
  },
  {
    id: "rn-12",
    week: "W12",
    title: "Capstone: Build, Update & Ship an App",
    level: "Expert",
    pattern: "Project-based · EAS build · OTA updates · Store submission flow",
    topics: [
      {
        id: "rn-12-1",
        text: "Project: Configure eas.json and run your first EAS cloud build for your capstone app",
        diff: "Medium",
      },
      {
        id: "rn-12-2",
        text: "Project: Push an OTA update via Expo Updates and verify it lands on a test device",
        diff: "Hard",
      },
      {
        id: "rn-12-3",
        text: "Project: Prepare store assets and submit a build to TestFlight / Internal Testing track",
        diff: "Hard",
      },
      {
        id: "rn-12-4",
        text: "Project: Set up a GitHub Actions pipeline that triggers an EAS build on push to main",
        diff: "Expert",
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
  react_native: "border-green-200 bg-green-50",
};

export const PHASE_BADGE = {
  p1: "bg-blue-600 text-white",
  p2: "bg-violet-600 text-white",
  p3: "bg-emerald-600 text-white",
  dsa: "bg-yellow-600 text-yellow-50",
  react_native: "bg-green-600 text-green-50",
};
