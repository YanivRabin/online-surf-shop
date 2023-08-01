$(document).ready(function() {

    $.ajax({
        url: '/weather',
        method: 'get',
        success: (response) => {
            const { forecast } = response;
            const weather = $("#weather");
            for (let i = 0; i < 3; i++) {
                const listItem = $(
                    '<div class="col" data-aos="fade-up" data-aos-delay="500" style="text-align: center;">' +
                        '<h1 id="weather-date" style="text-align: center;color: rgb(255,255,255);font-family: Montserrat, sans-serif;font-size: 20px;">'+forecast.forecast.forecastday[i].date+'</h1>' +
                        '<br>' +
                        '<h1 id="weather-min" style="text-align: center;color: rgb(255,255,255);font-family: Montserrat, sans-serif;font-size: 20px;">Min Temp: '+forecast.forecast.forecastday[i].day.mintemp_c+'</h1>' +
                        '<h1 id="weather-max" style="text-align: center;color: rgb(255,255,255);font-family: Montserrat, sans-serif;font-size: 20px;">Max Temp: '+forecast.forecast.forecastday[i].day.maxtemp_c+'</h1>' +
                        '<img id="weather-icon" src="'+forecast.forecast.forecastday[i].day.condition.icon+'" alt="weather icon" width="150px" height="150px">' +
                    '</div>'
                );
                weather.append(listItem);
            }
        },
        error: (error) => {
            console.log('Error:', error);
        }
    });
});