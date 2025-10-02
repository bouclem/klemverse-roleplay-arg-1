# KlemVerse Archive - Testing Guide for Version 0.0.3

## Quick Start

### Running the Test Suite
1. Open `Pages/tests/test-0.0.3-features.html` in your browser
2. Automated tests will run automatically
3. Use the test buttons for interactive tests
4. Review results displayed on the page

### Testing the Full Sequence
1. Open `Pages/Logs/logs-0001.html` in your browser
2. Watch the complete animation sequence
3. Verify timing and visual effects

---

## Test Checklist

### ✓ Test 1: Meta-Commentary Display
**What to verify:**
- [ ] System observations appear in gray (#888888)
- [ ] Character thoughts appear in light blue (#9999ff)
- [ ] All meta-commentary is italic and indented
- [ ] Source attribution displays for character thoughts

**How to test:**
- View test page section 1
- Check color differences between system and character commentary
- Verify italic styling and indentation

---

### ✓ Test 2: Glitch Effects
**What to verify:**
- [ ] Low intensity: Subtle 1-2px jitter
- [ ] Medium intensity: Magenta color, displacement, clip-path
- [ ] High intensity: RGB split, severe distortion, text shadows

**How to test:**
- View test page section 2
- Observe each glitch level animating
- Verify visual differences between intensity levels

---

### ✓ Test 3: Text Scrambling
**What to verify:**
- [ ] Text scrambles with random characters
- [ ] Gradual reveal from left to right
- [ ] Original text fully restored after animation
- [ ] French accented characters included in scramble

**How to test:**
- Click "Test Scramble (2s)" button
- Watch text scramble and restore
- Click "Test Scramble Fast (500ms)" for faster version
- Verify result message shows PASS

---

### ✓ Test 4: Observation Detection
**What to verify:**
- [ ] Amber color (#ffaa00) for text
- [ ] Left border in amber
- [ ] Subtle amber background tint
- [ ] Font weight 500 for emphasis

**How to test:**
- View test page section 4
- Check amber color on text and border
- Verify background tint is subtle

---

### ✓ Test 5: External Source Error
**What to verify:**
- [ ] Red text (#ff6666)
- [ ] Red background tint
- [ ] Red border (2px solid)
- [ ] Monospace font
- [ ] Error indicator centered and bold
- [ ] Source ID in amber color

**How to test:**
- View test page section 5
- Check red styling on error message
- Verify "BALDE_??" appears in amber
- Confirm monospace font

---

### ✓ Test 6: Terminal Window
**What to verify:**
- [ ] Black background (#000000)
- [ ] Green border (#00ff88)
- [ ] Glowing box shadow
- [ ] Terminal icon (🕳️) and path display
- [ ] Lines appear sequentially
- [ ] Prompt ("> ") before each line in orange
- [ ] Fade-in and slide animation

**How to test:**
- Click "Create Terminal Window" button
- Watch lines appear one by one
- Verify timing: 0.2s, 0.8s, 1.4s delays
- Check green border glow effect
- Click "Clear Terminal" to reset

---

### ✓ Test 7: French Text Display
**What to verify:**
- [ ] All accents display correctly: à â ä é è ê ë ï î ô ù û ü ÿ ç
- [ ] Event descriptions maintain accents
- [ ] Meta-commentary maintains accents
- [ ] No character encoding issues

**How to test:**
- View test page section 7
- Visually verify all accented characters
- Check event descriptions on logs page
- Verify no � or broken characters

---

### ✓ Test 8: Complete Event Sequence
**What to verify:**
- [ ] 0.0.1 events appear quickly (100ms, 500ms, 900ms)
- [ ] 0.0.2 decision event at 1400ms
- [ ] 0.0.2 meta-commentary at 2400ms
- [ ] 0.0.2 anomaly warning at 3900ms
- [ ] 0.0.3 observation detection at 4500ms (300ms fade)
- [ ] 0.0.3 glitch event at 4800ms with text scramble
- [ ] 0.0.3 glitch subtext at 5400ms
- [ ] 0.0.3 external error at 5800ms
- [ ] 0.0.3 terminal window at 6300ms
- [ ] Terminal lines appear sequentially

**How to test:**
- Open `Pages/Logs/logs-0001.html`
- Watch complete sequence from start
- Use browser DevTools to verify timing
- Reload page to watch again

---

## Browser Testing

### Chrome
1. Open test page in Chrome
2. Open DevTools (F12)
3. Check Console for errors
4. Verify all animations smooth

### Firefox
1. Open test page in Firefox
2. Open Developer Tools (F12)
3. Check for CSS compatibility
4. Verify animations work

### Safari
1. Open test page in Safari
2. Open Web Inspector
3. Check webkit-specific features
4. Verify all effects display

### Edge
1. Open test page in Edge
2. Open DevTools (F12)
3. Verify Chromium compatibility
4. Check all features work

---

## Responsive Testing

### Desktop (>1024px)
- [ ] Full layout with max-width 1200px
- [ ] All spacing at full size
- [ ] Animations smooth

### Tablet (768px - 1024px)
- [ ] Single column layout
- [ ] Reduced padding
- [ ] Maintained readability

### Mobile (<768px)
- [ ] Full-width cards
- [ ] Stacked layout
- [ ] Touch-friendly spacing
- [ ] Readable text size

**How to test:**
1. Open DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test various screen sizes
4. Verify responsive breakpoints

---

## Performance Testing

### Animation Performance
- [ ] All animations run at 60fps
- [ ] No stuttering or lag
- [ ] Smooth transitions

**How to test:**
1. Open DevTools Performance tab
2. Record while animations play
3. Check frame rate
4. Look for dropped frames

### Memory Usage
- [ ] No memory leaks
- [ ] Terminal windows cleaned up properly
- [ ] Event listeners removed when needed

**How to test:**
1. Open DevTools Memory tab
2. Take heap snapshot
3. Create/destroy terminal windows
4. Take another snapshot
5. Compare memory usage

---

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through interactive elements
- [ ] Focus indicators visible
- [ ] All buttons accessible

**How to test:**
1. Use Tab key to navigate
2. Verify focus outlines
3. Test button activation with Enter/Space

### Screen Reader
- [ ] Text content readable
- [ ] Proper heading structure
- [ ] Alt text for icons (if applicable)

**How to test:**
1. Enable screen reader (NVDA, JAWS, VoiceOver)
2. Navigate through page
3. Verify content is announced

### Color Contrast
- [ ] Text meets WCAG AA standards
- [ ] All colors have sufficient contrast

**How to test:**
1. Use browser DevTools
2. Check contrast ratios
3. Verify minimum 4.5:1 for normal text

---

## Common Issues and Solutions

### Issue: Text scrambling doesn't restore
**Solution:** Check that scrambleText function completes. Verify no JavaScript errors in console.

### Issue: Terminal lines don't appear
**Solution:** Verify animation-delay CSS is applied. Check that terminal-line-appear animation exists.

### Issue: Glitch effects not visible
**Solution:** Check that glitch classes are applied. Verify CSS animations are defined.

### Issue: French accents display as �
**Solution:** Verify UTF-8 encoding in HTML meta charset tag. Check file is saved as UTF-8.

### Issue: Animations too fast/slow
**Solution:** Adjust timing values in script.js. Modify animation-delay and transition-duration.

---

## Automated Test Results

After running the test page, you should see:
- ✓ Test 1: PASS - Meta-commentary styling correct
- ✓ Test 2: PASS - All glitch levels present
- ✓ Test 3: PASS - Text scramble and restore works
- ✓ Test 4: PASS - Observation detection styled correctly
- ✓ Test 5: PASS - External source error formatted correctly
- ✓ Test 6: PASS - Terminal window created successfully
- ✓ Test 7: PASS - French text displays correctly

---

## Manual Verification Required

Some tests require manual visual verification:
1. **Glitch animations** - Verify visual effects look correct
2. **Color accuracy** - Verify colors match design specifications
3. **Timing precision** - Verify animation timing feels right
4. **French accents** - Verify all accents display properly
5. **Responsive design** - Test on actual devices
6. **Browser compatibility** - Test on multiple browsers

---

## Reporting Issues

If you find issues during testing:
1. Note the test number and description
2. Record browser and version
3. Capture screenshot or video
4. Note steps to reproduce
5. Check browser console for errors
6. Document expected vs actual behavior

---

## Next Steps After Testing

1. ✓ Mark task 15 as complete in tasks.md
2. Document any issues found
3. Create bug reports if needed
4. Update design document if changes required
5. Plan for version 0.0.4 features

---

**Last Updated**: 2025-10-02
**Version**: 0.0.3
**Test Suite**: Complete
