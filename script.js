document.addEventListener('DOMContentLoaded', function() {
    // Countdown variables
    let countdown = 10;
    const countdownNumber = document.getElementById('countdownNumber');
    const footerCountdown = document.getElementById('footerCountdown');
    const countdownOverlay = document.getElementById('countdownOverlay');
    const skipButton = document.getElementById('skipButton');
    const countdownProgress = document.querySelector('.countdown-progress');
    
    // Redirect function
    function redirectToWebsite() {
        window.location.href = 'https://tetherclub.org';
    }
    
    // Update countdown display
    function updateCountdown() {
        countdownNumber.textContent = countdown;
        footerCountdown.textContent = countdown;
        
        // Calculate progress for circle
        const circumference = 339; // 2 * π * r (r = 54)
        const offset = circumference - (countdown / 10) * circumference;
        countdownProgress.style.strokeDashoffset = offset;
        
        if (countdown <= 0) {
            redirectToWebsite();
        } else {
            countdown--;
            setTimeout(updateCountdown, 1000);
        }
    }
    
    // Start the countdown
    setTimeout(updateCountdown, 1000);
    
    // Skip countdown button
    skipButton.addEventListener('click', redirectToWebsite);
    
    // Redirect buttons
    const redirectButtons = [
        document.getElementById('mainRedirectBtn'),
        document.getElementById('redirectNowBtn'),
        document.getElementById('finalRedirectBtn'),
        document.getElementById('learnMoreBtn')
    ];
    
    redirectButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', redirectToWebsite);
        }
    });
    
    // Pool tabs functionality
    const poolTabs = document.querySelectorAll('.pool-tab');
    const poolContents = document.querySelectorAll('.pool-content');
    
    poolTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const poolId = tab.getAttribute('data-pool');
            
            // Update active tab
            poolTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding content
            poolContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${poolId}-pool`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Animate stats when they come into view
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat h3');
                stats.forEach(stat => {
                    const finalValue = parseFloat(stat.textContent);
                    let currentValue = 0;
                    
                    // Check if it's a percentage or number
                    if (stat.textContent.includes('%')) {
                        const increment = finalValue / 20;
                        const timer = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= finalValue) {
                                currentValue = finalValue;
                                clearInterval(timer);
                            }
                            stat.textContent = currentValue.toFixed(finalValue % 1 === 0 ? 0 : 2) + '%';
                        }, 50);
                    } else if (!isNaN(finalValue) && finalValue > 10) {
                        const increment = Math.ceil(finalValue / 20);
                        const timer = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= finalValue) {
                                currentValue = finalValue;
                                clearInterval(timer);
                            }
                            stat.textContent = currentValue;
                        }, 50);
                    }
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const ctaSection = document.querySelector('.cta');
    if (ctaSection) {
        observer.observe(ctaSection);
    }
    
    // Add hover effect to plan cards
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Auto-hide overlay after 10 seconds (backup)
    setTimeout(() => {
        if (countdownOverlay.style.opacity !== '0') {
            redirectToWebsite();
        }
    }, 11000);
});
