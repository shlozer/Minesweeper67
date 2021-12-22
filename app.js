var nb_mines = document.getElementById('mines_game');
var pct_mines = document.getElementById('pct_mines_game');
var output_num1 = document.getElementById('output_num1');
var output_num2 = document.getElementById('output_num2');
var lines_game = document.getElementById('lines_game');
var columns_game = document.getElementById('columns_game');
var nb_lines_dis = document.getElementById('nb_lines_dis').innerHTML; 
var nb_columns_dis = document.getElementById('nb_columns_dis').innerHTML  ?? 1; 
var nb_mines_dis = document.getElementById('nb_mines_dis').innerHTML; 
var img_bg = document.getElementsByClassName('image_background');
var i_bg = 0;

// mise a jour automatique du formulaire si changement d'un parametre
//form updating on some parameters change
nb_mines.addEventListener('change', () =>{
	pct_mines.value =  
	Math.round( 100 * nb_mines.value / (output_num1.innerHTML * output_num2.innerHTML));
})

pct_mines.addEventListener('change', () =>{
	nb_mines.value =  
	Math.round( (pct_mines.value / 100) * output_num1.innerHTML * output_num2.innerHTML);
})

lines_game.addEventListener('change', () =>{
	pct_mines.value =  
	Math.round(100 * nb_mines.value / (output_num1.innerHTML * output_num2.innerHTML));

})

columns_game.addEventListener('change', () =>{
	pct_mines.value =  
	Math.round( 100 * nb_mines.value / (output_num1.innerHTML * output_num2.innerHTML));
		
})
// si données ok donc création du jeu
// if the datas are ok so game creation
if (nb_lines_dis != 0 && nb_columns_dis != 0 && nb_mines_dis != 0){
		var game = new Demineur(nb_lines_dis, nb_columns_dis, nb_mines_dis);
		game.gridDisplayCreation();
		game.gridEventsCreation();
}

// fonction génériqe d'appel API
// common API call func
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}
// gestion des images récupérée d'unsplash (avancer de 10 images par rafraichissement de la page)
// management of images we get from Unsplash (going forward 10 images each refreshment)
function getPageUnsplash() {
  if(typeof(Storage) !== "undefined") {
		// console.log('precedente page', sessionStorage.current_page_unsplash);
		if (sessionStorage.current_page_unsplash){

				if (Number(sessionStorage.current_page_unsplash) < 10){
			 		 sessionStorage.current_page_unsplash = Number(sessionStorage.current_page_unsplash) + 1;
			 		 
				}else{
					sessionStorage.current_page_unsplash = 1;
				}

	 		 // console.log('ici1');
		} 
		else {
		  	// console.log('ici2');
		  	sessionStorage.current_page_unsplash = 1;
		}
		// console.log('actuelle page',sessionStorage.current_page_unsplash);
		return sessionStorage.current_page_unsplash;
	}
	return 1;
}
// gestion du passage des fonds d ecran
// Management of background image changing
 function bg_display() {

		try { 
			if (img_bg[i_bg-1].classList.contains('img_bg_display')) {
				img_bg[i_bg-1].classList.remove('img_bg_display');
			}
		} 
		catch (err) {console.log(err);}

		if (i_bg >= img_bg.length) {i_bg = 0;}

		img_bg[i_bg].classList.add('img_bg_display');

		i_bg++;

}

window.addEventListener('load', () =>{
// récupération des images unsplash
// Getting unsplah images
  var pageUnsplash = getPageUnsplash();

	ajaxGet("https://api.unsplash.com/search/photos?client_id=DnOxuuMPIm6X97RqHUf1_oRCoUM7YKJXQ210cbQh2s0&query=alsace&orientation=landscape&page=" 
		+ pageUnsplash,
		function(response){

			listePhotos = JSON.parse(response);

	    // console.log(listePhotos);
			for (var i = 0; i < 10; i++) {
				img_bg[i].setAttribute("src", listePhotos.results[i].urls.full);
			}

	});
// pourcentage à mettre à jour au lancement 
// Upadating mines percentage when page is loading
	pct_mines.value = Math.round( 100 * nb_mines.value / (output_num1.innerHTML * output_num2.innerHTML));
// gestion de la largeur des cases	
// cases width management
	var game_inner = document.getElementById('game_inner');

	var game_inner_offsetWidth = 1;

	if (game_inner === null) {} else { game_inner_offsetWidth = game_inner.offsetWidth;}

	$('.game_case').css('width', game_inner_offsetWidth / nb_columns_dis);	
	$('.game_case').css('height', game_inner_offsetWidth / nb_columns_dis);	
	$('.game_case').css('line-height', `${Math.min((game_inner_offsetWidth / nb_columns_dis)-2, 24)}px`);	
// gestion de l'affichage des parametres
// settings display management
  $("#settings_button").click(function(){
  	$("#settings_window").fadeToggle("fast");
	});

  $("#settings_button_mobile").click(function(){
 	 $("#settings_window").fadeToggle("fast");
	});
	
  $("#close_settings_button").click(function(){
 	 $("#settings_window").fadeToggle("fast");
	});
// pilotage du fonds d'écran animé
// animation of the animated backgroung
	bg_display();

	setInterval(() => {
		bg_display();
		},
		3000);

})


// some comments