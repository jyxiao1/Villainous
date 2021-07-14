import * as cards from '../helpers/card';
import Zone from '../helpers/zone';
import io from 'socket.io-client';
import Dealer from '../helpers/dealer';
import $ from 'jquery';
import Realm from '../helpers/realm'

function villainCardFactory(cardJson) {
    switch (cardJson.type) {
        case "Ally":
            cards.Ally(scene)
            break;
        case "Item":
            break;
        case "Condition":
            break;
        case "Effect":
            break;
    }
}

function fateCardFactory(cardJson) {
    switch (cardJson.type) {
        case "Hero":
            break;
        case "Item":
            break;
        case "Effect":
            break;
    }

}

export default class GameScene extends Phaser.Scene {
constructor() {
    super({
        key: 'Game'
    });
    this.villainCards = [];
    this.fateCards = [];
    this.renderObjects = [];
    this.otherPlayers = [];
    this.isPlayerA = false;
    this.opponentCards = [];
}

preload() {
    let currGame = this

    //TODO card factory
    let villainCards = this.cache.json.get('CaptainHook').villainDeck
    villainCards.forEach(card => {
        for(let i = 0; i < card.numInDeck; i++)
        {
            currGame.villainCards.push(card.name);
        }
    });

    let fateCards = this.cache.json.get('CaptainHook').fateDeck
    fateCards.forEach(card => {
        for(let i = 0; i < card.numInDeck; i++)
        {
            currGame.fateCards.push(card.name);
        }
    });

}

create() {
    this.maxWidth = window.innerWidth;
    this.maxHeight = window.innerHeight;

    this.socket = io('http://localhost:3000');

    this.socket.on('connect', function () {
        console.log('Connected!');
    });

    this.socket.on('isPlayerA', function () {
        self.isPlayerA = true;
    })

    this.dealer = new Dealer(this, this.villainCards);
    this.renderObjects.push(new Realm(this));

    this.socket.on('dealCards', function () {
        self.dealer.dealCards();
        self.dealText.disableInteractive();
    })

    this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
        if (isPlayerA !== self.isPlayerA) {
            let sprite = gameObject.textureKey;
            self.opponentCards.shift().destroy();
            self.dropZone.data.values.cards++;
            let card = new Card(self);
            card.render(((self.dropZone.x - 350) + (self.dropZone.data.values.cards * 50)), (self.dropZone.y), sprite).disableInteractive();
        }
    })

    // this.zone = new Zone(this);
    // this.dropZone = this.zone.renderZone();
    // this.outline = this.zone.renderOutline(this.dropZone);

    this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();
    let self = this;    //self is the current scene

    this.dealText.on('pointerdown', function () {
        self.dealer.dealCards();
    })

    this.dealText.on('pointerover', function () {
        self.dealText.setColor('#ff69b4');
    })

    this.dealText.on('pointerout', function () {
        self.dealText.setColor('#00ffff');
    })

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    })

    this.input.on('dragstart', function (pointer, gameObject) {
        gameObject.setTint(0xff69b4);
        self.children.bringToTop(gameObject);
    })

    this.input.on('dragend', function (pointer, gameObject, dropped) {
        gameObject.setTint();
        if (!dropped) {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
    })

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        console.log(gameObject);
        dropZone.data.values.allies.push(gameObject);
        gameObject.x = dropZone.x;
        gameObject.y = (dropZone.y - 750);// + (dropZone.data.values.cards * 50);
        gameObject.disableInteractive();
        self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
    })

    this.rerender(this);
}   //create

update() {

}

rerender() {
    this.renderObjects.forEach( object => object.render(this));
}
}
