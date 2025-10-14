// Configuration - Set your event deadlines here
const DEADLINE_LEVEL1 = new Date('2025-10-14T22:10:00').getTime(); // Oct 14, 10:10 PM (Round 1)
const DEADLINE_LEVEL2 = new Date('2025-10-16T21:00:00').getTime(); // Oct 16, 9:00 PM (Round 2)
const RESULTS_LEVEL2_ANNOUNCEMENT = new Date('2025-10-16T22:00:00').getTime(); // Oct 16, 10:00 PM (1 hour after Level 2 deadline)

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
        navToggle.textContent = isExpanded ? '✕' : '☰';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.textContent = '☰';
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.textContent = '☰';
            document.body.style.overflow = '';
        }
    });
}

// Draggable Sticky Notes (Miro-style)
class DraggableSticky {
    constructor(element) {
        this.element = element;
        this.isDragging = false;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.xOffset = 0;
        this.yOffset = 0;
        
        this.init();
    }
    
    init() {
        // Mouse events
        this.element.addEventListener('mousedown', this.dragStart.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.dragEnd.bind(this));
        
        // Touch events
        this.element.addEventListener('touchstart', this.dragStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.drag.bind(this), { passive: false });
        document.addEventListener('touchend', this.dragEnd.bind(this));
    }
    
    dragStart(e) {
        if (e.type === 'touchstart') {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }
        
        if (e.target === this.element) {
            this.isDragging = true;
            this.element.style.zIndex = 1000;
        }
    }
    
    drag(e) {
        if (this.isDragging) {
            e.preventDefault();
            
            if (e.type === 'touchmove') {
                this.currentX = e.touches[0].clientX - this.initialX;
                this.currentY = e.touches[0].clientY - this.initialY;
            } else {
                this.currentX = e.clientX - this.initialX;
                this.currentY = e.clientY - this.initialY;
            }
            
            this.xOffset = this.currentX;
            this.yOffset = this.currentY;
            
            this.setTranslate(this.currentX, this.currentY);
        }
    }
    
    dragEnd(e) {
        this.isDragging = false;
        this.element.style.zIndex = '';
    }
    
    setTranslate(xPos, yPos) {
        const rotation = this.element.style.getPropertyValue('--rot') || '0deg';
        this.element.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${rotation})`;
    }
}

// Initialize draggable stickies
document.addEventListener('DOMContentLoaded', () => {
    const stickies = document.querySelectorAll('.sticky');
    stickies.forEach(sticky => new DraggableSticky(sticky));
});

// Countdown Timer - Focus on Level 2
function updateCountdown() {
    const now = new Date().getTime();
    
    // Update Level 2 Countdown (Main focus)
    updateLevelCountdown(DEADLINE_LEVEL2, 'l2', 'Level 2 Semi-Final');
}

function updateLevelCountdown(deadline, suffix, eventName) {
    const now = new Date().getTime();
    const distance = deadline - now;
    
    if (distance < 0) {
        // Deadline has passed
        document.getElementById(`days-${suffix}`).textContent = '00';
        document.getElementById(`hours-${suffix}`).textContent = '00';
        document.getElementById(`minutes-${suffix}`).textContent = '00';
        document.getElementById(`seconds-${suffix}`).textContent = '00';
        document.getElementById(`deadline-status-${suffix}`).innerHTML = 
            '<span style="color: #f5576c; font-weight: 600;">⏰ Deadline Passed!</span>';
        
        return;
    }
    
    // Calculate time remaining
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update countdown display
    document.getElementById(`days-${suffix}`).textContent = String(days).padStart(2, '0');
    document.getElementById(`hours-${suffix}`).textContent = String(hours).padStart(2, '0');
    document.getElementById(`minutes-${suffix}`).textContent = String(minutes).padStart(2, '0');
    document.getElementById(`seconds-${suffix}`).textContent = String(seconds).padStart(2, '0');
    
    // Update deadline status
    if (days > 0) {
        document.getElementById(`deadline-status-${suffix}`).innerHTML = 
            `<span style="color: #4facfe;">📅 ${eventName} closes in ${days} day${days > 1 ? 's' : ''}</span>`;
    } else if (hours > 0) {
        document.getElementById(`deadline-status-${suffix}`).innerHTML = 
            `<span style="color: #f5576c; font-weight: 600;">⚠️ Hurry! Only ${hours} hour${hours > 1 ? 's' : ''} remaining!</span>`;
    } else {
        document.getElementById(`deadline-status-${suffix}`).innerHTML = 
            `<span style="color: #f5576c; font-weight: 700; animation: pulse 1s infinite;">🔥 Last ${minutes} minutes! Submit now!</span>`;
    }
}

// Load Results from separate JSON files
async function loadResults() {
    const level1IdeathonGrid = document.getElementById('level1-ideathon-grid');
    const level1VibeCodingGrid = document.getElementById('level1-vibecoding-grid');

    // Try to fetch Level 1 results
    let ideathonData = { participants: [] };
    let vibeCodingData = { participants: [] };

    try {
        const ideathonResponse = await fetch('ideathon.json');
        if (ideathonResponse.ok) ideathonData = await ideathonResponse.json();
    } catch (e) {
        console.warn('Could not fetch ideathon.json', e);
    }

    try {
        const vibeCodingResponse = await fetch('vibecoding.json');
        if (vibeCodingResponse.ok) vibeCodingData = await vibeCodingResponse.json();
    } catch (e) {
        console.warn('Could not fetch vibecoding.json', e);
    }

    // Update Level 1 counts
    updateShortlistCounts(ideathonData.participants || [], vibeCodingData.participants || [], 'level1');

    // Check if Level 1 results are available
    try {
        const ideathonAvailable = ideathonData.participants && ideathonData.participants.length > 0;
        const vibeCodingAvailable = vibeCodingData.participants && vibeCodingData.participants.length > 0;

        if (ideathonAvailable || vibeCodingAvailable) {
            // Render Level 1 Ideathon results
            if (ideathonAvailable) {
                level1IdeathonGrid.innerHTML = ideathonData.participants.map((participant, index) =>
                    createResultCard(participant, index + 1)
                ).join('');
            } else {
                level1IdeathonGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No results available yet.</p>';
            }

            // Render Level 1 Vibe Coding results
            if (vibeCodingAvailable) {
                level1VibeCodingGrid.innerHTML = vibeCodingData.participants.map((participant, index) =>
                    createResultCard(participant, index + 1)
                ).join('');
            } else {
                level1VibeCodingGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No results available yet.</p>';
            }

            // Add click handlers to all result cards (though simplified, keeping for future use)
            addResultCardClickHandlers();

            // Update Level 1 shortlist counts
            updateShortlistCounts(ideathonData.participants || [], vibeCodingData.participants || [], 'level1');

        } else {
            level1IdeathonGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Results will be published soon.</p>';
            level1VibeCodingGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Results will be published soon.</p>';
            updateShortlistCounts([], [], 'level1');
        }
        
    } catch (error) {
        console.error('Error processing results:', error);
        level1IdeathonGrid.innerHTML = '<p style="text-align: center; color: #f5576c;">Could not load results. Please try again later.</p>';
        level1VibeCodingGrid.innerHTML = '<p style="text-align: center; color: #f5576c;">Could not load results. Please try again later.</p>';
        updateShortlistCounts([], [], 'level1');
    }
}

// Helper to update the shortlist counts in the UI
function updateShortlistCounts(ideathonList, vibeList, level = 'level1') {
    const ideathonCountElem = document.getElementById(`${level}-ideathon-count`);
    const vibeCountElem = document.getElementById(`${level}-vibecoding-count`);

    if (ideathonCountElem) ideathonCountElem.textContent = String(ideathonList.length || 0);
    if (vibeCountElem) vibeCountElem.textContent = String(vibeList.length || 0);
}

// Create result card HTML - with different styles based on qualification status and time
function createResultCard(participant, rank) {
    const now = new Date().getTime();
    const isBeforeResultsAnnouncement = now < RESULTS_LEVEL2_ANNOUNCEMENT;
    
    // Before Oct 16, 10:00 PM - Show "All the Best" cards for all Level 2 participants
    if (isBeforeResultsAnnouncement) {
        return `
            <div class="result-card level2-participant" data-team="${participant.teamName}">
                <div class="best-wishes-icon">🌟</div>
                <h3>${participant.teamName}</h3>
                <div class="best-wishes-badge">✨ All the Best for Level 2! ✨</div>
                <div class="best-wishes-note">Deadline: Oct 16, 9:00 PM</div>
            </div>
        `;
    }
    
    // After Oct 16, 10:00 PM - Show Grand Final or Workshop cards
    const isGrandFinalQualified = participant.Qulified && 
        (participant.Qulified.includes('grand final') || 
         participant.Qulified.includes('Grand Final') ||
         participant.Qulified.includes('level 3'));
    
    if (isGrandFinalQualified) {
        // Premium card for grand final qualifiers
        return `
            <div class="result-card grand-final-qualified" data-team="${participant.teamName}">
                <div class="grand-final-crown">👑</div>
                <h3>${participant.teamName}</h3>
                <div class="grand-final-badge">🏆 SELECTED FOR GRAND FINALE! 🏆</div>
                <div class="grand-final-note">Competing at PPG Tech Campus</div>
            </div>
        `;
    } else {
        // Red card for teams not advancing to grand final
        return `
            <div class="result-card not-advanced" data-team="${participant.teamName}">
                <h3>${participant.teamName}</h3>
                <div class="workshop-badge">🎓 Invited to Vibe Coding Workshop</div>
                <div class="workshop-note">Thank you for participating!</div>
            </div>
        `;
    }
}

// Add click handlers to result cards (simplified - no expansion needed)
function addResultCardClickHandlers() {
    // Cards no longer expand, just show team name with badge
}

// Create confetti effect on card click
function createConfetti(card) {
    const colors = ['#667eea', '#764ba2', '#f5576c', '#4facfe', '#06ffa5'];
    const rect = card.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${rect.left + rect.width / 2}px`;
        confetti.style.top = `${rect.top + rect.height / 2}px`;
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 0.3}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Event Tab Switching
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const eventType = button.getAttribute('data-event');
            
            // Get the parent section to determine which tabs to affect
            const parentSection = button.closest('.level-results-section');
            if (!parentSection) return;
            
            // Get tabs and results within this section only
            const sectionTabs = parentSection.querySelectorAll('.tab-button');
            const sectionResults = parentSection.querySelectorAll('.event-results');
            
            // Remove active class from all tabs and results in this section
            sectionTabs.forEach(btn => btn.classList.remove('active'));
            sectionResults.forEach(result => result.classList.remove('active'));
            
            // Add active class to clicked tab
            button.classList.add('active');
            
            // Show corresponding results
            const targetResults = document.getElementById(`${eventType}-results`);
            if (targetResults) {
                targetResults.classList.add('active');
            }
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
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
    
    // Load results immediately so shortlist counts show even before deadline
    loadResults();
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
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements (excluding result cards for stability)
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-card, .level-card, .glass-card');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Make result cards stable (no animation)
    const resultCards = document.querySelectorAll('.result-card');
    resultCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
});

// Parallax effect for hero circles on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.gradient-circle');
    
    circles.forEach((circle, index) => {
        const speed = 0.5 + (index * 0.1);
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.cta-button, .submit-button').forEach(button => {
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
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Modal functionality for submission confirmation with localStorage tracking
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('submit-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalButton = document.getElementById('modal-button');
    const closeBtn = document.querySelector('.close');
    let currentFormUrl = '';

    // Check submission status on page load and update button states
    updateButtonStates();

    // Handle submit button clicks
    document.querySelectorAll('.submit-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const formType = this.classList.contains('ideathon-btn') ? 'ideathon' : 'vibe';
            currentFormUrl = this.getAttribute('data-form');

            // Always show confirmation modal (no prevention of multiple submissions)
            if (this.classList.contains('ideathon-btn')) {
                modalTitle.textContent = 'Submit Ideathon Project';
                modalMessage.textContent = 'You are about to submit your Ideathon project. Make sure all your details are correct before proceeding.';
            } else if (this.classList.contains('vibe-btn')) {
                modalTitle.textContent = 'Submit Vibe Coding Project';
                modalMessage.textContent = 'You are about to submit your Vibe Coding project. Make sure all your details are correct before proceeding.';
            }
            modalButton.textContent = 'Proceed to Form';
            modalButton.onclick = () => proceedToForm(formType);

            modal.style.display = 'block';
        });
    });

    // Handle modal close
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Function to proceed to form and mark as submitted
    function proceedToForm(formType) {
        // Mark as submitted in localStorage
        localStorage.setItem(`technokreaticon_${formType}_submitted`, 'true');
        localStorage.setItem(`technokreaticon_${formType}_submitted_date`, new Date().toISOString());

        modal.style.display = 'none';
        if (currentFormUrl) {
            window.open(currentFormUrl, '_blank');
        }

        // Update button states after submission
        setTimeout(updateButtonStates, 100);
    }

    // Function to update button states based on localStorage (removed disabling)
    function updateButtonStates() {
        // Buttons remain enabled, no visual changes needed
        // localStorage tracking is still used for modal messages
    }
});

// Add CSS for ripple effect dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .cta-button, .submit-button {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
