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

	gridEventsCreation (){
		for (let i = 0; i< this.lines; i++) {
	    for(let j = 0; j< this.columns; j++) {
	        document.getElementById('l' + i + '_' + 'c' + j).addEventListener('click', () =>{

	        	if (!this.first_click){

	        		// console.log(this.lines, this.columns, this.nb_mines, i, j);
	        		this.first_click = true;
	        		this.gridCreation(i, j);
	        		this.cases_open++;
	        		// console.log(this.game_table);

	        	}

	        	if (this.game_table[i][j][1] == 'closed'){

	        		if (this.game_table[i][j][0] == 9) {
	        			this.allCasesOpen();
	        			this.loosingDisplay();
	            	}

	        		this.searchAlgo(i, j);

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


	loosingDisplay(){

		var div_loose = document.getElementById('label_loose');
		div_loose.style.display = 'block' ;

	}

	winningDisplay(){

		var div_win = document.getElementById('label_win');
		div_win.style.display = 'block' ;

	}


//here comes the big algo which find adjacent empty cases and open them
	searchAlgo(posx, posy){
		// console.log(posx, posy, this.game_table [posx] [posy] [0], this.game_table [posx] [posy] [1]);

		if (this.game_table [posx] [posy] [0] == 0 && this.game_table [posx] [posy] [1] == 'closed'){

			this.game_table [posx] [posy] [1] = 'open';

			document.getElementById('l' + posx + '_' + 'c' + posy).innerHTML = '&nbsp;';
			document.getElementById('l' + posx + '_' + 'c' + posy).classList.add('game_case_o');
			this.cases_open++;
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


