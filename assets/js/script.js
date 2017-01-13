var startButtonData = ['cat','dog','bird','horse'];
var buttonData = JSON.parse(localStorage.getItem("buttonResults")) || startButtonData;
var buttonsDiv = document.getElementById("buttons");
var searchButton = document.getElementById("searchButton");
var searchBox = document.getElementById("search");
var clearButton = document.getElementById("clear");
var giphyData = JSON.parse(localStorage.getItem("giphyResults")) || [];

function createButtons(){

  for(var i = 0; i < buttonData.length; i++){
    var button = document.createElement('button');
    var text = document.createTextNode(buttonData[i]);
    button.appendChild(text);
    button.dataset.name = buttonData[i];
 
    button.addEventListener('click', function(){
      callGiphy(this.dataset.name);
    })
    
    buttonsDiv.appendChild(button);
  }

}

function callGiphy(search){
  search = search.replace(' ','+');
  $.ajax({
    url: 'http://api.giphy.com/v1/gifs/search?',
    data: {
      api_key: 'dc6zaTOxFJmzC',
      q: search,
      limit: 10
    }

  }).done(function(returnData) {
    giphyData = returnData.data;
    localStorage.setItem("giphyResults", JSON.stringify(giphyData));
    putOnPage();
  });
}

function putOnPage(){

    document.getElementById('gif-section').innerHTML = "";

    for (var i = 0; i < giphyData.length; i++){
      var stillUrl = giphyData[i].images.fixed_height_still.url;
      var animatedUrl = giphyData[i].images.fixed_height.url;

      var img = document.createElement('img');
      img.setAttribute('src', stillUrl);
      img.dataset.state = "still";
      img.dataset.still = stillUrl;
      img.dataset.animate = animatedUrl;

      document.getElementById('gif-section').appendChild(img);
    }

    var imgs = document.querySelectorAll('img');
    for(var j = 0; j < imgs.length; j++){
      imgs[j].addEventListener('click', function(){
        if(this.dataset.state === 'still'){
          this.setAttribute('src', this.dataset.animate);
          this.dataset.state = 'animated';
        } else {
          this.setAttribute('src', this.dataset.still);
          this.dataset.state = 'still';
        }
      })
    }

}

$( document ).ready(function(){

  createButtons();

  putOnPage();
  
  searchButton.addEventListener("click", function(){
    buttonData.push(searchBox.value);
    localStorage.setItem("buttonResults", JSON.stringify(buttonData));
    buttonsDiv.innerHTML = "";
    createButtons();
  })
  
  clearButton.addEventListener("click", function(){
    document.getElementById('gif-section').innerHTML = "";
    localStorage.clear();
  })
  
});