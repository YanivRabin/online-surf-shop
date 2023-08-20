$(document).ready(() => {
    const username = sessionStorage.getItem('username');
    $.ajax({
        method: "post",
        data: {username},
        url: "/order/history",
        success: (response) => {
            const {orders} = response;
            $('#order-history').empty();
            let i = 1;
            orders.forEach((order) => {
                $('#order-history').append('<p>Order: ' + i + '</p>');
                order.products.forEach((product) => {
                    const listItem = $('<li>' + product.productId.company + ', ' + product.productId.model +
                        ', ' + product.productId.price + '$, amount:' + product.quantity + '</li>');
                    $('#order-history').append(listItem);
                });
                i++;
            });
        }
    });
})