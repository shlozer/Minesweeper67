class Demineur{

	constructor(lines, columns, nb_mines){
		this.lines = lines;
		this.columns = columns;
		this.nb_mines = nb_mines;
		this.first_click = false;
		this.game_table = [];
		this.cases_to_win = 0;
	}


	gridDisplayCreation (){

		var div_parent = document.getElementById('game_plan');
		var div_child = document.getElementById('label_loose');
		var div_externe = document.createElement('DIV');
		div_externe.id = 'game_inner';
		div_externe.classList.add('text-center', 'mx-auto');
		div_parent.insertBefore(div_externe,div_child);
		// document.getElementById('game_plan').appendChild(div_externe);


		for (var i = 0; i < this.lines; i++) {

				var div_ligne = document.createElement('DIV');
				div_ligne.id = 'line' + i;
				div_ligne.classList.add('line_game_plan', 'd-flex', 'flex-row', 'justify-content-center');
				div_externe.appendChild(div_ligne);

				for (var j = 0; j < this.columns; j++) {
						var div_case = document.createElement('DIV');
						div_case.id = 'l' + i + '_c' + j;
						div_case.classList.add('game_case');
						div_case.innerHTML = '&nbsp;';
						document.getElementsByClassName('line_game_plan')[i].appendChild(div_case);
				}

				// document.getElementById('div_externe').appendChild(div_ligne);

		}

	}

	// loosingDisplay(){

	// 	var div_loosing = document.createElement('DIV');
	// 	div_loosing.id = 'label_loose';
	// 	div_loosing.classList.add('text-center', 'mx-auto', 'text-danger');
	// 	div_loosing.innerHTML = 'Perdu!!';
	// 	document.getElementById('game_plan').appendChild(div_loosing);
	// 	var div_new_game = document.createElement('DIV');
	// 	div_new_game.id = 'new_game';
	// 	div_new_game.classList.add('text-center', 'mx-auto' );
	// 	// console.log(div_new_game);
	// 	// console.log(document.getElementById('div_loosing'));
	// 	document.getElementById('label_loose').appendChild(div_new_game);
	// 	var btn_new_game = document.createElement('BUTTON');
	// 	btn_new_game.id = 'btn_new_game';
	// 	btn_new_game.innerHTML = 'retentez votre chance';
	// 	document.getElementById('new_game').appendChild(btn_new_game);

	// }

	loosingDisplay(){

		var div_loose = document.getElementById('label_loose');
		div_loose.style.display = 'block' ;

	}

	// winningDisplay(){

	// 	var div_winning = document.createElement('DIV');
	// 	div_winning.id = 'label_win';
	// 	div_winning.classList.add('text-center', 'mx-auto', 'text-danger');
	// 	div_winning.innerHTML = 'Gagné!!';
	// 	document.getElementById('game_plan').appendChild(div_winning);
	// 	var div_new_game = document.createElement('DIV');
	// 	div_new_game.id = 'new_game';
	// 	div_new_game.classList.add('text-center', 'mx-auto' );
	// 	document.getElementById('label_win').appendChild(div_new_game);
	// 	var btn_new_game = document.createElement('BUTTON');
	// 	btn_new_game.id = 'btn_new_game';
	// 	btn_new_game.innerHTML = 'rejouez';
	// 	document.getElementById('new_game').appendChild(btn_new_game);

	// }

	winningDisplay(){

		var div_win = document.getElementById('label_win');
		div_win.style.display = 'block' ;

	}
	gridEventsCreation (){
		for (let i = 0; i< this.lines; i++) {
	    for(let j = 0; j< this.columns; j++) {
	        document.getElementById('l' + i + '_' + 'c' + j).addEventListener('click', () =>{

	        	if (!this.first_click){

	        		// console.log(this.lines, this.columns, this.nb_mines, i, j);
	        		this.first_click = true;
	        		this.gridCreation(i, j);
	        		// console.log(this.game_table);

	        	}

	        	if (this.game_table[i][j][1] == 'closed'){

	        		if (this.game_table[i][j][0] == 9) {
	        			this.allCasesOpen();
	        			this.loosingDisplay();
	            	}

	        		this.searchAlgo(i, j);

	        	}
				// console.log(this.game_table[i][j]);
	    	})
			}
		}

	}

	gridCreation(posx, posy) {
		let k = 1;
		  	
	    for (let i = 0; i< this.lines; i++) {
	            this.game_table[i] = [];
	    }

	    for (let i = 0; i< this.lines; i++) {
	        for(let j = 0; j< this.columns; j++) {
	            this.game_table[i][j] = [null,'closed'];
	        }
	    }

		while ( k <= this.nb_mines  ){

			let x = Math.floor(Math.random() * this.lines);
			let y = Math.floor(Math.random() * this.columns);
			// console.log(x,y);
			if ( x != posx ||  y != posy){

				if (this.game_table [x] [y] [0] != 9){
					this.game_table [x] [y] [0] = 9;
					k++;
					// console.log('mine', k);
				}
			}
		}    

	    for (let i = 0; i< this.lines; i++) {
	        for(let j = 0; j< this.columns; j++) {
	            this.game_table [i] [j] [0] = this.searchAdjMinesCase(i, j);
	        }
	    }

	    this.cases_to_win = (this.lines * this.columns) - this.nb_mines;

	}

	searchAdjMinesCase(posx, posy){

		var adjMines = 0;
		if (this.game_table [posx] [posy][0] == 9){
			return 9;
		}

		try  { if (this.game_table [posx - 1] [posy - 1] [0] == 9){adjMines++;}} 	catch(err) {}
		try  { if (this.game_table [posx - 1] [posy    ] [0] == 9){adjMines++;}}	catch(err) {}
		try  { if (this.game_table [posx - 1] [posy + 1] [0] == 9){adjMines++;}}	catch(err) {}
		try  { if (this.game_table [posx    ] [posy - 1] [0] == 9){adjMines++;}}	catch(err) {}
		try  { if (this.game_table [posx    ] [posy + 1] [0] == 9){adjMines++;}}	catch(err) {}
		try  { if (this.game_table [posx + 1] [posy - 1] [0] == 9){adjMines++;}}	catch(err) {}
		try  { if (this.game_table [posx + 1] [posy    ] [0] == 9){adjMines++;}}	catch(err) {}
		try  { if (this.game_table [posx + 1] [posy + 1] [0] == 9){adjMines++;}}	catch(err) {}

		return adjMines;
	}

	allCasesOpen(){

		for (let i = 0; i< this.lines; i++) {

			for(let j = 0; j< this.columns; j++) {

				this.game_table [i] [j] [1] = 'open';

				if (this.game_table [i] [j] [0] > 0){

					document.getElementById('l' + i + '_' + 'c' + j).innerHTML = this.game_table[i][j][0];
					if (this.game_table [i] [j] [0] == 9){
						document.getElementById('l' + i + '_' + 'c' + j).classList.add('game_case_mine');
						// document.getElementById('l' + i + '_' + 'c' + j).style.color = 'red';
						// document.getElementById('l' + i + '_' + 'c' + j).style.fontWeight = '600';
					}

				}else{

					document.getElementById('l' + i + '_' + 'c' + j).innerHTML = '&nbsp;';

				}

				document.getElementById('l' + i + '_' + 'c' + j).classList.add('game_case_o');
			}
		}

	}


	searchAlgo(posx, posy){
		// console.log(posx, posy, this.game_table [posx] [posy] [0], this.game_table [posx] [posy] [1]);

		if (this.game_table [posx] [posy] [0] == 0 && this.game_table [posx] [posy] [1] == 'closed'){

			this.game_table [posx] [posy] [1] = 'open';

			document.getElementById('l' + posx + '_' + 'c' + posy).innerHTML = '&nbsp;';
			document.getElementById('l' + posx + '_' + 'c' + posy).classList.add('game_case_o');

			// try  { if (game_table [posx - 1] [posy - 1] [0] == 0){searchAlgo(posx - 1, posy - 1);} } catch(err) {}
			// try  { if (game_table [posx - 1] [posy    ] [0] == 0){searchAlgo(posx - 1, posy    );} } catch(err) {}
			// try  { if (game_table [posx - 1] [posy + 1] [0] == 0){searchAlgo(posx - 1, posy + 1);} } catch(err) {}
			// try  { if (game_table [posx    ] [posy - 1] [0] == 0){searchAlgo(posx    , posy - 1);} } catch(err) {}
			// try  { if (game_table [posx    ] [posy + 1] [0] == 0){searchAlgo(posx    , posy + 1);} } catch(err) {}
			// try  { if (game_table [posx + 1] [posy - 1] [0] == 0){searchAlgo(posx + 1, posy - 1);} } catch(err) {}
			// try  { if (game_table [posx + 1] [posy    ] [0] == 0){searchAlgo(posx + 1, posy    );} } catch(err) {}
			// try  { if (game_table [posx + 1] [posy + 1] [0] == 0){searchAlgo(posx + 1, posy + 1);} } catch(err) {}

			try  { this.searchAlgo(posx - 1, posy - 1);}  catch(err) {}
			try  { this.searchAlgo(posx - 1, posy    );}  catch(err) {}
			try  { this.searchAlgo(posx - 1, posy + 1);}  catch(err) {}
			try  { this.searchAlgo(posx    , posy - 1);}  catch(err) {}
			try  { this.searchAlgo(posx    , posy + 1);}  catch(err) {}
			try  { this.searchAlgo(posx + 1, posy - 1);}  catch(err) {}
			try  { this.searchAlgo(posx + 1, posy    );}  catch(err) {}
			try  { this.searchAlgo(posx + 1, posy + 1);}  catch(err) {}

		}else {
			if (this.game_table [posx] [posy] [1] == 'closed'){

				this.game_table [posx] [posy] [1] = 'open';

				if (this.game_table [posx] [posy] [0] > 0){
					document.getElementById('l' + posx + '_' + 'c' + posy).innerHTML = this.game_table[posx][posy][0];
				}else{
					document.getElementById('l' + posx + '_' + 'c' + posy).innerHTML = '&nbsp;';
				}

				document.getElementById('l' + posx + '_' + 'c' + posy).classList.add('game_case_o');
			}
		}

	}


}


