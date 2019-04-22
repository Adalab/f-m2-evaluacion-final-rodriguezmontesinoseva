'use strict';

// console.log('>> Ready :)');

const inpSearchEl = document.querySelector('#inpSearch');
const btnSearchEl = document.querySelector('.btnSearch');
const listUlEl = document.querySelector('.listUl');


function handleSearch(){
    const arrResult = [];

    fetch(`http://api.tvmaze.com/search/shows?q=${inpSearchEl.value}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let ulContent = "";

        for (let i=0; i<data.length; i++){
            const nameS = data[i].show.name;
            let imageS;
            if (data[i].show.image === null){
                  imageS = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

            }else{
              
                imageS = data[i].show.image.medium;
            };
            console.log ("nameS"+[i] + "es "+ nameS);
            console.log ("imageS"+[i] + " es "+ imageS);
            arrResult.push({name: nameS, image: imageS,},);
            console.log(arrResult);

            const listContent = `<li>${nameS}<img src="${imageS}" /> </li>`;
            ulContent += listContent;
            listUlEl.innerHTML = ulContent;

        }

//         const reposContent = `<li>${repos}</li>`;
// //     ulContent += reposContent;
// ul.innerHTML = ulContent;
    });

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