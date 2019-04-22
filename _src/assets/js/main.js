'use strict';

// console.log('>> Ready :)');

const inpSearchEl = document.querySelector('#inpSearch');
const btnSearchEl = document.querySelector('.btnSearch');
const listUlEl = document.querySelector('.listUl');


function handleSearch(){
    const arrResult = [];

    fetch

}

// fetch(`https://api.github.com/orgs/${input}`) //ponerlo entre acentos graves
// .then(response => response.json())
// .then(data => {
//   console.log('Breeds data response: ', data);

//   const ul = document.querySelector('ul');
//   const organGit = data.message;
//   let ulContent = '';

//   for (const repos of organGit) {
//     const reposContent = `<li>${repos}</li>`;
//     ulContent += reposContent;
//   }
//   ul.innerHTML = ulContent;
// });


btnSearchEl.addEventListener('click', handleSearch);