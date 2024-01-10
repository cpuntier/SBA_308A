import { drawCard, getDeck, getNewDeck } from "./requests.js";
import { displayPlayerHand, displayCard, displayOpponentHand } from "./displays.js";

// import { cheatButton } from "./cheat.js";


const playerHand = [];
const oppHand = [];

const hitMeBtn = document.getElementById("hitMe");
const standBtn = document.getElementById("stand");
const cheatBtn = document.getElementById("cheatSkill");



async function startGame() {// starts game flow
    const newDeck = await getNewDeck();

    console.log("This is the newdeck", newDeck.data);

    playerHand.push(await drawCard(newDeck.data.deck_id));
    playerHand.push(await drawCard(newDeck.data.deck_id));

    oppHand.push(await drawCard(newDeck.data.deck_id));
    oppHand.push(await drawCard(newDeck.data.deck_id));
    hitMeBtn.addEventListener("click", hitMeHandler)
    standBtn.addEventListener("click", standHandler);
    cheatBtn.addEventListener("click", cheatButton);
}


(async () => {
    await startGame();
    //    console.log("Hello this is your hand", playerHand);
    displayPlayerHand(playerHand); // displays player hand
    displayOpponentHand(oppHand); // displays opponents hand

    calcPlayerHandTotal(playerHand); // calculates totals of players hands
    calcPlayerHandTotal(oppHand);


})();


async function hitMe(player, person) { // allows player to draw card
    const hit = await drawCard(player[0].deck_id);
    player.push(hit)
    let returnVal = hit.cards[0]
    displayCard(returnVal, player.length - 1,person);
    const deck = await getDeck(player[0].deck_id);
    console.log("This is the deck",deck);
}




function calcPlayerHandTotal(player) {//calcs hand total
    let sum = 0;
    let flagAce = 0;
    let aceLow = 0;
    for (let i = 0; i < player.length; i++) {
        // console.log(typeof player[i].cards[0].value);

        let currentCard = player[i].cards[0].value;
        if (currentCard === "ACE") {
            flagAce = 1;
            console.log("ACE!!!")
            sum += 11;
            if( sum > 21){
                aceLow = 1;
                sum -= 10;
            }else if(aceLow){
                sum += 1;
            }

        }
        else if (currentCard === "KING" || currentCard === "QUEEN" || currentCard === "JACK") {
            console.log("Face card here")
            sum += 10;
            if(flagAce && !aceLow && sum > 21){
                aceLow = 1;
                sum -= 1;
            }
        } else {
            sum += parseInt(currentCard);
            if(sum > 21 && !aceLow && flagAce){
                aceLow = 1;
                sum -=10;
            }
    }if(currentCard ==="JOKER"){
        sum += 100;
        break;
    }
}
    return sum;
}

async function hitMeHandler() { // handler function for hitme button
    console.log("You decided to hit");
    await hitMe(playerHand, "player");
    console.log("nohey?")
    console.log("hey");
    let sum = calcPlayerHandTotal(playerHand);
    console.log("Here is the sum total of your hand", sum);
    if(sum > 21){
        console.log("BUST");
        bust();
    }
}

function bust(){ //what happens if bust
    hitMeBtn.removeEventListener("click", hitMeHandler);
    cheatBtn.removeEventListener("click",cheatButton);
    standBtn.removeEventListener("click", standHandler);
    const blocker = document.getElementById("blocker");
    console.log(blocker);
    blocker.remove();

    const container = document.getElementById("gameContainer");
    const template = document.getElementById("Bust");
    const bustText = template.content.cloneNode(true);
    console.log(bustText.childNodes);

    container.appendChild(bustText);
}

async function standHandler() { //stand button handler
    let playerTotal = calcPlayerHandTotal(playerHand);
    let oppTotal = calcPlayerHandTotal(oppHand);
    console.log("Player has this hand", playerTotal);
    console.log("House has this hand", oppHand);
    // displayOpponentHand(oppHand);
    const blocker = document.getElementById("blocker");
    blocker.remove();

    while (oppTotal < 17) {

        await hitMe(oppHand, "opponent");
//displayOpponentHand(oppHand);
        oppTotal = calcPlayerHandTotal(oppHand);
        console.log(oppTotal);
    }
    if(oppTotal > 21){
        console.log("Player Wins")
        return;
    }

    if (playerTotal > oppTotal) {
        console.log("Player Wins")
        const container = document.getElementById("gameContainer");
        const template = document.getElementById("winText");
        const winText = template.content.cloneNode(true);
        console.log(winText.childNodes);
    
        container.appendChild(winText);

        hitMeBtn.removeEventListener("click", hitMeHandler);
        cheatBtn.removeEventListener("click",cheatButton);
        standBtn.removeEventListener("click", standHandler);
    
    
        return;
    } else {
        console.log("'House wins")
        const container = document.getElementById("gameContainer");
        const template = document.getElementById("loseText");
        const loseText = template.content.cloneNode(true);
        console.log(loseText.childNodes);
    
        container.appendChild(loseText);

        hitMeBtn.removeEventListener("click", hitMeHandler);
        cheatBtn.removeEventListener("click",cheatButton);
        standBtn.removeEventListener("click", standHandler);
    

        return;
    }
}





// drawCard(newDeck.data.deckid);


async function cheatButton(){ // cheat player can cheat and get a new deck with jokers in hopes opponent draws poorly.
    console.log("you are cheating");
    let cheated =  await axios.post("https://deckofcardsapi.com/api/deck/new/?jokers_enabled=true ");
    playerHand[0].deck_id = cheated.data.deck_id;
    console.log(playerHand[0]);
}