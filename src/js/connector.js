console.log('hello world');

window.TrelloPowerUp.initialize({
	'card-badges': function(t, opts){
		// return an array of card badges
		return t.card('all')
		.then(function(card){
			var cardActions = [];
			console.log(card);
			// request array of card activity
			fetch(`https://api.trello.com/1/cards/${card.id}/actions?key=%%TRELLO_KEY%%&token=%%TRELLO_TOKEN%%`)
			.then(response => response.json())
			.then(data => {
				/////////////
				// handle if there is no activity
				// should just result in today - card creation date
				/////////////
				console.log(data);
				cardActions = data;
				// find most recent date card entered column
				var cardMoves = cardActions.filter(isCardMoveAction);
				console.log('card moves:');
				console.log(cardMoves);

				var mostRecentMove = cardMoves[0]
				console.log('latest card move:');
				console.log(mostRecentMove);
				console.log(mostRecentMove.date);
				// figure out days between today and entry date
				var days = Date.today - mostRecentMove.date // in days
			});
			return [{
				// return days
				text: card.idShort
			}];
		})
	}
});

function isCardMoveAction(action) {
	console.log('in action');
	console.log(action);
	console.log('listAfter' in action.data)
  return 'listAfter' in action.data
}
