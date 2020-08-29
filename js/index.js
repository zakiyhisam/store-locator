var map;
var markers=[];
var infoWindow;

function initMap() {
    var home = {
        lat: 1.4862507,
        lng: 103.8644368
    }
  map = new google.maps.Map(document.getElementById('map'), {
    center: home,
    zoom: 10,
    styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b9d3c2"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
            }
          ]
        }
      ]
      
  });
  infoWindow = new google.maps.InfoWindow();
  searchStores()
}
function searchStores() {
  var foundStores =[];
  var zipCode =document.getElementById('zip-code-input').value;
  if(zipCode){
    console.log(zipCode);
    stores.forEach(function(store){
      var postal = store.address.postalCode.substring(0,5);
      if(postal == zipCode){
        foundStores.push(store);
      }
    });
  } else{
    foundStores= stores;
  }
  clearLocations();
  displayStores(foundStores);
  showStoresMarkers(foundStores);
  setOnClickListener();
}
function getDirection(index) {
  var directionLat= stores[index].coordinates.latitude;
  var directionLng= stores[index].coordinates.longitude;
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${directionLat},${directionLng}`);

}

function clearLocations() {
  infoWindow.close();
         for (var i = 0; i < markers.length; i++) {
           markers[i].setMap(null);
         }
         markers.length = 0;
}

function setOnClickListener(){
  var storeElements= document.querySelectorAll('.store-container');
  storeElements.forEach(function(elem,index){
    elem.addEventListener('click',function(){
      google.maps.event.trigger(markers[index], 'click');
    })
  });
}

function displayStores(stores) {
    var storesHtml = "";
    stores.forEach(function(store, index){
        var name = store.name;
        var address = store.address;
        var phone = store.phoneNumber;
        storesHtml +=`
        <div class="store-container">
                    <div class="store-number-container">
                        <div class="store-number">${index+1}</div>
                        
                    </div>
                
                    <div class="store-info-container">
                        <div class="store-address">
                            <span>${name}</span>
                            <span>${address.streetAddressLine1.substring(0,20)}..</span>
                            
                        </div>
                        
                        <div class="store-phone-number">
                            ${phone}
                        </div>
                        
                    </div>   
                    <i class="fas fa-map-marker-alt icon fa-2x"></i>                 
                </div>
                `;
    });
    document.querySelector('.store-list').innerHTML=storesHtml;
}
function showStoresMarkers (stores){
    var bounds = new google.maps.LatLngBounds();
    stores.forEach(function(store,index){
        var latlng = new google.maps.LatLng(
            store.coordinates.latitude,
            store.coordinates.longitude);
        var name = store.name;
        var address = store.address;
        var statusTextOpen = store.openStatusText.open_from_1;
        var statusTextClosed = store.openStatusText.open_to_1;
        var phone = store.phoneNumber;
        bounds.extend(latlng);
        createMarker(latlng, name, address, statusTextOpen, statusTextClosed, phone, index);
    })
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address, statusTextOpen, statusTextClosed, phone, index) {
    var html = `
          <div class="store-info-window">
              <div class="store-info-name">
                ${name}
              </div>
              <div class="store-info-status">
                open from ${statusTextOpen} to ${statusTextClosed}
              </div>
              <div class="store-info-address">
                <div class="circle">
                <i class="fas fa-thumbtack" onclick="getDirection(${index})"></i>
                </div>
                ${address.postalCode}
                ${address.streetAddressLine3}
              </div>
              <div class="store-info-phone">
              <div class="circle">
                <i class="fas fa-phone-square-alt"></i>
              </div>
              
                ${phone}
              </div>
          </div>
    `;
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      label: `${index+1}`
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
  }
 // <i class="fas fa-cheese"></i>