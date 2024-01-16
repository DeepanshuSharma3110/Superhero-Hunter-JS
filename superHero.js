const logoImg = document.getElementById("logoImg");
logoImg.addEventListener("click", () => {
  localStorage.removeItem("superhero");
  window.location = "index.html";
});

const description = document.getElementById("description");
document.addEventListener("DOMContentLoaded", () => {
  const storedSuperhero = localStorage.getItem("superhero");

  if (storedSuperhero) {
    const superheroObject = JSON.parse(storedSuperhero);
    displaySuperhero(superheroObject);
  } else {
    console.log("No superhero information found in local storage.");
  }
});

function displaySuperhero(superhero) {
  console.log(superhero);
  const card = document.createElement("div");
  card.classList.add('card');
  const image = document.createElement("img");
  image.classList.add('image');
  image.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
  const name = document.createElement("h3");
  name.innerText = superhero.name;
  description.appendChild(card);
  card.appendChild(image);
  card.appendChild(name);

  superhero.series.items.forEach((obj) => {
    if (obj.name) {
      const moviedescription = document.createElement("p");
      moviedescription.innerText = obj.name;
      card.appendChild(moviedescription);
    }
  });

}
