export function displayPlayerHand(player) {
    //    console.log("Here is the player:, ", player);
    const container = document.getElementById("gameContainer");
    container.appendChild(document.createElement("p"))



    for (let i = 0; i < player.length; i++) {
        //      console.log("Here is a card", player[i].cards[0].value/*, i*/);
        displayCard(player[i].cards[0], i, "player");
    }
}


export function displayOpponentHand(opponent){ // displays opponents hand
    for (let i = 0; i < opponent.length; i++) {
        displayCard(opponent[i].cards[0], i, "opponent");
    }

}

export function displayCard(card, number, player) {
    let ypos;
    let xpos;
    if(player === "player"){
        console.log("This is the player")
        ypos = 500;
        xpos = 0;
    }else{
        console.log("drawing opponent")
        ypos = 100;
        xpos = 500;
        console.log(xpos,ypos)
        number = number *-1
    }
    // console.log("Number is", number)
    // console.log("Drawing now");


    const template = document.querySelector(".card");
    const div = document.getElementById("gameContainer");
    const clone = template.content.cloneNode(true);
    const imgTag = clone.childNodes[1];


    const blockTemplate = document.querySelector(".blocked");
    const blocker = blockTemplate.content.cloneNode(true);
//    console.log("HERE IS BLOCKER", blocker);


    imgTag.setAttribute("src", card.image)
    imgTag.style.position = "absolute";
    xpos = xpos + (50*number);
    imgTag.style.left = xpos + "px";
    imgTag.style.top = ypos + "px";
    imgTag.style.width = "7vw";
    imgTag.style.height = "10vh";

    if(number == 0 && player ==="opponent"){
        console.log("blocker?");
        div.appendChild(blocker);
        imgTag.appendChild(blocker);
    }

    div.appendChild(clone);
}
