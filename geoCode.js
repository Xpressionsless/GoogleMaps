

var choosedAddress = localStorage.getItem('address')
var latitude = ""
var logitude = ""
// Geocode api för hitta fakta om adressen
geocode()
function geocode() {
    var location = choosedAddress
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: location,
            key: 'AIzaSyAfVMALt4F9Vu4pxxs00KSDj4sx3tDzg5I'
        }
    })
        .then(function (response) {
            console.log(response);
            latitude = response.data.results[0].geometry.location.lat
            logitude = response.data.results[0].geometry.location.lng
            console.log('latidude value: ' + latitude + '\n' + 'longitude value: ' + logitude)

        })
        .catch(function (error) {
            console.log('Error found while getting Response: ' + error);

        })
}
// En ny google map javascript api key har jag använt för att visa location på kartan
var map, infoWindow;
function initMap() {
    var myLatLng = { lat: latitude, lng: logitude };
    var options = {
        center: myLatLng,
        zoom: 15
    }
    map = new google.maps.Map(document.getElementById('map'), options)
    infoWindow = new google.maps.InfoWindow;

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        //  title: 'Hello World!'
        draggable: true,
        animation: google.maps.Animation.DROP,
    })

    var infoWindow = new google.maps.InfoWindow({
        content: `<strong>Apartment address</strong>`,
    })

    marker = infoWindow.open(map, marker)
}