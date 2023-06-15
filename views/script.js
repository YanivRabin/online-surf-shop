// Get the filter elements
const sizeFilter = document.getElementById('size-filter');
const volumeFilter = document.getElementById('Volume');
const boardTypeFilter = document.getElementById('Board type');

// Add event listeners to the filter elements
sizeFilter.addEventListener('change', filterProducts);
volumeFilter.addEventListener('change', filterProducts);
boardTypeFilter.addEventListener('change', filterProducts);

// Filter products based on selected options
function filterProducts() {
    const selectedSize = sizeFilter.value;
    const selectedVolume = volumeFilter.value;
    const selectedBoardType = boardTypeFilter.value;

    const productCards = document.getElementsByClassName('product-card');

    for (const card of productCards) {
        const cardSize = card.getAttribute('data-size');
        const cardVolume = card.getAttribute('data-Volume');
        const cardBoardType = card.getAttribute('data-Board type');

        if (
            (selectedSize === 'all' || cardSize === selectedSize) &&
            (selectedVolume === 'all' || cardVolume === selectedVolume) &&
            (selectedBoardType === 'all' || cardBoardType === selectedBoardType)
        ) {
            card.style.display = 'block'; // Show the product card
        } else {
            card.style.display = 'none'; // Hide the product card
        }
    }
}
