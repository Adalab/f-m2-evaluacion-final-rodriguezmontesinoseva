'use strict';

const inpSearchEl = document.querySelector('#inpSearch');
const btnSearchEl = document.querySelector('.btnSearch');
const listUlEl = document.querySelector('.listUl');



//hace busqueda al servidor y pinta nombre e imagen de series que coinciden con la búsqueda
function handleSearch(){
  const arrResult = [];

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
        console.log(listUlEl);// hay que hacer un return listUlEl y trabajar sobre esa lista
        changeBgc(listUlEl);
      }


    });

}

btnSearchEl.addEventListener('click', handleSearch);

const liEl = document.querySelectorAll('li');

liEl.forEach(element => element.addEventListener('click', changeBgc));
const arrFav=[];

// function pintaParrCache(event) {
//     if (event.target.id === "inName") {
//       parrNameEl.innerHTML = event.target.value;
//     } else if (event.target.id === "inSurname") {
//       parrSurEl.innerHTML = event.target.value;
//     }

function changeBgc(event){
//   console.log(event);
//   const liEl = document.querySelectorAll('li');
//   console.log(liEl);
//   liEl.classlist.add('inv-colors');
//   arrFav.push({name: nameS, image: imageS,});
//   // pintar el array y colocarlo a la izda. si no existe h2 lo crea
}