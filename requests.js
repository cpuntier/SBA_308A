export async function getDeck(deck_id) {
    const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/`);
    // console.log("This is the deck", response.data)
    return response;
}


export async function getNewDeck() {
    const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    return response;
}


export async function drawCard(deck_id) {
    //    console.log("You are about to draw a card!");
    const card = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    //console.log("Here are your card(s)", card.data)
    let currentDeck = await getDeck(deck_id);
    // console.log("here is the current deck", currentDeck);
    return card.data;
}
