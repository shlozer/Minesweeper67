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

if (nb_lines_dis != 0 && nb_columns_dis != 0 && nb_mines_dis != 0){
		var game = new Demineur(nb_lines_dis, nb_columns_dis, nb_mines_dis);
		game.gridDisplayCreation();
		game.gridEventsCreation();
}

	var i_bg = 0;

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
	var game_inner = document.getElementById('game_inner');

	var game_inner_offsetWidth = 1;

	if (game_inner === null) {} else { game_inner_offsetWidth = game_inner.offsetWidth;}

	$('.game_case').css('width', game_inner_offsetWidth / nb_columns_dis);	


        $("#settings_button").click(function(){
        $("#settings_window").fadeToggle("fast");
    });
        $("#settings_button_mobile").click(function(){
        $("#settings_window").fadeToggle("fast");
    });

	bg_display();

	setInterval(() => {
		bg_display();
		},
		3000);

})


// some comments