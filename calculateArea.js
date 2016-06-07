/**
 * Created by Damith Nuwan Sampath on 6/5/2016.
 */

function initMap() {

    var makerArry = [];

    var mapOptions = {
        center: {lat: 24.886, lng: -70.268},
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var createPolygon = function () {
        // Construct the polygon.
        /*  var polygonSample = new google.maps.Polygon({
         paths: makerArry,
         strokeColor: '#FF0000',
         strokeOpacity: 0.8,
         strokeWeight: 2,
         fillColor: '#FF0000',
         fillOpacity: 0.35
         });
         polygonSample.setMap(map);
         */

        var polygonPath = new google.maps.Polygon({
            path: makerArry,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map
        });
        var mapArea = google.maps.geometry.spherical.computeArea(polygonPath.getPath());
        console.log('Area ==>' + mapArea);

        document.getElementById("area_value").innerHTML = mapArea + ' m<sup>2</sup></div>';


    }
    //Attach click event handler to the map.
    google.maps.event.addListener(map, 'click', function (e) {

        //Determine the location where the user has clicked.
        var location = e.latLng;

        var lngLat = {
            lat: location.lat(),
            lng: location.lng()
        };
        makerArry.push(lngLat);

        console.log('location ==> ', location);
        console.log('makerArry ==> ', makerArry);


        //Create a marker and placed it on the map.
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });

        createPolygon();
        //Attach click event handler to the marker.
        google.maps.event.addListener(marker, "click", function (e) {
            var infoWindow = new google.maps.InfoWindow({
                content: 'Latitude: ' + location.lat() + '<br />Longitude: ' + location.lng()
            });
            infoWindow.open(map, marker);
        });

    });
}
