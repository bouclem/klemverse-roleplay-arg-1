# Design Document

## Overview

The KlemVerse Archive website is a single-page application that displays event logs in a visually appealing, terminal-inspired interface. The design emphasizes readability, chronological organization, and a thematic aesthetic that bridges real-world and RP activities. The initial version focuses on static content with a foundation for future dynamic features.

## Architecture

### Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (vanilla)
- **Structure:** Single-page application (SPA) with modular components
- **Styling Approach:** CSS custom properties for theming, flexbox/grid for layout
- **Data Format:** JSON for event data storage (easily extensible to API later)

### File Structure

```
klemverse-archive/
├── index.html          # Main HTML structure
├── css/
│   ├── main.css       # Core styles and layout
│   └── theme.css      # Color scheme and theming
├── js/
│   ├── app.js         # Main application logic
│   └── events.js      # Event data and rendering
└── data/
    └── events.json    # Event log data
```

## Components and Interfaces

### 1. Header Component

**Purpose:** Display the archive title, version, and connection status

**Structure:**
```html
<header class="archive-header">
  <h1>KlemVerse Archive</h1>
  <div class="version">update 0.0.1</div>
  <div class="connection-status">Le monde réel est désormais connecté au RP.</div>
</header>
```

**Styling:**
- Large, bold title with retro/terminal font
- Version badge with subtle background
- Connection status with icon indicator
- Sticky positioning for persistent visibility

### 2. Event Log Component

**Purpose:** Display categorized events with timestamps and descriptions

**Structure:**
```html
<main class="event-log">
  <article class="event-entry">
    <div class="event-category">
      <span class="folder-icon">📂</span>
      <span class="category-path">/void_events/init.log</span>
    </div>
    <div class="event-content">
      <span class="timestamp">[21:14:03]</span>
      <span class="event-description">— Klem a ouvert son PC.</span>
    </div>
  </article>
</main>
```

**Styling:**
- Card-based layout with subtle borders/shadows
- Monospace font for timestamps
- Clear visual hierarchy
- Hover effects for interactivity
- Alternating background colors for readability

### 3. Footer Component

**Purpose:** Display metadata and navigation (future expansion)

**Structure:**
```html
<footer class="archive-footer">
  <p>KlemVerse Archive © 2025</p>
</footer>
```

## Data Models

### Event Object

```javascript
{
  id: string,              // Unique identifier
  category: string,        // Category path (e.g., "/void_events/")
  file: string,           // Log file name (e.g., "init.log")
  timestamp: string,      // Time in HH:MM:SS format
  description: string,    // Event description
  type: string,           // Event type: "action", "system", "anomaly", "meta"
  metadata: {             // Optional additional data
    user: string,
    action: string,
    tags: string[],
    isSystemComment: boolean,  // For prescient/meta-narrative
    isAnomaly: boolean         // For anomaly warnings
  }
}
```

### Events Data Structure

```javascript
{
  version: string,        // Archive version
  connectionStatus: string, // Connection message
  events: Event[]         // Array of event objects
}
```

## Visual Design

### Color Scheme

**Terminal/Archive Theme:**
- Primary Background: `#0a0e27` (deep navy)
- Secondary Background: `#1a1f3a` (lighter navy for cards)
- Primary Text: `#e0e0e0` (light gray)
- Accent Color: `#00ff88` (bright green - terminal style)
- Timestamp Color: `#ffa500` (orange)
- Border Color: `#2a2f4a` (muted blue-gray)
- System Meta Text: `#888888` (muted gray - for prescient commentary)
- Anomaly Warning: `#ff4444` (red - for anomaly alerts)
- Anomaly Background: `rgba(255, 68, 68, 0.1)` (subtle red tint)

**Alternative Light Theme (optional):**
- Background: `#f5f5f5`
- Cards: `#ffffff`
- Text: `#333333`
- Accent: `#0066cc`

### Typography

- **Headers:** 'Courier New', 'Courier', monospace (terminal aesthetic)
- **Body Text:** 'Inter', 'Segoe UI', system-ui (readability)
- **Timestamps:** 'Fira Code', 'Courier New', monospace
- **Font Sizes:**
  - Title: 2.5rem
  - Version: 1rem
  - Event text: 1.1rem
  - Timestamps: 0.95rem

### Layout

**Desktop (>768px):**
- Max width: 1200px, centered
- Two-column grid for multiple events
- Generous padding and spacing

**Tablet (768px - 1024px):**
- Single column layout
- Reduced padding
- Maintained readability

**Mobile (<768px):**
- Full-width cards with minimal margins
- Stacked layout
- Touch-friendly spacing

## Error Handling

### Missing Data

- **IF** event data fails to load **THEN** display a friendly error message
- **IF** an event is missing required fields **THEN** skip rendering that event and log a warning
- **IF** no events exist **THEN** display "No events logged yet" message

### Browser Compatibility

- **IF** browser doesn't support CSS Grid **THEN** fallback to Flexbox layout
- **IF** custom fonts fail to load **THEN** use system font stack
- **IF** JavaScript is disabled **THEN** display static HTML content with basic styling

### Responsive Breakpoints

- **IF** viewport width < 768px **THEN** apply mobile styles
- **IF** viewport width >= 768px AND < 1024px **THEN** apply tablet styles
- **IF** viewport width >= 1024px **THEN** apply desktop styles

## Testing Strategy

### Unit Testing

1. **Event Rendering Function**
   - Test with valid event data
   - Test with missing optional fields
   - Test with invalid data types
   - Verify correct HTML output

2. **Data Loading Function**
   - Test successful data fetch
   - Test error handling for failed fetch
   - Test empty data array handling

### Integration Testing

1. **Page Load Sequence**
   - Verify header renders correctly
   - Verify events load and display
   - Verify footer renders
   - Test complete page render time

2. **Responsive Behavior**
   - Test layout at various viewport sizes
   - Verify breakpoint transitions
   - Test on actual mobile devices

### Visual Testing

1. **Cross-Browser Testing**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

2. **Accessibility Testing**
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast ratios (WCAG AA)
   - Focus indicators

### Manual Testing Checklist

- [ ] Page loads without errors
- [ ] All events display correctly
- [ ] Timestamps are formatted properly
- [ ] Responsive design works on mobile
- [ ] Hover effects work as expected
- [ ] Text is readable in all themes
- [ ] Emojis display correctly across browsers
- [ ] Page performs well with 50+ events

## Narrative Event Styling

### Event Type Differentiation

**Character Actions (type: "action"):**
- Standard event styling with timestamp and em dash separator
- Example: `[21:15:09] — Klem a décidé d'ignorer VoidSync.exe`
- Uses primary text color

**System Meta-Commentary (type: "meta"):**
- Italicized text in muted gray color
- Appears as sub-text below related action
- Example: `comme si le systeme savais deja ce que j'alais fait`
- Indented slightly to show relationship to parent event

**Anomaly Warnings (type: "anomaly"):**
- Red text color with subtle red background tint
- Optional warning icon (⚠️ or 🔴)
- Example: `[21:15:32] — Une anomalie se prépare.`
- Slightly larger or bold text for emphasis

**Implementation:**
```css
.event-entry.action {
  /* Standard styling */
}

.event-entry.meta {
  font-style: italic;
  color: #888888;
  padding-left: 2rem;
  font-size: 0.95rem;
}

.event-entry.anomaly {
  color: #ff4444;
  background: rgba(255, 68, 68, 0.1);
  border-left: 3px solid #ff4444;
  font-weight: 500;
}
```

## Version 0.0.2 Specific Features

### New Event Sequence

The 0.0.2 update introduces a three-part narrative sequence:

1. **Character Decision Event**
   - Timestamp: [21:15:09]
   - Type: action
   - Content: "Klem a décidé d'ignorer VoidSync.exe"

2. **System Meta-Commentary**
   - Type: meta
   - Content: "comme si le systeme savais deja ce que j'alais fait"
   - Displayed as sub-text under the decision event

3. **Anomaly Warning**
   - Timestamp: [21:15:32]
   - Type: anomaly
   - Content: "Une anomalie se prépare."

### Animation Timing for 0.0.2

- Previous events (0.0.1) appear instantly or with fast animation
- New 0.0.2 events appear sequentially with delays:
  - Decision event: 500ms delay
  - Meta-commentary: 1000ms delay after decision
  - Anomaly warning: 1500ms delay after meta-commentary

## Future Considerations

### Phase 2 Enhancements

- Real-time event updates via WebSocket
- Event filtering by category
- Search functionality
- Dark/light theme toggle
- Event detail modal views
- User authentication for event submission
- Interactive anomaly investigation features

### Scalability

- Pagination for large event lists
- Lazy loading for performance
- API integration for dynamic data
- Database backend for event storage
- Caching strategy for frequently accessed data
- Version-based event filtering and navigation
