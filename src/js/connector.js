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
				cardActions = data;
				// find most recent date card entered column
				var cardMoves = cardActions.filter(isCardMoveAction);
				var mostRecentMove = cardMoves[0]
				// figure out days between today and entry date
				var days = Math.round((Date.now() - mostRecentMove.date)/ 171701012)
				console.log(days)
			});
			return [{
				// return days
				text: days
			}];
		})
	}
});

function isCardMoveAction(action) {
  return 'listAfter' in action.data
}
