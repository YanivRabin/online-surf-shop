$(document).ready(function() {

    // get all the items for the first time
    getItemsByFilter();

    // check box changed functions for filter
    $("#Fish").change(function() { getItemsByFilter() });
    $("#Short").change(function() { getItemsByFilter() });
    $("#Hybrid").change(function() { getItemsByFilter() });
    $("#Step-Up").change(function() { getItemsByFilter() });
    $("#Christenson").change(function() { getItemsByFilter() });
    $("#Sharp-Eye").change(function() { getItemsByFilter() });
    $("#Al-Merrick").change(function() { getItemsByFilter() });
    $("#Squash").change(function() { getItemsByFilter() });
    $("#Round").change(function() { getItemsByFilter() });
    $("#Swallow").change(function() { getItemsByFilter() });

    function getItemsByFilter() {
        // Get all checked checkboxes
        let checkedCheckboxes = $('input[type="checkbox"]:checked');
        let type = [];
        let company = [];
        let tail = [];
        checkedCheckboxes.each(function () {
            if ($(this).attr('value') === 'type') {
                type.push($(this).attr('id'));
            }
            if ($(this).attr('value') === 'company') {
                company.push($(this).attr('id').replace(/-/g, ' '));
            }
            if ($(this).attr('value') === 'tail') {
                tail.push($(this).attr('id'));
            }
        });
        $.ajax({
            url: "/store/filterSurfboards",
            method: "get",
            data: { type, company, tail },
            success: (response) => {
                const { surfboards } = response;
                const surfboardList = $('#surfboards-list');
                // Clear the existing list
                surfboardList.empty();

                // Function to create and append surfboard list items to the surfboards list
                const createSurfboardListItem = (surfboard) => {
                    const listItem = $(
                        '<br >' +
                        '<div style="text-align: center; font-family: Montserrat, sans-serif; background-color: #ffffff;  opacity: 0.9;" >' +
                        '<h1 style="font-size: 15px; margin-top: 10px;">' + surfboard.company + " / " + surfboard.model + '</h1>' +
                        `<button class="item" type="button" disabled style="background:url('../img/surfboards/${surfboard.image}') center / cover no-repeat; height: 200px; width: 150px; border-color: rgba(0, 0, 0, 0);"></button>` +
                        '<p style="font-size: 15px; font-family: Montserrat, sans-serif; margin-top: 10px;">Price: <i class="fa fa-dollar"></i>&nbsp;' + surfboard.price + '&nbsp;</p>' +
                        '<p style="font-size: 15px; font-family: Montserrat, sans-serif; margin-top: 10px;">Type: ' + surfboard.type + '</p>' +
                        '<p style="font-size: 15px; font-family: Montserrat, sans-serif; margin-top: 10px;">Tail: ' + surfboard.tail + '</p>' +
                        '<div class="row" id="add-cart">' +
                        '<div class="col">' +
                        '<button class="btn btn-primary" type="button" style="background: rgba(155, 158, 163, 0); color: rgb(0, 0, 0); transform: perspective(0px) skew(0deg); border-color: rgb(0, 0, 0); font-family: Montserrat, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0px 0px 20px 1px;">Add to Cart</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<br>'
                    );
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
                    surfboardList.append(rowContainer);
                }
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
                const { message } = response;
                alert(message);
            },
            error: function(xhr, status, error) {
                alert("error")
                console.log("Error:", error);
            }
        });
    }

});