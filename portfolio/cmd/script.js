$(document).ready(function () {
	//initGame();
	initCmd();
});

function initGame() {
	initMap();
	initControls();
	updateInfo();
	
	insertPlayer(0);
	moveTo(1);
	
	insertObjectRandomly(mushroom);
	//setInterval(function(){insertObjectRandomly(mushroom)}, 1000);
}

var master = new Array();
var player = "a";
var space = "#";
var mushroom = "^";
var points = 0;

function initMap() {
	
	
	for (var i = 0; i < 100; i++)
		master[i] = space;
	
	updateMap();
}

function updateMap() {
	var mapContent = "";
	
	$.each(master, function(index, value) {
		mapContent += value;
		if ((index + 1) % 10 == 0)
			mapContent += "<br>";
		//else
			//mapContent += " ";
	});
	
	$("#map").empty().append(mapContent);	
}

function insertPlayer(position) {
	master[position] = player;	
	updateMap();
}

function insertObject(object, position) {
	master[position] = object;	
	updateMap();
}

function insertObjectRandomly(object) {
	var count = 0;
	$.each(master, function(index, value) {
		if (value == object)
			count++
	});
	if (count <= 10) {
		var position = 0;
		do {
			position = Math.floor((Math.random() * 100) - 1);
		} while (master[position] != space);//position == master.indexOf(player));
		insertObject(object, position);
	}
}

function moveTo(position){
	master[master.indexOf(player)] = space;
	insertPlayer(position);
}

function move(direction) {
	var currentPosition = master.indexOf(player);
	master[currentPosition] = space;
	
	var newPosition = 0;
	var movement = 0;
		
	switch (direction) {
		case "left":
			if (currentPosition % 10 != 0)
				movement = -1;
			break;
		case "up":
			if (currentPosition > 9)
				movement = -10;
			break;
		case "right":
			if ((currentPosition + 1 ) % 10 != 0)
			movement = 1;
			break;
		case "down":
			if (currentPosition < 90)
				movement = 10;
			break;
	}
	
	newPosition = currentPosition + movement;
	if (master[newPosition] == "^") {
		points++;//player = String.fromCharCode(player.charCodeAt(0) + 1);//player.toUpperCase();
		updateInfo();
	}
	insertPlayer(newPosition);
}

var savedCommandsLastIndex = 0;

function initControls() {
	$(document).keydown(function(e){
		switch (e.keyCode) {
			case 37:
				move("left");
				break;
			//case 38:
			//	move("up");
			//	break;
			case 39:
				move("right");
				break;
			//case 40:
			//	move("down");
			//	break;
			default:
				$("#cmd").focus();
				break;
		}
	});
	
}

function updateInfo() {
	enterInfo("points: " + points);
}

function clear() {
	$("#info").empty();
}

function initCmd() {
	$("#cmd").focus();
	$("#cmd").on("keyup change", function(e) {
		//moveTo(parseInt($(this).val()));
		if (e.keyCode == 186) { // chrome 186, firefox 59
			//alert("semicolon");
			var s = $(this).val().split(";");
			var command = s[0];
			enterInfo("> " + command);
			interpretCommand(command);
			$(this).val("");
			savedCommandsLastIndex = 0;
		}
		else if (e.keyCode == 38) { // up
			if (savedCommandsLastIndex > 0)
				savedCommandsLastIndex--;
			$("#cmd").val(savedCommands[savedCommandsLastIndex]);
		}
		else if (e.keyCode == 40) { // down
			if (savedCommandsLastIndex + 1 < savedCommands.length ) {
				savedCommandsLastIndex++;
				$("#cmd").val(savedCommands[savedCommandsLastIndex]);
			}
		}
	});	
}

var yo = function() {var what;};

var lastInfo = "";
function enterInfo(info) {
	if (info.indexOf(">") == -1)
		lastInfo += info + "<br>";
	else if (info != "> l")
		lastInfo = "";
	$("#info").append(info + "<br>");	
	//var objDiv = document.getElementById("info");
	//objDiv.scrollTop = objDiv.scrollHeight;
	$("#info").scrollTop($("#info")[0].scrollHeight);
}

function l() {
	$("#cmd").text(lastInfo);
}

function lol() {
	$.each(window, function(index, value) {
		enterInfo("index: " + index + ", value: " + value);
	});	
}

function func(f) {
		
}

function s(aVar) {
	if (window[aVar] == undefined)
		return "doesn't exist";
	else
		return aVar + ": " + eval(aVar);
}

function interpretCommand(command) {
	var c = command.split(" ");
	switch (c.length) {
        case 1:
            switch(c[0]) {
                case "?":
                    var commands = "";
                    $.each(commandsObject, function(index, value) {
                            commands += index + " ";
                    });
                    enterInfo("available commands: " + commands );
					 saveCommand(command)
                    break;
				case "command":
					var commands = "";
					$.each(savedCommands, function(index, value) {
						if (index == savedCommands.length - 1)
							commands += value;
						else
                            commands += value + "<br>";
							
                    });
					if (commands == "")
						commands = "no commands yet";
					enterInfo(commands);
					break;
				//case "clear":
				//	$("#info").empty();
				//	break;
				default:
					var fn = window[c[0]];
					if(typeof fn === 'function') {
						var result = fn();
						if (result != undefined)
							enterInfo(result);
						saveCommand(c[0]);
					}
					break;					
            }
            break;
        case 2:
            switch(c[0]) {
                case "move":
                    move(c[1]);
					 saveCommand(command)
                    break;
                case "?":
                    enterInfo(commandsObject[c[1]]);
					 saveCommand(command)
                    break;                
				case "map":
					//$.each(c[1], function(index, value) {
					//	insertObject(value, index);
					//});
					for (var i = 0; i < c[1].length; i++) {
					  insertObject(c[1][i], i);
					}
					 saveCommand(command)
					break;
				case "toString":
					var fn = window[c[1]];
					if(typeof fn === 'function')
						enterInfo(fn.toString())
					else
						enterInfo(c[1] + " does not exist");
					saveCommand(command)
					break;
				default:
					var fn = window[c[0]];
					if(typeof fn === 'function') {
						var result = fn(c[1]);
						if (result != undefined)
							enterInfo(result);
						saveCommand(command);
					}
					break;  
            }
            break;
        case 3:
            switch (c[0]) {
				case "map":
					insertObject(c[1], c[2]);					
					 saveCommand(command)
					break;
				default:
					var fn = window[c[0]];
					if(typeof fn === 'function') {
						var result = fn(c[1], c[2]);
						if (result != undefined)
							enterInfo(result);
						saveCommand(command);
					}
					break;
			}
            break;
		case 4:
            switch (c[0]) {
				default:
					var fn = window[c[0]];
					if(typeof fn === 'function') {
						var result = fn(c[1], c[2], c[3]);
						if (result != undefined)
							enterInfo(result);
						saveCommand(command);
					}
					break;
			}
            break;
		case 5:
            switch (c[0]) {
				default:
					var fn = window[c[0]];
					if(typeof fn === 'function') {
						var result = fn(c[1], c[2], c[3], c[4]);
						if (result != undefined)
							enterInfo(result);
						saveCommand(command);
					}
					break;
			}
            break;
        default:
			var fn = window[c[0]];
			var ar = c.shift();
			if(typeof fn === 'function') {
				var result = fn.apply(this, c);//fn(c[1], c[2], c[3], c[4]);
				if (result != undefined)
					enterInfo(result);
				saveCommand(command);
			}
            //console.log("uh oh");
            break;	
	}
	
}

function saveCommand(command) {
	savedCommands.push(command);
	savedCommandsLastIndex = savedCommands.length;
}

var savedCommands = new Array();

var commandsObject = {
	"move": "move(direction): move player in given direction",
	"map": "map(object, position): insert given object at given position"		
}

var RPSOptions = ["rock", "paper", "scissors"];
/*
function rock() {
	
}

function paper() {
}

function scissors() {
	
}*/
var playerScore, opponentScore, playerOptions;
function rps(playerOption) {
	if (playerScore == undefined)
		playerScore = 0;
	if (opponentScore == undefined)
		opponentScore = 0;
	if (playerOptions == undefined)
		playerOptions = new Array();
	if (playerOption === undefined) { // initialize rps
		$("#map").text("");
		enterInfo("choose rock, paper, or scissors");
		
		rock = function() {
			rps("rock");
		}
		
		paper = function() {
			rps("paper");
		}
		
		scissors = function() {
			rps("scissors");
		}	
	}
	else {
		enterInfo("you chose " + playerOption);
		var opponentOption = getOpponentOption(playerOptions);//RPSOptions[getRandomInt(0, 3)]; //getOpponentOption(playerOptions);
		playerOptions.push(playerOption);
		enterInfo("playerOptions: " + playerOptions);
		enterInfo("i chose " + opponentOption);
		if (playerOption == "rock") {
			if (opponentOption == "rock")
				enterInfo("we tied");
			else if (opponentOption == "paper") {
				enterInfo("you lose");
				opponentScore++;
			}
			else if (opponentOption == "scissors") {
				enterInfo("you win");
				playerScore++;
			}
			else
				enterInfo("you lose");
		}
		else if (playerOption == "paper") {
			if (opponentOption == "rock") {
				enterInfo("you win");
				playerScore++;
			}
			else if (opponentOption == "paper")
				enterInfo("we tied");
			else if (opponentOption == "scissors") {
				enterInfo("you lose");
				opponentScore++;
			}
			else
				enterInfo("you lose");
		}
		
		else if (playerOption == "scissors") {
			if (opponentOption == "rock") {
				enterInfo("you lose");
				opponentScore++;
			}
			else if (opponentOption == "paper") {
				enterInfo("you win");
				playerScore++;
			}
			else if (opponentOption == "scissors")
				enterInfo("we tied");
			else
				enterInfo("you lose");
		}
		else
			enterInfo("you win");
		enterInfo("score: you " + playerScore + ", me " + opponentScore);
	}
}

function getOpponentOption(playerOptions) {
	var playerMode = mode(playerOptions);
	enterInfo("playerMode: " + playerMode);
	if (playerMode == null)
		return RPSOptions[getRandomInt(0, 3)];
	else if (Array.isArray(playerMode))
		return getWinner(playerMode[0]);
	else {	
		return getWinner(playerMode);
	}
	
}

function getWinner(option) {
	if (option == "rock")
		return "paper";
	else if (option == "paper")
		return "scissors";
	else if (option == "scissors")
		return "rock";
	else
		enterInfo("error in getWinner");	
}

function getRandomInt(min, max) {
	//enterInfo(Math.floor(Math.random() * (max - min)) + min);
	return Math.floor(Math.random() * (max - min)) + min;
}

function mode(array) {
	//enterInfo("mode array: " + array);
	if (array.length == 0)
		return null;
	var modeMap = {},
		maxCount = 1, 
		modes = [];
	
	for(var i = 0; i < array.length; i++) {
		var el = array[i];
		
		if (modeMap[el] == null)
			modeMap[el] = 1;
		else
			modeMap[el]++;
		
		if (modeMap[el] > maxCount){
			modes = [el];
			maxCount = modeMap[el];
		}
		else if (modeMap[el] == maxCount) {
			modes.push(el);
			maxCount = modeMap[el];
		}
	}
	//enterInfo("modes: " + modes);
	return modes;
}

function m() {
	//enterInfo(mode([1, 2, 2]));
	return mode([1, 2, 2]);
}

function simrps(count) {
	var i = 0;
	do {
		rps(RPSOptions[getRandomInt(0, 3)]);
		i++;
	} while (i < count);
}

//function sim(count, func, arg1, arg2) {
function sim(count, func, arg1, arg2) {
	var fn = window[func];
	if(typeof fn === 'function') {
		var i = 0;
		do {
			if (arg2 == undefined) {
				if (arg1 == undefined)
					var result = fn();
				else
					var result = fn(arg1);
			}
			else
				var result = fn(arg1, arg2);
			if (result != undefined)
				enterInfo(result);
			i++;
		} while (i < count);
	}
}

var obj;
function read(file) {
	file = file + ".txt";
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200)
			{
				var allText = rawFile.responseText;
				//alert(allText);
				enterInfo(file + " read successfully");
				obj = JSON.parse(allText);
			}
		}
	}
	rawFile.send(null);
}

function spit() {
	return JSON.stringify(obj);	
}

function figtag() {
	read("terr");
	
	display = function(group, sortGroup) {
		if (group == undefined)
			enterInfo("specify a group to display");
		else {
			if (group in obj) {
				var g = obj[group];
				var sortFunc;
				if (sortGroup == undefined) {
					sortFunc = function byLastName(a, b) {
						if (a.lastName < b.lastName)
							return -1;
						else if (a.lastName > b.lastName)
							return 1;
						else
							return 0;
					};
				}
				else if (sortGroup == "fsg") {
					sortFunc = function byLastName(a, b) {
						if (a.FSG < b.FSG)
							return -1;
						else if (a.FSG > b.FSG)
							return 1;
						else
							return 0;
					}	
				}
				else
					return "invalid sortGroup";
				
				g.sort(sortFunc);
				$.each(g, function(index, value) {
					enterInfo(this.firstName + " " + this.lastName);	
				});
			}
			else
				enterInfo(group + " does not exist in the obj");
		}
	}
	
	add = function(group, lastName, firstName) {
		var newObj = {"lastName": lastName, "firstName": firstName};
		obj[group].push(newObj);
	}
	
	save = function() {
		var text = JSON.stringify(obj);
	}
	
	scrape = function() {
		$.ajax({
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8080/d.txt", //"http://wol.jw.org/en/wol/h/r1/lp-e",
			success: function(data) {
				//document.querySelector("#p62").innerHTML = data;
				enterInfo(data);
			},
			error: function() {
				enterInfo("whappened");	
			}
		});	
	}
	
	terr = function() {
		var appContent = "<table><tr><th>Territory Number</th><th>Name</th><th>Start Date</th><th>End Date</th></tr></table>";
		var cityTerritoryMap = {
			"Carson": 38,
			"Torrance": 10,
			"Harbor City": 4,
			"Gardena": 6	
		};
		var defaultText = "N/A";
		$("#app").append(appContent);
		
		show = function(city) {
			var territoryCount = cityTerritoryMap[city];
			for (var i = 0; i < territoryCount; i++) {
				addRow(i+1, defaultText, defaultText, defaultText);
			}
		}
		function addRow(territoryNumber, name, start, end) {
			$("#app table").append("<tr id='terr" + territoryNumber + "'><td>" + territoryNumber + "</td><td class='name'>" + name + "</td><td class='start'>" + start + "</td><td class='end'>" + end + "</td></tr>");	
		}
		
		start = function(terrNum, name) {
			$("#app table #terr" + terrNum + " .name").text(name);
			$("#app table #terr" + terrNum + " .start").text(todaysDate());
		}
		
		end = function(terrNum) {
			
		}
		
		function todaysDate() {
			var months = new Array();
			months[0] = "January";
			months[1] = "February";
			months[2] = "March";
			months[3] = "April";
			months[4] = "May";
			months[5] = "June";
			months[6] = "July";
			months[7] = "August";
			months[8] = "September";
			months[9] = "October";
			months[10] = "November";
			months[11] = "December";
			var now = new Date();
			var month = now.getMonth();
			var day = now.getDate();
			var year = now.getFullYear();
			//var n = new Date(year, month, day);
			return parseInt(month) + 1 + "/" + day + "/" + year;
		}
	}
}

function bball() {
	display = function(group) {
		if (group == undefined)
			enterInfo("specify a group to display");
		else {
			if (group in obj) {
				if (group == "team") {
					$.each(obj[group], function(index, value) {
						var info = this.firstName + " " + this.lastName + ", " + this.position;
						if ("position2" in this)
							info += "/" + this.position2;
						enterInfo(info);	
					});
				}
				else {
					$.each(obj[group], function(index, value) {
						enterInfo(this.firstName + " " + this.lastName);	
					});
				}
			}
			else
				enterInfo(group + " does not exist in the obj");
		}
		//enterInfo(obj);
		//enterInfo(JSON.stringify(obj));
	}
	
	depth = function(pos2) {
		var team = { };
		$.each(obj.team, function(index, value) {
			if (!(this.position in team))
				team[this.position] = new Array();
			team[this.position].push(this.lastName.toLowerCase());
			if (pos2 != undefined) {
				if ("position2" in this)
					team[this.position2].push(this.lastName.toLowerCase());
			}
		});
		$.each(team, function(index, value) {
			var info = index + ": "	+ value.toString().replace(new RegExp(",", "g"), " ");;
			enterInfo(info);
		});
		
	}
}

function display() {
	
}

function add() {
	
}

function save() {
		
}

var d = '{"elders": [{"lastName": "Bernardo","firstName": "Noel"},{"lastName": "David","firstName": "Danilo"}]}';
var e = '{"elders":[{"lastName":"Bernardo","firstName":"Noel"},{"lastName":"David","firstName":"Danilo"},{"lastName":"Escala","firstName":"Omar"},{"lastName":"Goco","firstName":"Rey"},{"lastName":"Marquez","firstName":"Michael"},{"lastName":"Marquez","firstName":"Oscar"},{"lastName":"Piedad","firstName":"Tammy"},{"lastName":"Tan","firstName":"Carlito"}]}';

/*
var f = '{
	"elders": [
		{
			"lastName": "DBernardo",
			"firstName": "Noel"
		},
		{
			"lastName": "David",
			"firstName": "Danilo"
		},
		{
			"lastName": "Escala",
			"firstName": "Omar"
		},
		{
			"lastName": "Goco",
			"firstName": "Rey"
		},
		{
			"lastName": "Marquez",
			"firstName": "Michael"
		},
		{
			"lastName": "Marquez",
			"firstName": "Oscar"
		},
		{
			"lastName": "Piedad",
			"firstName": "Tammy"
		},
		{
			"lastName": "Tan",
			"firstName": "Carlito"
		}
	],
	"territoryAssignment": [
		"Carson": []
	]
}'*/

function vball() {
	var courtPositions = [
		[null, null, null],
		[null, null, null]
	];
	var positions = ["M","S","W","L"];
	var players = [
		{
			"name": "Hinata",
			"position": "M",
			"stats": {
				"serve": 0,
				"pass": 0,
				"set": 0,
				"attack": 0,
				"block": 0,
				"dig": 0	
			}
		},
		{
			"name": "Kageyama",
			"position": "S",
			"stats": {
				"serve": 0,
				"pass": 0,
				"set": 0,
				"attack": 0,
				"block": 0,
				"dig": 0	
			}
		},
		{
			"name": "Sawamura",
			"position": "W",
			"stats": {
				"serve": 0,
				"pass": 0,
				"set": 0,
				"attack": 0,
				"block": 0,
				"dig": 0	
			}
		},
		{
			"name": "Sugawara",
			"position": "S",
			"stats": {
				"serve": 0,
				"pass": 0,
				"set": 0,
				"attack": 0,
				"block": 0,
				"dig": 0	
			}
		},
		{
			"name": "Azumane",
			"position": "W",
			"stats": {
				"serve": 0,
				"pass": 0,
				"set": 0,
				"attack": 0,
				"block": 0,
				"dig": 0	
			}
		},
		{
			"name": "Tanaka",
			"position": "W",
			"stats": {
				"serve": 0,
				"pass": 0,
				"set": 0,
				"attack": 0,
				"block": 0,
				"dig": 0	
			}
		},
		{
			"name": "Nishinoya",
			"position": "L",
			"stats": {
				"serve": 0,
				"pass": 0,
				"set": 0,
				"attack": 0,
				"block": 0,
				"dig": 0	
			}
		},
		{
			"name": "Tsukishima",
			"position": "M",
			"stats": {
				"serve": 0,
				"pass": 0,
				"set": 0,
				"attack": 0,
				"block": 0,
				"dig": 0	
			}
		},
		{
			"name": "Yamaguchi",
			"position": "M",
			"stats": {
				"serve": 0,
				"pass": 0,
				"set": 0,
				"attack": 0,
				"block": 0,
				"dig": 0	
			}
		},
		{
			"name": "Ennoshita",
			"position": "W",
			"stats": {
				"serve": 0,
				"pass": 0,
				"set": 0,
				"attack": 0,
				"block": 0,
				"dig": 0	
			}
		},
		{
			"name": "Kinoshita",
			"position": "W",
			"stats": {
				"serve": 0,
				"pass": 0,
				"set": 0,
				"attack": 0,
				"block": 0,
				"dig": 0	
			}
		},
		{
			"name": "Narita",
			"position": "M",
			"stats": {
				"serve": 0,
				"pass": 0,
				"set": 0,
				"attack": 0,
				"block": 0,
				"dig": 0	
			}
		}	
	];
	roster = function() {
		var team = {};
		$.each(players, function(index, value) {
			if (!(this.position in team))
				team[this.position] = new Array();
			team[this.position].push(this.name.toLowerCase());
		});
		$.each(team, function(index, value) {
			var info = index + ": "	+ value.toString().replace(new RegExp(",", "g"), " ");;
			enterInfo(info);
		});
		
	}	
}

function smash() {
	var characters = ["Fox", "Falco", "Sheik", "Marth", "Jigglypuff", "Peach", "Captain Falcon", "Ice Climbers", "Dr. Mario", "Pikachu", "Samus", "Ganondor","Luigi", "Mario", "Young Link", "Link", "Donkey Kong", "Zelda", "Yoshi", "Roy", "Mewtwo", "Game & Watch", "Ness", "Bowser", "Pichu", "Kirby"];
	var players = [
		{
			"name": "Armada",
			"main": ["Fox", "Peach"],
			"rank": 1
		},
		{
			"name": "Hungrybox",
			"main": "Jigglypuff",
			"rank": 2
		},
		{
			"name": "Leffen",
			"main": "Fox",
			"rank": 3
		},
		{
			"name": "Mango",
			"main": ["Fox", "Falco"],
			"rank": 4
		},
		{
			"name": "Mew2King",
			"main": ["Marth", "Shiek", "Fox"],
			"rank": 5
		},
		{
			"name": "PPMD",
			"main": ["Falco", "Marth"],
			"rank": 6
		},
		{
			"name": "Plup",
			"main": "Samus",
			"rank": 7
		},
		{
			"name": "Westballz",
			"main": "Falco",
			"rank": 8
		},
		{
			"name": "Axe",
			"main": "Pikachu",
			"rank": 9
		},
		{
			"name": "Shroomed",
			"main": "Sheik",
			"rank": 10
		}
	];
}

function clash() {
	var savedArmies = {"goto":{"wiz":8,"wb":4,"ho":20,"go":2}};
	var army = { };
	//var troops = ["b", "a", "gi", "wiz", "wb", "ho", "go", "wit"]
	var troopSpace = {
		"b": 1,
		"a": 1,
		"gi": 5,
		"gob": 2,
		"wb": 2,
		"lo": 5,
		"wiz": 4,
		"he": 14,
		"drag": 20,
		"pe": 25,
		"mi": 2,
		"ho": 5,
		"va": 8,
		"go": 30,
		"wit": 12,
		"la": 30
	};
	add = function(a, t) {
		if (arguments.length % 2 == 1)
			return "missing argument";
		else {
			var troopAmount = { };
			var currentTroopName = "";
			var invalidTroops = new Array();
			var addedTroops = "";
			for (var i = 0; i < arguments.length; i += 2) {
				
				//troopAmount[arguments[i+1]] = arguments[i];
				var troop = arguments[i+1];
				var amount = arguments[i];
				if (!(troop in troopSpace))
					invalidTroops.push(troop);//return "not a valid troop";
				else {
					if (!(troop in army))
						army[troop] = 0;
					army[troop] += parseInt(amount);
					addedTroops += amount + " " + troop + " ";
				}
			}
			if (invalidTroops.length > 1)
				enterInfo(invalidTroops + " are not a valid troops");
			else if (invalidTroops.length == 1)
				enterInfo(invalidTroops[0] + " is not a valid troop");
			if (addedTroops == "")
				enterInfo("no troops added to your army");
			else
				enterInfo("added " + addedTroops + "to your army");
		}
	};
	
	display = function() {
		var count = 0;
		$.each(army, function(index, value) {
			enterInfo(index + ": " + value);
			count += troopSpace[index] * value;
		});
		if (count == 0)
			enterInfo("army is empty");
		else
			enterInfo("troop count: " + count);
	};
	
	clear = function() {
		army = {};	
		enterInfo("army cleared");
	}
	
	save = function(name) {
		savedArmies[name] = $.extend(true, {}, army);;
		return "saved current army as " + name;
	}
	
	load = function(name) {
		if (name in savedArmies) {
			army = savedArmies[name];
			return "loaded " + name;
		}
		else
			return name + " does not exist"
	}
	
	toString = function(name) {
		if (name == undefined)
			return JSON.stringify(savedArmies);
		else if (name in savedArmies) {
			army = savedArmies[name];
			return JSON.stringify(army);
		}
		else
			return name + " does not exist";
	}
	
	//4*10+2*4+1*3+5*2+5*21+30*1+12*2
	//
}

function qb() {
	var positions = [];
	
	
	
}