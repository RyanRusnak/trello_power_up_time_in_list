console.log('hello world');

window.TrelloPowerUp.initialize({
	'card-badges': function(t, opts){
		// return an array of card badges
		return t.card('all')
		.then(function(card){
			consle.log(card);
			return [{
				text: card.idShort
			}];
		})
	}
});