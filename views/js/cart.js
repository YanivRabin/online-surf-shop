$(document).ready(() => {
    // get cart items
    getItems();
    function getItems() {
        $.ajax({
            url: "/cart/getItems",
            method: 'get',
            success: (response) => {
                const { cart } = response;
                $('#cart-list').empty();  // Clear the existing list
                cart.products.forEach((product) => {
                    const listItem = $(
                        '<br>' +
                        '<div style="text-align: center; font-family: Montserrat, sans-serif;background-color: #ffffff;  opacity: 0.9;">' +
                            '<h1 style="font-size: 15px; margin-top: 10px;">' + product.productId.company + " / " + product.productId.model + '</h1>' +
                            `<button class="item" type="button" disabled style="background:url('../img/surfboards/${product.productId.image}') center / cover no-repeat; height: 200px; width: 150px; border-color: rgba(0, 0, 0, 0);"></button>` +
                            '<p style="font-size: 15px; font-family: Montserrat, sans-serif; margin-top: 10px;">Price: <i class="fa fa-dollar"></i>&nbsp;' + product.productId.price + '&nbsp;</p>' +
                            '<p style="font-size: 15px; font-family: Montserrat, sans-serif; margin-top: 10px;">Amount: ' + product.quantity + '</p>' +
                            '<div class="row" id="buttons">' +
                                '<div class="col">' +
                                    '<button id="minus" class="btn btn-primary" type="button" style="background: rgba(155, 158, 163, 0); color: rgb(0, 0, 0); transform: perspective(0px) skew(0deg); border-color: rgb(0, 0, 0); font-family: Montserrat, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0px 0px 20px 1px; margin-left: 10px; margin-right: 10px;">-</button>' +
                                    '<button id="plus" class="btn btn-primary" type="button" style="background: rgba(155, 158, 163, 0); color: rgb(0, 0, 0); transform: perspective(0px) skew(0deg); border-color: rgb(0, 0, 0); font-family: Montserrat, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0px 0px 20px 1px; margin-left: 10px; margin-right: 10px;">+</button>' +
                                    '<button id="trash" class="btn btn-primary" type="button" style="background: rgba(155,158,163,0); color: rgb(0,0,0); transform: perspective(0px) skew(0deg); border-color: rgb(0,0,0); font-family: Montserrat, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0 0 20px 1px; margin-left: 10px; margin-right: 10px;">'+
                                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">\n' +
                                            '  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>\n' +
                                            '  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>\n' +
                                        '</svg>' +
                                    '</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<br>'
                    );
                    listItem.find('#minus').click(() => {
                        updateItem(product.productId, product.quantity - 1, product.productId.price);
                    });
                    listItem.find('#plus').click(() => {
                        updateItem(product.productId, product.quantity + 1, product.productId.price);
                    });
                    listItem.find('#trash').click(() => {
                        removeFromCart(product.productId);
                    });
                    // append all the above
                    $('#cart-list').append(listItem);
                });
            },
            error: (error) => {
                console.log('Error:', error);
            }
        });
    }
    function updateItem(productId, quantity, surfboardPrice) {
        $.ajax({
            type: "put",
            url: "/cart/update",
            data: { productId, quantity, surfboardPrice },
            success: function(response) {
                getItems()
                const { message } = response;
                alert(message);
            },
            error: function(xhr, status, error) {
                console.log("Error:", error);
            }
        });
    }

    function removeFromCart(productId) {
        $.ajax({
            type: "put",
            url: "/cart/remove",
            data: { productId },
            success: function(response) {
                getItems();
                const { message } = response;
                alert(message);
            },
            error: function(xhr, status, error) {
                console.log("Error:", error);
            }
        });
    }

    $('#checkOutButton').click((e) => {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/order/completeOrder",
            success: function () {
                $('#cart-list').empty();
                alert("בדיחה כדי להצחיק את שי");
                window.href("/");
            },
            error: (error) => {
                alert("Error:" + error);
            }
        });
    });
})