document.querySelector('.search-box form').addEventListener('submit', getLyrics);

function getLyrics(e) {
    e.preventDefault();
    document.querySelector('.results').innerHTML = '';
    const searchTerm = document.querySelector('.search-box input').value;
    const geniusSearchURL = `https://lyrics-finder-backend.onrender.com/lyrics?search=${searchTerm}`;
    fetch(geniusSearchURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var songs = data.response.hits;
        songs.forEach(song => {
            var songURL = song.result.url;
            var songImg = song.result.song_art_image_thumbnail_url;
            var songName = song.result.title_with_featured;
            var songArtists = song.result.primary_artist.name;
            const card = 
            `<div class="card" onclick="window.open('${songURL}','mywindow');" style="cursor: pointer;">
                <div class="song-img"><img src="${songImg}" alt="song-image"></div>
                <div class="song-title">${songName}</div>
                <div class="song-artist">by ${songArtists}</div>
            </div>`
            const element = document.createElement('div');
            const results = document.querySelector('.results');
            element.innerHTML = card;
            results.appendChild(element);
            
        });
        var bg = songs[0].result.song_art_image_url;
        const searchQuery = document.querySelector('.search-query');
        searchQuery.innerHTML = "<i>You searched for: " + searchTerm + "</i>";
        //if the user's browser supports backdrop-filter then make the background the cover art of the top result and apply a 20px blur to it to enhance readability. if not then simply keep the background black
        if(CSS.supports("backdrop-filter:blur(10px)")){
            document.body.style.backgroundImage = `url(${bg})`;
            document.body.style.backdropFilter = "blur(20px)";
        } else {
            document.body.style.backgroundImage = "none";
            console.log("browser doesn't support backdrop-filter");
        }        
    })
    .catch(function(){});
    document.querySelector('.search-box form').reset();
};