// search

var UI = {};
var soundcloudApi = {};
UI.SubmitClick =  function()
{
     document.querySelector(".js-submit").addEventListener("click", function(){

        var inputValue = document.querySelector("input-search").value;
        soundcloudApi.init();
        soundcloudApi.getTrack(inputValue);
        console.log(inputValue);
   
   });

};


UI.EnterPress = function()
{
    document.querySelector(".input-search").addEventListener('keyup', function(e)
    {
          
           if(e.which === 13)
           {
            var inputValue = document.querySelector("input-search").value;
            soundcloudApi.init();
            soundcloudApi.getTrack(inputValue);
            console.log(inputValue);
           }
    });
    
};

// query soundcloud



soundcloudApi.init = function(){
    SC.initialize({
        client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
}


// find all sounds of input licensed under 'creative commons share alike'
soundcloudApi.getTrack = function(inputValue)
{SC.get('/tracks',{
    q:inputValue,license:'cc-by-sa'
}).then(function(tracks)
{
    console.log(tracks);
    soundcloudApi.renderTracks(tracks);
});


}

soundcloudApi.renderTracks = function(tracks)
{
     tracks.forEach(function(track) {
        var card = document.createElement("div");
        card.classList.add('card');
            
        var imageDiv = document.createElement("div");
        imageDiv.classList.add("image");
            
        var image_img = document.createElement("img");
        image_img.classList.add( "image_ing");
        image_img.src = track.artwork_url || "http://lorempixel.com/400/200" ;
        imageDiv.appendChild(image_img);
            
          
       var content = document.createElement("div"); 
       content.classList.add('content');
            
        
        var header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = '<a href="'+ track.permalink_url + '" target="_blank">' + track.title + '</a>';
            
        //button
            
         var button = document.createElement("div"); 
         button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
            
         var icon = document.createElement('i');
         icon.classList.add('add', 'icon');
        
         var buttonText = document.createElement('span');
         buttonText.innerHTML = 'Add to playlist';
         
         content.appendChild(header);
         button.appendChild(icon);
         button.appendChild (buttonText);

         buttonText.addEventListener('click',function(){
             soundcloudApi.getEmbed(tracks.permalink_url);
         });

         card.appendChild (imageDiv); 
         card.appendChild(content); 
         card.appendChild(button);
    
         var searchResults =  document.querySelector('.js-search-results'); 
         searchResults.appendChild(card);
     });
        

}


soundcloudApi.getEmbed = function(trackURL){

SC.oEmbed(trackURL, {
  auto_play: true
}).then(function(embed){
  console.log('oEmbed response: ', embed);

  var sidebar = document.querySelector('.js-playlist');
  sidebar.innerHTML = embed.html;

  var box = document.createElement('div');
  box.innerHTML = embed.html;

  sidebar.insertBefore( box, sidebar.firstChild);
  localStorage.setItem("Key",sidebar.innerHTML);



});

}


var sidebar = document.querySelector('.js-playlist');
sidebar.innerHTML = localStorage.get('key');
