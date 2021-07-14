class Action {
    constructor(scene){
        this.selectable = false;
    }
    execute(player){
    }
    render(xPos, yPos, scale, selectState){
        switch (selectState){
            case 0: //currently selectable
                break
            case 1: //being selected
                break
            case 2: //done being selected
                break
            default:
                break
        }
        //draw a circle
        //start the emitter
    }

}

export class GainPower extends Action {
    constructor(scene, numPower) {
        super(scene);
        this.numPower = numPower
    }
    execute(player) {
        player.gainPower(this.numPower);
    }

}

export class PlayCard extends Action {
    constructor(scene) {
        super(scene);
    }
    execute(player) {
        player.playCard();
    }

}

export class Activate extends Action {
    constructor(scene) {
        super(scene);
    }
    execute(player) {
        player.activateItem();
    }
}

export class Fate extends Action {
    constructor(scene) {
        super(scene);
    }
    execute(player, otherPlayers) {
        player.fate(otherPlayers);
    }
}

export class MoveItemAlly extends Action {
    constructor(scene) {
        super(scene);
    }
    execute(player) {
        player.moveItemAlly();
    }
}

export class MoveHero extends Action {
    constructor(scene) {
        super(scene);
    }

    execute(player) {
        player.moveHero();
    }
}

export class Vanquish extends Action {
    constructor(scene) {
        super(scene);
    }
    execute(player) {
        player.vanquish();
    }
}

export class DiscardCards extends Action {
    constructor(scene) {
        super(scene);
    }
    execute(player) {
        player.discardCards();
    }
}