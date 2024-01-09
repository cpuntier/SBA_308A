const playerHand = [];
const oppHand = [];


async function getDeck(deck_id) {
    const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/`);
    // console.log("This is the deck", response.data)
    return response;
}


async function getNewDeck() {
    const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    return response;
}


async function drawCard(deck_id) {
    console.log("You are about to draw a card!");
    const card = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    //console.log("Here are your card(s)", card.data)
    let currentDeck = await getDeck(deck_id);
    // console.log("here is the current deck", currentDeck);
    return card.data;
}

async function startGame() {
    const newDeck = await getNewDeck();

    console.log("This is the newdeck", newDeck.data);

    playerHand.push(await drawCard(newDeck.data.deck_id));
    playerHand.push(await drawCard(newDeck.data.deck_id));

    oppHand.push(await drawCard(newDeck.data.deck_id));
    oppHand.push(await drawCard(newDeck.data.deck_id));

}
(async () => {
    await startGame();
    console.log("Hello this is your hand", playerHand);
    displayPlayerHand(playerHand);
    calcPlayerHandTotal(playerHand);
    calcPlayerHandTotal(oppHand);


})();

async function hitMe(player) {
    const hit = await drawCard(player[0].deck_id);
    player.push(hit)
}

function displayPlayerHand(player) {
    for (let i = 0; i < player.length; i++) {

        console.log("Here is a card", player[i].cards[0].value, i);
    }
}

function calcPlayerHandTotal(player) {
    let sum = 0;
    for (let i = 0; i < player.length; i++) {
        console.log(typeof player[i].cards[0].value);
        let currentCard = player[i].cards[0].value;
        if (currentCard === "ACE") {
            console.log("ACE IS HERE")
            sum += 11;
            if (sum > 21) {
                sum -= 10;
            }
        } else if (currentCard === "KING" ||currentCard ===  "QUEEN" || currentCard === "JACK") {
            console.log("FACE CARD IS HERE")
            sum += 10;
        } else {
            sum += parseInt(currentCard);
        }
    }

    console.log("Here is the sum total", sum);
}

// drawCard(newDeck.data.deckid);