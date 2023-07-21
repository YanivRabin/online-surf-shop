$(document).ready(() => {

    $('#signUp').click((event) => {
        event.preventDefault();
        $.ajax({
            url: '/auth/register',
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

    $('#loginIcon').click((event) => {
        event.preventDefault();
        // Redirect the user to the login page
        window.location.href = 'login.html';
    });

    $('#login').submit((event) => {
        event.preventDefault();
        const username = $('#username').val();

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


});
