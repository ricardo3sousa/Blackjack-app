/********************************/
/********* cria baralho *********/
/********************************/
let deck = new Array;

function criaDeck() {
    for (d = 0; d < 4; d++) {
        for (i = 1; i <= 10; i++) {
            if (i == 10) {
                for (f = 0; f < 3; f++) {
                    let fig = 10;
                    deck.push(fig);
                }
            }
            let card = i;
            deck.push(card);
        }
    }
}

criaDeck();
/********************************/
/********************************/
/********************************/




/********************************/
/********  DOM selectors ********/
/********************************/
let player = document.getElementById('player');
let dealer = document.getElementById('dealer');
let playerScore = document.getElementById('playerScore');
let dealerScore = document.getElementById('dealerScore');
let result = document.getElementById('result');
let btnHit = document.getElementById('btnHit');
let btnStand = document.getElementById('btnStand');
let row = document.querySelector('.rowP');
let rowD = document.querySelector('.rowD');
/********************************/
/********************************/
/********************************/




/********************************/
/********  inicialização ********/
/********************************/
let playerHand;
let dealerHand;

function randomCard(baralho) {
    let i = Math.floor(baralho.length * Math.random());
    return baralho[i];
}

function getHandValue(hand) {
    var sum = 0;
    for (var i = 0; i < hand.length; i++) {
        sum += hand[i];
    }
    return sum;
}

function startGame() {
    playerHand = [randomCard(deck), randomCard(deck)];
    dealerHand = [randomCard(deck)];
    atualizaDados();
    check();
    getCardPlayer();
    getCardDealer();
}

function restart() {
    location.reload();
}
/********************************/
/********************************/
/********************************/




/********************************/
/********** funcionais **********/
/********************************/
function unblock() {
    btnHit.removeAttribute('disabled');
    btnStand.removeAttribute('disabled');
}

function block() {
    btnHit.setAttribute('disabled', true);
    btnStand.setAttribute('disabled', true);
}

function atualizaDados() {
    player.innerHTML = 'Player ' + playerHand;
    dealer.innerHTML = 'Dealer ' + dealerHand;
    playerScore.innerHTML = 'Score: ' + getHandValue(playerHand);
    dealerScore.innerHTML = 'Score: ' + getHandValue(dealerHand);
}
/********************************/
/********************************/
/********************************/




/********************************/
/********* condicionais *********/
/********************************/
function check() {
    if (getHandValue(playerHand) > 21) {
        result.innerHTML = 'Dealer Won!';
        block();
    }
}

function hit() {
    playerHand.push(randomCard(deck));
    atualizaDados();
    check();
    criaCarta();
}

function stand() {
    for (let i = 0; i < 4; i++) {
        dealerHand.push(randomCard(deck));
        atualizaDados();
        criaCartaD();
        if (getHandValue(dealerHand) > 21 && getHandValue(playerHand) <= 21) {
            result.innerHTML = 'Player Won!';
            block();
            break;
        }
        if (getHandValue(dealerHand) == 21) {
            result.innerHTML = 'Dealer Won!';
            block();
            break;
        }
        if (getHandValue(dealerHand) == getHandValue(playerHand)) {
            result.innerHTML = 'Dealer Won!';
            block();
            break;
        }
        if (getHandValue(dealerHand) >= 17) {
            if (getHandValue(dealerHand) > getHandValue(playerHand)) {
                result.innerHTML = 'Dealer Won!';
                block();
                break;
            } else {
                result.innerHTML = 'Player Won!';
                block();
                break;
            }
        } else {
            continue;
        }
    }
}
/********************************/
/********************************/
/********************************/


function getCardPlayer() {
    for (let i = 0; i < playerHand.length; i++) {
        criaCarta();
    }
}

function getCardDealer() {
    for (let i = 0; i < dealerHand.length; i++) {
        criaCartaD();
    }
}

let valueCardPlayer = 0;
let valueCardDealer = 0;

function criaCarta() {
    /* cria carta */
    let cardImg = document.createElement('div');
    row.appendChild(cardImg);
    cardImg.className = 'card';
    /* cria suit */
    let suit = document.createElement('span');
    cardImg.appendChild(suit);
    suit.className = 'suit';
    suit.style.backgroundImage = `url("${suits[randomSuit()]}.png")`;
    let value = document.createElement('span');
    cardImg.appendChild(value);
    value.className = 'value';
    value.innerHTML = playerHand[valueCardPlayer];
    valueCardPlayer++;
}

function criaCartaD() {
    let cardImg = document.createElement('div');
    rowD.appendChild(cardImg);
    cardImg.className = 'card';
    let suit = document.createElement('span');
    cardImg.appendChild(suit);
    suit.className = 'suit';
    suit.style.backgroundImage = `url("${suits[randomSuit()]}.png")`;
    let value = document.createElement('span');
    cardImg.appendChild(value);
    value.className = 'value';
    value.innerHTML = dealerHand[valueCardDealer];
    valueCardDealer++;
}


let suits = ['1', '2', '3', '4'];
function randomSuit(){
    let randomFig = Math.floor(suits.length * Math.random());
    return randomFig;
}







startGame();
