const list = document.getElementById("people-list");
const btnBack = document.getElementById("btnBack")
const btnTop = document.getElementById("top");
const btnDown = document.getElementById("down");
const btnClous = document.getElementById("btnClous");
const backFon = document.getElementById("backFon");
const fon = document.getElementById("fon");

let currentPage = 1;

// Вызываем список героев
function fetchCharacters() {
  list.replaceChildren()
  fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
  .then(response => response.json())
  .then(data => {
    const people = data.results;
    // const list = document.getElementById("people-list");
    for (const person of people) {
      const item = document.createElement("li");
      item.textContent = person.name;
      // console.log(people);
      item.addEventListener("click", () => showPersonDetails(person));
      item.addEventListener("click", toggleModal);      
      list.appendChild(item);
    }
  });
  btnTop.hidden = currentPage === 1;
  btnDown.hidden = currentPage === 9;
  
}
  
  fetchCharacters()

// информация про одного персонажа
function showPersonDetails(person) {
  // console.log(person);
  // ИМЯ
   let name = document.getElementById("name");
   name.innerHTML = person.name;
  // возраст
  let age = document.getElementById("age");
   age.innerHTML = person.birth_year;
  //Гендер
  let pol = document.getElementById("pol");
   pol.innerHTML = person.gender;

  // film ask
  let filmsList = document.getElementById("films");
  filmsList.replaceChildren();
  for (const film of person.films) {
  fetch(film)
    .then(response => response.json())
    .then(data => { 
    // let filmsList = document.getElementById("films");
    //   filmsList.replaceChildren();
      let oneFilm = document.createElement("li");
      oneFilm.textContent = data.title;
      // console.log(data.title)
      filmsList.appendChild(oneFilm);
    });
    }     
    
   //  запрос специальность
  // console.log(person.species[0]);
  if (person.species && person.species.length > 0)
    {fetch(person.species[0])
        .then(response => response.json())
        .then(data => { 
          let species = document.getElementById("species");
          species.innerHTML = data.name;
          console.log(data.name);
         
        });
  } else {species.innerHTML = "No species"}
  
   
  //запрос планеты
  fetch(person.homeworld)
    .then(response => response.json())
    .then(data => { 
      let planets = document.getElementById("planets");
      planets.innerHTML = data.name;
      // person.appendChild(homeworldLi);      
    });
}


btnTop.addEventListener("click", fooTop);

function fooTop(e) {
  currentPage--;
  fetchCharacters()
 }

btnDown.addEventListener("click", fooDown);

function fooDown(e) {
  currentPage++;
  fetchCharacters()
}

btnClous.addEventListener("click", toggleModal);  

function toggleModal() {
    backFon.classList.toggle('fix');
    fon.classList.toggle('is-hidden');
}