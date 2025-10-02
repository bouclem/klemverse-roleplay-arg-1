// KlemVerse Archive - Sequential Animation Script

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
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
    };
    
    // Start the animation sequence
    runSequentialAnimation();
});
