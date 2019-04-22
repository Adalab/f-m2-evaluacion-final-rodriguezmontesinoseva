'use strict';

const inpSearchEl = document.querySelector('#inpSearch');
const btnSearchEl = document.querySelector('.btnSearch');
const listUlEl = document.querySelector('.listUl');

const listUlFavEl= document.querySelector('.listUlFav');






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

       // console.log('>>>>> ', listUlEl);// hay que hacer un return listUlEl y trabajar sobre esa lista
        // changeBgc(listUlEl);
      }

      const liEl = document.querySelectorAll('.listUl li');
      liEl.forEach(element => element.addEventListener('click', changeBgc));

    });

}

btnSearchEl.addEventListener('click', handleSearch);



// liEl.forEach(element => element.addEventListener('click', changeBgc));

// function pintaParrCache(event) {
//     if (event.target.id === "inName") {
//       parrNameEl.innerHTML = event.target.value;
//     } else if (event.target.id === "inSurname") {
//       parrSurEl.innerHTML = event.target.value;
//     }

function changeBgc(event){


  event.currentTarget.classList.toggle('inv-colors');
  fillFav();



//console.log(arrFav);


  //const listContentFav = `<li>${nameF}<img src="${imageF}" /> </li>`;


 // ulContent += listContentFav;
  
 //listUlFavEl.innerHTML = listUlFavEl.innerHTML + listContentFav;


//   // pintar el array y colocarlo a la izda. si no existe h2 lo crea
}

function fillFav(){
  const liEl = document.querySelectorAll('.listUl li');
  const arrFav=[];

console.log(liEl);

  for(let i= 0; i< liEl.length; i++){
     if(liEl[i].classList.contains('inv-colors')) {
       const nameF = liEl[i].textContent;
       const imageF = liEl[i].querySelector('img').src;
        arrFav.push({name: nameF, image: imageF});
       };
  }
  console.log(arrFav);
}
