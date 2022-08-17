//Example fetch using deckofcards api
let deckId = localStorage.getItem('deckId');

if (!localStorage.getItem('deckId')) {
  fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      localStorage.setItem("deckId", data.deck_id);
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}

document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      if (data.remaining == 0) {
        newDeck()
      }
      let val1 = Number(convertValue(data.cards[0].value))
      let val2 = Number(convertValue(data.cards[1].value))
      document.querySelector('#playerone').src = data.cards[0].image; //
      document.querySelector('#playertwo').src = data.cards[1].image
      chooseWinner(val1, val2)
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}

function convertValue(val) {
  switch (val) {
    case "JACK":
      val = 11
      break;
    case "QUEEN":
      val = 12
      break;
    case "KING":
      val = 13
      break;
    case "ACE":
      val = 14
      break;
  }
  return val
}

function chooseWinner(val1, val2) {
  if (val1 > val2) {
    document.querySelector('.winner').innerHTML = "Player 1 WINS!";
  } else if (val1 < val2) {
    document.querySelector('.winner').innerHTML = "Player 2 WINS!";
  } else {
    document.querySelector('.winner').innerHTML = "DRAW!";
  }
}

function newDeck() {
  fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      localStorage.setItem("deckId", data.deck_id);
      location.reload()
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}
