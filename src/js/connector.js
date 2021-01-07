console.log('hello world');

window.TrelloPowerUp.initialize({
	'card-badges': function(t, opts){
		// return an array of card badges
		return t.card('all')
		.then(function(card){
			var cardActions = [];
			// request array of card activity
			return fetch(`https://api.trello.com/1/cards/${card.id}/actions?key=%%TRELLO_KEY%%&token=%%TRELLO_TOKEN%%`)
			.then(response => response.json())
			.then(data => {
				var cardMoves = data.filter(isCardMoveAction);
				// put 0 days if there is no activity history
				if (cardMoves.length == 0) {
					return 0
				}
				// figure out days between today and entry date
				return Math.round((Date.now() - Date.parse(cardMoves[0].date)) / 171701012);
			}).then(function(days){
				console.log(days);
				return [{
					// return days
					text: days + ' days'
				}]
			});
			return [];
		})
	}
});

function isCardMoveAction(action) {
  return 'listAfter' in action.data
}
