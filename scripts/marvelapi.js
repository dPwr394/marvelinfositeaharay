
const publicKey = 'f5d1f1ec4c6252ff9f5b054433d42ffa';
const privateKey = 'fdea44270f31ee1eefbc07764be728e08cd3b613';
const apiBaseURL = "https://gateway.marvel.com//v1/public";

// Creates a URL for searching Marvel API for comics with titles starting with a given search term
function createURL(slash) {
  // Get the current timestamp
  const ts = Date.now();

  // Create a new URLSearchParams object and set the necessary query parameters
  const params = new URLSearchParams({
    ts: ts,
    apikey: publicKey,
    hash: md5(ts + privateKey + publicKey), // Generate hash for authentication
  });
  // Construct the endpoint URL for searching comics with the query parameters
  const offset = `offset=${Math.round(Math.random() * 1563)}&`;
  const endpoint = `${apiBaseURL}`+slash+`?limit=1&` + offset; // Notice the question mark to start the query parameters.

  // Combine the endpoint URL with the query parameters to form the complete API request URL
  const url = endpoint + params;

// Return the complete API request URL
  return url;
}
const url = createURL();

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

function rngComic() {
  const url = createURL(`/comics`);
  const comic_title = document.getElementById("comic_title");
  const comic_poster = document.getElementById("comic_poster");
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // Handle the API response here
    console.log(data.data.results[0]);
    comic_title.innerHTML = data.data.results[0].title;
    comic_poster.src = data.data.results[0].thumbnail.path+"."+data.data.results[0].thumbnail.extension;
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
    console.log(data.data.results[0]);
    char_name.innerHTML = data.data.results[0].name;
    char_photo.src = data.data.results[0].thumbnail.path+"."+data.data.results[0].thumbnail.extension;
  })
  .catch(error => {
    // Handle any errors that occur during the API request
    console.error(error);
  })
}
