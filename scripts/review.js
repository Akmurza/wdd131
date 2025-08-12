
// Function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to format rating as stars
function formatRating(rating) {
    const stars = '★'.repeat(parseInt(rating)) + '☆'.repeat(5 - parseInt(rating));
    return `<span class="rating-stars">${stars}</span> (${rating}/5)`;
}

// Function to format features list
function formatFeatures(features) {
    if (!features) return 'None selected';

    if (typeof features === 'string') {
        return features;
    }

    if (Array.isArray(features)) {
        return features.join(', ');
    }

    return 'None selected';
}

// Function to update review counter
function updateReviewCounter() {
    let reviewCount = localStorage.getItem('reviewCount');
    if (!reviewCount) {
        reviewCount = 0;
    }

    // Increment the counter
    reviewCount = parseInt(reviewCount) + 1;

    // Store back to localStorage
    localStorage.setItem('reviewCount', reviewCount);

    // Display the counter
    document.getElementById('reviewCounter').textContent = reviewCount;
}


// Function to populate review details
function populateReviewDetails() {
    const reviewDetails = document.getElementById('reviewDetails');

    // Get all the form data from URL parameters
    const productName = getUrlParameter('productName') || 'Not specified';
    const rating = getUrlParameter('rating') || 'Not rated';
    const installDate = getUrlParameter('installDate') || 'Not specified';
    const features = getUrlParameter('features') || 'None selected';
    const writtenReview = getUrlParameter('writtenReview') || 'No written review provided';
    const userName = getUrlParameter('userName') || 'Anonymous';

    // Create the summary HTML
    reviewDetails.innerHTML =
        `<div class="summary-item">
        <span class="summary-label">Product:</span>
        <span class="summary-value">${productName}</span>
    </div>
    <div class="summary-item">
        <span class="summary-label">Rating:</span>
        <span class="summary-value">${formatRating(rating)}</span>
    </div>
    <div class="summary-item">
        <span class="summary-label">Installation Date:</span>
        <span class="summary-value">${installDate}</span>
    </div>
    <div class="summary-item">
        <span class="summary-label">Useful Features:</span>
        <span class="summary-value">${formatFeatures(features)}</span>
    </div>
    <div class="summary-item">
        <span class="summary-label">Reviewer:</span>
        <span class="summary-value">${userName}</span>
    </div>
    ${writtenReview !== 'No written review provided' ?
            `<div class="summary-item" style="flex-direction: column; align-items: flex-start;">
                <span class="summary-label">Written Review:</span>
                <span class="summary-value" style="margin-top: 8px; text-align: left; max-width: 100%; font-style: italic;">"${writtenReview}"</span>
            </div>`
            : ''
        }
    `;
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    populateReviewDetails();
    updateReviewCounter();
});