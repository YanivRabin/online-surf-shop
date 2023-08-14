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

    function updateButton(id, company, model, price, image, type, tail) {
        // Populate the form fields with the surfboard data
        $('#_id').val(id);
        $('#company').val(company);
        $('#model').val(model);
        $('#price').val(price);
        $('#image').val(image);
        $('#type').val(type);
        $('#tail').val(tail);
    }
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
});