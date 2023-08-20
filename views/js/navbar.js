$(document).ready(() => {

    // Function to update the login icon and logged-in username in the UI
    function updateLoginIcon(username) {
        if (username) {
            // If a username is provided, show the logged-in username and hide the login icon
            $('#loggedInUsername').text('Hello, ' + username);
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
        // Call the function to update the UI with the stored username
        updateLoginIcon(storedUsername);
    }

    // $('#user-history').click(() => {
    //     window.location.href = `/order/${storedUsername}`;
    // });

    $('#switchToSignUp').click(() => {
        $('#login').css('display', 'none');
        $('#register-info').css('display', 'block');
    })

    $('#switchToLogin').click(() => {
        $('#login').css('display', 'block');
        $('#register-info').css('display', 'none');
    })

    // Handle Sign Up button click
    $('#register-info').submit((event) => {
        event.preventDefault();
        const username = $('#username').val();
        const password = $('#password1').val();
        const password2 = $('#password2').val();

        if (password !== password2) {
            alert('The passwords do not match.');
        }
        else {
            $.ajax({
                url: '/auth/register',
                method: 'POST',
                data: { username, password },
                success: () => {
                    sessionStorage.setItem('username', username);
                    updateLoginIcon(username);
                    window.location.href = '/';
                },
                error: (xhr) => {
                    const {message} = xhr.responseJSON;
                    alert('Registration Error: ' + message);
                }
            });
        }
    });

    // Handle Login form submission
    $('#login').submit((event) => {
        event.preventDefault();
        // If the input is valid, make an AJAX request to log in the user
        $.ajax({
            url: '/auth/login',
            method: 'POST',
            data: $('#login').serialize(),
            success: (response) => {
                const {username, isAdmin} = response;
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('isAdmin', isAdmin);
                // Display a welcome message
                // alert('Welcome ' + username + '!!');
                $('#loginIcon').html('<i class="fa fa-user-circle" style="transform: scale(1.15);color: rgb(85,121,171);"></i> ' + username);
                // Hide the login form (assuming it has an ID "loginForm")
                $('#loginForm').hide();
                // Redirect the user to the home page after successful login
                window.location.href = '/';
            },
            error: (xhr) => {
                const {message} = xhr.responseJSON;
                alert('Login Error: ' + message);
            }
        });
    });

    $('#logout').submit((event) => {
        event.preventDefault();
        // Make an AJAX request to log out the user
        $.ajax({
            url: '/auth/logout', // Replace with your server-side logout URL
            method: 'POST',
            success: () => {
                // alert('You have successfully logged out!');
                sessionStorage.removeItem('username'); // Clear the username from session storage
                sessionStorage.removeItem('isAdmin'); // Clear the isAdmin from session storage
                updateLoginIcon(null); // Update the UI to show the login icon
                close_Logout_Form();
                window.location.href = '/';
            },
            error: (xhr) => {
                const { message } = xhr.responseJSON;
                alert('Status: ' + xhr.status + '\nMessage: ' + message);
            }
        });
    });
});

// Functions to show and hide the login form
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function open_Logout_Form() {
    document.getElementById("LogOutForm").style.display = "block";
}

function close_Logout_Form() {
    document.getElementById("LogOutForm").style.display = "none";
}