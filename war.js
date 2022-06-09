const cardNames = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
const suits = ['clubs', 'diamonds', 'hearts', 'spades']
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
    const cardBattle = []
    players.forEach(player => {
      const topCard = player.cards.shift()
      cardBattle.push(topCard)
    })
    console.log(cardBattle)
    if (cardBattle[0].points > cardBattle[1].points) {
      players[0].cards.push(...cardBattle)
    }
    else if (cardBattle[0].points < cardBattle[1].points) {
      players[1].cards.push(...cardBattle)
    }
    cardBattle.splice(0)
    console.log(cardBattle)
    console.log(players[0].cards.length)
    console.log(players[1].cards.length)
  }
  playRound()
}

war(2)
