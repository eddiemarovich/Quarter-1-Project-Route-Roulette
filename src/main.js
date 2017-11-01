var toDo = [];
var toDoName;
var toDoURL;
var routeName;
var routeURL;

function appendCurrentProject(){
  if (toDoName === null){
    $('.currentProjName').append('Route Name: ' + '')
  }
  else{
    $('.currentProjName').append('Route Name: ' + toDo[0])
  }
  if (toDoURL === null){
    $('.toDoURL').append('Mountain Project Link: ' + '')
  }
  else
  {
    $('.toDoURL').append('Mountain Project Link: ' + toDo[1])
  }
}
appendCurrentProject()

$(document).ready(function() {

// var toDo = [];
// var toDoName;
// var toDoURL;
// var routeName;
// var routeURL;

  $('form').submit(function() {

    event.preventDefault();

    var finalArr = [];
    var minDiff = $('#minDif').val();
    var maxDiff = $('#maxDif').val();
    var maxDist = $('#maxDist').val();
    var maxResults = 500;
    var apiLink = 'https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=';
    var linkAPI = apiLink + lat + '&lon=' + long + '&maxDistance=' + maxDist + '&minDiff=' + minDiff + '&maxDiff=' + maxDiff + '&maxResults=' + maxResults + '&key=107143844-3f7ee1e2a5799e05b02d6b0ec7eb6d66';
    var $xhr = $.getJSON(linkAPI);
    $xhr.done(function(data) {
      if ($xhr.status !== 200) {
        return;
      }

      var routeObj = {};
      for (var i = 0; i < data.routes.length; i++) {
        routeObj = {
          name: data.routes[i].name,
          type: data.routes[i].type,
          rating: data.routes[i].rating,
          location: data.routes[i].location,
          stars: data.routes[i].stars,
          link: data.routes[i].url
        }
        // console.log(routeObj['name'])
        // console.log(routeObj)
        finalArr.push(routeObj)
      }

      // console.log(finalArr);
      var routeResult = finalArr[Math.floor(finalArr.length * Math.random())];
      console.log(routeResult)
      $('#routeName').empty()
      $('#difficulty').empty()
      $('#location').empty()
      $('#type').empty()
      $('#quality').empty()
      $('#moreInfo').empty()

      $('#routeName').append("Route Name: " + routeResult.name);
      $('#difficulty').append("Difficulty: " + routeResult.rating);
      $('#location').append("Location: " + routeResult.location);
      $('#type').append("Type: " + routeResult.type);
      $('#quality').append("Qaulity: " + routeResult.stars + " stars");
      $('#moreInfo').append("More info.: " + routeResult.link.link(routeResult.link));
      routeName = routeResult.name
      routeURL = routeResult.link

    })
  })
  $("#toDo").on('click', function() {
    $('.currentProjName').empty();
    $('.toDoURL').empty();
    // $('.toDoList').empty();
    // $('.toDoURL').empty();
    localStorage.setItem('Route Name', routeName)
    localStorage.setItem('Mountain Proj. URL', routeURL)
    toDoName = localStorage.getItem('Route Name', routeName)
    toDoURL = localStorage.getItem('Mountain Proj. URL', routeURL)
    toDo.push(toDoName, toDoURL)
    $('.currentProjName').append('Route Name: ' + toDoName)
    $('.toDoURL').append('Mountain Project Link: ' + toDoURL)
    // if(toDo[0] === null){
    //   $('.currentProjName').append('Route Name: ' + '')
    //   }

  })

  toDoName = localStorage.getItem('Route Name', routeName)
  toDoURL = localStorage.getItem('Mountain Proj. URL', routeURL)
  toDo.push(toDoName, toDoURL)
  console.log(toDo);

  // function appendCurrentProject(){
  //   if (toDoName === null){
  //     $('.currentProjName').append('Route Name: ' + '')
  //   }
  //   else{
  //     $('.currentProjName').append('Route Name: ' + toDo[0])
  //   }
  //   if (toDoURL === null){
  //     $('.toDoURL').append('Mountain Project Link: ' + '')
  //   }
  //   else
  //   {
  //     $('.toDoURL').append('Mountain Project Link: ' + toDo[1])
  //   }
  // }
  appendCurrentProject()
});
// function appendCurrentProject(){
//   if (toDoName === null){
//     $('.currentProjName').append('Route Name: ' + '')
//   }
//   else{
//     $('.currentProjName').append('Route Name: ' + toDo[0])
//   }
//   if (toDoURL === null){
//     $('.toDoURL').append('Mountain Project Link: ' + '')
//   }
//   else
//   {
//     $('.toDoURL').append('Mountain Project Link: ' + toDo[1])
//   }
// }
// appendCurrentProject()

var marker;
var lat = ''
var long = ''
function initMap() {
  var myLocation = {
    lat: 40.016,
    lng: -105.281
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLocation
  });
  var marker = new google.maps.Marker({
    position: myLocation,
    map: map,
    draggable: true,
  });
  var geocoder = new google.maps.Geocoder();

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({
      'address': address,
      // 'location': LatLng
    }, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
          marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
          zoom: 15,
          location: location
        });
        console.log(marker.position.lat())
        console.log(marker.position.lng());
        lat = marker.position.lat()
        long = marker.position.lng()
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  console.log(geocoder)
  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}


// module.exports = {
//
// }
