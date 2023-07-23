$(document).ready(() => {
    function updateLoginIcon(username) {
        if (username) {
            // If a username is provided, show the logged-in username and hide the login icon
            $('#loggedInUsername').text(' ' + username);
            $('#loginIcon').hide();
            $('#loggedInUsername').show();
        } else {
            // If no username is provided, hide the logged-in username and show the login icon
            $('#loggedInUsername').hide();
            $('#loginIcon').show();
        }
    }


    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
        updateLoginIcon(storedUsername); // Call the function to update the UI with the stored username
    }


    $('#signUp').click((event) => {
        event.preventDefault();
        $.ajax({
            url: '/auth/register', // Replace with your server-side register URL
            method: 'POST',
            data: $('#login').serialize(),
            success: (response) => {
                // Registration successful
                alert('Registration successful! Welcome ');
                window.location.href = '/';
            },
            error: (xhr) => {
                const { message } = xhr.responseJSON;
                alert('Registration Error: ' + message);
            }
        });
    });



    $('#login').submit((event) => {
        event.preventDefault();
        const username = $('#username').val();
        console.log("user");
        $.ajax({
            url: '/auth/login',
            method: 'POST',
            data: $('#login').serialize(),
            success: (response) => {
                const { username } = response;
                sessionStorage.setItem('username', username);

                // Display a welcome message
                alert('Welcome ' + username + '!!');
                $('#loginIcon').html('<i class="fa fa-user-circle" style="transform: scale(1.15);color: rgb(85,121,171);"></i> ' + username);
                // Hide the login form (assuming it has an ID "loginForm")
                $('#loginForm').hide();


                // Add the logout click event handler
                $('#loginStatus').click((event) => {
                    event.preventDefault();
                    event.preventDefault(); // Prevent form submission
                    $.ajax({

                        url: '/auth/logout',
                        method: 'POST',
                        success: () => {

                            window.location.href = '/';
                        },
                        error: (xhr) => {

                            const { message } = xhr.responseJSON;
                            alert('Status: ' + xhr.status + '\nMessage: ' + message);
                        }
                    });
                });

                // Redirect the user to the home page after successful login
                window.location.href = '/';
            },

            error: (xhr) => {
                const { message } = xhr.responseJSON;
                alert('Login Error: ' + message);
            }
        });
    });


    // Handle logout when the logout link is clicked
    $('#logoutLink').click((event) => {
        event.preventDefault();
        logout();
    });


    function logout() {
        $.ajax({
            url: '/auth/logout', // Replace with your server-side logout URL
            method: 'POST',
            success: () => {
                sessionStorage.removeItem('username'); // Clear the username from session storage
                $('#loggedInUsername').hide(); // Hide the username
                $('#loginIcon i').show(); // Show the login icon
            },
            error: (xhr) => {
                const { message } = xhr.responseJSON;
                alert('Status: ' + xhr.status + '\nMessage: ' + message);
            }
        });
    }

});

function openForm() {
    document.getElementById("myForm").style.display = "block";
}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}