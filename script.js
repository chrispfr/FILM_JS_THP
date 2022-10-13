const movieSearch = document.getElementById('moviesearch');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

//Résultat quand le titre d'un film est donné (si le film donné est bon on display la liste en lien avec la recherche)
async function getMovies(searchTerm){
 const URL = (`https://omdbapi.com/?s=${searchTerm}&apikey=25927e05`);
 const response = await fetch(`${URL}`);
 const data = await response.json();
 //console.log(data.Search);
 if(data.response = "true") displayMovieList(data.Search);
 
}


function findMovies(){
 let searchTerm = (movieSearch.value).trim(); //
 if(searchTerm.length > 0 ){
   searchList.classList.remove('hide-search-list');
   getMovies(searchTerm);
 } else {
   searchList.classList.add('hide-search-list')
 }
}

//
function displayMovieList(movies){
 searchList.innerHTML = "";
 for(let i = 0; i < movies.length; i++){
   let movieListItem = document.createElement('div')
   movieListItem.dataset.id = movies[i].imdbID;
   movieListItem.classList.add('search-list-item');
   
   
   movieListItem.innerHTML = `
         <div class="search-item-thumbnail">
         <h3>${movies[i].Title}</h3>
         </div>
         <div class="search-item-info">
             <p>${movies[i].Year}</p>
             <img src="${movies[i].Poster}">
         </div>
       </div>
   `;
   searchList.appendChild(movieListItem)
 }
 loadMovieDetails();
}

//on récupère l'id du livre sélectionné que l'on display ensuite avec la prochaine fonction
function loadMovieDetails(){
 const searchListMovies = searchList.querySelectorAll('.search-list-item');
 searchListMovies.forEach(movie => {
   movie.addEventListener('click', async () => {
     //console.log(movie.dataset.id);
     searchList.classList.add('hide-earch-list');
     movieSearch.value= "";
     const result = await fetch(`https://omdbapi.com/?i=${movie.dataset.id}&apikey=25927e05`); // i et non s car on récupère les détails
     const movieDetails = await result.json(); //passe en json
     //console.log(movieDetails);
     displayMovieDetails(movieDetails) //display le film clické
   });
 });
}

//Display du film sélectionné avec notre code HTML
function displayMovieDetails(details){
 resultGrid.innerHTML = 
  `
 <div class="movie-poster">
 <img src="${details.Poster}" alt="movie poster">
</div>
<div class="movie-info">
 <h3 class="movie-title">${details.Title}</h3>
 <ul class="movie-misc-info">
   <li class="year">Année: ${details.Year}</li>
   <li class="rated">Evaluation: ${details.Rated}</li>
 </ul>
 <p class="genre"> <b>Genre:</b> ${details.Genre}</p>
 <p class="writer"><b>Réalisateur(s):</b> ${details.Writer}</p>
 <p class="actors"><b>Acteurs:</b> ${details.Actors}</p>
 <p class="plot"><b>Synopsis:</b> ${details.Plot}</p>
</div>`;
}

//Fermeture de la fenetre de recherche lors du click sur un film
window.addEventListener('click', (event) => {
 if(event.target.className != "form-control"){
   searchList.classList.add('hide-search-list')
 }
})