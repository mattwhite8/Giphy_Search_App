var arr = ['cat','dog','bird','horse'];
var buttonsDiv = document.getElementById("buttons");
var searchButton = document.getElementById("searchButton");
var searchBox = document.getElementById("search");
var clearButton = document.getElementById("clear");

function createButtons(){
  for(var i = 0; i < arr.length; i++){
    var button = document.createElement('button');
    var text = document.createTextNode(arr[i]);
    button.appendChild(text);
    button.dataset.name = arr[i];
 
    button.addEventListener('click', function(){
      //console.log(this.dataset.name);
      callGiphy(this.dataset.name, this);
    })
    
    buttonsDiv.appendChild(button);
  }
}

function callGiphy(search, thisButton){
  search = search.replace(' ','+');
  $.ajax({
    url: 'http://api.giphy.com/v1/gifs/search?',
    data: {
      api_key: 'dc6zaTOxFJmzC',
      q: search
    }

  }).done(function(returnData) {
    console.log(thisButton);
    console.log(returnData.data[0].images.downsized.url);
    for(i = 0; i < 10; i++){
      var img = document.createElement('img');
      img.setAttribute('src', returnData.data[i].images.downsized.url);
      document.getElementById('main').appendChild(img);
    }
  });
}

$( document ).ready(function(){
  createButtons();
  
  searchButton.addEventListener("click", function(){
    arr.push(searchBox.value);
    buttonsDiv.innerHTML = "";
    createButtons();
  })
  
  clearButton.addEventListener("click", function(){
    buttonsDiv.innerHTML = "";
  })
  
});