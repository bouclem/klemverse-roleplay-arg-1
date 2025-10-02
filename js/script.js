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
    
    // Sequential animation function
    const runSequentialAnimation = () => {
        // Step 1: Show folder path with fade-in (after 300ms delay)
        setTimeout(() => {
            eventEntry.style.transition = 'opacity 0.8s ease-in';
            eventEntry.style.opacity = '1';
        }, 300);
        
        // Step 2: Show connection message (after folder path is visible)
        setTimeout(() => {
            connectionStatus.textContent = 'Le monde réel est désormais connecté au RP.';
            connectionStatus.style.transition = 'opacity 0.8s ease-in';
            connectionStatus.style.opacity = '1';
        }, 1400);
        
        // Step 3: Show event log appearing slowly (after connection message)
        setTimeout(() => {
            eventContent.style.transition = 'opacity 1.2s ease-in';
            eventContent.style.opacity = '1';
        }, 2600);
    };
    
    // Start the animation sequence
    runSequentialAnimation();
});
