$(document).ready(function() {
    // Daily income chart
    $.ajax({
        url: '/order/dailyIncome',
        method: 'get',
        success: (response) => {
            const { dailyIncome } = response;

            // Chart dimensions and margins
            const margin = { top: 20, right: 20, bottom: 30, left: 40 };
            const width = 100;
            const height = 500;

            // Create an SVG element for the chart
            const svg = d3.select("#chart")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Define x and y scales
            const xScale = d3.scaleBand()
                .range([0, width])
                .padding(0.1)
                .domain(dailyIncome.map(d => d._id.day));

            const yScale = d3.scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(dailyIncome, d => d.totalIncome)]);

            // Define the line generator
            const line = d3.line()
                .x(d => xScale(d._id.day) + xScale.bandwidth() / 2)
                .y(d => yScale(d.totalIncome))
                .curve(d3.curveMonotoneX);

            // Create the line path
            svg.append("path")
                .datum(dailyIncome)
                .attr("class", "line")
                .attr("d", line)
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 2);

            // Create the y-axis
            svg.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(yScale));

            // Create the x-axis
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale));
        }
    });

    // Surfboards sales
    $.ajax({
        url: '/order/dailySurfboardsSales',
        method: 'get',
        success: (response) => {
            const { dailySurfboardsSales } = response;

            // Chart dimensions and margins
            const margin = { top: 20, right: 20, bottom: 30, left: 40 };
            const width = 500; // Adjust the width to accommodate three bars per day
            const height = 500;

            // Create an SVG element for the chart
            const svg = d3.select("#surfboards-chart")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Extract unique surfboard names
            const surfboards = Array.from(new Set(dailySurfboardsSales.map(d => d.surfboard)));

            // Define x and y scales
            const xScale = d3.scaleBand()
                .range([0, width])
                .padding(0.1)
                .domain(dailySurfboardsSales.map(d => d.day));

            const yScale = d3.scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(dailySurfboardsSales, d => d.totalQuantity)]);

            // Create bars for each surfboard sales
            svg.selectAll(".bar")
                .data(dailySurfboardsSales)
                .enter()
                .append("g")
                .attr("class", "bar")
                .attr("transform", d => `translate(${xScale(d.day)}, 0)`)
                .selectAll("rect")
                .data(d => {
                    const surfboardIndex = surfboards.indexOf(d.surfboard);
                    return Array.from({ length: surfboards.length }, (_, i) => ({
                        surfboard: d.surfboard,
                        index: i,
                        quantity: i === surfboardIndex ? d.totalQuantity : 0
                    }));
                })
                .enter()
                .append("rect")
                .attr("x", (d) => (xScale.bandwidth() / surfboards.length) * d.index)
                .attr("y", d => yScale(d.quantity))
                .attr("width", xScale.bandwidth() / surfboards.length)
                .attr("height", d => height - yScale(d.quantity))
                .attr("fill", (d, i) => d3.schemeCategory10[i]);

            // Add the year and month on top of the graph
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", -margin.top / 2)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text(`Year: ${dailySurfboardsSales[0].year}, Month: ${dailySurfboardsSales[0].month}`);

            // Create the y-axis
            svg.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(yScale));

            // Create the x-axis
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale));
        }
    });


    // check box changed functions
    $("#Fish").change(function() { getItemsByFilter() });
    $("#Short").change(function() { getItemsByFilter() });
    $("#Hybrid").change(function() { getItemsByFilter() });
    $("#White").change(function() { getItemsByFilter() });
    $("#Black").change(function() { getItemsByFilter() });
    $("#Blue").change(function() { getItemsByFilter() });
    function getItemsByFilter() {
        // Get all checked checkboxes
        let checkedCheckboxes = $('input[type="checkbox"]:checked');
        let type = [];
        let color = [];

        checkedCheckboxes.each(function () {
            if ($(this).attr('value') === 'type')
                type.push($(this).attr('id'));

            if ($(this).attr('value') === 'color')
                color.push($(this).attr('id'));
        });

        $.ajax({
            url: "/store/filterSurfboards",
            method: "get",
            data: { type, color },
            success: (response) => {
                const { surfboards } = response;

                // Clear the existing list
                $('#surfboards-list').empty();

                // Function to create and append surfboard list items to the surfboards list
                const createSurfboardListItem = (surfboard) => {
                    const listItem = $('<div style="text-align: center; font-family: Montserrat, sans-serif;">' +
                        '<h1 style="font-size: 15px; margin-top: 10px;">' + surfboard.company + " / " +surfboard.model + '</h1>' +
                        '<button class="btn btn-primary" type="button" style="background: url(../img/Modern2.5/sharpeyesurfboards_us_2019_modern2-5.png) center / cover no-repeat; height: 200px; width: 150px; border-color: rgba(0, 0, 0, 0);"></button>' +
                        '<p style="font-size: 15px; font-family: Montserrat, sans-serif; margin-top: 10px;">Price : <i class="fa fa-dollar"></i>&nbsp;' + surfboard.price + '&nbsp;</p>' +
                        '<p style="font-size: 15px; font-family: Montserrat, sans-serif; margin-top: 10px;">Color : ' + surfboard.color + '</p>' +
                        '<p style="font-size: 15px; font-family: Montserrat, sans-serif; margin-top: 10px;">Type : ' + surfboard.color + '</p>' +

                        '<div class="row" id="add-cart">' +
                        '<div class="col">' +
                        '<button class="btn btn-primary" type="button" style="background: rgba(155, 158, 163, 0); color: rgb(0, 0, 0); transform: perspective(0px) skew(0deg); border-color: rgb(0, 0, 0); font-family: Montserrat, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0px 0px 20px 1px;">Add to Cart</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>');

                    // Add click event to the "Add to Cart" button
                    listItem.find('button').click(() => {
                        addToCart(surfboard._id, surfboard.price); // Call the addToCart function with the surfboard ID
                    });

                    return listItem;
                };

                // Calculate the number of rows needed
                const numRows = Math.ceil(surfboards.length / 4);

                for (let row = 0; row < numRows; row++) {
                    const rowContainer = $('<div class="row"></div>');

                    for (let i = row * 4; i < Math.min((row + 1) * 4, surfboards.length); i++) {
                        const surfboard = surfboards[i];
                        const col = $('<div class="col-md-3"></div>');
                        col.append(createSurfboardListItem(surfboard));
                        rowContainer.append(col);
                    }

                    $('#surfboards-list').append(rowContainer);
                }
            },
            error: (error) => {
                console.log('Error:', error);
            }
        });
    }




    // get cart items
    function getItems() {

        $.ajax({

            url: "/cart/getItems",
            method: 'get',
            success: (response) => {

                const { cart } = response;

                $('#cart-list').empty();  // Clear the existing list
                cart.products.forEach((product) => {

                    const listItem = $('<li>company: ' + product.productId.company + ', model: ' + product.productId.model +
                        ', amount:' + product.quantity + ', price: ' +
                        Number(product.quantity) * Number(product.productId.price) + '$ </li>');

                    // add to cart
                    const addButton = $('<button type="button">Remove from cart</button>');
                    addButton.click(function() {
                        removeFromCart(product.productId);  // Call the addToCart function with the surfboard ID
                    });
                    listItem.append(addButton);

                    // plus 1 to item quantity
                    const plusButton = $('<button type="button">+</button>');
                    plusButton.click(function() {
                        updateItem(product.productId, product.quantity + 1, product.productId.price);
                    });
                    listItem.append(plusButton);

                    // minus 1 to item quantity
                    const minusButton = $('<button type="button">-</button>');
                    minusButton.click(function() {
                        updateItem(product.productId, product.quantity - 1, product.productId.price);
                    });
                    listItem.append(minusButton);

                    // append all the above
                    $('#cart-list').append(listItem);
                });

                $('#total-price').text("Total price: " + cart.totalPrice + "$");
            },
            error: (error) => {
                console.log('Error:', error);
            }
        });
    }

    function addToCart(surfboardId, surfboardPrice) {

        $.ajax({

            type: "POST",
            url: "/cart/add",
            data: { surfboardId, surfboardPrice },
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

    // upload surfboards when getting the html
    $.ajax({

        url: "/store/surfboards",
        method: 'get',
        success: (response) => {

            const { surfboards } = response;

            $('#surfboards-list').empty();  // Clear the existing list
            surfboards.forEach((surfboard) => {

                const listItem = $('<li>' + surfboard.company + ', ' + surfboard.model + ', ' + surfboard.price + '$, ' + surfboard._id + '</li>');
                const addButton = $('<button type="button">Add to Cart</button>');
                addButton.click(function() {
                    addToCart(surfboard._id, surfboard.price);  // Call the addToCart function with the surfboard ID
                });
                listItem.append(addButton);
                $('#surfboards-list').append(listItem);
            });
        },
        error: (error) => {
            console.log('Error:', error);
        }
    });

    // create new surfboard
    $('#create').submit(function(e){

        e.preventDefault();
        $.ajax({
            type: "POST",
            url:"/store/createSurfboard",
            data: $('#create').serialize(),
            success: function(response) {

                const { newSurfboard } = response;

                const listItem = $('<li>' + newSurfboard.company + ', ' + newSurfboard.model + ', ' + newSurfboard.price + '$, ' + newSurfboard._id + '</li>');
                const addButton = $('<button type="button">Add to Cart</button>');
                addButton.click(function() {
                    addToCart(newSurfboard._id);  // Call the addToCart function with the surfboard ID
                });
                listItem.append(addButton);
                $('#surfboards-list').append(listItem);
                $('#create').trigger('reset');
            },
            error: (xhr, error) => {

                if (xhr.status) {

                    const jsonResponse = JSON.parse(xhr.responseText);
                    const { redirectUrl, message } = jsonResponse;
                    alert(message);
                    window.location.href = redirectUrl;
                }
                else
                    console.log('Error:', error);
            }
        });
    });

    // delete surfboard
    $('#delete').submit(function(e){

        e.preventDefault();
        $.ajax({
            type: "DELETE",
            url:"/store/deleteSurfboard",
            data: $('#delete').serialize(),
            success: function() {

                $('li:contains("'+$('#surfboardId').val()+'")').remove();
                $('#delete').trigger('reset');
            },
            error: (xhr, error) => {

                if (xhr.status) {

                    const jsonResponse = JSON.parse(xhr.responseText);
                    const { redirectUrl, message } = jsonResponse;
                    alert(message);
                    window.location.href = redirectUrl;
                }
                else
                    console.log('Error:', error);
            }
        });
    });

    // fetch surfboard for update
    $('#fetch').submit(function(e) {

        e.preventDefault();

        $.ajax({
            type: "post",
            url: '/store/getOneSurfboard',
            data: $('#fetch').serialize(),
            success: function (response) {

                const { surfboard } = response;

                $('#_id').val(surfboard._id);
                $('#company').val(surfboard.company);
                $('#model').val(surfboard.model);
                $('#price').val(surfboard.price);
                $('#image').val(surfboard.image);
                $('#color').val(surfboard.color);
                $('#type').val(surfboard.type);
                $('#tail').val(surfboard.tail);
                $('#height').val(surfboard.height);
                $('#width').val(surfboard.width);
                $('#thick').val(surfboard.thick);
                $('#volume').val(surfboard.volume);

                $('#fetch').trigger('reset');
            },
            error: (xhr, error) => {

                if (xhr.status) {

                    const jsonResponse = JSON.parse(xhr.responseText);
                    const { redirectUrl, message } = jsonResponse;
                    alert(message);
                    window.location.href = redirectUrl;
                }
                else
                    console.log('Error:', error);
            }
        });
    });
    $('#update').submit(function(e) {

        e.preventDefault();
        $.ajax({
            type: "put",
            url: '/store/updateSurfboard',
            data: $('#update').serialize(),
            success: function (response) {

                const { updatedSurfboard } = response;

                $('li').filter(function() {
                    return $(this).text().includes(updatedSurfboard._id);
                }).text(updatedSurfboard.company + ', ' + updatedSurfboard.model + ', ' + updatedSurfboard._id);
                $('#update').trigger('reset');
            },
            error: (xhr, error) => {

                if (xhr.status) {

                    const jsonResponse = JSON.parse(xhr.responseText);
                    const { redirectUrl, message } = jsonResponse;
                    alert(message);
                    window.location.href = redirectUrl;
                }
                else
                    console.log('Error:', error);
            }
        });
    });

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


    // get cart items
    $.ajax({

        url: "/cart/getItems",
        method: 'get',
        success: () => {

            getItems();
        },
        error: (error) => {
            console.log('Error:', error);
        }
    });


    $('#complete-order').submit(function(e) {

        e.preventDefault();
        $.ajax({
            type: "post",
            url: '/order/completeOrder',
            success: function (response) {

                getItems();

                const { order } = response;
                $('#last-order').empty();  // Clear the existing list
                order.products.forEach((product) => {

                    const listItem = $('<li>' + product.productId.company + ', ' + product.productId.model +
                        ', ' + product.productId.price + '$, amount:' + product.quantity + '</li>');
                    $('#last-order').append(listItem);
                });
            },
            error: (error) => {

                alert('Error:' + error);
            }
        });
    });

    // order history of a user
    $('#history').submit(function(e) {

        e.preventDefault();
        $.ajax({
            type: "post",
            url: '/order/history',
            success: function (response) {

                const { orders } = response;
                $('#order-history').empty();  // Clear the existing list

                let i = 1;
                orders.forEach((order) => {

                    $('#order-history').append('<h4>Order: ' + i + ' ' + 'Username: ' + order.username + '</h4>');

                    order.products.forEach((product) => {

                        const listItem = $('<li>' + product.productId.company + ', ' + product.productId.model +
                            ', ' + product.productId.price + '$, amount:' + product.quantity + '</li>');
                        $('#order-history').append(listItem);
                    });
                    i++;
                });
            },
            error: (error) => {
                console.log('Error:', error);
            }
        });
    });
    // all the history for an admin
    $('#allHistory').submit(function(e) {

        e.preventDefault();
        $.ajax({
            type: "post",
            url: '/order/allHistory',
            success: function (response) {

                const { orders } = response;
                $('#all-orders-history').empty();  // Clear the existing list

                let i = 1;
                orders.forEach((order) => {

                    $('#all-orders-history').append('<h4>Order: ' + i + ' ' + 'Username: ' + order.username + '</h4>');

                    order.products.forEach((product) => {

                        const listItem = $('<li>' + product.productId.company + ', ' + product.productId.model +
                            ', ' + product.productId.price + '$, amount:' + product.quantity + '</li>');
                        $('#all-orders-history').append(listItem);
                    });
                    i++;
                });
            },
            error: (error) => {
                console.log('Error:', error);
            }
        });
    });

});