// main.js
function startMap() {
  var ironhackMAD = {
  	lat: 40.449227,
  	lng: -3.681525};
  var map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 15,
      center: ironhackMAD
    }
  );
  var myMarker = new google.maps.Marker({
  position: {
  	lat: 40.449227,
  	lng: -3.681525
  },
  map: map,
  title: "I'm here"
});
// Try to get a geolocation object from the web browser
if (navigator.geolocation) {

  // Get current position
  // The permissions dialog will popup
  navigator.geolocation.getCurrentPosition(function (position) {
    // Create an object to match
    // google's Lat-Lng object format
    const center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    console.log(position);
    console.log('center: ', center);
    map.setCenter(center);
    var madMarker = new google.maps.Marker({
      position:center,
      map: map,
      title: "I'm here"
  });
    // User granted permission
    // Center the map in the position we got
  }, function () {
    // If something else goes wrong
    console.log('Error in the geolocation service.');
  });
} else {
  // Browser says: Nah! I do not support this.
  console.log('Browser does not support geolocation.');
}
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionRequest = {
  origin: { lat: 41.3977381, lng: 2.190471916},
  destination: 'Madrid, es',
  travelMode: 'DRIVING'
};

directionsService.route(
  directionRequest,
  function(response, status) {
    if (status === 'OK') {
      // everything is ok
      directionsDisplay.setDirections(response);

    } else {
      // something went wrong
      window.alert('Directions request failed due to ' + status);
    }
  }
);

directionsDisplay.setMap(map);
}
window.addEventListener("load",function(event){
  startMap();
});
