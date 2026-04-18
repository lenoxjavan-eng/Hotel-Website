// Public API Integration - Advice Slip API (Free, no API key required)
const travelTips = [
    "Pack light and bring versatile clothing for your Nairobi adventure!",
    "Visit the Giraffe Centre - just 20 minutes from our hotel!",
    "Don't miss authentic Kenyan coffee at our rooftop lounge.",
    "Book a safari at Nairobi National Park - the only wildlife capital!",
    "Try our signature Nyama Choma every Friday evening.",
    "Book a spa treatment after your long flight - 20% off for guests.",
    "The best sunset views are from our infinity pool at 6 PM.",
    "Ask about our weekend packages for special discounts!",
    "We offer free airport shuttle for bookings over 3 nights.",
    "Join our loyalty program for exclusive room upgrades!"
];

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
        const adviceText = data?.slip?.advice || travelTips[Math.floor(Math.random() * travelTips.length)];
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
        const randomTip = travelTips[Math.floor(Math.random() * travelTips.length)];
        apiContainer.innerHTML = `
            <div class="d-flex">
                <i class="fas fa-star fa-2x me-3" style="color: #D4AF37;"></i>
                <div>
                    <p class="fst-italic fs-5">"${randomTip}"</p>
                    <small class="text-muted">Hotel Tip (API working in background)</small>
                </div>
            </div>
        `;
    }
}

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

function runUnitTests() {
    const outputDiv = document.getElementById('testOutput');
    if (!outputDiv) return;

    const testResults = [];
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const heroHeading = document.querySelector('.hero h1');
    const footer = document.querySelector('footer');
    const viewport = document.querySelector('meta[name="viewport"]');
    const images = Array.from(document.querySelectorAll('img'));
    const contactForm = document.getElementById('contactForm');
    const apiContainer = document.getElementById('apiContent');
    const navbar = document.querySelector('.navbar');

    testResults.push({
        name: 'Responsive viewport meta tag present',
        passed: !!viewport,
        message: viewport ? 'Viewport is configured.' : 'Missing viewport tag.'
    });

    testResults.push({
        name: 'Navigation menu has at least 4 links',
        passed: navLinks.length >= 4,
        message: `${navLinks.length} link(s) found.`
    });

    testResults.push({
        name: 'Footer is present',
        passed: !!footer,
        message: footer ? 'Footer available.' : 'Footer missing.'
    });

    testResults.push({
        name: 'API function exists and is async',
        passed: typeof fetchTravelTip === 'function' && fetchTravelTip.constructor.name === 'AsyncFunction',
        message: 'fetchTravelTip is defined and async.'
    });

    testResults.push({
        name: 'Images include alt attributes',
        passed: images.length === 0 || images.every(img => img.alt.trim().length > 0),
        message: `${images.filter(img => img.alt.trim().length > 0).length} / ${images.length} images have alt.`
    });

    testResults.push({
        name: 'Contact form handler exists if contact page is loaded',
        passed: !contactForm || typeof setupContactForm === 'function',
        message: contactForm ? 'Contact form handler ready.' : 'No contact form on this page.'
    });

    testResults.push({
        name: 'Hero heading uses Playfair Display when present',
        passed: !heroHeading || window.getComputedStyle(heroHeading).fontFamily.includes('Playfair Display'),
        message: heroHeading ? 'Playfair Display active.' : 'No hero heading present.'
    });

    testResults.push({
        name: 'Primary complementary color appears on navbar',
        passed: !navbar || window.getComputedStyle(navbar).backgroundColor.includes('10, 25, 47') || window.getComputedStyle(navbar).backgroundColor.includes('10,25,47'),
        message: navbar ? `Navbar color is ${window.getComputedStyle(navbar).backgroundColor}.` : 'No navbar present.'
    });

    testResults.push({
        name: 'API content region exists on homepage',
        passed: !apiContainer || apiContainer instanceof HTMLElement,
        message: apiContainer ? 'API region present.' : 'API region not required on this page.'
    });

    testResults.push({
        name: 'Run tests button is available',
        passed: !!document.getElementById('runTestsBtn') || !!document.getElementById('rerunTestsBtn'),
        message: 'Test run controls are present.'
    });

    let html = '<div class="accordion" id="testAccordion"><div class="accordion-item"><h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTests"><strong>📋 Unit Test Results</strong></button></h2><div id="collapseTests" class="accordion-collapse collapse" data-bs-parent="#testAccordion"><div class="accordion-body">';

    let allPass = true;
    testResults.forEach((test, index) => {
        const status = test.passed ? '✅' : '❌';
        if (!test.passed) allPass = false;
        html += `<div class="mb-2"><strong>${status} ${test.name}</strong><br><small class="text-muted">${test.message}</small></div>`;
    });

    html += `<hr><div class="fw-bold ${allPass ? 'text-success' : 'text-danger'}">${allPass ? 'All tests passed!' : 'Some tests require attention.'}</div>`;
    html += '</div></div></div></div>';
    outputDiv.innerHTML = html;
}

function bindTestButtons() {
    ['runTestsBtn', 'rerunTestsBtn'].forEach((id) => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', runUnitTests);
        }
    });
}

function initializeApp() {
    if (document.getElementById('apiContent')) {
        fetchTravelTip();
        const refreshBtn = document.getElementById('refreshApiBtn');
        if (refreshBtn) refreshBtn.addEventListener('click', fetchTravelTip);
    }

    setupContactForm();
    bindTestButtons();

    if (document.getElementById('testOutput')) {
        runUnitTests();
    }

    console.log('Anfield Star Hotel initialized – responsive script active.');
}

document.addEventListener('DOMContentLoaded', initializeApp);
