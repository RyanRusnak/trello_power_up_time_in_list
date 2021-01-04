console.log('hello world');

window.TrelloPowerUp.initialize({
	'card-badges': function(t, opts){
		// return an array of card badges
		return t.card('activity')
		.then(function(card){
			console.log(card);
			return [{
				text: card.idShort
			}];
		})
	}
});