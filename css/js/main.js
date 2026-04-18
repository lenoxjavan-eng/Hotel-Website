// Public API Integration - Advice Slip API (Free, no API key required)
async function fetchTravelTip() {
    const apiContainer = document.getElementById('apiContent');
    if (!apiContainer) return;
    
    try {
        apiContainer.innerHTML = `<div class="d-flex align-items-center">
            <div class="spinner-border text-warning me-3" role="status"></div>
            <span>Fetching fresh travel tip...</span>
        </div>`;
        
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        const adviceText = data.slip.advice;
        const travelTip = `✈️ Travel Insight: ${adviceText}`;
        
        apiContainer.innerHTML = `
            <div class="d-flex">
                <i class="fas fa-quote-left fa-2x me-3" style="color: #D4AF37;"></i>
                <div>
                    <p class="fst-italic fs-5">"${travelTip}"</p>
                    <small class="text-muted">— random travel wisdom from Advice API</small>
                </div>
            </div>
        `;
    } catch (error) {
        apiContainer.innerHTML = `<div class="alert alert-warning">
            ⚠️ Could not load live tip. Enjoy authentic Kenyan coffee at our rooftop lounge!
        </div>`;
    }
}

// Contact Form Handler
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('fullName')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const messageDiv = document.getElementById('formMessage');
        
        if (!fullName || !email) {
            if (messageDiv) {
                messageDiv.innerHTML = '<div class="alert alert-danger">Please fill in all required fields (Name and Email).</div>';
            }
            return;
        }
        
        if (messageDiv) {
            messageDiv.innerHTML = '<div class="alert alert-success">Thank you, ' + fullName + '! Your inquiry has been sent. We\'ll contact you within 24 hours.</div>';
        }
        form.reset();
        
        setTimeout(() => {
            if (messageDiv) messageDiv.innerHTML = '';
        }, 5000);
    });
}

// Unit Tests (10 comprehensive tests)
function runUnitTests() {
    const outputDiv = document.getElementById('testOutput');
    if (!outputDiv) return;
    
    const tests = [];
    
    // Test 1: API function exists and is async
    tests.push({
        name: "API function exists and is async",
        pass: typeof fetchTravelTip === 'function' && fetchTravelTip.constructor.name === 'AsyncFunction',
        message: "fetchTravelTip is defined and async"
    });
    
    // Test 2: Hero section exists
    const heroExists = !!document.querySelector('.hero');
    tests.push({
        name: "Hero section exists",
        pass: heroExists,
        message: "Hero section loaded"
    });
    
    // Test 3: Navigation has 4 links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    tests.push({
        name: "Navigation links count = 4",
        pass: navLinks.length === 4,
        message: `Found ${navLinks.length} links`
    });
    
    // Test 4: At least 3 room cards on homepage
    const roomCards = document.querySelectorAll('.bg-light .card');
    tests.push({
        name: "Featured rooms count >= 3",
        pass: roomCards.length >= 3,
        message: `Displaying ${roomCards.length} room cards`
    });
    
    // Test 5: Booking buttons present
    const bookBtns = document.querySelectorAll('.btn-primary-custom');
    tests.push({
        name: "Booking buttons present",
        pass: bookBtns.length >= 3,
        message: `${bookBtns.length} book buttons available`
    });
    
    // Test 6: Color scheme - navbar navy color
    const navbar = document.querySelector('.navbar');
    let isNavy = false;
    if (navbar) {
        const bgColor = window.getComputedStyle(navbar).backgroundColor;
        isNavy = bgColor.includes('10, 25, 47') || bgColor.includes('10,25,47') || bgColor === 'rgb(10, 25, 47)';
    }
    tests.push({
        name: "Navbar uses complementary navy color",
        pass: isNavy,
        message: "Navy color scheme applied"
    });
    
    // Test 7: Playfair Display font on hero heading
    const heroHeading = document.querySelector('.hero h1');
    let fontFamilyPass = false;
    if (heroHeading) {
        const font = window.getComputedStyle(heroHeading).fontFamily;
        fontFamilyPass = font.includes('Playfair Display') || font.includes('Playfair');
    }
    tests.push({
        name: "Hero heading uses Playfair Display font",
        pass: fontFamilyPass,
        message: heroHeading ? "Playfair Display font active" : 'No hero heading'
    });
    
    // Test 8: Footer copyright includes 2026
    const footerText = document.querySelector('footer p')?.innerText || '';
    tests.push({
        name: "Footer shows 2026 copyright",
        pass: footerText.includes('2026'),
        message: footerText.slice(0, 40)
    });
    
    // Test 9: Gallery images have alt attributes
    const galleryImgs = document.querySelectorAll('.gallery-img');
    let altCount = 0;
    galleryImgs.forEach(img => { if(img.alt) altCount++; });
    tests.push({
        name: "Gallery images contain alt text",
        pass: altCount === galleryImgs.length && galleryImgs.length > 0,
        message: `${altCount}/${galleryImgs.length} images have alt`
    });
    
    // Test 10: Responsive meta viewport exists
    const viewport = document.querySelector('meta[name="viewport"]');
    tests.push({
        name: "Responsive viewport meta tag present",
        pass: viewport !== null,
        message: viewport ? "Viewport configured" : "Missing viewport"
    });
    
    // Render results
    let allPass = true;
    let html = '<div class="accordion" id="testAccordion"><div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTests"><strong>📋 Unit Test Results (10 tests)</strong></button></h2><div id="collapseTests" class="accordion-collapse collapse" data-bs-parent="#testAccordion"><div class="accordion-body">';
    
    tests.forEach((t) => {
        const status = t.pass ? '✅' : '❌';
        if (!t.pass) allPass = false;
        html += `<div class="mb-2"><span style="font-size:1.2rem;">${status}</span> <strong>${t.name}</strong><br><small class="text-muted">${t.message}</small></div>`;
    });
    
    html += `<hr><div class="fw-bold ${allPass ? 'text-success' : 'text-danger'}">${allPass ? '🎉 All 10 unit tests passed! Application is robust.' : '⚠️ Some tests failed. Check requirements.'}</div>`;
    html += `</div></div></div></div>`;
    outputDiv.innerHTML = html;
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load API tip if on homepage
    if (document.getElementById('apiContent')) {
        fetchTravelTip();
        const refreshBtn = document.getElementById('refreshApiBtn');
        if (refreshBtn) refreshBtn.addEventListener('click', fetchTravelTip);
    }
    
    // Setup contact form if on contact page
    setupContactForm();
    
    // Run unit tests
    runUnitTests();
    
    // Re-run tests button
    const rerunBtn = document.getElementById('rerunTestsBtn');
    if (rerunBtn) rerunBtn.addEventListener('click', runUnitTests);
    
    console.log("Anfield Star Hotel initialized - All pages linked, API ready, responsive design active");
});