const cardNames = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const suits = ['\u2663', '\u2666', '\u2665', '\u2660']
const points = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

class Deck {
  constructor() {
    this.cards = []
    this.fillDeck()
  }

  fillDeck() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 13; j++) {
        const newCard = new Card(cardNames[j], suits[i], points[j])
        this.cards.push(newCard)
      }
    }
  }
}

class Card {
  constructor(cardName, suit, points) {
    this.cardName = cardName
    this.suit = suit
    this.points = points
  }
}

class Player {
  constructor(name) {
    this.name = name
    this.cards = []
    this.warCards = []
    this.hasWarCards = true
  }
}

function shuffle(deckName) {
  const tempDeck1 = deckName.cards
  const tempDeck2 = []
  while (tempDeck1.length > 0) {
    const randomNum = [Math.floor(Math.random() * tempDeck1.length)]
    const randomCard = tempDeck1[randomNum]
    tempDeck2.push(randomCard)
    tempDeck1.splice(randomNum, 1)
  }
  deckName.cards = tempDeck2
}

function war(playerCount) {
  const deck = new Deck()
  shuffle(deck)
  const players = []
  const cardBattle = []
  let roundCount = 0

  function dealWar() {
    for (i = 1; i <= playerCount; i++) {
      const newPlayer = new Player(`Player${i}`)
      players.push(newPlayer)
    }
    let nextUp = 0
    for (i = 0; i < deck.cards.length; i++) {
      players[nextUp].cards.push(deck.cards[i])
      if (players[0].cards.length !== players[players.length - 1].cards.length) {
        nextUp++
      } else {
        nextUp = 0
      }
    }
  }
  dealWar()

  function playRound() {
    roundCount++
    console.log(`------ Round ${roundCount} ------`)
    console.log('')
    players.forEach(player => {
      const topCard = player.cards.shift()
      cardBattle.push(topCard)
    })
    console.log(`Player 1: ${cardBattle[0].cardName}${cardBattle[0].suit}`)
    console.log(`Player 2: ${cardBattle[1].cardName}${cardBattle[1].suit}`)
    console.log('')
    if (cardBattle[0].points > cardBattle[1].points) {
      console.log('Player 1 wins the round')
      console.log('')
      players[0].cards.push(...cardBattle)
    }
    else if (cardBattle[0].points < cardBattle[1].points) {
      console.log('Player 2 wins the round')
      console.log('')
      cardBattle.reverse()
      players[1].cards.push(...cardBattle)
    } else {
      console.log('WAR!!!')
      console.log('')
      tie()
    }
    cardBattle.splice(0)
    console.log(`Player 1 now has ${players[0].cards.length} cards`)
    console.log(`Player 2 now has ${players[1].cards.length} cards`)
    console.log('')
  }

  function tie() {
    players.forEach(player => {
      if (player.cards.length >= 4) {
        player.hasWarCards = true
        for (i = 0; i < 4; i++) {
          player.warCards.push(player.cards.shift())
        }
      } else if (player.cards.length > 0) {
        player.hasWarCards = true
        while (player.cards.length > 0) {
          player.warCards.push(player.cards.shift())
        }
      } else {
        player.hasWarCards = false
        player.warCards.push(cardBattle[players.indexOf(player)])
        cardBattle.splice(players.indexOf(player), 1)
      }
    })
    if (players[0].hasWarCards === true && players[1].hasWarCards === true) {
      console.log(`Player 1 puts ${players[0].warCards.length - 1} cards down, and their next card is ${players[0].warCards[players[0].warCards.length - 1].cardName}${players[0].warCards[players[0].warCards.length - 1].suit}`)
      console.log(`Player 2 puts ${players[1].warCards.length - 1} cards down, and their next card is ${players[1].warCards[players[1].warCards.length - 1].cardName}${players[1].warCards[players[1].warCards.length - 1].suit}`)
    } else if (players[0].hasWarCards === false) {
      console.log(`Player 1 doesn't have any more cards, so their war card is still ${players[0].warCards[players[0].warCards.length - 1].cardName}${players[0].warCards[players[0].warCards.length - 1].suit}`)
      console.log(`Player 2 puts ${players[1].warCards.length - 1} cards down, and their next card is ${players[1].warCards[players[1].warCards.length - 1].cardName}${players[1].warCards[players[1].warCards.length - 1].suit}`)
    } else if (players[1].hasWarCards === false) {
      console.log(`Player 1 puts ${players[0].warCards.length - 1} cards down, and their next card is ${players[0].warCards[players[0].warCards.length - 1].cardName}${players[0].warCards[players[0].warCards.length - 1].suit}`)
      console.log(`Player 2 doesn't have any more cards, so their war card is still ${players[1].warCards[players[1].warCards.length - 1].cardName}${players[1].warCards[players[1].warCards.length - 1].suit}`)
    }
    console.log('')
    if (players[0].warCards[players[0].warCards.length - 1].points > players[1].warCards[players[1].warCards.length - 1].points) {
      console.log('Player 1 wins the war!')
      console.log('')
      players[0].cards.push(...players[0].warCards, ...cardBattle, ...players[1].warCards)
      players[0].warCards.length = 0
      players[1].warCards.length = 0
    } else if (players[0].warCards[players[0].warCards.length - 1].points < players[1].warCards[players[1].warCards.length - 1].points) {
      console.log('Player 2 wins the war!')
      console.log('')
      players[1].cards.push(...players[1].warCards, ...cardBattle, ...players[0].warCards)
      players[0].warCards.length = 0
      players[1].warCards.length = 0
    } else {
      console.log('DOUBLE WAR!!!')
      tie()
    }
  }

  while (players[0].cards.length > 0 && players[1].cards.length > 0) {
    playRound()
  }

  if (players[0].cards.length === 52) {
    console.log('PLAYER 1 IS THE WINNER!!!!!')
  }
  if (players[1].cards.length === 52) {
    console.log('PLAYER 2 IS THE WINNER!!!!!')
  }
}

war(2)
