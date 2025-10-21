// Function to check if the user has made a decision about cookies
function checkCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent === 'accepted') {
        // If consent has been given, hide the banner
        document.querySelector('.cookie-banner').style.display = 'none';
    } else if (cookieConsent === 'rejected') {
        // If consent has been rejected, hide the banner
        document.querySelector('.cookie-banner').style.display = 'none';
    } else {
        // If no decision has been made yet, show the banner
        document.querySelector('.cookie-banner').style.display = 'flex';
    }
}

// Function to store the user's consent in localStorage
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.querySelector('.cookie-banner').style.display = 'none';
}

// Function to store the user's rejection in localStorage
function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    document.querySelector('.cookie-banner').style.display = 'none';
}

// Run the consent check when the page loads
window.onload = checkCookieConsent;

// Add event listener to the "Accept" button
document.querySelector('.cookie-accept').addEventListener('click', acceptCookies);

// Add event listener to the "Reject" button
document.querySelector('.cookie-reject').addEventListener('click', rejectCookies);