
const publicKey = 'f5d1f1ec4c6252ff9f5b054433d42ffa';
const privateKey = 'fdea44270f31ee1eefbc07764be728e08cd3b613';
const apiBaseURL = "https://gateway.marvel.com//v1/public";
//FUCK I DID THE SAME MISTAKE TWICE               D O     N O T        D E L E T E      T H E       S     F R O M      T H E    H T T P S      **********EVER**************
// Creates a URL for searching Marvel API for comics with titles starting with a given search term
function createURL(slash) {

  if(slash==null){slash=`/`;}

  // Get the current timestamp
  const ts = Date.now();

  // Create a new URLSearchParams object and set the necessary query parameters
  const params = new URLSearchParams({
    ts: ts,
    apikey: publicKey,
    hash: md5(ts + privateKey + publicKey), // Generate hash for authentication
  });
  // Construct the endpoint URL for searching comics with the query parameters
  //const offset = `offset=${Math.round(Math.random() * 1563)}&`; //(obsolete)
  const endpoint = `${apiBaseURL}`+slash+`?limit=1&` + randomUrlOffset(slash) // Notice the question mark to start the query parameters.
  // Combine the endpoint URL with the query parameters to form the complete API request URL
  const url = endpoint + params;

// Return the complete API request URL
  return url;
  
}
const url = createURL();

function randomUrlOffset(slash){
  let max = 1500;
  if(slash == `/comics`){max = 59727 }
  else if(slash == `/characters`){max = 1563}

  const offset = `offset=${Math.round(Math.random() * max)}&`;

  return offset;
}

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     // Handle the API response here
//     console.log(data.data.results[0].title);
//   })
//   .catch(error => {
//     // Handle any errors that occur during the API request
//     console.error(error);
//   })

}
function rngComic() {
  const url = createURL(`/comics`);
  const comic_title = document.getElementById("comic_title");
  const comic_poster = document.getElementById("comic_poster");
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // Handle the API response here
    //console.log(data.data.results[0]);
    comic_title.innerHTML = data.data.results[0].title;
    comic_poster.src = data.data.results[0].thumbnail.path+"."+data.data.results[0].thumbnail.extension;
    currentComic = data.data.results[0].id;
    document.getElementById("link_comic_info").setAttribute("href", `https://dpwr394.github.io/marvelinfositeaharay/pages/info_comic.html?id=`+currentComic);
  })
  .catch(error => {
    // Handle any errors that occur during the API request
    console.error(error);
  })
}

function rngChar() {
  const url = createURL(`/characters`);
  const char_name = document.getElementById("char_name");
  const char_photo = document.getElementById("char_photo");
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // Handle the API response here
    //console.log(data.data.results[0]);
    char_name.innerHTML = data.data.results[0].name;
    char_photo.src = data.data.results[0].thumbnail.path+"."+data.data.results[0].thumbnail.extension;
    console.log(data.data.results[0].id);
    currentChar = data.data.results[0].id;
    document.getElementById("link_char_info").setAttribute("href", `https://dpwr394.github.io/marvelinfositeaharay/pages/info_char.html?id=`+currentChar);
  })
  .catch(error => {
    // Handle any errors that occur during the API request
    console.error(error);
  })
}
function infoChar(){
  //console.log("/pages/info_char.html?id="+currentChar);
  const idParam = new URLSearchParams(window.location.search);
  console.log(idParam.has('id')); 
  console.log(idParam.get('id'));
  // Get the current timestamp
  const ts = Date.now();

  // Create a new URLSearchParams object and set the necessary query parameters
  const params = new URLSearchParams({
    ts: ts,
    apikey: publicKey,
    hash: md5(ts + privateKey + publicKey), // Generate hash for authentication
  });
  // Construct the endpoint URL for searching comics with the query parameters
  //const offset = `offset=${Math.round(Math.random() * 1563)}&`; //(obsolete)
  const endpoint = `${apiBaseURL}`+`/characters/`+idParam.get('id')+`?`; // Notice the question mark to start the query parameters.
  // Combine the endpoint URL with the query parameters to form the complete API request URL
  const url = endpoint + params;
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    const char_name = document.getElementById("char_name");   
    const char_photo = document.getElementById("char_photo");
    const description = document.getElementById("char_desc");
    char_name.innerHTML = data.data.results[0].name;
    char_photo.src = data.data.results[0].thumbnail.path+"."+data.data.results[0].thumbnail.extension;
    if( data.data.results[0].description!=""){
      description.innerHTML = data.data.results[0].description;
    }
    else{
      description.innerHTML = "Sorry... No information available."
    }
  })
  .catch(error => {
    // Handle any errors that occur during the API request
    console.error(error);
  })


  //document.getElementById("link_char_info").href="https://dpwr394.github.io/marvelinfositeaharay/pages/info_char.html"+"?id="+currentChar;
}

function infoComic(){
  //console.log("/pages/info_char.html?id="+currentChar);
  const idParam = new URLSearchParams(window.location.search);
  console.log(idParam.has('id')); 
  console.log(idParam.get('id'));
  // Get the current timestamp
  const ts = Date.now();

  // Create a new URLSearchParams object and set the necessary query parameters
  const params = new URLSearchParams({
    ts: ts,
    apikey: publicKey,
    hash: md5(ts + privateKey + publicKey), // Generate hash for authentication
  });
  // Construct the endpoint URL for searching comics with the query parameters
  //const offset = `offset=${Math.round(Math.random() * 1563)}&`; //(obsolete)
  const endpoint = `${apiBaseURL}`+`/comics/`+idParam.get('id')+`?`; // Notice the question mark to start the query parameters.
  // Combine the endpoint URL with the query parameters to form the complete API request URL
  const url = endpoint + params;
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    const comic_title = document.getElementById("comic_title");
    const description = document.getElementById("comic_desc");
    const comic_poster = document.getElementById("comic_poster");
    comic_title.innerHTML = data.data.results[0].title;
    comic_poster.src = data.data.results[0].thumbnail.path+"."+data.data.results[0].thumbnail.extension;
    if( data.data.results[0].description!=null){
      description.innerHTML = data.data.results[0].description;
    }
    else{
      description.innerHTML = "Sorry... No information available."
    }
  })
  .catch(error => {
    // Handle any errors that occur during the API request
    console.error(error);
  })


  //document.getElementById("link_char_info").href="https://dpwr394.github.io/marvelinfositeaharay/pages/info_char.html"+"?id="+currentChar;
}

function search(){
  var input = document.getElementById("searchbar").value;

  // Get the current timestamp
  const ts = Date.now();

  // Create a new URLSearchParams object and set the necessary query parameters
  const params = new URLSearchParams({
    ts: ts,
    apikey: publicKey,
    hash: md5(ts + privateKey + publicKey), // Generate hash for authentication
  });
  // Construct the endpoint URL for searching comics with the query parameters
  //const offset = `offset=${Math.round(Math.random() * 1563)}&`; //(obsolete)
  const endpoint = `${apiBaseURL}`+`/characters?nameStartsWith=`+input; // Notice the question mark to start the query parameters.
  // Combine the endpoint URL with the query parameters to form the complete API request URL
  const url = endpoint + params;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(url);
    console.log(data.data);
    console.log(data.data.results[0].description)
  })
  .catch(error => {
    // Handle any errors that occur during the API request
    console.error(error);
  })

}
