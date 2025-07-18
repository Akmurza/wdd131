
        // Set this year
    document.addEventListener('DOMContentLoaded', function () {
            const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    // Set last date
    document.getElementById('lastModified').textContent =
    'Last Modified: ' + document.lastModified;
        });
