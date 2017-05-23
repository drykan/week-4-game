$(document).ready(function() {
	var myChar;
	var enemyChar;
	var choices;
	var charArray;
	var haveChar;
	var haveOpponent;
	var numEnemy;  

	function charHandler() {		//Sets all of the Character Attributes

		myChar;
		enemyChar;

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

		haveCharacter = false;  //default boolean of no character selected.
		haveOpponent = false;		//default boolean of no enemy selected.
		numEnemy = 3;			//default number of enemies remaining.

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

	charHandler();

	function fightersHandler() {

		//Builds Div for player side and places selected character
		var player = "<div class='col-xs-6 col-md-3 charWrapper'><div  id=" + charArray[myChar].id + " class='characters'><p class='names'>" + charArray[myChar].name + "</p><img src=" + charArray[myChar].image + "><br> HP: " + charArray[myChar].healthPoints +
		" </div></div>";

		//Builds Div for enemy side and places selected Character
		var  opponent = "<div class='col-xs-6 col-md-3 charWrapper'><div class='characters' id=" + charArray[enemyChar].id +
		"><p class='names'>" + charArray[enemyChar].name + "</p><img src=" + charArray[enemyChar].image + "><br> HP: " + charArray[enemyChar].healthPoints +
		" </div></div>";

		$("#player").html(player);
		$("#enemy").html(opponent);	
	}

	$('.characters').click( function selectCharacters() {
		console.log("have opponent before " + haveOpponent);
		//When a character is selected, move the character to the player side
		if(haveCharacter == false) {

			myChar = $(this).attr('id');
			$("#player").append(this);
			haveCharacter = true;
			$('#status').html("");
			$(".directions").html("Choose your opponent!");
			selectCharacters();
		}
		
		//When an Enemy is selected, move the enemy to the enemy side
		else if(haveCharacter == true && haveOpponent == false && myChar !== $(this).attr('id')) {	

			enemyChar = $(this).attr('id');
			$("#enemy").append(this);
			$('#status').html("");
			$(".directions").html("Press attack to fight your opponent");
			$("#attack").css("display", "initial");
			console.log("have opponent after " + haveOpponent);
			haveOpponent = true;
		}

	});

	//description box populate
	function messageHandler() {

		var attack = "You attack " + charArray[enemyChar].name + " for " + charArray[myChar].attackPower + " damage!<br>" +
		charArray[enemyChar].name + " counter attacks for " + charArray[enemyChar].attackPower;
		$('#status').html(attack);

	}

	$("#attack").click( function() {

		charArray[enemyChar].healthPoints  = charArray[enemyChar].healthPoints - charArray[myChar].attackPower; //Attack the opponent
		charArray[myChar].healthPoints = charArray[myChar].healthPoints - charArray[enemyChar].attackPower;     //Counter attack back

		if (charArray[enemyChar].healthPoints <= 0) {
			numEnemy--;
			console.log("number if remaning enemy" + numEnemy);
			if(numEnemy > 0) {
				$("#status").html("");
				$("#enemy").remove();
				$(".directions").html("Choose next Opponent");
				haveOpponent = false;
				haveCharacter = true;
			}
			else {
				$("#status").html("You Win!");
				$(".directions").html("");
				$("#player").remove();
				charHandler();
			}
		}
		else if(charArray[myChar].healthPoints <= 0) {
			messageHandler();
			$("#status").html("You have lost. Please try again.")
			charHandler();
		}
		else {
			messageHandler();
			fightersHandler();
		}

		charArray[myChar].attackPower = charArray[myChar].attackPower + charArray[myChar].attackPower;
	});
	
});







