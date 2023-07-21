
    $(document).ready(() => {

    $('#register').submit((event) => {

        event.preventDefault(); // Prevent form submission
        $.ajax({

            url: '/auth/register',
            method: 'POST',
            data: $('#register').serialize(),
            success: () => {

                window.location.href = '/';
            },
            error: (xhr) => {

                const { message } = xhr.responseJSON;
                alert('Status: ' + xhr.status + '\nMessage: ' + message);
            }
        });
    });

    $('#login').submit((event) => {

    event.preventDefault(); // Prevent form submission
    $.ajax({

    url: '/auth/login',
    method: 'POST',
    data: $('#login').serialize(),
    success: () => {

    window.location.href = '/';
},
    error: (xhr) => {

    const { message } = xhr.responseJSON;
    alert('Status: ' + xhr.status + '\nMessage: ' + message);
}
});
});

    $('#logout').submit((event) => {

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
});