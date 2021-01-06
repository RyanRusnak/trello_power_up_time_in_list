console.log('hello world');

window.TrelloPowerUp.initialize({
	'card-badges': function(t, opts){
		// return an array of card badges
		return t.card('all')
		.then(function(card){
			console.log(card);
			// request array of card activity
			fetch('https://api.trello.com/1/members/me/boards?key=%%TRELLO_KEY%%&token=%%TRELLO_TOKEN%%')
			.then(response => response.json())
			.then(data => console.log(data));
			// find most recent date card entered column
			// figure out days between today and entry date
			return [{
				// return days
				text: card.idShort
			}];
		})
	}
});
