const APIurl = 'https://pokeapi.co/api/v2/pokemon?limit=50';

const navBar = document.getElementById("navBar");

navBar.innerHTML="";

navBar.className = "navbar navbar-expand-lg bg-body-tertiary";
        
        navBar.innerHTML = `
        <div class="container-fluid containerAdjust">
        <div class="navbar-brand fa-solid fa-laptop-code fa-2xl" style="color: #ffffff;"></div>
        <div class="navbar-brand navbar-title" >WEBCODE</div>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://pokeapi.co/" target="_blank">Pokeapi</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success">Search</button>
          </form>
        </div>
      </div> `  


      


async function fetchPokemonData(url){
    try {
        //console.log("recivedUrl",url);

        let res = await fetch(url);
        let data = await res.json();

        //console.log("ConvertedJSON",data);

        return data;

    } catch (error) {
        console.log('Error:', error);
    }
}

async function getPokemonUrl(pokemonUrl){
    //console.log("Url",pokemonUrl);

    let pokemonData = await fetchPokemonData(pokemonUrl);

    //console.log("ConvertedJSON",pokemonData);

    var abilities = pokemonData.abilities.map((ability)=>ability.ability.name);

    //console.log("abilities",abilities);

    var moves = pokemonData.moves.map((move)=>move.move.name);

    //console.log("moves",moves);

    var weight = pokemonData.weight;

    //console.log("weight",weight);

    return {abilities, moves, weight}

}

async function getData(){
    try {
        let res = await fetch(APIurl);
        let data = await res.json();
        return createHtml(data);
        
    } catch (error) {
        console.log('Error:', error);
    }
    
}

async function createHtml(data){
    var counter = 0;
    var containerNumber = 1;

    var root = document.getElementById('root');

    root.innerHTML="";
    

    for (const pokemon of data.results) {
        //console.log("getUrl",pokemon);

        if (counter % 9 === 0) {
            var container = document.createElement('div');
            container.id = `root${containerNumber}`;
            if (containerNumber !== 1) {
                container.style.display = "none";
            }else{
                container.style.display = "";
            }
            container.className = `container containerGrid btn${containerNumber}` ;
            root.appendChild(container);
            containerNumber++;
          }

         
        let pokemonUrl = await getPokemonUrl(pokemon.url);
        let randomImg = `https://picsum.photos/200/100?random=${Math.random()}`;

        //console.log("createHtmlRecived",pokemonUrl);

        let div = document.createElement('div');

        div.className = "card cardstyle cardWrapper";
        
        div.innerHTML = `
            <img src="${randomImg}" class="card-img-top" alt="Pokemon Movie thumbnail">
            <div class="card-body">
              <h3 class="card-title">${pokemon.name.toUpperCase()}</h3>
              <h6 class="card-text abilities"><strong>Abilities:</strong><br> ${pokemonUrl.abilities.join(', ')}</h6>
              <p class="card-text movieWrapper"><strong>Moves:</strong> ${pokemonUrl.moves.join(', ')}</p>
              <p class="card-text weightWrapper"><strong>Weight:</strong> ${pokemonUrl.weight}</p>
            </div>

        `;
    var currentContainer = document.getElementById(`root${containerNumber - 1}`);
    currentContainer.appendChild(div);

    counter++;
        

        
    }
}

getData()



const pagination = document.getElementById('pagination'); 

pagination.innerHTML="";


pagination.innerHTML = `
    <ul class="pagination">
      
      <li class="page-item"><button class="page-link" id="btn1">1</button></li>
      <li class="page-item"><button class="page-link" id="btn2">2</button></li>
      <li class="page-item"><button class="page-link" id="btn3">3</button></li>
      <li class="page-item"><button class="page-link" id="btn4">4</button></li>
      <li class="page-item"><button class="page-link" id="btn5">5</button></li>
      <li class="page-item"><button class="page-link" id="btn6">6</button></li>
      
    </ul>
`;







function TestsFunction(btnId) {
    
    var pageItems = document.getElementsByClassName('containerGrid');

    console.log(pageItems)
    for (var i = 0; i < pageItems.length; i++) {
       
        var conBtnId = pageItems[i].className.slice(0,24) + btnId;
      if (pageItems[i].className !== conBtnId) {
        console.log(pageItems[i].className)
        console.log(conBtnId)
        pageItems[i].style.display = 'none';
      }else{
        pageItems[i].style.display = '';
      }
    }
  }

  
  
 
  document.getElementById('btn1').onclick = function() {
    TestsFunction('btn1');
  };
  document.getElementById('btn2').onclick = function() {
    TestsFunction('btn2');
  };
  document.getElementById('btn3').onclick = function() {
    TestsFunction('btn3');
  };
  document.getElementById('btn4').onclick = function() {
    TestsFunction('btn4');
  };
  document.getElementById('btn5').onclick = function() {
    TestsFunction('btn5');
  };
  document.getElementById('btn6').onclick = function() {
    TestsFunction('btn6');
  };
 

 

  
  //navBar.appendChild(navBar);
  

