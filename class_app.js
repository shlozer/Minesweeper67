class Demineur {

	constructor(lines, columns, nb_mines){
		this.lines = lines;
		this.columns = columns;
		this.nb_mines = nb_mines;
		this.first_click = false;
		this.game_table = [];
		this.cases_to_win = 0;
		this.cases_open = 0;
	}

// création des lignes et colonnes du jeu
// creating game lines and columns 
	gridDisplayCreation (){

		var div_parent = document.getElementById('game_plan');
		var fin_game_plan = document.getElementById('fin_game_plan');
		var div_externe = document.createElement('DIV');
		div_externe.id = 'game_inner';
		div_externe.classList.add('text-center', 'mx-auto');
		div_parent.insertBefore(div_externe,fin_game_plan);
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
// Au premier clic on lance la création des mines puis on crées des evenements sur chaque case:
// 	si case fermée on écoute le clic
// 		si case avec mine => perdu
// 		sinon recherche des cases vides aux alentours
// 		gestion de partie gagnée
// Mines creation at the first click then events creation on each and every case:
// 		if case is closed so events listener:
// 				if there is a mine you loose
// 				else looking for empty cases around
// at the end: winning game management
	gridEventsCreation (){
		for (let i = 0; i< this.lines; i++) {
	    for(let j = 0; j< this.columns; j++) {
	        document.getElementById('l' + i + '_' + 'c' + j).addEventListener('click', () =>{

	        	if (!this.first_click){

	        		// console.log(this.lines, this.columns, this.nb_mines, i, j);
	        		this.first_click = true;
	        		this.gridCreation(i, j);
								console.log(this.cases_to_win);
	        	}

	        	if (this.game_table[i][j][1] == 'closed'){

	        		if (this.game_table[i][j][0] == 9) {
	        			this.allCasesOpen();
	        			this.loosingDisplay();
	            	}

	        		this.searchAlgo(i, j);
	        		console.log(this.cases_open);

	        	}

	        	if (this.cases_open == this.cases_to_win) {
	        		this.allCasesOpen();
	        		this.winningDisplay();
	        	}
				// console.log(this.game_table[i][j]);
	    	})
			}
		}

	}
// Positionnement des mines au hasard
// affichage des mines dans les cases adjacentes
// random positioning
// displaying mines on adjacent cases
	gridCreation(posx, posy) {
		let k = 0;
		  	
	    for (let i = 0; i< this.lines; i++) {
	            this.game_table[i] = [];
	    }

	    for (let i = 0; i< this.lines; i++) {
	        for(let j = 0; j< this.columns; j++) {
	            this.game_table[i][j] = [null,'closed'];
	        }
	    }

		while ( k < this.nb_mines  ){

			let x = Math.floor(Math.random() * this.lines);
			let y = Math.floor(Math.random() * this.columns);
			
			if ( x != posx ||  y != posy){

				if (this.game_table [x] [y] [0] != 9){
					this.game_table [x] [y] [0] = 9;
					k++;
					
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
// calcul et affichage des mines dans les cases adjacentes
// calculation and display of adjacent mines

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
// ouverture et devoilement de toutes les cases (a l issue du jeu)
// opening and unveiling all cases (at end of the game)
	allCasesOpen(){

		for (let i = 0; i< this.lines; i++) {

			for(let j = 0; j< this.columns; j++) {

				this.game_table [i] [j] [1] = 'open';

				if (this.game_table [i] [j] [0] > 0){

					document.getElementById('l' + i + '_' + 'c' + j).innerHTML = this.game_table[i][j][0] != 9 ? this.game_table[i][j][0] : null;
					if (this.game_table [i] [j] [0] == 9){
						document.getElementById('l' + i + '_' + 'c' + j).classList.add('game_case_mine');
					}

				}else{

					document.getElementById('l' + i + '_' + 'c' + j).innerHTML = '&nbsp;';

				}

				document.getElementById('l' + i + '_' + 'c' + j).classList.add('game_case_o');
			}
		}

	}


	loosingDisplay(){

		$("#label_loose").fadeIn("fast");
	}

	winningDisplay(){

		$("#label_win").fadeIn("fast");
	}

// algorithme qui permets de chercher les cases adjacentes vides (si clic sur une case vide) (fonction recursive)
//here comes the big algo which find adjacent empty cases and open them (recursive func!!!)
	searchAlgo(posx, posy){
		// console.log(posx, posy, this.game_table [posx] [posy] [0], this.game_table [posx] [posy] [1]);

		if (this.game_table [posx] [posy] [0] == 0 && this.game_table [posx] [posy] [1] == 'closed'){

			this.game_table [posx] [posy] [1] = 'open';
			this.cases_open++;
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
				this.cases_open++;
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


