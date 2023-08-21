$(document).ready(() => {
    const username = sessionStorage.getItem('username');

    $.ajax({
        method: "post",
        data: { username },
        url: "/order/history",
        success: response => {
            const { orders } = response;
            $('#order-history').empty();
            let i = 1;

            orders.forEach(order => {
                const orderHeader = `
                    <div style="text-align: center; font-family: Montserrat, sans-serif;background-color: #ffffff; opacity: 0.9;">
                        <h1 style="font-size: 15px; margin-top: 10px;">Order: ${i}</h1>
                `;
                $('#order-history').append(orderHeader);

                order.products.forEach(product => {
                    const productInfo = `
                        <button class="item" type="button" disabled style="background:url('../img/surfboards/${product.productId.image}') center / cover no-repeat; height: 200px; width: 150px; border-color: rgba(0, 0, 0, 0);"></button>
                        <p style="font-size: 15px; font-family: Montserrat, sans-serif; margin-top: 10px;">${product.productId.company}, ${product.productId.model}, Price: <i class="fa fa-dollar"></i>&nbsp;${product.productId.price}, Amount: ${product.quantity}</p>
                    `;
                    $('#order-history').append(productInfo);
                });

                const orderFooter = `</div><br>`;
                $('#order-history').append(orderFooter);

                i++;
            });
        }
    });
});
