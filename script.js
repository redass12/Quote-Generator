const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

// Show Loading

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function removeLoadingSpinner(){
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote () {
    showLoadingSpinner();
    //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json(); 
        //if Author is blank , add Unknown
        authorText.innerText = data.quoteAuthor.length > 0 ? data.quoteAuthor:'Unknown';
        //Reduce font size for long quotes
        if(data.quoteText.length  > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // stop loader and show the quote text
        removeLoadingSpinner();
    }catch(error){
        getQuote();
    }
}

// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl , '_blank');
}


//Event Listeners
newQuoteBtn.addEventListener('click' , getQuote);
twitterBtn.addEventListener('click' , tweetQuote);

// On Load 
getQuote();