const playerHand = [];
const oppHand = [];

const hitMeBtn = document.getElementById("hitMe");
const standBtn = document.getElementById("stand");





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
    console.log("Here is the player:, ",player);
    for (let i = 0; i < player.length; i++) {
        console.log("Here is a card", player[i].cards[0].value/*, i*/);
    }
}


function calcPlayerHandTotal(player) {
    let sum = 0;
    let flagAce = 0;
    for (let i = 0; i < player.length; i++) {
        // console.log(typeof player[i].cards[0].value);
        let currentCard = player[i].cards[0].value;
        if (currentCard === "ACE") {
            // console.log("ACE IS HERE")
            if(sum + 11 > 21){
                sum += 1
            }else{
                sum += 11;
            }
        } else if (currentCard === "KING" || currentCard === "QUEEN" || currentCard === "JACK") {
            // console.log("FACE CARD IS HERE")
            sum += 10;
            if(sum > 21 && flagAce){
                sum -= 10;
            }
        } else {
            sum += parseInt(currentCard);
        }
        if (sum > 21 && flagAce === 1) {
            sum -= 10;
            flagAce = 0;
        }
    }
    return sum;
}

async function hitMeHandler() {
    await hitMe(playerHand);
    displayPlayerHand(playerHand);
    console.log("Here is the sum total of your hand", calcPlayerHandTotal(playerHand));
}

async function standHandler() {
    let playerTotal = calcPlayerHandTotal(playerHand);
    let oppTotal = calcPlayerHandTotal(oppHand);
    console.log("Player has this hand",playerTotal);
    console.log("House has this hadn", oppHand);
    displayPlayerHand(oppHand);

    while (oppTotal < 17) {

        await hitMe(oppHand);
        displayPlayerHand(oppHand);
        oppTotal = calcPlayerHandTotal(oppHand);
        console.log(oppTotal);
    }
    if (playerTotal > oppTotal) {
        console.log("Player Wins")
    } else {
        console.log("'House wins")
    }
}
hitMeBtn.addEventListener("click", hitMeHandler)
standBtn.addEventListener("click", standHandler);

function drawHand(){
    const  template = document.querySelector(".card")
}
// drawCard(newDeck.data.deckid);