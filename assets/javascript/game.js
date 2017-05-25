$(document).ready(function() { 

var game = new charHandler();

	function charHandler() {		//Sets all of the Character Attributes

		this.myChar;
		this.enemyChar;
		this.numEnemy;
		this.haveCharacter = false;  	//default boolean of no character selected.
		this.haveOpponent = false;		//default boolean of no enemy selected.
		this.numEnemy = 3;
		this.attackDmg;				//default number of enemies remaining.
		choices = [];
		charArray = [ {
			id: 0,
			name: "Robert 'Bob' Paulson",
			image: 'assets/images/bob.png',
			healthPoints: 100,
			attackPower: 15,
			counterAttack: 8
		}, {
			id: 1,
			name: "Marla Singer",
			image: 'assets/images/marla.png',
			healthPoints: 120,
			attackPower: 12,
			counterAttack: 11	
		}, {
			id: 2,
			name: "The Narrator",
			image: 'assets/images/narrator.png',
			healthPoints: 150,
			attackPower: 9,
			counterAttack: 13
		}, {
			id: 3,
			name: "Tyler Durden",
			image: 'assets/images/tyler.png',
			healthPoints: 180,
			attackPower: 6,
			counterAttack: 15
		} ];



		// create the character images/icons
		for(var i = 0; i < charArray.length; i++) {

			//builds the divs and adds the array object stats
			choices += "<div  id=" + charArray[i].id +
			" class='characters'><p class='names'>" + charArray[i].name + "</p><img src=" + charArray[i].image + " alt=" + charArray[i].name + "><br> HP: " + charArray[i].healthPoints +
			" </div></div>";
		}

		$("#charSelection").html(choices);  //loads the choices into the HTML div
		$(".directions").html("Choose Your Fighter");  //Directions text reads to choose fighter (changes when a fighter is chosen)
		$("#attack").css("display","none");
		
	}

	
	

	function fightersHandler() {

		//Builds Div for player side and places selected character
		var player = "<div id='player1' class='col-xs-6 col-md-3 charWrapper'><div  id=" + charArray[game.myChar].id + " class='characters'><p class='names'>" + charArray[game.myChar].name + "</p><img src=" + charArray[game.myChar].image + "><br> HP: " + charArray[game.myChar].healthPoints + "</div></div>";

		//Builds Div for enemy side and places selected Character
		var opponent = "<div id='opponent1' class='col-xs-6 col-md-3 charWrapper'><div class='characters' id=" + charArray[game.enemyChar].id + "><p class='names'>" + charArray[game.enemyChar].name + "</p><img src=" + charArray[game.enemyChar].image + "><br> HP: " + charArray[game.enemyChar].healthPoints + "</div></div>";

		$("#player").html(player);
		$("#enemy").html(opponent);	
	}

	$('.characters').click( function selectCharacters() {
		//When a character is selected, move the character to the player side
		if(game.haveCharacter == false) {

			game.myChar = $(this).attr('id');
			$("#player").append(this);
			game.haveCharacter = true;
			$('#status').html("");
			$(".directions").html("Choose your opponent!");
			//selectCharacters();
		}
		
		//When an Enemy is selected, move the enemy to the enemy side
		else if(game.haveCharacter == true && game.haveOpponent == false && game.myChar !== $(this).attr('id')) {	

			game.enemyChar = $(this).attr('id');
			$("#enemy").append(this);
			$('#status').html("");
			$(".directions").html("Press attack to fight your opponent");
			$("#attack").css("display", "initial");
			console.log("Have Opponent: " + game.haveOpponent);
			game.haveOpponent = true;
		}

	});

	//When the Attack Button is pressed
	$("#attack").click( function() {
		if(game.haveOpponent == true && game.haveCharacter == true) {
			//do the math of the attacks and counter attacks
			charArray[game.enemyChar].healthPoints  = charArray[game.enemyChar].healthPoints - charArray[game.myChar].attackPower; //Attack the opponent
			charArray[game.myChar].healthPoints = charArray[game.myChar].healthPoints - charArray[game.enemyChar].attackPower;     //Counter attack back

			//log when player or opponent dies
			if (charArray[game.enemyChar].healthPoints <= 0) {
				console.log("number if remaining enemy1: " + game.numEnemy);
				game.numEnemy--;
				console.log("number if remaining enemy2: " + game.numEnemy);
				if(game.numEnemy > 0) {
					$("#status").html("");
					$("#opponent1").remove();
					$(".directions").html("Choose next Opponent");
					game.haveOpponent = false;
					game.haveCharacter = true;
				}
				else {
					$("#status").html("You Win!");
					$(".directions").html("");
					$("#player1").remove();	
					$("#opponent1").remove();
				}
			}
			else if(charArray[game.myChar].healthPoints <= 0) {
				messageHandler();
				$("#status").html("You have lost. Please try again.");
				
			}
			else {
				messageHandler();  	//send message of attack data
				fightersHandler();	//send updated healthPoints to each character
			}

			charArray[game.myChar].attackPower = charArray[game.myChar].attackPower + 6;
		}
	});


	//description box populate
	function messageHandler() {

		var attack = "You attack " + charArray[game.enemyChar].name + " for " + charArray[game.myChar].attackPower + " damage!<br>" +
		charArray[game.enemyChar].name + " counter attacks for " + charArray[game.enemyChar].attackPower;
		$('#status').html(attack);

	}
	
});







