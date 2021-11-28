const buttonNext = document.querySelector('.buttons #new-quote');
const copyQuote = document.querySelector('.buttons #copyQuote');
const changeTheme = document.querySelector('.quote-box .buttons #theme');
const buttonFavorites = document.querySelector('.quote-box .buttons #favorites');

//fetch api https://api.quotable.io/random
const fetchRandomQuotes = () => {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://api.quotable.io/random');

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			const data = JSON.parse(xhr.responseText);
			document.querySelector(
				'#text'
			).innerHTML = `<i class='bx bxs-quote-left'></i>${data.content}<i class='bx bxs-quote-right'></i>`;
			document.querySelector('#author').innerText = `-${data.author}`;
			document.querySelector('#tags').innerText = data.tags[0];

			console.log(data);
		}
	};
	xhr.send();
	//set to default
	document.querySelector('.quote-box .buttons #favorites').innerHTML = '<i class="bx bx-star">';
	buttonFavorites.classList.remove('favorites');
};
//call the function for fetching the api
fetchRandomQuotes();

tippy('#copyQuote', {
	content: 'copied',
	trigger: 'click'
	// arrow: false
});
tippy('#theme', {
	content: 'Theme'
	// trigger: 'click'
});
tippy('#favorites', {
	content: 'Add to favorites'
	// trigger: 'hover'
});
tippy('#trash', {
	content: 'Delete'
	// trigger: 'hover'
});
tippy('#info', {
	content: '<span>&copy;PANFILO P. MACANTAN</span>',
	trigger: 'click',
	placement: 'right',
	allowHTML: true
});

// copy copy paste
copyQuote.addEventListener('click', (e) => {
	e.preventDefault();
	const text = document.querySelector('#text').innerText;
	const author = document.querySelector('#author').innerText;
	navigator.clipboard.writeText(text + author);
});

//function for favorites
buttonFavorites.addEventListener('click', function () {
	let storedQuotes;
	const text = document.querySelector('#text').innerText;
	const author = document.querySelector('#author').innerText;
	const tags = document.querySelector('#tags').innerText;
	const quote = {
		text,
		author,
		tags
	};

	if (localStorage.getItem('favorites') === null) {
		storedQuotes = [];
	} else {
		storedQuotes = JSON.parse(localStorage.getItem('favorites'));
	}

	this.classList.toggle('favorites');
	if (this.classList.contains('favorites')) {
		document.querySelector('.quote-box .buttons #favorites').innerHTML =
			'<i class="bx bxs-star">';

		storedQuotes.push(quote);
		localStorage.setItem('favorites', JSON.stringify(storedQuotes));
	} else {
		document.querySelector('.quote-box .buttons #favorites').innerHTML = '<i class="bx bx-star">';
		const findQuote = storedQuotes.indexOf(quote);
		storedQuotes.splice(findQuote, 1);
		localStorage.setItem('favorites', JSON.stringify(storedQuotes));
	}
	console.log('clicked');
});

//function to fetch the stored quotes
const fetchStoredQuotes = () => {
	let storedQuotes;
	let output = '';
	if (localStorage.getItem('favorites') === null) {
		storedQuotes = [];
	} else {
		storedQuotes = JSON.parse(localStorage.getItem('favorites'));
	}

	storedQuotes.forEach((quote, index) => {
		output += `<div class="card">
							<h3>Tags: <span id="tags">${quote.tags}</span></h3>
							<div class="quote-text">
								<p id="text">
									<i class='bx bxs-quote-left'></i>${quote.text}<i class='bx bxs-quote-right'></i>
								</p>
							</div>
							<div class="quote-author">
								<p id="author">${quote.author}</p>
							</div>
							<div class="buttons">
								<span id="trash" onclick="deleteQuote(${index})"><i class='bx bx-trash'></i></span>
								<span id="copyQuote" onclick="copyQuotes(this)"><i class="bx bx-copy-alt"></i></span>		
							</div>
					</div>`;
	});
	document.querySelector('.favorite_quotes_container').innerHTML = output;
};

//hide main container
document.querySelector('.quote-box .bookmark').addEventListener('click', function () {
	document.querySelector('.quote-box').style.display = 'none';
	document.querySelector('.favorite_quotes_container').style.display = 'flex';
	document.querySelector('.navigator').style.display = 'flex';
});
// read the text
changeTheme.addEventListener('click', function () {
	this.classList.toggle('dark');
	if (this.classList.contains('dark')) {
		document.querySelector('.quote-box .buttons #theme').innerHTML = "<i class='bx bx-moon'></i>";
		document.querySelector('.quote-box .buttons #favorites').innerHTML = '<i class="bx bx-star">';
		document.querySelector('.quote-box .buttons #favorites').style.color = '#fff';
		document.querySelector('h1').style.color = 'rgba(255, 255, 255, 0.9)';
		document.querySelector('.quote-box').style.backgroundColor = 'rgba(0,0,0,1)';
		document.querySelector('.quote-box').style.boxShadow =
			' 0px 2px 12px rgba(255, 255, 255, 0.3)';

		document.querySelector('.quote-box .quote-author #author').style.color = '#fff';
		document.querySelector('.quote-box  .quote-text #text').style.color =
			'rgba(255, 255, 255, 0.8)';
		document.querySelector('.quote-box  .buttons #copyQuote i').style.color = '#fff';
		document.querySelector('.quote-box  .buttons #theme i').style.color = '#fff';
		document.querySelector('h3 #tags').style.color = '#0e29c0';

		document.querySelector('h3').style.color = '#fff';
		document.querySelector('.quote-box .buttons #new-quote').style.backgroundColor = '#0e29c0';
		document.body.style.backgroundColor = '#000';
		document.querySelector('.quote-box .buttons #favorites').style.borderBottom =
			'2px solid #0e29c0';
		document.querySelector('.quote-box .buttons #theme').style.borderBottom = '2px solid #0e29c0';
		document.querySelector('.quote-box .buttons #copyQuote').style.borderBottom =
			'2px solid #0e29c0';
	} else {
		document.querySelector('.quote-box .buttons #theme').innerHTML = "<i class='bx bxs-sun'></i>";
		document.querySelector('.quote-box .buttons #favorites').innerHTML = '<i class="bx bx-star">';
		document.querySelector('.quote-box .buttons #favorites').style.color = '#000';

		document.querySelector('h1').style.color = 'rgba(0,0,0,0.9)';
		document.querySelector('.quote-box').style.backgroundColor = '#fff';
		document.querySelector('.quote-box').style.boxShadow = ' 0px 4px 12px rgba(0, 0, 0, 0.3)';
		document.querySelector('.quote-box .quote-author #author').style.color = '#000';
		document.querySelector('.quote-box  .quote-text #text').style.color = 'rgba(0,0,0,0.9)';
		document.querySelector('.quote-box  .buttons #copyQuote i').style.color = '#000';
		document.querySelector('.quote-box  .buttons #theme i').style.color = '#000';
		document.querySelector('h3 #tags').style.color = '#0e29c0';
		document.querySelector('h3').style.color = '#000';
		document.querySelector('.quote-box .buttons #new-quote').style.backgroundColor =
			'rgba(0,0,0,0.8)';
		document.body.style.backgroundColor = '#fff';
		document.querySelector('.quote-box .buttons #favorites').style.borderBottom =
			'2px solid rgba(0, 0, 0, 0.3)';
		document.querySelector('.quote-box .buttons #theme').style.borderBottom =
			'2px solid rgba(0, 0, 0, 0.3)';
		document.querySelector('.quote-box .buttons #copyQuote').style.borderBottom =
			'2px solid rgba(0, 0, 0, 0.3)';
	}
});
//next quotes
buttonNext.addEventListener('click', fetchRandomQuotes);
document.addEventListener('DOMContentLoaded', fetchStoredQuotes);

document.querySelector('.navigator').addEventListener('click', function (e) {
	document.querySelector('.quote-box').style.display = 'flex';
	document.querySelector('.favorite_quotes_container').style.display = 'none';
	this.style.display = 'none';
});

const deleteQuote = (index) => {
	let storedQuotes;
	if (localStorage.getItem('favorites') === null) {
		storedQuotes = [];
	} else {
		storedQuotes = JSON.parse(localStorage.getItem('favorites'));
	}
	storedQuotes.splice(index, 1);
	localStorage.setItem('favorites', JSON.stringify(storedQuotes));
	fetchStoredQuotes();
	console.log(index);
};

const copyQuotes = (text) => {
	const textToCopy = text.parentElement.parentElement.querySelector('#text').innerText;
	const authorTextToCopy = text.parentElement.parentElement.querySelector('#author').innerText;
	const content = `${textToCopy}${authorTextToCopy}`;
	navigator.clipboard.writeText(content);
	//console.log(`${textToCopy}${authorTextToCopy}`);
};
