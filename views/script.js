document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to the "Add to Cart" buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

    // Add a click event listener to each "Add to Cart" button
    addToCartBtns.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default behavior of the link

            // Retrieve the product information
            const productCard = event.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;

            // Perform the necessary actions to add the product to the cart
            addToCart(productName, productPrice);
        });
    });

    // Function to add the product to the cart
    function addToCart(name, price) {
        // Create a new product object
        const product = {
            name: name,
            price: price
        };

        // Retrieve the existing cart data from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Add the product to the cart
        cart.push(product);

        // Store the updated cart data in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Cart page functionality
    if (window.location.pathname === '/cart.html') {
        // Get the cart items container
        const cartItemsContainer = document.getElementById('cart-items');

        // Retrieve the cart data from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Loop through the cart items and display them
        cart.forEach(function(product) {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-product');
            productElement.innerHTML = `
        <span class="cart-product-name">${product.name}</span>
        <span class="cart-product-price">${product.price}</span>
      `;
            cartItemsContainer.appendChild(productElement);
        });
    }
});
