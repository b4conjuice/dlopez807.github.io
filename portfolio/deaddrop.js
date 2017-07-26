// dead drop

var NUMBER_OF_ZEROES = 4,
	NUMBER_OF_ONES = 3,
	NUMBER_OF_TWOS = 2,
	NUMBER_OF_THREES = 2,
	NUMBER_OF_FOURS = 1,
	NUMBER_OF_FIVES = 1;

// should be 13	
var TOTAL_NUMBER_OF_CARDS = NUMBER_OF_ZEROES +
							NUMBER_OF_ONES +
							NUMBER_OF_TWOS +
							NUMBER_OF_THREES +
							NUMBER_OF_FOURS +
							NUMBER_OF_FIVES;
							
var deck = [	0, 0, 0, 0,
				1, 1, 1,
				2, 2,
				3, 3,
				4,
				5
			];

/*
player object

var player = {
	hand = ["null","null"],
	out = false,
	name = "bacon juice"
}

*/		
	
var players = ["null", "null", "null", "null"];
var player1 = ["null", "null"];
var player2 = ["null", "null"];
var player3 = ["null", "null"];
var player4 = ["null", "null"];
var playerHands = ["null", "null", "null", "null"];
var stash = ["null", "null", "null", "null"];
var drop = "null";
var endGame = false;

function init() {
	
	$("#win").text("");
	
	$("#gameInfo").removeClass("hidden");

	$("#start").addClass("hidden");
	
	shuffleDeck(deck);
	dealDeck(deck);
	
	startGame();
	
}

function setupInfo() {
	$("#info-button").removeClass("glyphicon-info-sign");
	$("#info-button").addClass("glyphicon-remove-sign");
	$("#info-button").unbind("click");
	$("#info-button").click(removeInfo);
	
	$("#how-to-play").removeClass("hidden");
	$("#game").addClass("hidden");
	
}

function removeInfo() {

	$("#info-button").removeClass("glyphicon-remove-sign");
	$("#info-button").addClass("glyphicon-info-sign");
	$("#info-button").unbind("click");
	$("#info-button").click(setupInfo);
	
	$("#how-to-play").addClass("hidden");
	$("#game").removeClass("hidden");
}

function shuffleDeck(aDeck) {

	shuffle(deck);
	
}

function dealDeck(aDeck) {
	
	/* TODO: deal deck using loop instead of quick hack
	for (var i = 0; i < deck.size; i++) {
		
	}
	*/
	
	// quick hack
	player1[0] = deck[0];
	player1[1] = deck[1];
	player2[0] = deck[2];
	player2[1] = deck[3];
	player3[0] = deck[4];
	player3[1] = deck[5];
	player4[0] = deck[6];
	player4[1] = deck[7];
	stash[0] = deck[8];
	stash[1] = deck[9];
	stash[2] = deck[10];
	stash[3] = deck[11];
	drop = deck[12];

}

function updateDisplay(playerIndex) {

	// quick hack again
	$("#stash1").text(stash[0]);
	$("#stash2").text(stash[1]);
	$("#stash3").text(stash[2]);
	$("#stash4").text(stash[3]);
	
	$("#drop").html("<span class='glyphicon glyphicon-question-sign'></span>");
	
	$(".playerCard").text("X");
	
	// TESTING ************************
	var showAll = true;
	
	if (showAll || playerIndex == "showAll") {
		$("#p1card1").text(player1[0]);
		$("#p1card2").text(player1[1]);
		$("#p2card1").text(player2[0]);
		$("#p2card2").text(player2[1]);
		$("#p3card1").text(player3[0]);
		$("#p3card2").text(player3[1]);
		$("#p4card1").text(player4[0]);
		$("#p4card2").text(player4[1]);
	}
	// ********************************
	
	// show hand of current player
	if (playerIndex == 0) {

		$("#p1card1").text(player1[0]);
		$("#p1card2").text(player1[1]);
		
	}
	else if (playerIndex == 1) {
	
		$("#p2card1").text(player2[0]);
		$("#p2card2").text(player2[1]);
	
	}
	else if (playerIndex == 2) {
	
		$("#p3card1").text(player3[0]);
		$("#p3card2").text(player3[1]);
	
	}
	else if (playerIndex == 3) {
	
		$("#p4card1").text(player4[0]);
		$("#p4card2").text(player4[1]);
	}
	
	
	// show hand of playerHands out of game
	if (players[0] == false) {
		$("#p1card1").text(player1[0]);
		$("#p1card2").text(player1[1]);
		$("#p1label").addClass("out");
		$("#player1").addClass("out");
		
	}
	if (players[1] == false) {
	
		$("#p2card1").text(player2[0]);
		$("#p2card2").text(player2[1]);
		$("#p2label").addClass("out");
		$("#player2").addClass("out");
	
	}
	if (players[2] == false) {
	
		$("#p3card1").text(player3[0]);
		$("#p3card2").text(player3[1]);
		$("#p3label").addClass("out");
		$("#player3").addClass("out");
	
	}
	if (players[3] == false) {
	
		$("#p4card1").text(player4[0]);
		$("#p4card2").text(player4[1]);
		$("#p4label").addClass("out");
		$("#player4").addClass("out");
	}
	
}

function updateDisplay2Players(playerIndex1, playerIndex2) {
	
	updateDisplay(playerIndex1);
	
	// show hand of second player
	if (playerIndex2 == 0) {

		$("#p1card1").text(player1[0]);
		$("#p1card2").text(player1[1]);
		
	}
	else if (playerIndex2 == 1) {
	
		$("#p2card1").text(player2[0]);
		$("#p2card2").text(player2[1]);
	
	}
	else if (playerIndex2 == 2) {
	
		$("#p3card1").text(player3[0]);
		$("#p3card2").text(player3[1]);
	
	}
	else if (playerIndex2 == 3) {
	
		$("#p4card1").text(player4[0]);
		$("#p4card2").text(player4[1]);
	}
	
}

function showOptions(options) {
	
	$(".button-option").addClass("hidden");
	
	if (options == "initial")
		$(".initial-option").removeClass("hidden");
	else if (options == "end")
		$(".end-option").removeClass("hidden");
	else if (options == "player")
		$(".otherPlayerChoice").removeClass("hidden");
	else if (options == "hand")
		$(".handChoice").removeClass("hidden");
	else if (options == "stash")
		$(".stashChoice").removeClass("hidden");
	else if (options == "confirm")
		$("#confirm").removeClass("hidden");
}

function startGame() {

	players = [true, true, true, true] // determines whether player is still in game
	
	playerHands = [player1, player2, player3, player4];
	
	$(".plabel").removeClass("out");
	$(".player").removeClass("out");
	
	showOptions("initial");
	
	var currentPlayerIndex = 0;
	
	// TODO: determine first player

	startTurn(currentPlayerIndex);
}

function startTurn(currentPlayerIndex) {

	$("#currentPlayer").text(currentPlayerIndex + 1);
	
	$(".plabel").removeClass("current");
	if (currentPlayerIndex == 0) {

		$("#p1label").addClass("current");
		
	}
	else if (currentPlayerIndex == 1) {
	
		$("#p2label").addClass("current");
	
	}
	else if (currentPlayerIndex == 2) {
	
		$("#p3label").addClass("current");
	
	}
	else if (currentPlayerIndex == 3) {
	
		$("#p4label").addClass("current");
	}
	
	updateDisplay(currentPlayerIndex);
	$("#info").text("please choose an option");
	
	$('#share').unbind('click');
	$('#swap').unbind('click');
	$('#sell').unbind('click');
	$('#grab').unbind('click');
	$('#end').unbind('click');

	$("#share").click(currentPlayerIndex, startShareInfo);
	$("#swap").click(currentPlayerIndex, startSwapStash);
	$("#sell").click(currentPlayerIndex, startSellSecrets);
	$("#grab").click(currentPlayerIndex, grabDrop);
	$("#end").click(currentPlayerIndex, endTurn);

}

function getOtherPlayers(playerIndex) {
	var otherPlayers = [];
	var otherPlayersIndex = 0;
	
	for (var i = 0; i < 4; i++) {
		
		if (i != playerIndex) {
			//if (playerHands[i] != null) {
			otherPlayers[otherPlayersIndex] = i+1;
			otherPlayersIndex++;
			//}
		}
		
	}
	
	return otherPlayers;
}

function startShareInfo(aPlayerIndex) {
	
	var playerIndex = aPlayerIndex.data;
	var otherPlayers = getOtherPlayers(playerIndex);
	
	// create shareInfo to hold data to swap hand with another hand
	var shareInfo = {
		turnSelection: "shareInfo",
		playerIndex: playerIndex,
		hand: playerHands[playerIndex],
		handSelection: 0,
		handIndex: 0,
		otherPlayers: otherPlayers,
		otherPlayerSelection: 0,
		otherPlayerIndex: 0,
		otherPlayerHand: null,
		otherPlayerHandSelection: 0,
		otherPlayerHandIndex: 0
	}
	
	selectPlayer(shareInfo, resolveSelectPlayer);
	
	/*
	var shareInfo1 = jQuery.extend({}, shareInfo);
	shareInfo1.otherPlayerSelection = otherPlayers[0];
	
	var shareInfo2 = jQuery.extend({}, shareInfo);
	shareInfo2.otherPlayerSelection = otherPlayers[1];
	
	var shareInfo3 = jQuery.extend({}, shareInfo);
	shareInfo3.otherPlayerSelection = otherPlayers[2];
	
	$("#share").toggleClass("hidden");
	$("#swap").toggleClass("hidden");
	$("#sell").toggleClass("hidden");
	
	$(".otherPlayerChoice").toggleClass("hidden");
	
	$(".otherPlayerChoice").unbind("click");
	
	$("#otherPlayerChoice1").click(shareInfo1, selectPlayer);
	$("#otherPlayerChoice2").click(shareInfo2, selectPlayer);
	$("#otherPlayerChoice3").click(shareInfo3, selectPlayer);
	
	$("#otherPlayerChoice1").text(otherPlayers[0]);
	$("#otherPlayerChoice2").text(otherPlayers[1]);
	$("#otherPlayerChoice3").text(otherPlayers[2]);
	
	$("#info").text("select player to share info with");
	$("#info").toggleClass("hidden");
	*/
	
	/*
	// choose player to share info
	var playerSelection = prompt("Select a player to share info with: " + otherPlayers);
	var otherPlayerIndex = parseInt(playerSelection) - 1;
	
	// choose one of your cards
	var handSelection = prompt("Select a card in your hand: " + hand);
	var handIndex = hand.indexOf(parseInt(handSelection));
	
	// player chooses one of their cards
	var otherPlayerHand = playerHands[otherPlayerIndex];
	var otherPlayerHandSelection = prompt("Player " + playerSelection + " will select a card in their hand: " + otherPlayerHand);
	var otherPlayerHandIndex = otherPlayerHand.indexOf(parseInt(otherPlayerHandSelection));
	
	// swap cards
	var temp = otherPlayerHand[otherPlayerHandIndex];
	otherPlayerHand[otherPlayerHandIndex] = hand[handIndex];
	hand[handIndex] = temp;
	
	updateDisplay(playerIndex);
	toggleTurnOptions();//$("#grab").removeClass("hidden");
	//$("#end").removeClass("hidden");
	*/
}

function selectPlayer(obj, func) {
	
	var obj1 = jQuery.extend({}, obj);
	obj1.otherPlayerSelection = obj.otherPlayers[0];
	
	var obj2 = jQuery.extend({}, obj);
	obj2.otherPlayerSelection = obj.otherPlayers[1];
	
	var obj3 = jQuery.extend({}, obj);
	obj3.otherPlayerSelection = obj.otherPlayers[2];
	
	//$("#share").toggleClass("hidden");
	//$("#swap").toggleClass("hidden");
	//$("#sell").toggleClass("hidden");
	
	//$(".otherPlayerChoice").toggleClass("hidden");
	
	showOptions("player");
	
	$(".otherPlayerChoice").unbind("click");
	
	$("#otherPlayerChoice1").click(obj1, func);
	$("#otherPlayerChoice2").click(obj2, func);
	$("#otherPlayerChoice3").click(obj3, func);
	
	$("#otherPlayerChoice1").text(obj.otherPlayers[0]);
	$("#otherPlayerChoice2").text(obj.otherPlayers[1]);
	$("#otherPlayerChoice3").text(obj.otherPlayers[2]);
	
	if (obj.turnSelection == "sellSecrets")
		$("#info").text("select player to sell secrets to");
	else
		$("#info").text("select player to share info with");
	$("#info").removeClass("hidden");
}

function resolveSelectPlayer(obj) {
	
	var objData = obj.data;
	//shareInfo.otherPlayerIndex = shareInfo.otherPlayers.indexOf(parseInt(shareInfo.otherPlayerSelection));
	objData.otherPlayerHand = playerHands[objData.otherPlayerSelection - 1];
	
	selectHand(objData, "current", resolveSelectHand);
	
}

function selectHand(obj, player, func) {

	var obj1 = jQuery.extend({}, obj);
	var obj2 = jQuery.extend({}, obj);
	
	if (player == "current") {
		obj1.handSelection = obj.hand[0];
		obj2.handSelection = obj.hand[1];
		$("#handChoice1").text(obj.hand[0]);
		$("#handChoice2").text(obj.hand[1]);
	}
	else { // selecting hand of opponent
		obj1.otherPlayerHandSelection = obj.otherPlayerHand[0];
		obj2.otherPlayerHandSelection = obj.otherPlayerHand[1];
		$("#handChoice1").text(obj.otherPlayerHand[0]);
		$("#handChoice2").text(obj.otherPlayerHand[1]);
		$("#confirm").removeClass("hidden");
		updateDisplay(obj.otherPlayerSelection - 1);
	}
	
	//$(".otherPlayerChoice").addClass("hidden");
	//$(".handChoice").toggleClass("hidden");
	showOptions("hand");
	
	$(".handChoice").unbind("click");
	
	$("#handChoice1").click(obj1, func);
	$("#handChoice2").click(obj2, func);
	
	$("#info").text("select card in hand");
	
}

function resolveSelectHand(obj) {
	
	var objData = obj.data;
	objData.handIndex = objData.hand.indexOf(parseInt(objData.handSelection));
	
	if (objData.turnSelection == "sellSecrets") {
		//alert("otherPlayerHand: " + objData.otherPlayerHand +
		//	"otherPlayerHandIndex: " + objData.otherPlayerHandIndex +
		//	"hand: " + objData.hand +
		//	"handIndex: " + objData.handIndex)
		
		$("#info").text("swapped your " + objData.hand[objData.handIndex] +
			" with player " + objData.otherPlayerSelection + "'s " + objData.otherPlayerHand[objData.otherPlayerHandIndex]);
		showOptions("end");
		
		// swap cards
		swapCards(objData.otherPlayerHand, objData.otherPlayerHandIndex, objData.hand, objData.handIndex);
		updateDisplay(objData.playerIndex);
	
	}
	else
		confirmPlayer(objData, "opponent", resolveConfirmOpponent);
}

function confirmPlayer(obj, player, func) {
	
	//$(".handChoice").toggleClass("hidden");
	//$("#confirm").toggleClass("hidden");
	showOptions("confirm");
	$("#confirm").unbind("click");
	$("#confirm").click(obj, func);
	
	updateDisplay("hideall");
	
	if (player == "opponent") {
		//$("#opponent").text(obj.otherPlayerSelection);
		$("#info").text("are you player " + obj.otherPlayerSelection + "?");
	}
	else { // confirm if currentPlayer
		//$("#opponent").text(obj.playerIndex + 1);
		$("#info").text("are you player " + (obj.playerIndex + 1) + "?");
	
	}
	
}

function resolveConfirmOpponent(obj) {
	
	var objData = obj.data;
	//shareInfo.handIndex = shareInfo.hand.indexOf(parseInt(shareInfo.handSelection));
	
	if (objData.turnSelection == "sellSecrets")
		showHand(objData, resolveShowHand);
	else
		selectHand(objData, "opponent", resolveSelectOpponentsHand);
	
	/*
	var shareInfo1 = jQuery.extend({}, shareInfo);
	shareInfo1.otherPlayerHandSelection = shareInfo.otherPlayerHand[0];
	var shareInfo2 = jQuery.extend({}, shareInfo);
	shareInfo2.otherPlayerHandSelection = shareInfo.otherPlayerHand[1];
	
	$("#confirm").toggleClass("hidden");
	$(".handChoice").toggleClass("hidden");
	$("#handChoice1").text(shareInfo.otherPlayerHand[0]);
	$("#handChoice2").text(shareInfo.otherPlayerHand[1]);
	
	$(".handChoice").unbind("click");
	
	$("#handChoice1").click(shareInfo1, selectHand3);
	$("#handChoice2").click(shareInfo2, selectHand3);
	
	updateDisplay(shareInfo.otherPlayerSelection - 1);
	
	$("#info").text("select card in hand");
	*/
}

function resolveSelectOpponentsHand(obj) {
	var objData = obj.data;
	objData.otherPlayerHandIndex = objData.otherPlayerHand.indexOf(parseInt(objData.otherPlayerHandSelection));
	
	confirmPlayer(objData, "current", resolveConfirmPlayer);
	
	/*
	$(".handChoice").toggleClass("hidden");
	$("#confirm").toggleClass("hidden");
	$("#opponent").text(shareInfo.playerIndex + 1);
	$("#confirm").unbind("click");
	$("#confirm").click(shareInfo, confirmOpponent2);
	
	updateDisplay("hideall");
	
	$("#info").text("are you player " + (shareInfo.playerIndex + 1) + "?");
	
	*/
}

function resolveConfirmPlayer(aShareInfo) {
	
	var shareInfo = aShareInfo.data;
	//shareInfo.otherPlayerHandIndex = shareInfo.otherPlayerHand.indexOf(parseInt(shareInfo.otherPlayerHandSelection));
	
	if (shareInfo.turnSelection == "sellSecrets")
		compareSecrets(shareInfo);
	else {
	
		$("#info").text("swapped your " + shareInfo.hand[shareInfo.handIndex] +
			" with player " + shareInfo.otherPlayerSelection + "'s " + shareInfo.otherPlayerHand[shareInfo.otherPlayerHandIndex]);
		
		swapCards(shareInfo.otherPlayerHand, shareInfo.otherPlayerHandIndex, shareInfo.hand, shareInfo.handIndex);
		
		updateDisplay(shareInfo.playerIndex);

		//$("#info").addClass("hidden");
		//$("#confirm").toggleClass("hidden");
		//$("#grab").toggleClass("hidden");
		//$("#end").toggleClass("hidden");
		showOptions("end");
	}
}

function startSwapStash(aPlayerIndex) {
	
	var playerIndex = aPlayerIndex.data;
	
	// create swapStash to hold data needed to swap stash with hand
	var swapStash = {
		turnSelection: "swapStash",
		playerIndex: playerIndex,
		hand: playerHands[playerIndex],
		handSelection: 0,
		handIndex: 0,
		stashSelection: 0,
		stashIndex: 0
	}
	
	selectStash(swapStash, resolveSelectStash);
	
	/*
	var swapStash1 = jQuery.extend({}, swapStash);
	swapStash1.stashSelection = stash[0];
	var swapStash2 = jQuery.extend({}, swapStash);
	swapStash2.stashSelection = stash[1];
	var swapStash3 = jQuery.extend({}, swapStash);
	swapStash3.stashSelection = stash[2];
	var swapStash4 = jQuery.extend({}, swapStash);
	swapStash4.stashSelection = stash[3];
	
	//$("#share").toggleClass("hidden");
	//$("#swap").toggleClass("hidden");
	//$("#sell").toggleClass("hidden");
	
	//$(".stashChoice").toggleClass("hidden");
	showOptions("stash");
		
	$("#stashChoice1").text(stash[0]);
	$("#stashChoice2").text(stash[1]);
	$("#stashChoice3").text(stash[2]);
	$("#stashChoice4").text(stash[3]);
	
	$(".stashChoice").unbind("click");
	
	$("#stashChoice1").click(swapStash1, selectStash);
	$("#stashChoice2").click(swapStash2, selectStash);
	$("#stashChoice3").click(swapStash3, selectStash);
	$("#stashChoice4").click(swapStash4, selectStash);
	
	$("#info").text("select card in stash");
	$("#info").toggleClass("hidden");
	*/
	
	/*var playerIndex = aPlayerIndex.data;
	var hand = playerHands[playerIndex];

	// choose card in stash
	//var stashSelection = getStashSelection();
	var stashSelection = prompt("Select a card in stash: " + stash);
	var stashIndex = stash.indexOf(parseInt(stashSelection));
	
	// choose one your cards
	var handSelection = prompt("Select a card in your hand: " + hand);
	var handIndex = hand.indexOf(parseInt(handSelection));
	
	// swap cards
	var temp = stash[stashIndex];
	stash[stashIndex] = hand[handIndex];
	hand[handIndex] = temp;
	
	updateDisplay(playerIndex);
	toggleTurnOptions();//$("#grab").removeClass("hidden");
	//$("#end").removeClass("hidden");;
	
	*/
	
}

function selectStash(obj, func) {
	
	var obj1 = jQuery.extend({}, obj);
	obj1.stashSelection = stash[0];
	var obj2 = jQuery.extend({}, obj);
	obj2.stashSelection = stash[1];
	var obj3 = jQuery.extend({}, obj);
	obj3.stashSelection = stash[2];
	var obj4 = jQuery.extend({}, obj);
	obj4.stashSelection = stash[3];
	
	//$("#share").toggleClass("hidden");
	//$("#swap").toggleClass("hidden");
	//$("#sell").toggleClass("hidden");
	
	//$(".stashChoice").toggleClass("hidden");
	showOptions("stash");
		
	$("#stashChoice1").text(stash[0]);
	$("#stashChoice2").text(stash[1]);
	$("#stashChoice3").text(stash[2]);
	$("#stashChoice4").text(stash[3]);
	
	$(".stashChoice").unbind("click");
	
	$("#stashChoice1").click(obj1, func);
	$("#stashChoice2").click(obj2, func);
	$("#stashChoice3").click(obj3, func);
	$("#stashChoice4").click(obj4, func);
	
	$("#info").text("select card in stash");
	$("#info").removeClass("hidden");
}

function resolveSelectStash(obj) {
	
	var objData = obj.data;
	objData.stashIndex = stash.indexOf(parseInt(objData.stashSelection));
	
	selectHand(objData, "current", resolveSelectHand2);
	
	/*
	var swapStash1 = jQuery.extend({}, swapStash);
	swapStash1.handSelection = swapStash.hand[0];
	var swapStash2 = jQuery.extend({}, swapStash);
	swapStash2.handSelection = swapStash.hand[1];
	
	$(".stashChoice").toggleClass("hidden");
	$(".handChoice").toggleClass("hidden");
	$("#handChoice1").text(swapStash.hand[0]);
	$("#handChoice2").text(swapStash.hand[1]);
	
	$(".handChoice").unbind("click");
	
	$("#handChoice1").click(swapStash1, selectHand);
	$("#handChoice2").click(swapStash2, selectHand);
	
	$("#info").text("select card in hand");
	*/
}

function resolveSelectHand2(aSwapStash) {
	
	var swapStash = aSwapStash.data;
	swapStash.handIndex = swapStash.hand.indexOf(parseInt(swapStash.handSelection));
	
	$("#info").text("swapped your " + swapStash.hand[swapStash.handIndex] + 
			" with " + stash[swapStash.stashIndex] + " in stash");
	
	swapCards(stash, swapStash.stashIndex, swapStash.hand, swapStash.handIndex);
	
	updateDisplay(swapStash.playerIndex);
	//$("#info").addClass("hidden");
	//$(".handChoice").toggleClass("hidden");
	//$("#grab").toggleClass("hidden");
	//$("#end").toggleClass("hidden");
	showOptions("end");
}

function swapCards(array1, index1, array2, index2) {
	var temp = array1[index1]
	array1[index1] = array2[index2];
	array2[index2] = temp;
}

function getSumOfHand(hand) {
	
	var sum = 0;
	// http://stackoverflow.com/questions/8550183/sum-of-values-in-an-array-using-jquery
	for (var i = 0; i < hand.length; i++) {
		sum += hand[i] << 0;
	}
	return sum;

}

function startSellSecrets(aPlayerIndex) {

	var playerIndex = aPlayerIndex.data;
	var otherPlayers = getOtherPlayers(playerIndex);
	
	// create sellSecrets to hold data needed share secrets
	var sellSecrets = {
		turnSelection: "sellSecrets",
		playerIndex: playerIndex,
		hand: playerHands[playerIndex],
		otherPlayers: otherPlayers,
		otherPlayerSelection: 0,
		otherPlayerIndex: 0,
		otherPlayerHand: null,
		handSelection: 0,
		handIndex: 0	
	}
	
	selectPlayer(sellSecrets, resolveSelectPlayer2);
	
	/*
	var hand = playerHands[playerIndex];
	
	// choose player to sell secrets
	var playerSelection = prompt("Select a player to sell secrets to: " + otherPlayers);
	var otherPlayerIndex = parseInt(playerSelection) - 1;
	
	// show your cards to player
	
	// if player has card equal to sum of your cards
	var sum = getSumOfHand(hand);
		
	var otherPlayerHand = playerHands[otherPlayerIndex];
	var otherPlayerHandIndex = otherPlayerHand.indexOf(sum);
	
	
	// swap that card with card of your choice
	if (otherPlayerHandIndex != -1) {
	
		var handSelection = prompt("Select a card in your hand to swap with Player " + playerSelection + "'s " + sum + ": " + hand);
		var handIndex = hand.indexOf(parseInt(handSelection));
		
		var temp = otherPlayerHand[otherPlayerHandIndex];
		otherPlayerHand[otherPlayerHandIndex] = hand[handIndex];
		hand[handIndex] = temp;
	
	}
	
	// else, nothing happens
	else
		alert("Player " + playerSelection + " does not have a " + sum);
		
	updateDisplay(playerIndex);
	toggleTurnOptions();
	*/

}

function resolveSelectPlayer2(obj) {
	var objData = obj.data;
	objData.otherPlayerHand = playerHands[objData.otherPlayerSelection - 1];
	
	confirmPlayer(objData, "opponent", resolveConfirmOpponent);
	
	
	//alert("opponent's hand: " + objData.otherPlayerHand);

}

function showHand(obj, func) {
	
	updateDisplay2Players(obj.playerIndex, obj.otherPlayerSelection - 1); 
	
	$("#info").text("player " + (obj.playerIndex + 1) + "'s hand: " + obj.hand);
	
	$("#confirm").unbind("click");
	$("#confirm").click(obj, func);
	
}

function resolveShowHand(obj) {
	var objData = obj.data;
	
	confirmPlayer(objData, "current", resolveConfirmPlayer);
}

function compareSecrets(obj) {

	var objData = obj;
	updateDisplay(objData.playerIndex);

	// if player has card equal to sum of your cards
	var sum = getSumOfHand(objData.hand);
	
	//var otherPlayerHand = playerHands[otherPlayerIndex];
	obj.otherPlayerHandIndex = objData.otherPlayerHand.indexOf(sum);
	
	// swap that card with card of your choice
	if (obj.otherPlayerHandIndex != -1) {
	
		//alert("otherPlayerHandIndex is " + otherPlayerHandIndex + ", so he has a " + sum);
		/*
		var handSelection = prompt("Select a card in your hand to swap with Player " + playerSelection + "'s " + sum + ": " + hand);
		var handIndex = hand.indexOf(parseInt(handSelection));
		
		var temp = otherPlayerHand[otherPlayerHandIndex];
		otherPlayerHand[otherPlayerHandIndex] = hand[handIndex];
		hand[handIndex] = temp;
		*/
		selectHand(objData, "current", resolveSelectHand);
	}
	else {
		//alert("Player " + playerSelection + " does not have a " + sum);
		//alert("otherPlayerHandIndex is " + otherPlayerHandIndex + ", so he does not have a " + sum);
		$("#info").text("player " + objData.otherPlayerSelection + " does not have a " + sum);
		showOptions("end");
	
	}	
}

function grabDrop(aPlayerIndex) {

	var playerIndex = aPlayerIndex.data;
	var hand = playerHands[playerIndex];

	// check drop
	$("#drop").text(drop);
	
	// if drop equal to sum of your cards
	var sum = getSumOfHand(hand);
	
	if (sum == drop) {
	
	// winner = true
	
		//alert("The drop matches! Player " + (playerIndex + 1) + " wins!");
		$("#win").text("the drop matches! player " + (playerIndex + 1) + " wins!");
		$("#gameInfo").addClass("hidden");
		//toggleTurnOptions();
		$("#start").removeClass("hidden");
		
	}
	
	// else
	
	else {
		
		//alert("The drop does not match. Player " + (playerIndex + 1) + " is out.");
		$("#info").removeClass("hidden");
		$("#info").text("The drop does not match. Player " + (playerIndex + 1) + " is out.");
		
		// remove player from player array
		//playerHands.splice(playerIndex, 1);
		
		// current player is now out of game
		players[playerIndex] = false;
		
		// reveal your cards, you're out of game
		
		// end turn
		$("#grab").addClass("hidden");
		
		/*toggleTurnOptions();
		
		var nextPlayerIndex = 0;
		var validPlayer = false;
		while (!validPlayer) {
			nextPlayerIndex = (playerIndex + 1) % playerHands.length;
			if (players[nextPlayerIndex] == false) {
				validPlayer = false;
				playerIndex++;
			}
			else
				validPlayer = true;
		
		}
		startTurn(nextPlayerIndex);
		*/
	}
		
	// TODO - sync with toggleturnoptions
	//$("#grab").addClass("hidden");

}

function endTurn(aPlayerIndex) {
	
	//toggleTurnOptions();
	$("#grab").addClass("hidden");
	$("#end").addClass("hidden");
	//$("#info").addClass("hidden");
	$("#share").removeClass("hidden");
	$("#swap").removeClass("hidden");
	$("#sell").removeClass("hidden");
	

	var playerIndex = aPlayerIndex.data;
	//var nextPlayerIndex = (playerIndex + 1) % playerHands.length;
	var nextPlayerIndex = 0;
	var validPlayer = false;
	while (!validPlayer) {
		nextPlayerIndex = (playerIndex + 1) % playerHands.length;
		if (players[nextPlayerIndex] == false) {
			validPlayer = false;
			playerIndex++;
		}
		else
			validPlayer = true;
	
	}
	
	startTurn(nextPlayerIndex);

}

function toggleTurnOptions() {
	$("#share").toggleClass("hidden");
	$("#swap").toggleClass("hidden");
	$("#sell").toggleClass("hidden");
	$("#grab").toggleClass("hidden");
	$("#end").toggleClass("hidden");
}


// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$("#start").click(init);
$("#info-button").click(setupInfo);

/*
function test() {
	shuffle(deck);
	$("#test").text(deck);

}

test();
*/