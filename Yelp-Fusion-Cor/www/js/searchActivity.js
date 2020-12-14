class Search {
    constructor(title, location, gpsLocation) {
      this.title = title;
      this.location = location;
      this.gpsLocation = gpsLocation;
    }
}

document.getElementById("buttonSearch").onclick = searchBusinessYelp;
document.getElementById("buttonFavourite").onclick = openFavourteActivity;
document.getElementById("searchLocation").value = "Boca Raton, FL";



function openFavourteActivity(){
    window.location='favouriteActivity.html';
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

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
  firebase.analytics();

  function searchBusinessYelp(){

    showLoading();
    var str_term = document.getElementById("search").value;
    var str_location = document.getElementById("searchLocation").value;

    var searchFunction = firebase.functions().httpsCallable('yelpSearch');
    //For the fullName we have defined that fullName takes some data as a parameter 
    searchFunction({
     term: str_term,
     location: str_location
      }).then((result)=> {

      var data = result.data;
      var jsonData = JSON.parse(data);
      var properties = [];
  
      for(i = 0; i < jsonData.length; i++){
        var item = jsonData[i];
        var title = item.name;
        var location = item.location.display_address;
        var gpsLocation = item.coordinates.longitude +" , "+ item.coordinates.latitude;
        properties.push(new Search(title, location, gpsLocation));
        console.log(properties[i]);
      }

      showResults(properties)
      hideLoading();
    }).catch((error)=> {
    console.log(error);   
    hideLoading();
 })
}

function showLoading() {
  var x = document.getElementById("loading");
  x.style.display = "block";
}

function hideLoading() {
  var x = document.getElementById("loading");
  x.style.display = "none";
}
  
function showResults(properties){

  var ul = document.getElementById("propertyList");
  removeAllChildNodes(ul);
  for(i = 0; i < 10; i++){

      var li = document.createElement("li");
      li.appendChild(document.createTextNode(properties[i].title));
      li.setAttribute("id", properties[i].id);

      // set onclick attribute on list item
      li.onclick = (function(i) {
          return function() {
              // To send the property object we stringify it using JSON 
              localStorage.setItem("property", JSON.stringify(properties[i]));
              window.location='itemSelectedActivity.html';

      };})(i);

 
      ul.appendChild(li);
  }

    

}


