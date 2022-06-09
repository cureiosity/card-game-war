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
    const cardBattle = []
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
      players[1].cards.push(...cardBattle)
    } else {
      console.log('WAR!!!')
      console.log('')
      const warBattle = []
      players.forEach(player => {
        const warCards = []
        while (warCards.length < 4) {
          warCards.push(player.cards.shift())
        }
        warBattle.push(warCards)
      })
      console.log(`Player 1 puts three cards down, and their next card is ${warBattle[0][3].cardName}${warBattle[0][3].suit}`)
      console.log(`Player 2 puts three cards down, and their next card is ${warBattle[1][3].cardName}${warBattle[1][3].suit}`)
      console.log('')
      if (warBattle[0][3].points > warBattle[1][3].points) {
        console.log('Player 1 wins the war!')
        console.log('')
        players[0].cards.push(...warBattle[0], ...cardBattle, ...warBattle[1])
      } else if (warBattle[0][3].points < warBattle[1][3].points) {
        console.log('Player 2 wins the war!')
        console.log('')
        players[1].cards.push(...warBattle[1], ...cardBattle, ...warBattle[0])
      }
    }
    cardBattle.splice(0)
    console.log(`Player 1 now has ${players[0].cards.length} cards`)
    console.log(`Player 2 now has ${players[1].cards.length} cards`)
    console.log('')
  }

  while (players[0].cards.length > 0 && players[1].cards.length > 0) {
    playRound()
  }

  if (players[0].cards.length === 52) {
    console.log('PLAYER 1 IS THE WINNER!!!!!!')
  }
  if (players[1].cards.length === 52) {
    console.log('PLAYER 2 IS THE WINNER!!!!!!')
  }
}

war(2)
