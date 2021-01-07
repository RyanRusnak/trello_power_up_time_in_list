console.log('hello world');

window.TrelloPowerUp.initialize({
	'card-badges': function(t, opts){
		// return an array of card badges
		return t.card('all')
		.then(function(card){
			var cardActions = [];
			console.log(card);
			// request array of card activity
			return fetch(`https://api.trello.com/1/cards/${card.id}/actions?key=%%TRELLO_KEY%%&token=%%TRELLO_TOKEN%%`)
			.then(response => response.json())
			.then(data => {
				/////////////
				// handle if there is no activity
				// should just result in today - card creation date
				/////////////
				// find most recent date card entered column
				var cardMoves = data.filter(isCardMoveAction);
				if cardMoves.length == 0 {
					return 0
				}
				var mostRecentMove = cardMoves[0]
				// figure out days between today and entry date
				return Math.round((Date.now() - Date.parse(mostRecentMove.date)) / 171701012);
			}).then(function(cardData){
				console.log('Printing card data');
				console.log(cardData);
				return [{
					// return days
					text: cardData + ' days'
				}]
			});
			return [];
		})
	}
});

function isCardMoveAction(action) {
  return 'listAfter' in action.data
}
