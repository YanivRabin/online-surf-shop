$(document).ready(() => {

    $('#signIn').click((event) => {
        event.preventDefault();
        $.ajax({
            url: '/auth/register',
            method: 'POST',
            data: $('#login').serialize(),
            success: (response) => {
                // Registration successful
                alert('Registration successful!');
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
        $.ajax({
            url: '/auth/login',
            method: 'POST',
            data: $('#login').serialize(),
            success: (response) => {

                const { username } = response;
                sessionStorage.setItem('username', username);

                alert('Welcome '+username +'!!');
                $('#loginLink').text('Logout');
                $('#loginLink').off('click');
                $('#loginLink').click((event) => {
                    event.preventDefault();
                    $.ajax({
                        url: '/auth/logout',
                        method: 'POST',
                        success: () => {
                            alert('Logout successful!');
                            window.location.href = '/';
                        },
                        error: (xhr) => {
                            const { message } = xhr.responseJSON;
                            alert('Logout Error: ' + message);
                        }
                    });
                });
                window.location.href = '/';
            },
            error: (xhr) => {
                const { message } = xhr.responseJSON;
                alert('Login Error: ' + message);
            }
        });
    });

});
