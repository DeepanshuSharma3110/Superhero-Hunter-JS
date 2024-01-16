const favOptionsAvailable = document.getElementById("favOptionsAvailable");
const logo = document.getElementById('logo');
const empty =document.getElementById('empty');
empty.style.color='white';
empty.style.textAlign='center';



logo.addEventListener('click',()=>{
window.location=`index.html`;
});

function checkNull(){     
  if(localStorage.length<1){
    empty.innerText='No Fav Item Added';
    empty.style.display='block';
}else{
    empty.style.display='none';
}
}

document.addEventListener("DOMContentLoaded", () => {
  const items = { ...localStorage };
  const favValues = Object.keys(items).map((key) => JSON.parse(items[key]));
  //console.log(favValues);
  favValues.forEach((obj)=>{
    printFav(obj);
  });
  
  if(localStorage.length<1){
    empty.style.display='block';
    empty.innerText='No Fav Item Added';
}
});

function printFav(items) {
    console.log(items);
  const singleOption = document.createElement("div");
  singleOption.classList.add('singleOption');
  const image = document.createElement("img");
  image.classList.add('cardImage');
  const name = document.createElement("h4");
  name.innerText = items.name;
  image.src = `${items.thumbnail.path}.${items.thumbnail.extension}`;
    const button = document.createElement('button');
    button.innerText='Remove';
    button.addEventListener('click',()=>{
        singleOption.style.display='none';
        localStorage.removeItem(`${items.name}`);
        checkNull();
    });
    button.classList.add('button')


  favOptionsAvailable.appendChild(singleOption);
  singleOption.appendChild(image);
  singleOption.appendChild(name);
  singleOption.appendChild(button);
}
