
var firebaseConfig = {
    apiKey: "AIzaSyDJ0__ksJsXa65LhM4Yl3R7JDrdJi70pXg",
    authDomain: "yelpfusioncor.firebaseapp.com",
    projectId: "yelpfusioncor",
    storageBucket: "yelpfusioncor.appspot.com",
    messagingSenderId: "540645913580",
    appId: "1:540645913580:web:88e4b5e773dc33a8c706c9",
    measurementId: "G-6GBGFTSRHT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
showSelectedItem();
document.getElementById("buttonAddFavorites").onclick = addToFavorites;
var property
function showSelectedItem()
{
    property = JSON.parse(localStorage.getItem("property"));
    document.getElementById("title").innerHTML = "Title:  "+property.title;
    document.getElementById("location").innerHTML = "Location:  "+property.location;
    document.getElementById("gps-location").innerHTML = "GPS-Location:  "+property.gpsLocation;
}
function showLoading() {
  var x = document.getElementById("loading");
  x.style.display = "block";
}
function hideLoading() {
  var x = document.getElementById("loading");
  x.style.display = "none";
}
function addToFavorites(){
  showLoading();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          firebase.database().ref('users/' + user.uid + '/Favorites').push().set({
            title: property.title,
            location: property.location,
            gpsLocation: property.gpsLocation
            }).then(() => {
                hideLoading();
                window.history.back();
            }).catch((error) => {
                hideLoading();
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.message);
            });
        } else {
          // No user is signed in.
          hideLoading();
        }
      });
}