var nb_mines = document.getElementById('mines_game');
var pct_mines = document.getElementById('pct_mines_game');
var output_num1 = document.getElementById('output_num1');
var output_num2 = document.getElementById('output_num2');
var lines_game = document.getElementById('lines_game');
var columns_game = document.getElementById('columns_game');
var nb_lines_dis = document.getElementById('nb_lines_dis').innerHTML; 
var nb_columns_dis = document.getElementById('nb_columns_dis').innerHTML; 
var nb_mines_dis = document.getElementById('nb_mines_dis').innerHTML; 
// var label_param = document.getElementById('label_param');
// var game_table = document.getElementsByClassName('game_case');

nb_mines.addEventListener('change', () =>{
	pct_mines.value =  
	Math.round( 100 * nb_mines.value / (output_num1.innerHTML * output_num2.innerHTML));
	// if (pct_mines.value > 100) 
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

var game = new Demineur(nb_lines_dis, nb_columns_dis, nb_mines_dis);
game.gridDisplayCreation();
game.gridEventsCreation();

window.addEventListener('load', () =>{
	var game_inner = document.getElementById('game_inner');
	$('.game_case').css('width', game_inner.offsetWidth / nb_columns_dis);		
})

