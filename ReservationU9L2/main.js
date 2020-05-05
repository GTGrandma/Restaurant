
 var database = firebase.database();
  // Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyCiO-TbQiBlXrmICZrzhJb8g40CXlD66G4",
    authDomain: "reservation-site-a87ef.firebaseapp.com",
    databaseURL: "https://reservation-site-a87ef.firebaseio.com",
    projectId: "reservation-site-a87ef",
    storageBucket: "reservation-site-a87ef.appspot.com",
    messagingSenderId: "281935439880",
    appId: "1:281935439880:web:c5e95858349c5949be89bd",
    measurementId: "G-BMWK8D7BG9"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.analytics();
//The system forced me to change firebaseConfig to "config" in the variable and the initialization
//creating empty object for user input
var reservationData = {};

// set the day when an option is clicked on
$('.reservation-day li').on('click', function() {
  reservationData.day = $(this).text();
});

// when submitted, the name data should be set
// and all data should be sent to your database
$('.reservation-form').on('submit', function(event) {
  event.preventDefault();

  reservationData.name = $('.reservation-name').val();


  // create a section for reservations data in your db
  var reservationsReference = database.ref('reservations');

  reservationsReference.push(reservationData);
});


// retrieve reservations data when page loads and when reservations are added
function getReservations() {

  // use reference to database to listen for changes in reservations data
  database.ref('reservations').on('value', function(results) {

    // Get all reservations stored in the results we received back from Firebase
    var allReservations = results.val();

    // remove all list reservations from DOM before appending list reservations
    $('.reservations').empty();

    // iterate (loop) through all reservations coming from database call
    for (var reservation in allReservations) {
    // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        reservationId: reservation
      };
      
  var source = $("#reservation-template").html();

  var template = Handlebars.compile(source);

  var reservationListItem = template(context);

  $('.reservations').append(reservationListItem);
      

    }

  });

}

// When page loads, get reservations
getReservations();
 






