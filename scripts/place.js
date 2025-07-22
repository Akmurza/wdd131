
// Get current year and last modified date
document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent =
        'Last Modification: ' + document.lastModified;

    // Wind chill calculation
    const temperature = 8; // °C
    const windSpeed = 15; // km/h

    function calculateWindChill(temp, wind) {
        return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
    }

    // Check conditions for wind chill calculation
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        document.getElementById('wind-chill').textContent = Math.round(windChill) + '°C';
    } else {
        document.getElementById('wind-chill').textContent = 'N/A';
    }
});