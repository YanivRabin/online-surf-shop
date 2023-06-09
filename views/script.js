document.addEventListener('DOMContentLoaded', function() {
    // Get the filter elements
    const colorFilter = document.getElementById('color-filter');
    const sizeFilter = document.getElementById('size-filter');
    const levelFilter = document.getElementById('level-filter');

    // Get all the product cards
    const productCards = document.getElementsByClassName('product-card');

    // Get the container for filtered products
    const filteredProductsContainer = document.getElementById('filtered-products');

    // Function to filter the products based on selected filters
    function filterProducts() {
        const selectedColor = colorFilter.value;
        const selectedSize = sizeFilter.value;
        const selectedLevel = levelFilter.value;

        // Clear the container before adding filtered products
        filteredProductsContainer.innerHTML = '';

        // Loop through all the product cards and add matching cards to the filtered container
        for (let i = 0; i < productCards.length; i++) {
            const card = productCards[i];
            const cardColor = card.getAttribute('data-color');
            const cardSize = card.getAttribute('data-size');
            const cardLevel = card.getAttribute('data-level');

            // Check if the card matches the selected filters
            const colorMatch = selectedColor === 'all' || selectedColor === cardColor;
            const sizeMatch = selectedSize === 'all' || selectedSize === cardSize;
            const levelMatch = selectedLevel === 'all' || selectedLevel === cardLevel;

            // If the card matches the filters, show the card
            if (colorMatch && sizeMatch && levelMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    }

    // Add event listeners to the filter elements
    colorFilter.addEventListener('change', filterProducts);
    sizeFilter.addEventListener('change', filterProducts);
    levelFilter.addEventListener('change', filterProducts);

    // Show all products initially
    filterProducts();
});
