document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const countdownNumber = document.querySelector('.countdown-number');
    const redirectInfo = document.querySelector('.redirect-info .highlight');
    const skipBtn = document.getElementById('skipBtn');
    const circleProgress = document.querySelector('.circle-progress');
    
    // Countdown settings
    let countdown = 10;
    const totalTime = 10; // seconds
    const redirectUrl = 'https://tetherclub.org';
    
    // Circle circumference calculation
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    
    // Set initial stroke properties
    circleProgress.style.strokeDasharray = circumference;
    circleProgress.style.strokeDashoffset = circumference;
    
    // Update countdown display
    function updateCountdown() {
        countdownNumber.textContent = countdown;
        redirectInfo.textContent = countdown;
        
        // Calculate progress for circle
        const progress = ((totalTime - countdown) / totalTime) * circumference;
        circleProgress.style.strokeDashoffset = circumference - progress;
        
        if (countdown <= 0) {
            // Redirect when countdown reaches 0
            window.location.href = redirectUrl;
        } else {
            countdown--;
            setTimeout(updateCountdown, 1000);
        }
    }
    
    // Start countdown
    setTimeout(updateCountdown, 1000);
    
    // Skip button functionality
    skipBtn.addEventListener('click', function() {
        window.location.href = redirectUrl;
    });
    
    // Auto-redirect after total time (as backup)
    setTimeout(function() {
        window.location.href = redirectUrl;
    }, totalTime * 1000 + 500);
});
