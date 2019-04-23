'use strict';

const inpSearchEl = document.querySelector('#inpSearch');
const btnSearchEl = document.querySelector('.btnSearch');
const listUlEl = document.querySelector('.listUl');

const listUlFavEl= document.querySelector('.listUlFav');
let arrFav = localStorage.getItem('arrFav') ? JSON.parse( localStorage.getItem('arrFav')) : [];
const btnDelFavEl=document.querySelector ('.btn-delfav');

btnSearchEl.addEventListener('click', handleSearch);
btnDelFavEl.addEventListener('click', handleDelete);

drawFav();

//search the server and paint name and image of series that match the search
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
      liEl.forEach(element => element.addEventListener('click', addFav));
    });
}

//to change the color of the favorite series. Adds favorites to the array if the element does not exist, or deletes favorites if the element is unchecked.
function addFav(event){
  const nameF = event.currentTarget.textContent;
  const imageF = event.currentTarget.querySelector('img').src;
  listUlFavEl.innerHTML = '';

  event.currentTarget.classList.toggle('inv-colors');
  //if selected as a favorite, check if it exists in Favorites arr
  if(event.currentTarget.classList.contains('inv-colors')) {
    if (arrFav.length > 0) {
      //if the object that returns find is === undefined it finds nothing => if the element clicked does not exist in arrayFav pushea
      if(arrFav.find(element => element.name === nameF && element.image === imageF) === undefined){
        arrFav.push({name: nameF, image: imageF});
      }
    } else {
      arrFav.push({name: nameF, image: imageF});
    }
  } else { //if it does not contain inv-colors. create new array without the element clicked
    arrFav = arrFav.filter(element => element.name !== nameF && element.image !== imageF);
  }

  drawFav();
  localStorage.setItem('arrFav', JSON.stringify(arrFav) );
}

//reads the array Fav and paints it in the ul
function drawFav() {
  const subtitleEl = document.querySelector('.subtitle');
  listUlFavEl.innerHTML = '';

  if(arrFav.length > 0) {
    for(let i=0; i<arrFav.length;i++){
      const listContentFav = `<li>${arrFav[i].name}<img src="${arrFav[i].image}" /><a class="delete" href="#">Borrar</a></li>`;
      listUlFavEl.innerHTML = listUlFavEl.innerHTML + listContentFav;
    }
    document.querySelectorAll('.delete').forEach(element =>
      element.addEventListener('click', deleteFav)
    );
    subtitleEl.innerHTML = 'Mis series favoritas';
    btnDelFavEl.classList.remove('hidden');
  } else {
    subtitleEl.innerHTML = '';
    btnDelFavEl.classList.add('hidden');
  }
}

//If click on delete removes series of array Fav
function deleteFav(event) {
  const nameF = event.target.parentElement.textContent;
  const imageF = event.target.parentElement.querySelector('img').src;

  //load in arrFav everything that has not been clicked on delete
  arrFav = arrFav.filter(element => element.name !== nameF && element.image !== imageF);

  drawFav();
  localStorage.setItem('arrFav', JSON.stringify(arrFav) );
}

//Delete all favorites, empty array and local storage
function handleDelete(){
  localStorage.clear();
  arrFav=[];
  drawFav();
}