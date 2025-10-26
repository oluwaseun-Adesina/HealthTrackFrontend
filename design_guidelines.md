# HealthTrack Frontend Design Guidelines

## Design Approach

**Selected Approach:** Design System Foundation with Health App References

Drawing from Apple Health's clarity and MyFitnessPal's data organization, combined with Material Design principles for consistency and accessibility. The interface prioritizes trust, data legibility, and calm interaction patterns suitable for health management.

**Core Principles:**
- Clinical clarity: Information hierarchy that makes health data instantly scannable
- Trustworthy presentation: Professional yet approachable aesthetic
- Data-first design: Charts and metrics take visual priority
- Efficient workflows: Minimal clicks to complete common tasks

---

## Typography System

**Font Families:**
- Primary: Inter (via Google Fonts) - for body text, labels, and UI elements
- Display: Plus Jakarta Sans (via Google Fonts) - for headings and emphasis
- Monospace: JetBrains Mono - for numeric data and measurements

**Type Scale:**
- Hero/Display: text-5xl to text-6xl, font-bold (Plus Jakarta Sans)
- Page Headings: text-3xl to text-4xl, font-semibold (Plus Jakarta Sans)
- Section Headings: text-xl to text-2xl, font-semibold (Inter)
- Body Text: text-base, font-normal (Inter)
- Labels/Captions: text-sm, font-medium (Inter)
- Numeric Data: text-2xl to text-4xl, font-bold (JetBrains Mono)
- Small Print: text-xs, font-normal (Inter)

**Hierarchy Rules:**
- All headings use consistent letter-spacing: tracking-tight
- Numeric health values always use monospace for alignment
- Form labels: uppercase text-xs with tracking-wide for clarity
- Link text: font-medium with subtle underline on hover

---

## Layout System

**Spacing Primitives:**
Primary spacing units: 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-4, p-6, p-8
- Section margins: mb-8, mb-12, mb-16
- Card spacing: p-6 to p-8
- Form field gaps: space-y-4 to space-y-6
- Grid gaps: gap-4 to gap-6

**Container Strategy:**
- Dashboard/App Layout: max-w-7xl mx-auto
- Content Cards: max-w-4xl mx-auto
- Forms: max-w-md mx-auto
- Data Tables: w-full with horizontal scroll on mobile

**Grid Patterns:**
- Metric Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 with gap-6
- Medication List: Single column with generous spacing (space-y-4)
- Dashboard Widgets: grid-cols-1 lg:grid-cols-2 with gap-8
- Stat Displays: grid-cols-2 md:grid-cols-4 with gap-4

---

## Component Library

### Navigation & Header
**Main Navigation:**
- Fixed top navigation bar with height h-16
- Logo/brand on left, navigation items center, user menu right
- Navigation items: inline flex with gap-8 on desktop, hamburger menu on mobile
- Active state: border-b-2 with subtle transition
- User avatar: rounded-full with w-10 h-10

**Dashboard Sidebar (Desktop):**
- Fixed left sidebar w-64 with full height
- Navigation items: full-width buttons with rounded-lg, p-3
- Icon + label layout with gap-3
- Sections separated by dividers with my-4

### Cards & Containers
**Metric Cards:**
- Rounded corners: rounded-xl
- Padding: p-6
- Shadow: shadow-sm with hover:shadow-md transition
- Border: border with subtle treatment
- Header with icon + title, large numeric display, trend indicator

**Medication Cards:**
- Layout: flex items-start with gap-4
- Pill icon or visual indicator on left
- Title: text-lg font-semibold
- Dosage/frequency in text-sm
- Action buttons aligned right
- Dividers between cards: border-t with my-4

**Data Visualization Cards:**
- Larger padding: p-8
- Chart area: min-h-64 to min-h-80
- Legend positioned below chart with gap-4
- Time range selector at top-right

### Forms & Inputs
**Form Structure:**
- Form containers: max-w-md with p-8
- Field spacing: space-y-6
- Labels above inputs: text-sm font-medium mb-2
- Input groups with related fields: grid-cols-2 gap-4

**Input Fields:**
- Height: h-12 for text inputs
- Padding: px-4
- Border radius: rounded-lg
- Border width: border-2
- Focus ring: ring-2 with ring-offset-2
- Disabled state: opacity-50 with cursor-not-allowed

**Select Dropdowns:**
- Same height as text inputs (h-12)
- Chevron icon right-aligned
- Custom styling to match input fields

**Buttons:**
- Primary: h-12 px-6 rounded-lg font-medium
- Secondary: h-10 px-5 rounded-lg font-medium
- Icon buttons: w-10 h-10 rounded-lg with centered icon
- Button groups: flex with gap-3

### Data Display
**Tables:**
- Striped rows for readability
- Row height: h-14
- Cell padding: px-6 py-4
- Header: sticky top-0 with font-semibold
- Hover state: subtle background change

**Charts (using Chart.js):**
- Line charts for metric trends over time
- Bar charts for medication adherence
- Doughnut charts for category breakdowns
- Responsive with maintainAspectRatio: true
- Gridlines: subtle, minimal visual weight
- Tooltips: rounded with shadow-lg

**Stat Displays:**
- Large numeric value: text-4xl font-bold (JetBrains Mono)
- Label below: text-sm uppercase tracking-wide
- Trend indicator: arrow icon + percentage
- Grouped in grid with even spacing

### Overlays & Modals
**Modal Dialogs:**
- Backdrop: fixed inset-0 with backdrop-blur-sm
- Modal container: max-w-lg rounded-2xl p-8
- Close button: absolute top-4 right-4
- Actions at bottom with justify-end gap-3

**Toast Notifications:**
- Fixed positioning: top-4 right-4
- Max width: max-w-sm
- Padding: p-4
- Rounded: rounded-lg
- Auto-dismiss after 5 seconds
- Icon + message layout with gap-3

---

## Page-Specific Layouts

### Landing Page
Hero section with h-screen, centered content showcasing app value proposition. Include large hero image of person using health tracking technology (smartphone with health app visible, bright and optimistic environment). Hero buttons with backdrop-blur-md background. Three-column feature grid highlighting medication tracking, metrics visualization, and data security. Trust indicators section with security badges and user testimonials in two columns. Simple CTA section with form to get started.

### Authentication Pages
Centered card layout (max-w-md) on vh-full container. Logo at top with mb-8. Form fields with generous spacing (space-y-6). Social login button (Google OAuth) with icon + text. Divider with "or" text. Link to switch between login/register at bottom. Background with subtle gradient or pattern.

### Dashboard
Grid layout with sidebar (hidden on mobile, slide-out menu). Main content area with padding p-6 to p-8. Top row: Welcome message + quick stats (4-column grid). Second row: Recent metrics chart (col-span-2) + medication reminders. Third row: Upcoming tasks + activity log. All widgets as cards with consistent spacing.

### Medication Management
Page header with title + "Add Medication" button. Medication list with search/filter bar at top. Each medication as expandable card showing name, dosage, frequency. Expanded state shows full instructions, edit/delete actions. Empty state with illustration and "Add your first medication" CTA.

### Health Metrics
Tabs or segmented control to switch between metric types. Large chart area showing selected metric history. Data entry form in sidebar or bottom sheet. Recent entries list below chart. Quick entry buttons for common metrics. Filter controls for date range.

### Metrics History
Full-page view with comprehensive charts. Grid layout showing all metric types. Each chart in its own card with min-h-80. Export data button in page header. Date range picker prominent at top. Summary statistics above each chart.

---

## Icons
Use Heroicons (via CDN) throughout for consistency:
- Solid variants for filled states and primary actions
- Outline variants for secondary actions and navigation
- Size: w-5 h-5 for inline icons, w-6 h-6 for standalone icons
- Medication: beaker, clipboard-list
- Metrics: heart, chart-bar, arrow-trending-up
- Navigation: home, calendar, cog-6-tooth, user

---

## Images
**Hero Section:** Large lifestyle image (1920x1080) showing person confidently managing health with smartphone app, bright medical/wellness environment, professional but warm aesthetic. Position: background-cover with overlay for text readability.

**Dashboard Empty States:** Illustrations (400x300) for empty medication list and no metrics recorded. Style: friendly line illustrations with health/medical theme.

**Feature Icons:** Use icon library, no custom images needed for features.

---

## Accessibility & Interactions
- Focus indicators: ring-2 ring-offset-2 on all interactive elements
- Skip to main content link for keyboard navigation
- Form validation: inline error messages below fields with text-sm
- Loading states: skeleton screens matching component layouts
- ARIA labels on icon-only buttons
- Minimum touch target: 44x44px (h-11 w-11 minimum)
- High contrast text throughout with proper hierarchy
- Chart.js accessibility plugin for data table alternatives

---

## Animations
Minimal, purposeful motion:
- Page transitions: none (instant navigation for data clarity)
- Card hover: subtle shadow elevation (150ms ease)
- Button states: scale-95 on active state (100ms ease)
- Modal entry: fade + slide-up (200ms ease-out)
- Toast notifications: slide-in from right (300ms ease-out)
- Chart animations: 750ms ease-in-out on initial load only