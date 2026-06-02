# MERN AI RoadMap - Learning Progress Tracker

A comprehensive learning progress tracking application built with React, Node.js, Express, and MongoDB. Designed to help learners track their progress through a structured curriculum with real-time synchronization, activity heatmaps, and streak tracking.

## 📋 Table of Contents

1. [App Structure](#app-structure)
2. [Technology Stack](#technology-stack)
3. [Component Architecture](#component-architecture)
4. [Data Flow](#data-flow)
5. [Key Features](#key-features)
6. [Setup & Installation](#setup--installation)
7. [API Documentation](#api-documentation)
8. [Usage Guide](#usage-guide)

---

## 📁 App Structure

```
roadmap/
├── server/                          # Backend (Express + MongoDB)
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── models/
│   │   └── Progress.js             # Progress data schema (checks, completionDates, dailyActivity)
│   ├── controller/
│   │   └── progressController.js   # API endpoint handlers
│   ├── routes/
│   │   └── progressRoutes.js       # Route definitions
│   └── index.js                    # Express server entry point
│
├── src/                             # Frontend (React + Vite)
│   ├── components/
│   │   ├── Header.jsx              # App header navigation
│   │   ├── Footer.jsx              # App footer
│   │   ├── Tabs.jsx                # Phase/section tabs
│   │   ├── WeekCard.jsx            # Week container with modules
│   │   ├── ModuleCard.jsx          # Module with topics
│   │   ├── DSACard.jsx             # Data structures & algorithms card
│   │   ├── Tick.jsx                # Custom checkbox component
│   │   ├── Loader.jsx              # Loading state
│   │   ├── ActivityHeatmap.jsx     # Main heatmap container
│   │   └── heatmap/
│   │       ├── HeatmapGrid.jsx     # 52-week calendar grid
│   │       ├── HeatmapHeader.jsx   # Stats display (streak, active days, etc.)
│   │       ├── HeatmapLegend.jsx   # Color intensity legend
│   │       ├── HeatmapTooltip.jsx  # Cell hover tooltip
│   │       ├── GridCell.jsx        # Individual day cell
│   │       └── WeekColumn.jsx      # Week column wrapper
│   │
│   ├── context/
│   │   ├── CheckContext.jsx        # Context provider setup
│   │   ├── CheckProvider.jsx       # Progress state management & sync logic
│   │   └── reducer.js              # Redux-like reducer for state updates
│   │
│   ├── Hooks/
│   │   └── useChecks.jsx           # Custom hook to access check context
│   │
│   ├── utils/
│   │   ├── check-helpers.js        # Helper functions for calculations
│   │   ├── heatmap-utils.js        # Calendar & stats generation
│   │   └── roadmap-selectors.js    # Data selectors & filters
│   │
│   ├── service/
│   │   └── storage-adaptor.js      # API client layer
│   │
│   ├── data/
│   │   └── roadmap-data.js         # Curriculum data (phases, weeks, modules, topics)
│   │
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Vite entry point
│   └── index.css                   # Global styles (Tailwind)
│
├── package.json                     # Dependencies
├── vite.config.js                  # Vite configuration
├── vercel.json                     # Vercel deployment config
└── README.md                        # This file
```

---

## 🛠 Technology Stack

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Hooks** - State management (Context API + useReducer)

### Backend

- **Node.js + Express** - Server framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Deployment

- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Cloud database

---

## 🏗 Component Architecture

### **Context Layer** (`context/`)

The application uses React Context API for global state management.

#### **CheckProvider.jsx**

Central state management component that handles:

- Loading progress data on mount
- Dispatching toggle, bulk check/uncheck actions
- Background synchronization with backend
- API error handling and rollback

```
Flow:
1. Mount → Load data from API/localStorage
2. User action → Dispatch action (TOGGLE, CHECK_MANY, UNCHECK_MANY)
3. Reducer updates local state
4. Effect detects change → Debounced sync to backend
5. API response updates dailyActivity
```

**Key Methods:**

- `toggle(id)` - Toggle single item completion
- `checkAll(ids)` - Check multiple items
- `uncheckAll(ids)` - Uncheck multiple items
- `clearAll()` - Clear all progress

---

### **Container Components**

#### **ActivityHeatmap.jsx**

Main dashboard showing activity statistics and calendar visualization.

**Props:** `{ dailyActivity, completionDates }`

**Components Tree:**

```
ActivityHeatmap
├── HeatmapHeader (shows: totalCompletions, activeDays, currentStreak)
├── HeatmapGrid (52-week calendar)
│   └── WeekColumn (7 days)
│       └── GridCell (individual day with count)
├── HeatmapTooltip (hover details)
└── HeatmapLegend (color key)
```

**Calculations:**

- `buildActivityMap(dailyActivity)` - Converts array to date-indexed object
- `calculateStats(activityMap)` - Computes streak, active days, total completions
- `generateCalendarData(activityMap)` - Creates 52-week calendar grid

#### **Tabs.jsx**

Renders phase tabs (Frontend, Backend, DSA). On tab click, updates displayed modules.

**Data Flow:**

```
Tabs (phase selection)
  ↓
Filter modules by phase
  ↓
Render WeekCard/DSACard for each week
```

---

### **Card Components**

#### **WeekCard.jsx**

Container for a learning week showing:

- Week number and title
- Milestone & learning outcome
- Date range (start - end or start - in progress)
- Progress bar
- Expandable module list

**Props:**

```javascript
{
  week: { n: 1, title: "JS Basics", milestone: "...", outcome: "..." },
  modules: [ { id: "...", title: "...", topics: [...] }, ... ]
}
```

**Features:**

- Date range calculation using `getDateRange()` helper
- Bulk check/uncheck for all modules in week
- Progress percentage tracking

#### **ModuleCard.jsx**

Displays a single module with:

- Module title, tag (e.g., "JS"), difficulty level
- Resources section (collapsible)
- List of topics with checkboxes
- Individual topic completion dates
- Date range display (start - end)

**Props:**

```javascript
{
  mod: { id: "...", title: "...", tag: "JS", topics: [...] },
  open: boolean,
  onToggle: function
}
```

#### **DSACard.jsx**

Similar to ModuleCard but specifically for Data Structures & Algorithms:

- Week label
- Pattern/category name
- Difficulty level
- Topic list with difficulty badges
- Expandable topics with completion dates

**Additional Fields:**

- `t.diff` - Difficulty level (Easy, Medium, Hard)
- Uses `DIFF_STYLE` for color-coding by difficulty

---

### **Utility Components**

#### **Tick.jsx**

Custom checkbox component with styling and animation.

```javascript
<Tick on={isChecked} toggle={() => toggle(id)} />
```

#### **Loader.jsx**

Loading skeleton shown while data is fetching.

#### **HeatmapTooltip.jsx**

Displays on cell hover:

```
Jun 02, 2026
5 completions
```

---

## 🔄 Data Flow

### **State Shape**

```javascript
{
  checks: {
    "js-b-1": true,
    "js-b-2": false,
    // true = completed, false/missing = not completed
  },
  completionDates: {
    "js-b-1": "2026-06-02T10:30:00.000Z",
    // ISO timestamp of when item was completed
  },
  dailyActivity: [
    { date: "2026-06-02", count: 5 },  // date in YYYY-MM-DD format
    { date: "2026-06-03", count: 3 },
    // Automatically recalculated on toggle
  ],
  loading: false,
  error: null
}
```

### **Action Types** (reducer.js)

1. **LOADED** - Initial data load from API
2. **TOGGLE** - Toggle single item and update dailyActivity
3. **TOGGLE_SUCCESS** - Update dailyActivity from API response
4. **CHECK_MANY** - Bulk check and update daily count
5. **UNCHECK_MANY** - Bulk uncheck and update daily count
6. **CLEAR** - Reset all progress
7. **ERROR** - Set error state

### **Sync Flow**

```
User Action (check/uncheck)
    ↓
Dispatch to reducer (optimistic update)
    ↓
useEffect detects state change
    ↓
400ms debounce timer
    ↓
API call: PUT /api/progress
    ↓
Server calculates new dailyActivity
    ↓
Response updates frontend dailyActivity
```

---

## 📊 Helper Functions

### **check-helpers.js**

#### `countChecked(checks, ids)`

Count completed items in a list.

```javascript
countChecked(checks, ["js-b-1", "js-b-2"]); // Returns: 1
```

#### `pctComplete(checks, ids)`

Calculate completion percentage.

```javascript
pctComplete(checks, ["js-b-1", "js-b-2"]); // Returns: 50
```

#### `allChecked(checks, ids)`

Check if all items completed.

```javascript
allChecked(checks, ["js-b-1", "js-b-2"]); // Returns: false
```

#### `formatDateShort(dateStr)`

Format ISO date to readable format.

```javascript
formatDateShort("2026-06-02T10:30:00.000Z"); // Returns: "Jun-02-26"
```

#### `getDateRange(completionDates, ids, allCompleted)`

Calculate date range display string.

```javascript
// Partially complete:
getDateRange(dates, ids, false); // Returns: "Jun-02-26 - in progress"

// All complete:
getDateRange(dates, ids, true); // Returns: "Jun-02-26 - Jun-07-26"
```

### **heatmap-utils.js**

#### `buildActivityMap(dailyActivity)`

Convert array to object indexed by date.

```javascript
// Input: [{ date: "2026-06-02", count: 5 }]
// Output: { "2026-06-02": 5 }
```

#### `calculateStats(activityMap)`

Calculate streak, active days, and total completions.

```javascript
{
  totalCompletions: 42,
  activeDays: 20,
  currentStreak: 7  // Counts backwards from today
}
```

#### `generateCalendarData(activityMap)`

Create 52-week calendar grid.

```javascript
{
  weeks: [
    [{date: "2026-05-03", count: 0, isToday: false}, ...],
    // 52 weeks total
  ],
  months: ["May", "Jun", "Jul", ...]
}
```

---

## 🔌 API Endpoints

### **Base URL**

- Development: `http://localhost:5000`
- Production: Relative path

### **Endpoints**

#### `GET /api/progress`

Fetch user's progress data.

**Query Params:** `userId` (default: "default_user")

**Response:**

```json
{
  "checks": { "js-b-1": true, ... },
  "completionDates": { "js-b-1": "2026-06-02T..." },
  "dailyActivity": [{ "date": "2026-06-02", "count": 5 }, ...]
}
```

#### `POST /api/progress/toggle`

Toggle a single item completion.

**Body:**

```json
{
  "userId": "default_user",
  "id": "js-b-1",
  "completed": true
}
```

**Response:**

```json
{
  "success": true,
  "userId": "default_user",
  "id": "js-b-1",
  "completed": true,
  "dailyActivity": [{ "date": "2026-06-02", "count": 5 }]
}
```

**Server Logic:**

- Finds or creates progress record
- Updates `checks[id]` to completed value
- Updates `completionDates[id]` if completing
- Increments/decrements `dailyActivity` count for today
- Returns updated `dailyActivity` to sync frontend

#### `PUT /api/progress`

Bulk sync all progress data.

**Body:**

```json
{
  "userId": "default_user",
  "checks": { "js-b-1": true, ... },
  "completionDates": { "js-b-1": "2026-06-02T..." },
  "dailyActivity": [{ "date": "2026-06-02", "count": 5 }]
}
```

**Response:**

```json
{
  "success": true,
  "userId": "default_user",
  "dailyActivity": [{ "date": "2026-06-02", "count": 5 }]
}
```

#### `DELETE /api/progress`

Clear all user progress.

**Query Params:** `userId`

**Response:**

```json
{
  "success": true,
  "message": "All user track records deleted."
}
```

#### `GET /api/progress/activities`

Fetch only daily activity data.

**Query Params:** `userId`

**Response:**

```json
{
  "dailyActivity": [{ "date": "2026-06-02", "count": 5 }]
}
```

---

## 🔐 Storage Adapter (storage-adaptor.js)

Abstraction layer between frontend and API. Supports both API and localStorage fallback.

### **Methods**

#### `load()`

Fetch progress data.

#### `save(checks, completionDates, dailyActivity)`

Persist all progress data.

#### `toggle(id, completed)`

Toggle single item with API.

#### `clear()`

Delete all progress.

#### `getActivity()`

Fetch activity heatmap data only.

**Environment Variable:**

```
VITE_USE_API=true  // Use API (default)
VITE_USE_API=false // Use localStorage
```

---

## 📱 Component Usage Examples

### **Using useChecks Hook**

```javascript
const {
  checks, // All checked items
  completionDates, // All completion timestamps
  dailyActivity, // Daily activity array
  toggle, // Toggle single item
  checkAll, // Check multiple items
  uncheckAll, // Uncheck multiple items
  clearAll, // Clear all progress
  isChecked, // Check if item completed
  getCompletionDate, // Get item's completion date
  countChecked, // Count completed items
  pctComplete, // Get completion percentage
  allChecked, // Check if all items done
} = useChecks();
```

### **Example: Check all in a week**

```javascript
const weekIds = modules.flatMap((m) => m.topics.map((t) => t.id));
checkAll(weekIds); // Checks all, syncs to API, updates dailyActivity
```

### **Example: Get week completion status**

```javascript
const weekIds = modules.flatMap((m) => m.topics.map((t) => t.id));
const weekCompleted = allChecked(weekIds);
const weekPercent = pctComplete(weekIds);
const dateRange = getDateRange(completionDates, weekIds, weekCompleted);

// dateRange → "Jun-02-26 - in progress" or "Jun-02-26 - Jun-07-26"
```

---

## 🎯 Key Features

### **1. Progress Tracking**

- ✅ Track completion of individual topics
- ✅ Automatic timestamp recording
- ✅ Bulk operations (check/uncheck entire weeks)

### **2. Activity Visualization**

- 📊 52-week GitHub-style heatmap
- 🔥 Current streak calculation (timezone-aware)
- 📈 Total completions and active days tracking
- 🎨 Color intensity based on daily activity count

### **3. Date Range Display**

- 📅 Shows "Jun-02-26 - in progress" for ongoing modules
- 📅 Shows "Jun-02-26 - Jun-07-26" for completed modules
- ✨ Works for single-day and multi-day completions

### **4. Real-time Sync**

- 🔄 Debounced API sync (400ms)
- 💾 LocalStorage fallback
- 🔀 Automatic conflict resolution

### **5. Curriculum Structure**

- 📚 3 learning phases (Frontend, Backend, AI+DevOps)
- 📖 12 weekly modules per phase
- 🧮 12-week DSA curriculum
- 📝 Structured topics with interview markers

---

## ⚙️ Setup & Installation

### **Prerequisites**

- Node.js 16+
- MongoDB (local or Atlas)
- npm or yarn

### **Installation**

1. **Clone repository**

```bash
git clone <repo-url>
cd roadmap
```

2. **Install dependencies**

```bash
npm install
cd server && npm install && cd ..
```

3. **Environment Setup**

Create `.env` file:

```
VITE_USE_API=true
VITE_API_URL=http://localhost:5000
```

Server `.env`:

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/roadmap
PORT=5000
```

4. **Start servers**

Terminal 1 - Frontend (Vite):

```bash
npm run dev
# Opens on http://localhost:5173
```

Terminal 2 - Backend (Express):

```bash
cd server
npm start
# Runs on http://localhost:5000
```

---

## 🚀 Usage Guide

### **Checking Items**

1. Click checkbox next to any topic
2. Auto-syncs to backend
3. Completion date recorded
4. Daily activity count updated
5. Streak calculation triggered

### **Checking Entire Week/Module**

1. Click "Check all" button
2. Bulk operation executes
3. All items checked at once
4. Single sync call to backend

### **Viewing Progress**

1. Expand ActivityHeatmap tab
2. See 52-week calendar
3. Hover over cells for daily details
4. View streak, active days, total completions

### **Clearing Progress**

1. Click "Clear All" button
2. Confirms action
3. Deletes all progress from DB
4. Resets UI to initial state

---

## 🔍 Debugging

### **Check Network Activity**

- Open DevTools → Network tab
- Watch `POST /api/progress/toggle` and `PUT /api/progress` calls

### **View Local State**

- Check browser Console → Application → Local Storage
- Key: `roadmap_progress_default_user`

### **Check Backend Logs**

- Server logs show sync status
- Error logs for API failures

### **Timezone Issues**

- Server uses `new Date().getTime() - offset * 60 * 1000`
- Frontend uses same logic in `getTodayDateStr()`
- Ensures consistent date handling across timezones

---

## 📝 Code Quality

### **Best Practices**

- ✅ Reusable helper functions in `check-helpers.js`
- ✅ Centralized API calls in `storage-adaptor.js`
- ✅ Composition over inheritance (functional components)
- ✅ Context API for global state (avoiding prop drilling)
- ✅ Debounced API sync to reduce server load
- ✅ Error boundaries and fallback handling
- ✅ No console.logs in production code (only console.error for debugging)

### **Performance**

- 🚀 Lazy loading with React.lazy (if needed)
- 🚀 useMemo for expensive calculations
- 🚀 Debounced sync reduces API calls
- 🚀 MongoDB indexing on userId for fast queries

---

## 🐛 Known Issues & Fixes

### **Streak Not Showing on First Day** ✅ FIXED

- Issue: Timezone mismatch in date calculation
- Fix: Use consistent timezone-aware date generation
- Applied in both frontend (`heatmap-utils.js`) and backend (`progressController.js`)

### **CheckAll Not Updating dailyActivity** ✅ FIXED

- Issue: Storage adapter not sending dailyActivity to backend
- Fix: Updated `save()` to include dailyActivity in PUT request
- Also fixed dependency arrays in CheckProvider

---

## 📚 Curriculum Data Structure

### **PHASES** (Phase 1, Phase 2, Phase 3, DSA)

```javascript
{
  id: "p1",
  label: "Phase 1",
  title: "Frontend Foundations",
  weeks: ["w1", "w2", "w3", "w4"]
}
```

### **WEEKS**

```javascript
{
  id: "w1",
  n: 1,
  phase: "p1",
  title: "JS Basics + TS Basics + React Intro",
  milestone: "Answer basic JS/TS/React questions",
  outcome: "Typed React app with hooks deployed"
}
```

### **MODULES**

```javascript
{
  id: "js-b",
  title: "JavaScript Basics",
  tag: "JS",
  level: "Beginner",
  resources: [
    { label: "MDN", note: "Core concepts" },
    { label: "Codecademy", note: "Interactive exercises" }
  ],
  topics: [
    { id: "js-b-1", text: "Variables & Scope", interview: true },
    { id: "js-b-2", text: "Functions & Closures", interview: true }
  ]
}
```

### **DSA DATA**

```javascript
{
  week: "W1",
  title: "Arrays",
  pattern: "Sliding Window, Two Pointers",
  topics: [
    { id: "dsa-arr-1", text: "Two Sum", diff: "Easy" },
    { id: "dsa-arr-2", text: "Container With Most Water", diff: "Medium" }
  ]
}
```

---

## 🔮 Future Enhancements

- [ ] Spaced repetition algorithm for topic review
- [ ] Statistics dashboard with charts
- [ ] Social features (share progress, compete with friends)
- [ ] Mobile app (React Native)
- [ ] Advanced search and filtering
- [ ] Export progress report
- [ ] Interview prep recommendations based on progress
- [ ] AI-powered learning path suggestions

---

## 📄 License

MIT License - See LICENSE file for details.

---

## 👥 Support

For issues, questions, or contributions:

- Open an issue on GitHub
- Check existing documentation
- Review code comments for implementation details

---

**Last Updated:** June 2, 2026  
**Version:** 1.0.0
