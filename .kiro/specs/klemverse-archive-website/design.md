# Design Document

## Overview

The KlemVerse Archive website is a single-page application that displays event logs in a visually appealing, terminal-inspired interface. This is an ARG (Alternate Reality Game) / roleplay project conducted with ChatGPT. The design emphasizes readability, chronological organization, and a thematic aesthetic that bridges real-world and RP activities. Version 0.0.3 introduces advanced narrative features including enhanced meta-commentary with source attribution, visual glitch effects, observation detection, external source errors, and dynamic terminal windows that simulate real-time system activity.

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
  type: string,           // Event type: "action", "system", "anomaly", "meta", "observation", "error", "terminal", "glitch"
  metadata: {             // Optional additional data
    user: string,
    action: string,
    tags: string[],
    isSystemComment: boolean,     // For prescient/meta-narrative
    isAnomaly: boolean,           // For anomaly warnings
    commentarySource: string,     // Source of meta-commentary: "klem", "system", "other_character"
    glitchIntensity: string,      // Glitch severity: "low", "medium", "high"
    externalSource: string,       // External source identifier (e.g., "BALDE_??")
    terminalPath: string,         // Terminal path (e.g., "/void_trace/active")
    terminalContent: string[]     // Array of terminal output lines
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
- Character Thought Text: `#9999ff` (light blue - for character internal dialogue)
- Anomaly Warning: `#ff4444` (red - for anomaly alerts)
- Anomaly Background: `rgba(255, 68, 68, 0.1)` (subtle red tint)
- Error Text: `#ff6666` (bright red - for external source errors)
- Error Background: `rgba(255, 102, 102, 0.15)` (red tint for errors)
- Observation Text: `#ffaa00` (amber - for observation detection)
- Terminal Background: `#000000` (pure black - for terminal windows)
- Terminal Border: `#00ff88` (bright green - terminal accent)
- Glitch Color 1: `#ff00ff` (magenta - for glitch effects)
- Glitch Color 2: `#00ffff` (cyan - for glitch effects)

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
- [ ] Meta-commentary displays with correct source attribution
- [ ] Character thoughts are visually distinct from system observations
- [ ] Glitch effects animate smoothly at all intensity levels
- [ ] Text scrambling completes and restores original text
- [ ] Observation detection displays with correct styling
- [ ] External source errors show proper error formatting
- [ ] Terminal windows open and animate correctly
- [ ] Terminal lines appear sequentially with proper timing
- [ ] All French text displays correctly with proper accents

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

## Version 0.0.3 Specific Features

### Enhanced Meta-Commentary System

**Purpose:** Provide multiple types of meta-commentary with clear source attribution

**Commentary Types:**

1. **Character Thoughts (Klem or others)**
   - Light blue color (#9999ff)
   - Italic styling
   - Prefixed with character name in parentheses: "(Klem) [thought text]"
   - Indented to show relationship to parent event

2. **System Observations**
   - Muted gray color (#888888) - existing style
   - Italic styling
   - No prefix, appears as system voice
   - Example: "comme si le systeme savais deja ce que j'alais fait"

3. **Narrative Insights**
   - Standard meta text color
   - May include ellipsis or dramatic pauses
   - Used for story progression hints

**Implementation:**
```css
.event-entry.meta.character-thought {
  font-style: italic;
  color: #9999ff;
  padding-left: 2rem;
  font-size: 0.95rem;
}

.event-entry.meta.system-observation {
  font-style: italic;
  color: #888888;
  padding-left: 2rem;
  font-size: 0.95rem;
}

.event-entry.meta .source-attribution {
  font-weight: 600;
  margin-right: 0.5rem;
}
```

### Visual Glitch Effects

**Purpose:** Create visual corruption effects to simulate system instability

**Glitch Intensity Levels:**

1. **Low Intensity**
   - Subtle text jitter (1-2px)
   - Occasional character replacement
   - Brief color shift

2. **Medium Intensity**
   - Text scrambling animation
   - Color cycling between glitch colors
   - Horizontal displacement (5-10px)

3. **High Intensity**
   - Severe text corruption
   - Multiple color layers (RGB split effect)
   - Flickering and rapid displacement
   - Partial text replacement with random characters

**CSS Animations:**
```css
@keyframes glitch-low {
  0%, 100% { transform: translate(0); }
  25% { transform: translate(-1px, 1px); }
  75% { transform: translate(1px, -1px); }
}

@keyframes glitch-medium {
  0%, 100% { transform: translate(0); clip-path: inset(0); }
  20% { transform: translate(-5px, 2px); clip-path: inset(10% 0 20% 0); }
  40% { transform: translate(5px, -2px); clip-path: inset(20% 0 10% 0); }
  60% { transform: translate(-3px, 3px); clip-path: inset(5% 0 15% 0); }
  80% { transform: translate(3px, -3px); clip-path: inset(15% 0 5% 0); }
}

@keyframes glitch-high {
  0% { transform: translate(0); filter: hue-rotate(0deg); }
  10% { transform: translate(-10px, 5px); filter: hue-rotate(90deg); }
  20% { transform: translate(10px, -5px); filter: hue-rotate(180deg); }
  30% { transform: translate(-5px, 10px); filter: hue-rotate(270deg); }
  40% { transform: translate(5px, -10px); filter: hue-rotate(360deg); }
  50% { transform: translate(-8px, 3px); opacity: 0.8; }
  60% { transform: translate(8px, -3px); opacity: 1; }
  70% { transform: translate(-3px, 8px); }
  80% { transform: translate(3px, -8px); }
  90% { transform: translate(-6px, 6px); }
  100% { transform: translate(0); filter: hue-rotate(0deg); }
}

.event-entry.glitch.low {
  animation: glitch-low 0.3s infinite;
}

.event-entry.glitch.medium {
  animation: glitch-medium 0.5s infinite;
  color: #ff00ff;
}

.event-entry.glitch.high {
  animation: glitch-high 0.8s infinite;
  text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
}
```

**JavaScript Text Scrambling:**
```javascript
function scrambleText(element, duration = 2000) {
  const originalText = element.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let iterations = 0;
  const maxIterations = duration / 50;
  
  const interval = setInterval(() => {
    element.textContent = originalText
      .split('')
      .map((char, index) => {
        if (index < iterations) {
          return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    
    iterations += 1/3;
    
    if (iterations >= originalText.length) {
      clearInterval(interval);
      element.textContent = originalText;
    }
  }, 50);
}
```

### Observation Detection Component

**Purpose:** Display system awareness of prolonged observation

**Structure:**
```html
<div class="event-entry observation">
  <span class="timestamp">[21:16:04]</span>
  <span class="observation-text">— Observation prolongée détectée.</span>
</div>
```

**Styling:**
```css
.event-entry.observation {
  color: #ffaa00;
  font-weight: 500;
  border-left: 3px solid #ffaa00;
  padding-left: 1rem;
  background: rgba(255, 170, 0, 0.05);
}
```

### External Source Error Component

**Purpose:** Display errors when external sources interfere

**Structure:**
```html
<div class="event-entry error">
  <span class="error-indicator">---erreur: source externe détectée---</span>
  <div class="error-details">
    <span>Source: <span class="source-id">BALDE_??</span></span>
  </div>
</div>
```

**Styling:**
```css
.event-entry.error {
  color: #ff6666;
  background: rgba(255, 102, 102, 0.15);
  border: 2px solid #ff6666;
  padding: 1rem;
  font-family: 'Courier New', monospace;
}

.event-entry.error .error-indicator {
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
}

.event-entry.error .source-id {
  color: #ffaa00;
  font-weight: 600;
}
```

### Dynamic Terminal Window Component

**Purpose:** Display real-time terminal activity in a separate interface element

**Structure:**
```html
<div class="terminal-window">
  <div class="terminal-header">
    <span class="terminal-icon">🕳️</span>
    <span class="terminal-path">Terminal : /void_trace/active</span>
  </div>
  <div class="terminal-content">
    <div class="terminal-line">Connexion...</div>
    <div class="terminal-line">Source inconnue : "BALDE_??"</div>
    <div class="terminal-line">Trace en cours...</div>
  </div>
</div>
```

**Styling:**
```css
.terminal-window {
  background: #000000;
  border: 2px solid #00ff88;
  border-radius: 4px;
  padding: 1rem;
  margin: 1.5rem 0;
  font-family: 'Courier New', monospace;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.terminal-header {
  color: #00ff88;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #00ff88;
}

.terminal-icon {
  margin-right: 0.5rem;
}

.terminal-content {
  color: #00ff88;
  line-height: 1.6;
}

.terminal-line {
  opacity: 0;
  animation: terminal-line-appear 0.3s forwards;
}

.terminal-line:nth-child(1) { animation-delay: 0.2s; }
.terminal-line:nth-child(2) { animation-delay: 0.8s; }
.terminal-line:nth-child(3) { animation-delay: 1.4s; }

@keyframes terminal-line-appear {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.terminal-line::before {
  content: '> ';
  color: #ffaa00;
}
```

**JavaScript Terminal Animation:**
```javascript
function createTerminalWindow(path, lines) {
  const terminal = document.createElement('div');
  terminal.className = 'terminal-window';
  
  const header = document.createElement('div');
  header.className = 'terminal-header';
  header.innerHTML = `<span class="terminal-icon">🕳️</span><span class="terminal-path">Terminal : ${path}</span>`;
  
  const content = document.createElement('div');
  content.className = 'terminal-content';
  
  lines.forEach((line, index) => {
    const lineElement = document.createElement('div');
    lineElement.className = 'terminal-line';
    lineElement.textContent = line;
    lineElement.style.animationDelay = `${index * 0.6 + 0.2}s`;
    content.appendChild(lineElement);
  });
  
  terminal.appendChild(header);
  terminal.appendChild(content);
  
  return terminal;
}
```

### Version 0.0.3 Event Sequence

The 0.0.3 update introduces a complex multi-part sequence:

1. **Observation Detection**
   - Timestamp: [21:16:04]
   - Type: observation
   - Content: "Observation prolongée détectée."

2. **Glitch Event**
   - Type: glitch
   - Intensity: medium
   - Description: "…puis, soudain, le fichier se glitche :"
   - Sub-text: "Les lettres se mélangent, comme si quelqu'un ou quelque chose écrivait par-dessus."

3. **External Source Error**
   - Timestamp: [21:16:37]
   - Type: error
   - Content: "---erreur: source externe détectée---"

4. **Terminal Window Opens**
   - Type: terminal
   - Path: "/void_trace/active"
   - Lines:
     - "Connexion..."
     - "Source inconnue : 'BALDE_??'"
     - "Trace en cours..."

### Animation Timing for 0.0.3

- Observation detection: Appears with fade-in (300ms)
- Glitch event: Triggers immediately after observation, scrambles text for 2 seconds
- External source error: Appears 1 second after glitch stabilizes
- Terminal window: Opens 500ms after error, lines appear sequentially with 600ms delays

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
- Event filtering by category and type
- Search functionality with support for French text
- Dark/light theme toggle
- Event detail modal views
- User authentication for event submission
- Interactive anomaly investigation features
- Multiple terminal windows open simultaneously
- User-triggered glitch effects
- Interactive meta-commentary (hover to reveal more context)
- Character thought attribution system for multiple characters
- Audio effects for glitches and terminal activity

### Scalability

- Pagination for large event lists
- Lazy loading for performance
- API integration for dynamic data
- Database backend for event storage
- Caching strategy for frequently accessed data
- Version-based event filtering and navigation
- Performance optimization for multiple simultaneous animations
- Efficient glitch effect rendering for low-end devices
- Terminal window pooling to prevent memory leaks
