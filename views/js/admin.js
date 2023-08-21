$(document).ready(function () {
    getSurfboards();

    function getSurfboards() {
        $.ajax({
            url: "/store/surfboards",
            method: "get",
            success: (response) => {

                const { surfboards } = response;
                const surfboardList = $('#surfboards-list');
                // Function to create and append surfboard list items to the surfboards list
                const createSurfboardListItem = (surfboard) => {
                    const listItem = $(
                        '<br>' +
                        '<div style="text-align: center; font-family: Montserrat, sans-serif;">' +
                        '<h1 style="font-size: 15px; margin-top: 10px;">' + surfboard.company + " / " + surfboard.model + '</h1>' +
                        `<button class="btn btn-primary" type="button" disabled style="background:url('../img/surfboards/${surfboard.image}') center / cover no-repeat; height: 200px; width: 150px; border-color: rgba(0, 0, 0, 0);"></button>` +
                        '<p style="font-size: 15px; font-family: Montserrat, sans-serif; margin-top: 10px;">Price: <i class="fa fa-dollar"></i>&nbsp;' + surfboard.price + '&nbsp;</p>' +
                        '<p style="font-size: 15px; font-family: Montserrat, sans-serif; margin-top: 10px;">Type: ' + surfboard.type + '</p>' +
                        '<p style="font-size: 15px; font-family: Montserrat, sans-serif; margin-top: 10px;">Tail: ' + surfboard.tail + '</p>' +
                        '<div class="row">' +
                        '<div class="col">' +
                        '<button class="btn btn-primary btn-update" type="button" data-bs-toggle="modal" data-bs-target="#updateModal" style="background: rgba(155, 158, 163, 0); color: rgb(0, 0, 0); transform: perspective(0px) skew(0deg); border-color: rgb(0, 0, 0); font-family: Montserrat, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0px 0px 20px 1px; margin-right: 5px">Update</button>' +
                        '<button class="btn btn-primary btn-delete" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" style="background: rgba(155, 158, 163, 0); color: rgb(0, 0, 0); transform: perspective(0px) skew(0deg); border-color: rgb(0, 0, 0); font-family: Montserrat, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0px 0px 20px 1px; margin-left: 5px">Delete</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<br>'
                    );
                    // Add click event to the update and delete buttons
                    listItem.find('.btn-update').click(() => {
                        updateButton(surfboard._id, surfboard.company, surfboard.model, surfboard.price, surfboard.image, surfboard.type, surfboard.tail);
                    });
                    listItem.find('.btn-delete').click(() => {
                        deleteButton(surfboard._id);
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
                    surfboardList.append(rowContainer);
                }
            },
            error: (error) => {
                console.log('Error:', error);
            }
        });
    }

    function deleteButton(surfboardId) {
        $('#modalDeleteButton').click((event) => {
            event.preventDefault();
            $.ajax({
                url:"/store/deleteSurfboard",
                method: "delete",
                data: { surfboardId },
                success: () => {
                    $('#surfboards-list').empty();
                    getSurfboards();
                    $('#delete-modal-close').click();
                },
                error: (error) => {
                    console.log('Error:', error);
                }
            });
        });
    }

    function updateButton(id, company, model, price, image, type, tail) {
        // Populate the form fields with the surfboard data
        try {
            $('#_id').val(id);
            $('#company').val(company);
            $('#model').val(model);
            $('#price').val(price);
            $('#image').val(image);
            $('#type').val(type);
            $('#tail').val(tail);
        } catch (error) {
            console.error('Error while updating the surfboard information:', error);
        }
    }


    function getGraphs() {

        d3.select("#chart").selectAll("*").remove();
        d3.select("#surfboards-chart").selectAll("*").remove();

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
    }
    function getUsers() {
        $.ajax({
            url: '/auth/allUsers',
            success: (response) => {
                const { users } = response;
                const usersList = $('#users-list');

                // Clear the existing users from the list
                usersList.empty();

                users.forEach((user) => {
                    const username = user.username;
                    const userItem = $(
                        '<div>' +
                        '<button class="userButton" data-username="'+ username +'">'+ username +'</button>' +
                        '</div>'
                    );
                    usersList.append(userItem);
                });
            }
        });
    }

// Use event delegation for user button clicks
    $('#users-list').on('click', '.userButton', function() {
        const username = $(this).data('username'); // Use data attribute to get the username
        $.ajax({
            method: "post",
            data: { username },
            url: "/order/history",
            success: (response) => {
                const { orders } = response;
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
    });


    $("#modalAddItemButton").click(() => {
        $.ajax({
            method: "post",
            data: $("#addItemForm").serialize(),
            url: "/store/createSurfboard",
            success: () => {
                alert("Item added successfully");
                $('#addItem-modal-close').click();
            },
            error: (error) => {
                console.log("Error:", error);
            },
        });
    });

    $('#modalUpdateButton').click((event) => {
        event.preventDefault();
        $.ajax({
            url: "/store/updateSurfboard",
            method: "put",
            data: $('#updateForm').serialize(),
            success: () => {
                $('#surfboards-list').empty();
                getSurfboards();
                $('#update-modal-close').click();
            },
            error: (error) => {
                console.log('Error:', error);
            }
        })
    });

    $("#surfboards").click(() => {
        // $("#statisticians-list").empty();
        $("#chart").hide();
        $("#surfboards-chart").hide();
        $("#users-list").empty();
        $('#order-history').empty();
        getSurfboards();

    });

    $("#statisticiansButton").click(() => {
        $("#chart").show();
        $("#surfboards-chart").show();
        $('#surfboards-list').empty();
        $('#users-list').empty();
        $('#order-history').empty();
        getGraphs();
    });

    $('#usersButton').click(() => {
        // $("#statisticians-list").empty();
        $("#chart").hide();
        $("#surfboards-chart").hide();
        $('#surfboards-list').empty();
        $('#order-history').empty();
        getUsers();

    });
});