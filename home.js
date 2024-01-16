const Ts = Date.now();
const publicKey = "94c4ba3ecf7833a711b07445fd9d6703";
const private = "3ef08796910e331a5cc4e3c4c86939dd176c0b0b";
let hash = CryptoJS.MD5(Ts + private + publicKey).toString();

const favouriteButton = document.getElementById('favouriteButton');

favouriteButton.addEventListener('click',()=>{
  window.location=`favourite.html`;
});

// Define singleOption globally
const singleOption = document.createElement("div");
singleOption.classList.add("singleOption");
const optionsAvailable = document.getElementById("optionsAvailable");
const searchBox = document.getElementById("searchBox");


// SEARCH BAR EVENT
searchBox.addEventListener("keydown", (event) => {
  if (event.keyCode == 13 && searchBox.value!=='') {
    const searchTerm = searchBox.value.toLowerCase();
    createList(searchTerm);
      optionsAvailable.innerHTML='';
      searchBox.value='';
  }
});




async function createList(query) {
  const url = `https://gateway.marvel.com/v1/public/characters?ts=${Ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${query}`
  const response = await fetch(url);
  let data = await response.json();
  data=data.data.results;
  data.forEach((obj)=>{
    createCard(obj);
  });
}

function createCard(url) {
  const singleOption = document.createElement("div");
  singleOption.classList.add("singleOption");
  singleOption.style.display='block';
  const cardImage = document.createElement("img");
  cardImage.classList.add("cardImage");
  cardImage.src = `${url.thumbnail.path}.${url.thumbnail.extension}`;
  const title = document.createElement("h3");
  title.innerText = url.name;
  const favButton = document.createElement("button");
  favButton.innerText = `Add To Fav`;
  favButton.classList.add("button");

  favButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission
    addtofav(url);
    favButton.style.display = 'none';
  });

  optionsAvailable.appendChild(singleOption);
 // form.appendChild(singleOption);
  singleOption.appendChild(cardImage);
  singleOption.appendChild(title);
  singleOption.appendChild(favButton);

  
  title.addEventListener("click", (event) => {
    event.preventDefault();
    passValue(url);
  });

  cardImage.addEventListener("click", (event) => {
    event.preventDefault();
    passValue(url);
  });

}

function passValue(superhero) {
  localStorage.setItem(`superhero`, JSON.stringify(superhero));
  //console.log(superhero.name);
  window.location = 'superhero.html';
}

function addtofav(obj){
  localStorage.setItem(obj.name,JSON.stringify(obj));
}