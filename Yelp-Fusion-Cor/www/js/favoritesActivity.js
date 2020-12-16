class Search {
    constructor(id,title, location, gpsLocation) {
      this.id = id;
      this.title = title;
      this.location = location;
      this.gpsLocation = gpsLocation;
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
showLoading();
showResults();
function showResults(){
    var properties = [];
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          firebase.database().ref('users/' + user.uid + '/Favorites').once('value').then((snapshot) => {
                snapshot.forEach(function(child) {
                    console.log(child.key+': '+child.val());
                    var title = child.val().title;
                    var location = child.val().location;
                    var gpsLocation = child.val().gpsLocation;
                    properties.push(new Search(child.key,title, location, gpsLocation));
                  });

                  displayList(properties)
                  hideLoading();
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.message);
                hideLoading();
            });
        } else {
          hideLoading();
          // No user is signed in.
        }
      });
}
function displayList(properties){
      // Get the unordered list and create li elements and assign properties to it like id, onclick, child
      var ul = document.getElementById("propertyList");
      for(i = 0; i < properties.length; i++){
         var div = document.createElement("div");
         var lable = document.createElement("lable");
         lable.innerHTML = properties[i].title;
         var button = document.createElement("button");
         button.textContent = "Delete"
         button.style.backgroundColor = "red";
         button.style.position = "absolute";
         button.style.left = "75%"
         button.onclick = (function(i) {
             return function() {
                 // To send the property object we stringify it using JSON 
                 // localStorage.setItem("property", JSON.stringify(properties[i]));
                 // window.location='itemSelectedActivity.html';
                 deleteFavorites(properties[i].id)
         };})(i);
         div.appendChild(lable);
         div.appendChild(button);
         div.appendChild
          var li = document.createElement("li");
          li.appendChild(div);    
          ul.appendChild(li);
      }
}
function showLoading() {
  var x = document.getElementById("loading");
  x.style.display = "block";
}
function hideLoading() {
  var x = document.getElementById("loading");
  x.style.display = "none";
}
function deleteFavorites(id){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          firebase.database().ref('users/' + user.uid + '/Favorites/'+id).remove().then(() => {
              location.reload();
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error.message);
        });
        } else {
          // No user is signed in.
        }
      });
}