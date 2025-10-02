// KlemVerse Archive - Sequential Animation Script

/**
 * Scramble text with gradual reveal animation
 * @param {HTMLElement} element - The element containing text to scramble
 * @param {number} duration - Duration of the scramble effect in milliseconds (default: 2000)
 */
function scrambleText(element, duration = 2000) {
    const originalText = element.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*àâäéèêëïîôùûüÿçÀÂÄÉÈÊËÏÎÔÙÛÜŸÇ';
    let iterations = 0;
    const maxIterations = duration / 50;
    
    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                // Gradually reveal characters from left to right
                if (index < iterations) {
                    return originalText[index];
                }
                // Keep spaces as spaces
                if (char === ' ') {
                    return ' ';
                }
                // Scramble remaining characters
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        iterations += 1/3;
        
        // Restore original text when complete
        if (iterations >= originalText.length) {
            clearInterval(interval);
            element.textContent = originalText;
        }
    }, 50);
}

/**
 * Create a dynamic terminal window with animated lines
 * @param {string} path - The terminal path to display (e.g., "/void_trace/active")
 * @param {string[]} lines - Array of terminal output lines
 * @returns {HTMLElement} The created terminal window element
 */
function createTerminalWindow(path, lines) {
    // Create terminal window container
    const terminal = document.createElement('div');
    terminal.className = 'terminal-window';
    
    // Create terminal header
    const header = document.createElement('div');
    header.className = 'terminal-header';
    header.innerHTML = `<span class="terminal-icon">🕳️</span><span class="terminal-path">Terminal : ${path}</span>`;
    
    // Create terminal content container
    const content = document.createElement('div');
    content.className = 'terminal-content';
    
    // Create terminal lines with sequential animation delays
    lines.forEach((line, index) => {
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line';
        lineElement.textContent = line;
        lineElement.style.animationDelay = `${index * 0.6 + 0.2}s`;
        content.appendChild(lineElement);
    });
    
    // Assemble terminal window
    terminal.appendChild(header);
    terminal.appendChild(content);
    
    return terminal;
}

/**
 * Apply commentary source styling to meta-commentary events
 * @param {HTMLElement} element - The event entry element
 * @param {string} commentarySource - Source of the commentary: "klem", "system", "other_character"
 */
function applyCommentarySourceStyle(element, commentarySource) {
    if (!element || !element.classList.contains('meta')) {
        return;
    }
    
    // Remove any existing commentary type classes
    element.classList.remove('system-observation', 'character-thought');
    
    // Apply appropriate class based on source
    switch (commentarySource) {
        case 'klem':
        case 'other_character':
            element.classList.add('character-thought');
            break;
        case 'system':
        default:
            element.classList.add('system-observation');
            break;
    }
}

/**
 * Create and render a meta-commentary event with source attribution
 * @param {Object} eventData - Event data object
 * @param {string} eventData.commentarySource - Source: "klem", "system", "other_character"
 * @param {string} eventData.description - Commentary text
 * @param {string} eventData.characterName - Optional character name for attribution
 * @returns {HTMLElement} The created event entry element
 */
function createMetaCommentaryEvent(eventData) {
    const article = document.createElement('article');
    article.className = 'event-entry meta';
    
    // Apply commentary source styling
    applyCommentarySourceStyle(article, eventData.commentarySource);
    
    const content = document.createElement('div');
    content.className = 'event-content';
    
    const description = document.createElement('span');
    description.className = 'event-description';
    
    // Add source attribution for character thoughts
    if ((eventData.commentarySource === 'klem' || eventData.commentarySource === 'other_character') 
        && eventData.characterName) {
        const attribution = document.createElement('span');
        attribution.className = 'source-attribution';
        attribution.textContent = `(${eventData.characterName})`;
        description.appendChild(attribution);
        description.appendChild(document.createTextNode(' ' + eventData.description));
    } else {
        description.textContent = eventData.description;
    }
    
    content.appendChild(description);
    article.appendChild(content);
    
    return article;
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize commentary source styling for existing meta events
    const metaEvents = document.querySelectorAll('.event-entry.meta');
    metaEvents.forEach(event => {
        // Check if event has a data-commentary-source attribute
        const commentarySource = event.getAttribute('data-commentary-source');
        if (commentarySource) {
            applyCommentarySourceStyle(event, commentarySource);
        } else {
            // Default to system observation if no source specified
            applyCommentarySourceStyle(event, 'system');
        }
    });
    
    // Check if we're on the logs page
    const eventCategory = document.getElementById('eventCategory');
    const connectionStatus = document.getElementById('connectionStatus');
    const eventContent = document.getElementById('eventContent');
    
    // Only run animation on logs page
    if (!eventCategory || !connectionStatus || !eventContent) {
        return;
    }
    
    // Get the parent article element
    const eventEntry = eventCategory.closest('.event-entry');
    
    // Get 0.0.2 event elements
    const decisionEvent = document.getElementById('decisionEvent');
    const metaCommentary = document.getElementById('metaCommentary');
    const anomalyWarning = document.getElementById('anomalyWarning');
    
    // Get 0.0.3 event elements
    const observationDetection = document.getElementById('observationDetection');
    const glitchEvent = document.getElementById('glitchEvent');
    const glitchSubtext = document.getElementById('glitchSubtext');
    
    // Sequential animation function
    const runSequentialAnimation = () => {
        // Step 1: Show folder path with fade-in quickly (0.0.1 events appear quickly)
        setTimeout(() => {
            eventEntry.style.transition = 'opacity 0.3s ease-in';
            eventEntry.style.opacity = '1';
        }, 100);
        
        // Step 2: Show connection message quickly (0.0.1 events appear quickly)
        setTimeout(() => {
            connectionStatus.textContent = 'Le monde réel est désormais connecté au RP.';
            connectionStatus.style.transition = 'opacity 0.3s ease-in';
            connectionStatus.style.opacity = '1';
        }, 500);
        
        // Step 3: Show first event log quickly (0.0.1 events appear quickly)
        setTimeout(() => {
            eventContent.style.transition = 'opacity 0.3s ease-in';
            eventContent.style.opacity = '1';
        }, 900);
        
        // 0.0.2 Events - Sequential animation with specified delays
        
        // Step 4: Show decision event (500ms delay after 0.0.1 events)
        if (decisionEvent) {
            setTimeout(() => {
                decisionEvent.style.transition = 'opacity 0.6s ease-in';
                decisionEvent.style.opacity = '1';
            }, 1400); // 900ms (0.0.1 complete) + 500ms delay
        }
        
        // Step 5: Show meta-commentary (1000ms delay after decision event)
        if (metaCommentary) {
            setTimeout(() => {
                metaCommentary.style.transition = 'opacity 0.6s ease-in';
                metaCommentary.style.opacity = '1';
            }, 2400); // 1400ms (decision start) + 1000ms delay
        }
        
        // Step 6: Show anomaly warning (1500ms delay after meta-commentary)
        if (anomalyWarning) {
            setTimeout(() => {
                anomalyWarning.style.transition = 'opacity 0.6s ease-in';
                anomalyWarning.style.opacity = '1';
            }, 3900); // 2400ms (meta start) + 1500ms delay
        }
        
        // 0.0.3 Events - Coordinated animation sequence
        
        // Step 7: Show observation detection (300ms fade-in after anomaly warning completes)
        if (observationDetection) {
            setTimeout(() => {
                observationDetection.style.transition = 'opacity 0.3s ease-in';
                observationDetection.style.opacity = '1';
            }, 4500); // 3900ms (anomaly start) + 600ms (fade-in complete)
        }
        
        // Step 8: Show glitch event (triggers immediately after observation detection completes)
        if (glitchEvent) {
            setTimeout(() => {
                glitchEvent.style.transition = 'opacity 0.6s ease-in';
                glitchEvent.style.opacity = '1';
                
                // Apply text scrambling effect to the glitch event description
                const glitchDescription = glitchEvent.querySelector('.event-description');
                if (glitchDescription) {
                    // Start scrambling after the fade-in completes
                    setTimeout(() => {
                        scrambleText(glitchDescription, 2000);
                    }, 600);
                }
            }, 4800); // 4500ms (observation start) + 300ms (observation fade-in complete)
        }
        
        // Step 9: Show glitch subtext (appears after glitch event fade-in)
        if (glitchSubtext) {
            setTimeout(() => {
                glitchSubtext.style.transition = 'opacity 0.6s ease-in';
                glitchSubtext.style.opacity = '1';
            }, 5400); // 4800ms (glitch start) + 600ms (fade-in complete)
        }
        
        // 0.0.3 Events - External Source Error
        
        // Step 10: Show external source error (1 second after glitch event starts)
        const externalSourceError = document.getElementById('externalSourceError');
        if (externalSourceError) {
            setTimeout(() => {
                externalSourceError.style.transition = 'opacity 0.6s ease-in';
                externalSourceError.style.opacity = '1';
            }, 5800); // 4800ms (glitch start) + 1000ms delay
        }
        
        // 0.0.3 Events - Terminal Window
        
        // Step 11: Show terminal window (500ms after error event starts)
        const terminalContainer = document.getElementById('terminalContainer');
        if (terminalContainer) {
            setTimeout(() => {
                // Create terminal window with specified path and lines
                const terminalWindow = createTerminalWindow(
                    '/void_trace/active',
                    [
                        'Connexion...',
                        'Source inconnue : \'BALDE_??\'',
                        'Trace en cours...'
                    ]
                );
                
                // Insert terminal window into container
                terminalContainer.appendChild(terminalWindow);
                
                // Fade in the container
                terminalContainer.style.transition = 'opacity 0.6s ease-in';
                terminalContainer.style.opacity = '1';
            }, 6300); // 5800ms (error start) + 500ms delay
        }
    };
    
    // Start the animation sequence
    runSequentialAnimation();
});
