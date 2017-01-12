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
      q: search,
      limit: 10
    }

  }).done(function(returnData) {
    console.log(thisButton);
    var giphyData = returnData.data;

    for (var i = 0; i < giphyData.length; i++){
      //console.log(giphyData[i]);

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