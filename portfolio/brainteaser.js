/* brainteaser.js */



var main = function() {
  //document.getElementById('go-button').onclick = go;
	go();
  
	$(".brainteaser-input").each(function() {
		var elem = $(this);

		// Save current value of element
		elem.data('oldVal', elem.val());

		// Look for changes in the value
		elem.bind("propertychange change click keyup input paste", function(event){
			// If value has changed...
			if (elem.data('oldVal') != elem.val()) {
				// Updated stored value
				elem.data('oldVal', elem.val());

				go();
			}
		});
	});

}

var go = function() {
  //document.getElementById('question').style.display = 'block';
  var firstNumber = document.getElementById('first-number').value;
  var numberOfEntries = document.getElementById('number-of-entries').value;
  var entryList = document.getElementById('entry-list');
  
  if (firstNumber == "121915" || numberOfEntries == "121915")
  	document.location.href="../personal.html";
  
  while (entryList.firstChild) {
    entryList.removeChild(entryList.firstChild);
  }
  
  insertEntry(firstNumber, entryList);
  
  //Convert number into string
	var currentEntry = firstNumber;
		
	for (var i = 0; i < numberOfEntries - 1; i++) {
			
		var currentDigitPointer = 0; //initialize current digit pointer
		var nextEntry = ""; //initialize next entry
			
		//check if current digit exists within entry
		while (currentDigitPointer < currentEntry.length) {
			var currentDigit = currentEntry.charAt(currentDigitPointer);
			var currentDigitCount = 1; //there is at least 1 instance of current digit
			var nextDigit = 0; //initialize next digit
			var nextDigitPointer = currentDigitPointer + 1;
			
			//check if another digit exists after current digit
			if (nextDigitPointer < currentEntry.length) //if so,
				nextDigit = currentEntry.charAt(nextDigitPointer); //update next digit
			else { //otherwise, //add current digit and digit count (1) to entry
				nextEntry = addCountAndDigitToString(currentDigitCount, currentDigit, nextEntry);
				break; //stop checking if current digit exists within entry
			}
			
			//check if next digit is same as current digit
			while (nextDigit == currentDigit)	{
				currentDigitCount++; //increment digit count
				nextDigitPointer++; //increment next digit pointer
				
				//check if another digit exists after current digit
				if (nextDigitPointer < currentEntry.length) //if so,
					nextDigit = currentEntry.charAt(nextDigitPointer); //update next digit
				else //otherwise,
					break; // stop checking if next digit is same as current digit
			}//end while-loop
			
			//add current digit count and current digit to entry
			nextEntry = addCountAndDigitToString(currentDigitCount, currentDigit, nextEntry);
			
			//update digit pointer and digit
			currentDigitPointer = nextDigitPointer;
			currentDigit = nextDigit;
		}//end while-loop
			
		insertEntry(nextEntry, entryList);//System.out.println(nextEntry); //print next entry
		currentEntry = nextEntry; //next entry becomes current entry
	}//end for-loop
  
}//end go

var insertEntry = function(entry, entryList) {
  var newElement = document.createElement('li');
  //newElement.classList.add('note-list-item');
  newElement.innerHTML = entry;
  entryList.insertBefore(newElement, null);

  }

var addCountAndDigitToString = function(digitCount, digit, string)	{
	//convert count and digit to string
	//String currentDigitCountString = Integer.toString(digitCount);
	//String currentDigitString = Character.toString(digit);
		
	//add count and digit to string
	string = string.concat(digitCount);
	string = string.concat(digit);
	
	return string;
}//end addCountAndDigitToString

window.onload = main;