document.addEventListener('DOMContentLoaded', function() {
    // Add animation to stats cards
    const statCards = document.querySelectorAll('.stat-card');
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Set initial states for animation
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.cta-btn, .link-card');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .cta-btn, .link-card {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Update stats with counting animation
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 30);
    }
    
    // Animate stats when they come into view
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat-content h3');
                stats.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('%')) {
                        const value = parseFloat(text);
                        animateCounter(stat, value);
                    } else if (!isNaN(text)) {
                        const value = parseInt(text);
                        animateCounter(stat, value);
                    }
                });
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statObserver.observe(statsSection);
    }
    
    // Add logo fallback
    const logo = document.querySelector('.main-logo');
    if (logo) {
        logo.addEventListener('error', function() {
            this.style.display = 'none';
            const fallbackIcon = document.createElement('i');
            fallbackIcon.className = 'fas fa-coins';
            fallbackIcon.style.fontSize = '70px';
            fallbackIcon.style.color = 'var(--primary-color)';
            this.parentNode.insertBefore(fallbackIcon, this);
        });
    }
    
    // Add copy email functionality
    const emailElement = document.querySelector('.gmail-card .link-content p');
    if (emailElement) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy';
        
        emailElement.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const email = this.textContent;
            navigator.clipboard.writeText(email).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.color = 'var(--success-color)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                }, 2000);
            });
        });
    }
    
    // Add current year to footer
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2023', currentYear);
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});
