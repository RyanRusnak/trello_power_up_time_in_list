console.log('hello world');

window.TrelloPowerUp.initialize({
	'card-badges': function(t, opts){
		// return an array of card badges
		return t.card('all')
		.then(function(card){
			// request array of card activity
			return fetch(`https://api.trello.com/1/cards/${card.id}/actions?key=%%TRELLO_KEY%%&token=%%TRELLO_TOKEN%%`)
			.then(response => response.json())
			.then(data => {
				console.log(card);
				var cardMoves = data.filter(isCardMoveAction);
				// put 0 days if there is no activity history
				if (cardMoves.length == 0) {
					return Math.round((Date.now() - Date.parse(card.dateLastActivity)) / (1000 * 60 * 60 * 24))
				}
				// figure out days between today and entry date
				return Math.round((Date.now() - Date.parse(cardMoves[0].date)) / (1000 * 60 * 60 * 24));
			}).then(function(days){
				return [{
					// return days
					text: pluralize(days)
				}]
			});
			return [];
		})
	}
});

function isCardMoveAction(action) {
  return 'listAfter' in action.data
}

function pluralize(num){
	if (num == 0){
		return '< 1 day'
	}
	else if (num == 1){
		return num + ' day'
	}else{
		return num + ' days'
	}
}
