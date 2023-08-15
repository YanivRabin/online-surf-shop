$(document).ready( () => {
    let map;
    function initMap() {
        map = new google.maps.Map($('#map'), {
            center: {lat: 31.899922, lng: 35.006593}, // You can replace this with the coordinates of a central point
            zoom: 8
        });

        branches.forEach(branch => {
            let marker = new google.maps.Marker({
                position: {lat: branch.lat, lng: branch.lng},
                map: map,
            });

            let infoWindow = new google.maps.InfoWindow({
                content:
                    `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center">`+
                          `<h2>${branch.name}</h2>`+
                          `<img src="${branch.photoURL}" alt="${branch.name}" style="width: 400px; height: auto;" />`+
                          `<p>${branch.description}</p>`+
                        `</div> `
            });

            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
        });
    }
})
