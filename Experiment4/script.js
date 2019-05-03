var state = 1;

var name;
var mode;
var upperBound;
var lowerBound;

$(document).ready(
	function () {
		$('#pagepiling').pagepiling(
			{
				navigation: false,
				sectionsColor: ['#CE6D8B', '#525252', '#4056F4',
					'#DF3B57', '#470FF4', '#CE6D8B', '#525252',
					'#4056F4', '#DF3B57', '#470FF4', '#CE6D8B', '#525252',
					'#4056F4', '#DF3B57', '#470FF4'],
				keyboardScrolling: false,
				direction: 'horizontal',
				easing: 'linear'
			});
		$.fn.pagepiling.setAllowScrolling(false);
	});

function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

$(window).keypress(function (e) {
	if (e.which === 32) {

		switch (state) {

			case 1:
				if ($("input[name='name']").val() !== "") {
					name = $("input[name='name']").val().trim();
					mode = $("input[name='mode']:checked").val().trim();
					if(mode == "schwer"){
						upperBound = 700;
						lowerBound = 500;
					}else if(mode == "mittel"){
						upperBound = 900;
						lowerBound = 700;
					}else{
						upperBound = 1100;
						lowerBound = 900;
					}
					$.fn.pagepiling.moveTo(2);
					state = 2;
				} else {
					alert("Bitte einen Spielernamen eingeben!");
				}
				break;
			case 2:
				$.fn.pagepiling.moveTo(3);
				startLevel1();
				state = 3;
				break;
			case 5:
				$.fn.pagepiling.moveTo(6);
				startLevel2();
				state = 6;
				break;
			case 8:
				$.fn.pagepiling.moveTo(9);
				startLevel3();
				state = 9;
				break;
			case 10:
				if (maxPoints3 >= points3bound) {
					$.fn.pagepiling.moveTo(11);
					showResults();
					state = 11;
				}
				break;
		}
	} else if (e.which === 116) {
		switch (state) {
			case 3:
				handleKeyTLevel1();
				break;
			case 6:
				handleKeyTLevel2();
				break;
			case 9:
				handleKeyTLevel3();
				break;
		}
	} else if (e.which === 102) {
		switch (state) {
			case 3:
				handleKeyFLevel1();
				break;
			case 6:
				handleKeyFLevel2();
				break;
			case 9:
				handleKeyFLevel3();
				break;
		}
	} else if (e.which === 49) {
		switch (state) {
			case 4:
				$.fn.pagepiling.moveTo(2);
				state = 2;
				break;

		}

	} else if (e.which === 50) {
		switch (state) {
			case 4:
				if (maxPoints1 >= points1bound) {
					$.fn.pagepiling.moveTo(5);
					state = 5;
				}
				break;
			case 7:
				$.fn.pagepiling.moveTo(5);
				state = 5;
				break;
		}

	} else if (e.which === 51) {
		switch (state) {
			case 7:
				if (maxPoints2 >= points2bound) {
					$.fn.pagepiling.moveTo(8);
					state = 8;
				}
				break;
			case 10:
				$.fn.pagepiling.moveTo(8);
				state = 8;
				break;
		}
	}
});

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolArray() {
	var t = 0;
	var a = 0;

	var array = new Array();

	var i;
	for (i = 0; i < 30; i++) {
		var rand = getRndInteger(0, 1);

		if (rand == 0) {
			if (t < 15) {
				array.push("1");
				t++;
			} else {
				array.push("0");
				a++;
			}
		} else {
			if (a < 15) {
				array.push("0");
				a++;
			} else {
				array.push("1");
				t++;
			}
		}
	}

	return array;
}

var lastStimTime;
var stimActive = false;
var types;
var r = 0;

// Level 1

var points1;
var maxPoints1 = 0;
var points1bound = 100;

var capitals1;
var nonCapitals1;

function startLevel1() {
	types = getRandomBoolArray();
	points1 = 0;
	r = 0;
	capitals1 = ["Berlin", "Mainz", "Schwerin", "Kiel", "München", "Dresden",
		"Bremen", "Wiesbaden", "Magdeburg", "Erfurt", "Stuttgart",
		"Potsdam", "Hamburg", "Saarbrücken", "Hannover"];
	nonCapitals1 = ["Frankfurt", "Leipzig", "Dortmund", "Essen", "Nürnberg",
		"Karlsruhe", "Mannheim", "Augsburg", "Krefeld", "Darmstadt",
		"Aachen", "Duisburg", "Bielefeld", "Chemnitz", "Rostock"];
	shuffle(capitals1);
	shuffle(nonCapitals1);
	$("#city1").text("");
	$("#time1").text("");
	$("#points1").text("");
	$("#sumPoints1").text("0");
	startTest1();
}

function startTest1() {
	$("#city1").text("");
	window.setTimeout(showStimulus1, getRndInteger(2, 6) * 1000);
}

function showStimulus1() {
	$("#time1").text("");
	$("#points1").text("");

	if (types[r] == 0) {
		var capital = capitals1.pop();
		$("#city1").text(capital);
	} else {
		var nonCapital = nonCapitals1.pop();
		$("#city1").text(nonCapital);
	}
	stimActive = true;
	lastStimTime = new Date().getTime();

}

function handleKeyTLevel1() {
	if (!stimActive) {
		$("#time1").text("");
		$("#points1").text("Falsch!   -2 Punkte");
		$("#points1").css('color', 'red');
		points1 = points1 - 2;
		$("#sumPoints1").text(points1);
	} else if (types[r] == 1) {
		$("#points1").text("Falsch!   -5 Punkte");
		$("#points1").css('color', 'red');
		points1 = points1 - 5;
		$("#sumPoints1").text(points1);
		stopTest1();
	} else {
		stimActive = false;

		var currTime = new Date().getTime();
		var deltaTime = currTime - lastStimTime;

		if (deltaTime <= lowerBound) {
			$("#time1").text(deltaTime + "ms");
			$("#points1").text("Perfekt!   +15 Punkte");
			$("#points1").css('color', 'green');
			points1 = points1 + 15;
			$("#sumPoints1").text(points1);
		} else if (deltaTime <= upperBound) {
			$("#time1").text(deltaTime + "ms");
			$("#points1").text("Sehr gut!   +10 Punkte");
			$("#points1").css('color', 'green');
			points1 = points1 + 10;
			$("#sumPoints1").text(points1);
		} else {
			$("#time1").text(deltaTime + "ms");
			$("#points1").text("Gut!   +5 Punkte");
			$("#points1").css('color', 'green');
			points1 = points1 + 5;
			$("#sumPoints1").text(points1);
		}

		stopTest1();
	}
}

function handleKeyFLevel1() {
	if (!stimActive) {
		$("#time1").text("");
		$("#points1").text("Falsch!   -2 Punkte");
		$("#points1").css('color', 'red');
		points1 = points1 - 2;
		$("#sumPoints1").text(points1);
	} else if (types[r] == 0) {
		$("#points1").text("Falsch!   -5 Punkte");
		$("#points1").css('color', 'red');
		points1 = points1 - 5;
		$("#sumPoints1").text(points1);
		stopTest1();
	} else {
		stimActive = false;

		var currTime = new Date().getTime();
		var deltaTime = currTime - lastStimTime;

		if (deltaTime <= lowerBound) {
			$("#time1").text(deltaTime + "ms");
			$("#points1").text("Perfekt!   +15 Punkte");
			$("#points1").css('color', 'green');
			points1 = points1 + 15;
			$("#sumPoints1").text(points1);
		} else if (deltaTime <= upperBound) {
			$("#time1").text(deltaTime + "ms");
			$("#points1").text("Sehr gut!   +10 Punkte");
			$("#points1").css('color', 'green');
			points1 = points1 + 10;
			$("#sumPoints1").text(points1);
		} else {
			$("#time1").text(deltaTime + "ms");
			$("#points1").text("Gut!   +5 Punkte");
			$("#points1").css('color', 'green');
			points1 = points1 + 5;
			$("#sumPoints1").text(points1);
		}

		stopTest1();
	}
}

function stopTest1() {

	r++;
	if (r < 15) {
		startTest1();
	} else {
		stopLevel1();
	}
}

function stopLevel1() {

	maxPoints1 = Math.max(points1, maxPoints1);
	$("#level1points").text(points1);
	$("#level1pointsMax").text(maxPoints1);

	if (maxPoints1 >= points1bound) {
		$("#head1").text("Geschafft!");
		$("#comment1")
			.text(
				"Sehr gut, "
				+ name
				+ "! Du hast genügend Punkte, um zu Level 2 vorzurücken.");
		$("#continue1").text(
			"Oder drücke die Taste 2, um zu Level 2 zu gelangen.");
	} else {
		$("#head1").text("Game over!");
		$("#comment1")
			.text(
				"Schade, "
				+ name
				+ "! Du hast nicht genügend Punkte, um zu Level 2 vorzurücken.");
	}

	state = 4;
	$.fn.pagepiling.moveTo(4);

}

// Level 2

var points2;
var maxPoints2 = 0;
var points2bound = 150;

var capitals2;
var nonCapitals2;

function startLevel2() {
	types = getRandomBoolArray();
	points2 = 0;
	r = 0;
	capitals2 = ["Lissabon", "Paris", "Brüssel", "Sarajevo", "Helsinki",
		"Zagreb", "Sofia", "Andorra la Vella", "Tallinn", "Ljubljana",
		"Oslo", "Reykjavik", "Prag", "Athen", "Bern"];
	nonCapitals2 = ["Dortmund", "Rotterdam", "Lagos", "Bergen", "Salzburg",
		"Turin", "Lyon", "Zürich", "Antwerpen", "Manchester", "Glasgow",
		"Marseille", "Mailand", "Barcelona", "Frankfurt"];
	shuffle(capitals2);
	shuffle(nonCapitals2);
	$("#city2").text("");
	$("#time2").text("");
	$("#points2").text("");
	$("#sumPoints2").text("0");
	startTest2();
}

function startTest2() {
	$("#city2").text("");
	window.setTimeout(showStimulus2, getRndInteger(2, 6) * 1000);
}

function showStimulus2() {
	$("#time2").text("");
	$("#points2").text("");

	if (types[r] == 0) {
		var capital = capitals2.pop();
		$("#city2").text(capital);
	} else {
		var nonCapital = nonCapitals2.pop();
		$("#city2").text(nonCapital);
	}
	stimActive = true;
	lastStimTime = new Date().getTime();

}

function handleKeyTLevel2() {
	if (!stimActive) {
		$("#time2").text("");
		$("#points2").text("Falsch!   -2 Punkte");
		$("#points2").css('color', 'red');
		points2 = points2 - 2;
		$("#sumPoints2").text(points2);
	} else if (types[r] == 1) {
		$("#points2").text("Falsch!   -5 Punkte");
		$("#points2").css('color', 'red');
		points2 = points2 - 5;
		$("#sumPoints2").text(points2);
		stopTest2();
	} else {
		stimActive = false;

		var currTime = new Date().getTime();
		var deltaTime = currTime - lastStimTime;

		if (deltaTime <= lowerBound) {
			$("#time2").text(deltaTime + "ms");
			$("#points2").text("Perfekt!   +15 Punkte");
			$("#points2").css('color', 'green');
			points2 = points2 + 15;
			$("#sumPoints2").text(points2);
		} else if (deltaTime <= upperBound) {
			$("#time2").text(deltaTime + "ms");
			$("#points2").text("Sehr gut!   +10 Punkte");
			$("#points2").css('color', 'green');
			points2 = points2 + 10;
			$("#sumPoints2").text(points2);
		} else {
			$("#time2").text(deltaTime + "ms");
			$("#points2").text("Gut!   +5 Punkte");
			$("#points2").css('color', 'green');
			points2 = points2 + 5;
			$("#sumPoints2").text(points2);
		}

		stopTest2();
	}
}

function handleKeyFLevel2() {
	if (!stimActive) {
		$("#time2").text("");
		$("#points2").text("Falsch!   -2 Punkte");
		$("#points2").css('color', 'red');
		points2 = points2 - 2;
		$("#sumPoints2").text(points2);
	} else if (types[r] == 0) {
		$("#points2").text("Falsch!   -5 Punkte");
		$("#points2").css('color', 'red');
		points2 = points2 - 5;
		$("#sumPoints2").text(points2);
		stopTest2();
	} else {
		stimActive = false;

		var currTime = new Date().getTime();
		var deltaTime = currTime - lastStimTime;

		if (deltaTime <= lowerBound) {
			$("#time2").text(deltaTime + "ms");
			$("#points2").text("Perfekt!   +15 Punkte");
			$("#points2").css('color', 'green');
			points2 = points2 + 15;
			$("#sumPoints2").text(points2);
		} else if (deltaTime <= upperBound) {
			$("#time2").text(deltaTime + "ms");
			$("#points2").text("Sehr gut!   +10 Punkte");
			$("#points2").css('color', 'green');
			points2 = points2 + 10;
			$("#sumPoints2").text(points2);
		} else {
			$("#time2").text(deltaTime + "ms");
			$("#points2").text("Gut!   +5 Punkte");
			$("#points2").css('color', 'green');
			points2 = points2 + 5;
			$("#sumPoints2").text(points2);
		}

		stopTest2();
	}
}

function stopTest2() {

	r++;
	if (r < 20) {
		startTest2();
	} else {
		stopLevel2();
	}
}

function stopLevel2() {

	maxPoints2 = Math.max(points2, maxPoints2);
	$("#level2points").text(points2);
	$("#level2pointsMax").text(maxPoints2);

	if (maxPoints2 >= points2bound) {
		$("#head2").text("Geschafft!");
		$("#comment2")
			.text(
				"Sehr gut, "
				+ name
				+ "! Du hast genügend Punkte, um zu Level 3 vorzurücken.");
		$("#continue2").text(
			"Oder drücke die Taste 3, um zu Level 3 zu gelangen.");
	} else {
		$("#head2").text("Game over!");
		$("#comment2")
			.text(
				"Schade, "
				+ name
				+ "! Du hast nicht genügend Punkte, um zu Level 3 vorzurücken.");
	}

	state = 7;
	$.fn.pagepiling.moveTo(7);

}

// Level 3

var points3;
var maxPoints3 = 0;
var points3bound = 200;

var capitals3;
var nonCapitals3;

function startLevel3() {
	types = getRandomBoolArray();
	points3 = 0;
	r = 0;
	capitals3 = ["Brüssel", "London", "Berlin", "Kairo", "Buenos Aires", "Canberra", "Manama", "Peking",
		"Jakarta", "Ottawa", "Nursultan", "Seoul", "Washington, D.C.",
		"Kuala Lumpur", "Neu-Delhi", "Kinshasa", "Mexiko-Stadt", "Bagdad"];
	nonCapitals3 = ["Kalkutta", "Johannesburg", "Miami", "Mumbai", "Shanghai", "New York", "Sao Paulo", "Toronto",
		"Istanbul", "Sydney", "Dubai", "Casablanca", "San Antonio", "Mekka",
		"Alexandria", "Rio de Janeiro", "Krakau", "Sankt Petersburg"];
	shuffle(capitals3);
	shuffle(nonCapitals3);
	$("#city3").text("");
	$("#time3").text("");
	$("#points3").text("");
	$("#sumPoints3").text("0");
	startTest3();
}

function startTest3() {
	$("#city3").text("");
	window.setTimeout(showStimulus3, getRndInteger(2, 6) * 1000);
}

function showStimulus3() {
	$("#time3").text("");
	$("#points3").text("");

	if (types[r] == 0) {
		var capital = capitals3.pop();
		$("#city3").text(capital);
	} else {
		var nonCapital = nonCapitals3.pop();
		$("#city3").text(nonCapital);
	}
	stimActive = true;
	lastStimTime = new Date().getTime();

}

function handleKeyTLevel3() {
	if (!stimActive) {
		$("#time3").text("");
		$("#points3").text("Falsch!   -2 Punkte");
		$("#points3").css('color', 'red');
		points3 = points3 - 2;
		$("#sumPoints3").text(points3);
	} else if (types[r] == 1) {
		$("#points3").text("Falsch!   -5 Punkte");
		$("#points3").css('color', 'red');
		points3 = points3 - 5;
		$("#sumPoints3").text(points3);
		stopTest3();
	} else {
		stimActive = false;

		var currTime = new Date().getTime();
		var deltaTime = currTime - lastStimTime;

		if (deltaTime <= lowerBound) {
			$("#time3").text(deltaTime + "ms");
			$("#points3").text("Perfekt!   +15 Punkte");
			$("#points3").css('color', 'green');
			points3 = points3 + 15;
			$("#sumPoints3").text(points3);
		} else if (deltaTime <= upperBound) {
			$("#time3").text(deltaTime + "ms");
			$("#points3").text("Sehr gut!   +10 Punkte");
			$("#points3").css('color', 'green');
			points3 = points3 + 10;
			$("#sumPoints3").text(points3);
		} else {
			$("#time3").text(deltaTime + "ms");
			$("#points3").text("Gut!   +5 Punkte");
			$("#points3").css('color', 'green');
			points3 = points3 + 5;
			$("#sumPoints3").text(points3);
		}

		stopTest3();
	}
}

function handleKeyFLevel3() {
	if (!stimActive) {
		$("#time3").text("");
		$("#points3").text("Falsch!   -2 Punkte");
		$("#points3").css('color', 'red');
		points3 = points3 - 2;
		$("#sumPoints3").text(points3);
	} else if (types[r] == 0) {
		$("#points3").text("Falsch!   -5 Punkte");
		$("#points3").css('color', 'red');
		points3 = points3 - 5;
		$("#sumPoints3").text(points3);
		stopTest3();
	} else {
		stimActive = false;

		var currTime = new Date().getTime();
		var deltaTime = currTime - lastStimTime;

		if (deltaTime <= lowerBound) {
			$("#time3").text(deltaTime + "ms");
			$("#points3").text("Perfekt!   +15 Punkte");
			$("#points3").css('color', 'green');
			points3 = points3 + 15;
			$("#sumPoints3").text(points3);
		} else if (deltaTime <= upperBound) {
			$("#time3").text(deltaTime + "ms");
			$("#points3").text("Sehr gut!   +10 Punkte");
			$("#points3").css('color', 'green');
			points3 = points3 + 10;
			$("#sumPoints3").text(points3);
		} else {
			$("#time3").text(deltaTime + "ms");
			$("#points3").text("Gut!   +5 Punkte");
			$("#points3").css('color', 'green');
			points3 = points3 + 5;
			$("#sumPoints3").text(points3);
		}

		stopTest3();
	}
}

function stopTest3() {

	r++;
	if (r < 25) {
		startTest3();
	} else {
		stopLevel3();
	}
}

function stopLevel3() {

	maxPoints3 = Math.max(points3, maxPoints3);
	$("#level3points").text(points3);
	$("#level3pointsMax").text(maxPoints3);

	state = 10;
	$.fn.pagepiling.moveTo(10);

	if (maxPoints3 >= points3bound) {
		$("#head3").text("Geschafft!");
		$("#comment3").text("Herzlichen Glückwunsch, " + name + "! Du hast alle Level bestanden.");
		$("#continue3").text("Drücke die Leertaste, um deine Ergebnisse zu sehen.");
	} else {
		$("#head3").text("Game over!");
		$("#comment3").text("Schade, " + name + "! Du hast Level 3 nicht bestanden.");
	}


}

//Results

function showResults() {
	$("#sumPoints").text(maxPoints1 + maxPoints2 + maxPoints3);
	$("#results1pointsMax").text(maxPoints1);
	$("#results2pointsMax").text(maxPoints2);
	$("#results3pointsMax").text(maxPoints3);
	$("#resultComment").text("Gut gemacht, " + name + "!");

}