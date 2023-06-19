// Get the filter elements
const sizeFilter = document.getElementById('size-filter');
const volumeFilter = document.getElementById('Volume');
const boardTypeFilter = document.getElementById('Board-type');

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
        const cardBoardType = card.getAttribute('data-Board-type');

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

// Add event listeners to the "Add to Cart" buttons
var addToCartButtons = document.querySelectorAll('.add-to-cart-button');
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var productName = button.getAttribute('data-product-name');
        addToCart(productName);
        showPopup(productName);
    });
});

// Initialize an array to store the cart items
var cartItems = [];

// Function to add the product to the cart
function addToCart(productName) {
    // Push the product name to the cart items array
    cartItems.push(productName);

    // Update the cart display
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    // Get the cart items container element
    var cartItemsContainer = document.getElementById('cart-items-container');

    // Clear the container
    cartItemsContainer.innerHTML = '';

    // Create a list element to display each cart item
    var cartList = document.createElement('ul');

    // Loop through the cart items and create list items for each
    cartItems.forEach(function(item) {
        var listItem = document.createElement('li');
        listItem.textContent = item;
        cartList.appendChild(listItem);
    });

    // Append the cart list to the container
    cartItemsContainer.appendChild(cartList);
}

// Function to show a popup indicating the product was added to the cart
function showPopup(productName) {
    var productNamePopup = document.getElementById('product-name-popup');
    productNamePopup.textContent = productName;

    var popup = document.getElementById('add-to-cart-popup');
    popup.style.display = 'block';

    var closeBtn = document.getElementById('close-popup-btn');
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });
}