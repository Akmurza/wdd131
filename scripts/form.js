
        // Product array as provided in the assignment
        const products = [
            {
                id: "fc-1888",
                name: "flux capacitor",
                averagerating: 4.5
            },
            {
                id: "fc-2050",
                name: "power laces",
                averagerating: 4.7
            },
            {
                id: "fs-1987",
                name: "time circuits",
                averagerating: 3.5
            },
            {
                id: "ac-2000",
                name: "low voltage reactor",
                averagerating: 3.9
            },
            {
                id: "jj-1969",
                name: "warp equalizer",
                averagerating: 5.0
            }
        ];

        // Populate the product select options
        function populateProducts() {
            const selectElement = document.getElementById('productName');

            products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.name;
                option.textContent = product.name;
                selectElement.appendChild(option);
            });
        }

        // Enhanced star rating functionality
        function setupStarRating() {
            const ratingInputs = document.querySelectorAll('input[name="rating"]');
            const ratingLabels = document.querySelectorAll('.rating-item label');

            ratingInputs.forEach((input, index) => {
                input.addEventListener('change', function () {
                    // Reset all stars
                    ratingLabels.forEach(label => {
                        label.style.color = '#cbd5e0';
                    });

                    // Fill stars up to selected rating
                    for (let i = 0; i <= index; i++) {
                        ratingLabels[i].style.color = '#ffd700';
                    }
                });
            });

            // Hover effects
            ratingLabels.forEach((label, index) => {
                label.addEventListener('mouseenter', function () {
                    // Temporarily highlight stars on hover
                    for (let i = 0; i <= index; i++) {
                        ratingLabels[i].style.color = '#ffd700';
                    }
                });


                label.addEventListener('mouseleave', function () {
                    // Reset to actual selection
                    const selectedRating = document.querySelector('input[name="rating"]:checked');
                    ratingLabels.forEach(l => l.style.color = '#cbd5e0');

                    if (selectedRating) {
                        const selectedIndex = Array.from(ratingInputs).indexOf(selectedRating);
                        for (let i = 0; i <= selectedIndex; i++) {
                            ratingLabels[i].style.color = '#ffd700';
                        }
                    }
                });
            });
        }

        // Initialize the form
        document.addEventListener('DOMContentLoaded', function () {
            populateProducts();
            setupStarRating();
        });
    