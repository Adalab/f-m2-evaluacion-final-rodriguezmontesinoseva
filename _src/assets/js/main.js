'use strict';

const inpSearchEl = document.querySelector('#inpSearch');
const btnSearchEl = document.querySelector('.btnSearch');
const listUlEl = document.querySelector('.listUl');

const listUlFavEl= document.querySelector('.listUlFav');
let arrFav = localStorage.getItem('arrFav') ? JSON.parse( localStorage.getItem('arrFav')) : [];

btnSearchEl.addEventListener('click', handleSearch);
drawFav();

//hace busqueda al servidor y pinta nombre e imagen de series que coinciden con la búsqueda
function handleSearch(){
  const arrResult =[];
  fetch(`http://api.tvmaze.com/search/shows?q=${inpSearchEl.value}`)
    .then(response => response.json())
    .then(data => {
      let ulContent = '';

      for (let i=0; i<data.length; i++){
        const nameS = data[i].show.name;
        let imageS;
        if (data[i].show.image === null){
          imageS = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

        }else{

          imageS = data[i].show.image.medium;
        }
        arrResult.push({name: nameS, image: imageS,});

        const listContent = `<li>${nameS}<img src="${imageS}" /> </li>`;

        ulContent += listContent;
        listUlEl.innerHTML = ulContent;
      }

      const liEl = document.querySelectorAll('.listUl li');
      liEl.forEach(element => element.addEventListener('click', changeBgc));
    });
}

function changeBgc(event){
  const nameF = event.currentTarget.textContent;
  const imageF = event.currentTarget.querySelector('img').src;
  listUlFavEl.innerHTML = '';

  event.currentTarget.classList.toggle('inv-colors');
  //si lo selecciono como favorito, comprobamos si existe en arr Favoritos
  if(event.currentTarget.classList.contains('inv-colors')) {
    if (arrFav.length > 0) {
      //si el objeto que devuelve find es === undefined es que no encuentra nada. => si el elemento clicado no existe en arrayFav pushea
      if(arrFav.find(element => element.name === nameF && element.image === imageF) === undefined){
        arrFav.push({name: nameF, image: imageF});
      }
    } else {
      arrFav.push({name: nameF, image: imageF});
    }
  } else { //si no contiene inv-colors. crea nuevo array sin el elemento clicado
    arrFav = arrFav.filter(element => element.name !== nameF && element.image !== imageF);
  }

  drawFav();
  localStorage.setItem('arrFav', JSON.stringify(arrFav) );
}

function drawFav() {
  const subtitleEl = document.querySelector('.subtitle');
  listUlFavEl.innerHTML = '';

  // lee el array Fav y lo pinta en el ul
  if(arrFav.length > 0) {
    for(let i=0; i<arrFav.length;i++){
      const listContentFav = `<li>${arrFav[i].name}<img src="${arrFav[i].image}" /><a class="delete" href="#">borrar x</a></li>`;
      listUlFavEl.innerHTML = listUlFavEl.innerHTML + listContentFav;
    }
    document.querySelectorAll('.delete').forEach(element =>
      element.addEventListener('click', deleteFav)
    );
    subtitleEl.innerHTML = 'Mis series favoritas';
  } else {
    subtitleEl.innerHTML = '';
  }
}

function deleteFav(event) {
  const nameF = event.target.parentElement.textContent;
  const imageF = event.target.parentElement.querySelector('img').src;

//carga en arrFav todo lo que no se haya clicado
  arrFav = arrFav.filter(element => element.name !== nameF && element.image !== imageF);

  drawFav();
  localStorage.setItem('arrFav', JSON.stringify(arrFav) );
}