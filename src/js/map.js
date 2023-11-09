let map;
let infowindow;
let service // Define infowindow outside of functions

function initMap() {
map = new google.maps.Map(document.getElementById('map_canvas'), {
center: { lat: 1.3521, lng: 103.8198 },
zoom: 15,
});

// Initialize infowindow here
infowindow = new google.maps.InfoWindow();
service = new google.maps.places.PlacesService(map);
}

function fetchNearbyDispensaries(event) {
event.preventDefault();
let address = document.getElementById('location_search').value;
const geocoder = new google.maps.Geocoder();

geocoder.geocode({ address: address }, (results, status) => {
if (status === google.maps.GeocoderStatus.OK && results[0]) {
const userLocation = results[0].geometry.location;

// Now, the map variable is accessible here.
map.setCenter(userLocation);

service = new google.maps.places.PlacesService(map);

service.nearbySearch({
location: userLocation,
radius: 4000,
type: 'pharmacy',
}, (results, status) => {
if (status === google.maps.places.PlacesServiceStatus.OK) {
  displayNearbyDispensaries(results);
}
});
} else {
console.error('Geocode was not successful for the following reason: ' + status);
}
});
}

function displayNearbyDispensaries(dispensaries) {
dispensaries.forEach(dispensary => {
const marker = new google.maps.Marker({
map: map,
position: dispensary.geometry.location,
});

google.maps.event.addListener(marker, 'click', () => {
const request = {
placeId: dispensary.place_id,
placeName: dispensary.name,
fields: ['name', 'place_id', 'formatted_address'],
};

// Use service.getDetails here
service.getDetails(request, (place, status) => {
console.log('Place Details Status: ' + status);
console.log('Place ID: ' + place.place_id);
console.log('Place Name: ' + place.name);
if (
  status == google.maps.places.PlacesServiceStatus.OK 
) {
  const content = document.createElement('div');
  const nameElement = document.createElement('h2');

  nameElement.textContent = place.name;
  console.log(place.name)
  content.appendChild(nameElement);

  const placeIdElement = document.createElement('p');

  placeIdElement.textContent = place.place_id;
  content.appendChild(placeIdElement);

  const placeAddressElement = document.createElement('p');

  placeAddressElement.textContent = place.formatted_address;
  content.appendChild(placeAddressElement);
  console.log(content)

  infowindow.setContent(content);
  infowindow.open(map, marker);
}
});
});
});
}

window.initMap = initMap;



function handleMapError() {
console.error('Error loading Google Maps API.');
// Handle the error gracefully (e.g., show a message to the user).
}