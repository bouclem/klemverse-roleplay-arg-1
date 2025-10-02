// KlemVerse Archive - Sequential Animation Script

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get elements to animate
    const eventCategory = document.querySelector('.event-category');
    const connectionStatus = document.querySelector('.connection-status');
    const eventContent = document.querySelector('.event-content');
    
    // Hide elements initially
    if (eventCategory) eventCategory.style.opacity = '0';
    if (connectionStatus) connectionStatus.style.opacity = '0';
    if (eventContent) eventContent.style.opacity = '0';
    
    // Sequential animation with timing delays
    
    // Step 1: Show folder path with fade-in (starts immediately)
    setTimeout(() => {
        if (eventCategory) {
            eventCategory.style.transition = 'opacity 0.8s ease-in';
            eventCategory.style.opacity = '1';
        }
    }, 300);
    
    // Step 2: Show connection message (after folder path)
    setTimeout(() => {
        if (connectionStatus) {
            connectionStatus.style.transition = 'opacity 0.8s ease-in';
            connectionStatus.style.opacity = '1';
        }
    }, 1400);
    
    // Step 3: Show event log appearing slowly (after connection message)
    setTimeout(() => {
        if (eventContent) {
            eventContent.style.transition = 'opacity 1.2s ease-in';
            eventContent.style.opacity = '1';
        }
    }, 2600);
});
