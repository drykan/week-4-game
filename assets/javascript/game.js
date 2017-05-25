$(document).ready(function startGame() {
	var myChar;
	var enemyChar;
	var choices;
	var charArray;
	var haveCharacter;
	var haveOpponent;
	var numEnemy;  

	function charHandler() {		//Sets all of the Character Attributes

		myChar;
		enemyChar;
		haveCharacter = false;  	//default boolean of no character selected.
		haveOpponent = false;		//default boolean of no enemy selected.
		numEnemy = 3;				//default number of enemies remaining.
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

		$("#charSelection").html(choices);  			//loads the choices into the HTML div
		$(".directions").html("Choose Your Fighter");   //Directions text reads to choose fighter (changes when a fighter is chosen)
		$("#attack").css("display","none");
		$("#status").css("display","none");
		
	}

	charHandler();

	$('.characters').click( function selectCharacters() {
		//When a character is selected, move the character to the player side
		if(haveCharacter == false) {

			myChar = $(this).attr('id');
			$("#player").append(this);
			console.log("Have Character1: " + haveCharacter);
			haveCharacter = true;
			console.log("Have Character1: " + haveCharacter);
			$('#status').html("");
			$(".directions").html("Choose your opponent!");
		}
		
		//When an Enemy is selected, move the enemy to the enemy side
		else if(haveCharacter == true && haveOpponent == false && myChar !== $(this).attr('id')) {	

			enemyChar = $(this).attr('id');
			//$("#enemy").append(this);
			$('#status').html("");
			$(".directions").html("Press attack to fight your opponent");
			$("#attack").css("display", "initial");
			$("#status").css("display", "block");
			haveOpponent = true;
			console.log("Have Opponent: " + haveOpponent);
			console.log("Have Character: " + haveCharacter);
			$(this).appendTo("#enemy");
			
		}

	});

	//When the Attack Button is pressed
	$("#attack").click( function() {
		//do the math of the attacks and counter attacks
		charArray[enemyChar].healthPoints  = charArray[enemyChar].healthPoints - charArray[myChar].attackPower; //Attack the opponent
		charArray[myChar].healthPoints = charArray[myChar].healthPoints - charArray[enemyChar].attackPower;     //Counter attack back

		//log when player or opponent dies
		if (charArray[enemyChar].healthPoints <= 0) {
			console.log("number if remaining enemy1: " + numEnemy);
			numEnemy--;
			console.log("number if remaining enemy2: " + numEnemy);
			if(numEnemy > 0) {
				$("#status").html("");
				$("#enemy").remove();
				$(".directions").html("Choose next Opponent");
				haveOpponent = false;
				haveCharacter = true;
				console.log("Have Opponent after win: " + haveOpponent);
				console.log("Have Character after win: " + haveCharacter);

			}
			else {
				$("#status").html("You Win!");
				$(".directions").html("");
				$("#player").remove();
				startGame();
			}
		}
		else if(charArray[myChar].healthPoints <= 0) {
			messageHandler();
			$("#status").html("You have lost. Please try again.");
			startGame();
		}
		else {
			messageHandler();
		}

		charArray[myChar].attackPower = charArray[myChar].attackPower + charArray[myChar].attackPower;
	});

	//description box populate
	function messageHandler() {

		var attack = "You attack " + charArray[enemyChar].name + " for " + charArray[myChar].attackPower + " damage!<br>" +
		charArray[enemyChar].name + " counter attacks for " + charArray[enemyChar].attackPower;
		$('#status').html(attack);

	}


	
	
});







