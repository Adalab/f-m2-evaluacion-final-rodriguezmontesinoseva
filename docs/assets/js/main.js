"use strict";const inpSearchEl=document.querySelector("#inpSearch"),btnSearchEl=document.querySelector(".btnSearch"),listUlEl=document.querySelector(".listUl"),listUlFavEl=document.querySelector(".listUlFav");let arrFav=localStorage.getItem("arrFav")?JSON.parse(localStorage.getItem("arrFav")):[];const btnDelFavEl=document.querySelector(".btn-delfav");function handleSearch(){const e=[];fetch(`http://api.tvmaze.com/search/shows?q=${inpSearchEl.value}`).then(e=>e.json()).then(a=>{let t="";for(let r=0;r<a.length;r++){const l=a[r].show.name;let n;n=null===a[r].show.image?"https://via.placeholder.com/210x295/ffffff/666666/?text=TV":a[r].show.image.medium,e.push({name:l,image:n}),t+=`<li>${l}<img src="${n}" /> </li>`,listUlEl.innerHTML=t}document.querySelectorAll(".listUl li").forEach(e=>e.addEventListener("click",addFav))})}function addFav(e){const a=e.currentTarget.textContent,t=e.currentTarget.querySelector("img").src;listUlFavEl.innerHTML="",e.currentTarget.classList.toggle("inv-colors"),e.currentTarget.classList.contains("inv-colors")?arrFav.length>0?void 0===arrFav.find(e=>e.name===a&&e.image===t)&&arrFav.push({name:a,image:t}):arrFav.push({name:a,image:t}):arrFav=arrFav.filter(e=>e.name!==a&&e.image!==t),drawFav(),localStorage.setItem("arrFav",JSON.stringify(arrFav))}function drawFav(){const e=document.querySelector(".subtitle");if(listUlFavEl.innerHTML="",arrFav.length>0){for(let e=0;e<arrFav.length;e++){const a=`<li>${arrFav[e].name}<img src="${arrFav[e].image}" /><a class="delete" href="#">Borrar</a></li>`;listUlFavEl.innerHTML=listUlFavEl.innerHTML+a}document.querySelectorAll(".delete").forEach(e=>e.addEventListener("click",deleteFav)),e.innerHTML="Mis series favoritas",btnDelFavEl.classList.remove("hidden")}else e.innerHTML="",btnDelFavEl.classList.add("hidden")}function deleteFav(e){const a=e.target.parentElement.textContent,t=e.target.parentElement.querySelector("img").src;arrFav=arrFav.filter(e=>e.name!==a&&e.image!==t),drawFav(),localStorage.setItem("arrFav",JSON.stringify(arrFav))}function handleDelete(){localStorage.clear(),arrFav=[],drawFav()}btnSearchEl.addEventListener("click",handleSearch),btnDelFavEl.addEventListener("click",handleDelete),drawFav();