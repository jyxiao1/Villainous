// import Phaser from 'phaser'
import Mover from "./mover";
import Realm from "./realm";
export default class Player {
    constructor(scene){
        this.power = 0
        this.villain = null
        this.playerNum = -1
        this.hand = []
        this.maxHandSize = 4

        this.villainName = ""

        this.villainDeck = []
        this.fateDeck = []
        this.villainDiscard = []
        this.fateDiscard = []

        this.otherDeck = []
        this.winCondition = null
        this.currLocation = 0
        this.board = null
        this.lastMove = "" // Records the last move taken for triggering a condition, this can be refactored into a
                                // list which removes each item after a certain amount of time
        this.mover = new Mover(scene, '');
        this.realm = new Realm(scene);
    }

    startTurn(scene){
        // this.mover.setInteractive(); // Allow the piece to be moved
        let allowedLocations = this.mover.validMoves(); // array of locations
        allowedLocations.forEach(location => {
            location = this.realm.locationAt(location);
            if(location && !location._isLocked){
                location.setSelectable(true);
                console.log("Selectable");
                let self = this;
                location.on('pointerdown', function () {
                    console.log("Location selected")
                    self.mover.walk(scene, location.x);
                    self.realm.locations.forEach(location => location.setSelectable(false));
                    //TODO: Execute check for actions
                });
            }
        });
    }


    drawCard(){
        if (this.villainDeck.length === 0) {
            if (this.villainDiscard.length !== 0) {
                this.villainDeck = this.villainDiscard;
                this.villainDiscard = [];
                this.villainDeck = Phaser.Math.RND.shuffle(this.villainDeck);
                this.hand.push(this.villainDeck.pop());
                //add render here
            }
        }else{
            this.hand.push(this.villainDeck.pop())
            // villain.villainDiscard.append(card)
            // return card
        }
    }

    moveTo(location){
        this.currLocation = location
    }

    gainPower(power){
        this.power += power
    }

    playCard(){

    }

    activateItem(){

    }

    fate(otherPlayers){
        // draw two cards from that player's fate deck
        // play a card and discard the other
    }

    moveItemAlly(){

    }


    moveHero(){

    }

    vanquish(scene, player){
        // draw two cards from that player's fate deck
        // play a card and discard the other
    }

    discardCards(){
        //Select cards to discard here

/*
        discardIndexes.forEach(discardIndex => {
            this.hand.splice(discardIndex, 1);
            //remove animation here
        });
        for(let i = 0; i < (this.maxHandSize - this.hand.length); i++)
        {
            this.drawCard()
        }
*/
    }

}

class TokenZone {

}
