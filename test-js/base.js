//the window.onload event handler executes the AJAX request when the page is finished loading
window.onload = (HttpRequest("quotes.json",storeJSON));
//jsonOutput contains the object requested and parsed from the AJAX request
var jsonOutput;
//
var currentQuote = 0;

//the storeJson function parses the Ajax response and assigns the value to jsonOutpuit
function storeJSON(fileOutput){
	jsonOutput = JSON.parse(fileOutput);
}

document.getElementById('next-button').onclick = changeQuestion;

//changeQuestion produces a random number between the length of jsonOuput and 0 and interacts with the DOM to change the quote text
function changeQuestion(){
	var quoteArray = jsonOutput.quotes;
	var questionLength = quoteArray.length;
	//assigns the random number
	var randNumber = Math.floor(Math.random() * questionLength);


	//if the currentQuote number is equal to the randNumber then the function is called recursively to generate a number which does not equal the previous question
	if(currentQuote === randNumber){
		return changeQuestion();
	}
	//hides the current quote by adding the visible-hidden class which fades the quote text in 500ms
	document.getElementById("quote-container").classList.add("visible-hidden");
	if(document.getElementById("quote-container").classList.contains("visible-shown")){
		document.getElementById("quote-container").classList.remove("visible-shown");
	}
	


	//setTimeout is set to 500ms, after which the following anonymous function will execute which inserts the new HTML and fades in the text by adding the visible shown class
	setTimeout(function(){
		

		document.getElementById("quote-container").classList.remove("visible-hidden");
		document.getElementById("quote-container").classList.add("visible-shown");
		document.getElementById("quote-text").innerHTML = quoteArray[randNumber]["quote-text"]; 
		document.getElementById("quote-author").innerHTML = quoteArray[randNumber]["quote-author"];
		currentQuote = randNumber;
	},500);	

}