$(document).ready(function() {
	var myChar, choices, enemyChar, charArray, haveChar, haveEnemy, numEnemy;  //Setting up Character Var

	function charHandler() {		//Sets all of the Character Attributes
		myChar;
		enemyChar;

		choices = [];
		charArray = [ {
			id: 0,
			name: "Robert 'Bob' Paulson",
			image: 'assets/images/bob.png',
			healthPoints: 100,
			attackPower: 5,
			counterAttack: 10
		}, {
			id: 1,
			name: "Marla Singer",
			image: 'assets/images/marla.png',
			healthPoints: 120,
			attackPower: 25,
			counterAttack: 10	
		}, {
			id: 2,
			name: "The Narrator",
			image: 'assets/images/narrator.png',
			healthPoints: 150,
			attackPower: 6,
			counterAttack: 10
		}, {
			id: 3,
			name: "Tyler Durden",
			image: 'assets/images/tyler.png',
			healthPoints: 180,
			attackPower: 9,
			counterAttack: 10
		} ];

		haveCharacter = false;  //default boolean of no character selected.
		haveEnemy = false;		//default boolean of no enemy selected.
		numEnemy = 3;			//default number of enemies remaining.

		// create the character images/icons
		for(var i = 0; i < charArray.length; i++) {

			//builds the divs and adds the array object stats
			choices += "<div class='col-xs-6 col-md-3'><div class='characters' value=" + charArray[i].id +
			"><p class='names'>" + charArray[i].name + "</p><img src=" + charArray[i].image + " alt=" + charArray[i].name + "><br> HP: " + charArray[i].healthPoints +
			" </div></div>";
		}

		$("#charSelection").html(choices);  //loads the choices into the HTML div
		$(".directions").html("Choose Your Fighter");  //Directions text reads to choose fighter (changes when a fighter is chosen)

		
	}

	charHandler();

	$('.characters').click( function selectCharacters() {

		//When a character is selected, move the character to the player side
		if(haveCharacter == false) {
			myChar = $(this).attr('id');
			$("#player").append(this);

			haveCharacter = true;
			$('#status').html("");
			$(".directions").html("Choose your enemy!");
		}
		
		//When an Enemy is selected, move the enemy to the enemy side
		else if(haveCharacter == true && haveEnemy == false && myChar !== $(this).attr('id')) {	
			enemyChar = $(this).attr('id');
			$("#enemy").append(enemyChar);

			haveAttacker = true;
			$('#status').html("");
			$(".directions").html("Press attack to attack your enemy");
		}
	});
	


});