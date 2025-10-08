// Configuration - Set your event deadline here
// Set this to a past date to show results immediately, or future date for countdown
const DEADLINE = new Date('2025-10-08T23:59:59').getTime(); // Change this to your actual deadline

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = DEADLINE - now;
    
    if (distance < 0) {
        // Deadline has passed
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.getElementById('deadline-status').innerHTML = 
            '<span style="color: #f5576c; font-weight: 600;">⏰ Submission Deadline Passed! Results will be announced soon.</span>';
        
        // Show results after deadline
        loadResults();
        return;
    }
    
    // Calculate time remaining
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update countdown display
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    
    // Update deadline status
    if (days > 0) {
        document.getElementById('deadline-status').innerHTML = 
            `<span style="color: #4facfe;">📅 Submission closes in ${days} day${days > 1 ? 's' : ''}</span>`;
    } else if (hours > 0) {
        document.getElementById('deadline-status').innerHTML = 
            `<span style="color: #f5576c; font-weight: 600;">⚠️ Hurry! Only ${hours} hour${hours > 1 ? 's' : ''} remaining!</span>`;
    } else {
        document.getElementById('deadline-status').innerHTML = 
            `<span style="color: #f5576c; font-weight: 700; animation: pulse 1s infinite;">🔥 Last ${minutes} minutes! Submit now!</span>`;
    }
}

// Load Results from JSON
async function loadResults() {
    const resultsGrid = document.getElementById('results-grid');
    const resultsStatus = document.getElementById('results-status');
    
    const now = new Date().getTime();
    const distance = DEADLINE - now;
    
    // Check if deadline has passed
    if (distance > 0) {
        resultsStatus.innerHTML = `
            <p style="color: var(--text-secondary);">
                🕐 Results will be published after the submission deadline.<br>
                <strong>Stay tuned!</strong>
            </p>
        `;
        resultsGrid.innerHTML = '';
        return;
    }
    
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        if (data.resultsPublished) {
            resultsStatus.innerHTML = `
                <p style="color: #4facfe; font-weight: 600;">
                    🎉 Congratulations to all Semi-Finalists! 🎉<br>
                    <span style="color: var(--text-secondary); font-size: 1rem;">
                        The following participants have qualified for the Semi-Final round (Offline).
                    </span>
                </p>
            `;
            
            if (data.participants && data.participants.length > 0) {
                resultsGrid.innerHTML = data.participants.map((participant, index) => `
                    <div class="result-card">
                        <div class="result-rank">Rank #${index + 1}</div>
                        <h3>${participant.projectName}</h3>
                        <p class="result-category">${participant.category}</p>
                        <p class="result-team"><strong>Team:</strong> ${participant.teamName}</p>
                        <p class="result-team"><strong>Members:</strong> ${participant.members.join(', ')}</p>
                        ${participant.github ? `<p class="result-team"><strong>GitHub:</strong> <a href="${participant.github}" target="_blank" style="color: #667eea;">View Code</a></p>` : ''}
                        ${participant.deployLink ? `<p class="result-team"><strong>Demo:</strong> <a href="${participant.deployLink}" target="_blank" style="color: #667eea;">View Live</a></p>` : ''}
                    </div>
                `).join('');
            } else {
                resultsGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No results available yet.</p>';
            }
        } else {
            resultsStatus.innerHTML = `
                <p style="color: var(--text-secondary);">
                    ⏳ Results are being evaluated...<br>
                    <strong>Check back in a few hours!</strong>
                </p>
            `;
            resultsGrid.innerHTML = '';
        }
    } catch (error) {
        console.error('Error loading results:', error);
        resultsStatus.innerHTML = `
            <p style="color: var(--text-secondary);">
                ⏳ Results are being evaluated...<br>
                <strong>Check back in a few hours!</strong>
            </p>
        `;
        resultsGrid.innerHTML = '';
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.8)';
    }
});

// Add pulse animation for urgent countdown
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Load results if deadline has passed
    const now = new Date().getTime();
    if (DEADLINE - now < 0) {
        loadResults();
    }
});

// Intersection Observer for scroll animations
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

// Observe all cards
document.querySelectorAll('.about-card, .level-card, .result-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});
