import * as cards from '../helpers/card.js';
import Card from '../helpers/card.js';
import Zone from '../helpers/zone.js';
// import io from 'socket.io-client';
import Dealer from '../helpers/dealer.js';
import Realm from '../helpers/realm.js';
import Player from '../helpers/player.js';
import Phaser from 'phaser';
import Mover from "../helpers/mover";

function villainCardFactory(scene, cardJson) {
    let card;
    switch (cardJson.type) {
        case "Ally":
            card = new cards.Ally(scene, cardJson.sprite, 'villainBack', cardJson.name, cardJson.cost, cardJson.strength, '');
            break;
        case "Item":
            card = new cards.VillainItem(scene, cardJson.sprite, 'villainBack', cardJson.name, cardJson.cost, '');
            break;
        case "Condition":
            card = new cards.Condition(scene, cardJson.sprite, 'villainBack', cardJson.name, '', '');
            break;
        case "Effect":
            card = new cards.VillainEffect(scene, cardJson.sprite, 'villainBack', cardJson.name, cardJson.cost, '');
            break;
    }
    return card;
}

function fateCardFactory(scene, cardJson) {
    let card;
    switch (cardJson.type) {
        case "Hero":
            card = new cards.Hero(scene, cardJson.sprite, 'fateBack', cardJson.name, cardJson.strength, '');
            break;
        case "Item":
            card = new cards.FateItem(scene, cardJson.sprite, 'fateBack', cardJson.name, '');
            break;
        case "Effect":
            card = new cards.FateEffect(scene, cardJson.sprite, 'fateBack', cardJson.name, '');
            break;
    }
    return card;
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
    this.currentTurn = true;
    this.gameState = 1;
    this.thisPlayer;
    //STATES
    //  Move mover to new locations
    //  Execute Actions
    //  Redraw Hand
    //  Pass turn to next person
}

preload() {
    let currGame = this //Use this in button press and zonedrop functions

    //TODO card factory
    // villainCardFactory(fateCards)
}

create() {
    this.maxWidth = window.innerWidth;
    this.maxHeight = window.innerHeight;
    let self = this;    //self is the current scene

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('mover', { prefix: 'walk_aggressive-', end: 7, zeroPad: 0 }),
        frameRate: 8,
        repeat: -1
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('mover', { prefix: 'idle_aggressive-', end: 7, zeroPad: 0 }),
        frameRate: 8,
        repeat: -1
    });


    // this.socket = io('http://localhost:3000');
    //
    // this.socket.on('connect', function () {
    //     console.log('Connected!');
    // });
    //
    // this.socket.on('isPlayerA', function () {
    //     self.isPlayerA = true;
    // })


    //Shuffle cards


    this.dealer = new Dealer(this, this.villainCards);
    let realm = new Realm(this)
    this.renderObjects.push(realm);
    this.player = new Player(this);
    this.player.mover = new Mover(this, '');
    this.add.existing(this.player.mover);
    // self.children.bringToTop(this.player.mover);
    this.player.realm = realm;
    let villainCards = this.cache.json.get('CaptainHook').villainDeck;
    villainCards.forEach(card => {
        for(let i = 0; i < card.numInDeck; i++)
        {
            let newCard = villainCardFactory(self, card);
            console.log(newCard);
            self.add.existing(newCard);
            this.player.villainDeck.push(newCard);
        }
    });

    let fateCards = this.cache.json.get('CaptainHook').fateDeck;
    fateCards.forEach(card => {
        for(let i = 0; i < card.numInDeck; i++)
        {
            let newCard = fateCardFactory(self, card);
            console.log(newCard);
            self.add.existing(newCard);
            this.player.fateDeck.push(newCard);
        }
    });
    this.player.villainDeck = Phaser.Math.RND.shuffle(this.player.villainDeck);
    this.player.fateDeck = Phaser.Math.RND.shuffle(this.player.fateDeck);


    // this.socket.on('dealCards', function () {
    //     self.dealer.dealCards();
    //     self.dealText.disableInteractive();
    // })

    // this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
    //     if (isPlayerA !== self.isPlayerA) {
    //         let sprite = gameObject.textureKey;
    //         self.opponentCards.shift().destroy();
    //         self.dropZone.data.values.cards++;
    //         // let card = new Card(self);
    //         // card.render(((self.dropZone.x - 350) + (self.dropZone.data.values.cards * 50)), (self.dropZone.y), sprite).disableInteractive();
    //     }
    // })


    this.dealText = this.add.text(75, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

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
        //TODO calculate velocity
        gameObject.x = dragX;
        gameObject.y = dragY;
        // gameObject.calculateVelocity(dragX, dragY);
        // gameObject.render();
    });

    this.input.on('dragstart', function (pointer, gameObject) {
        gameObject.setTint(0xff69b4);
        self.children.bringToTop(gameObject);
        console.log(gameObject.currLocation)
        if(gameObject.currLocation){

        }
        //TODO: remove card from zone
    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {
        gameObject.setTint();
        if (!dropped) {
            //TODO: tween object back to drop zone
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
    });
    this.input.on('dragleave', function (pointer, gameObject, dropZone) {
        //TODO: Start particle effect if the card enters this zone
        //Switch check dropzone
        console.log("LEFT"); //InputPlugin

        // switch(dropZone.name){ //Name is the render
        //     case "allyZone":
        //         gameObject.y = dropZone.y + (dropZone.data.values.allies.length * 25);
        //         dropZone.data.values.allies.push(gameObject);
        //         break;
        //     case "heroZone":
        //         gameObject.y = dropZone.y - (dropZone.data.values.heroes.length * 25);
        //         dropZone.data.values.heroes.push(gameObject);
        //         break;
        // }
        // gameObject.x = dropZone.x;
        // // gameObject.disableInteractive();
        // self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
    })


    this.input.on('drop', function (pointer, gameObject, dropZone) {
        //Switch check dropzone
        console.log(self); //InputPlugin
        //TODO: disableInteractive drop zones once the turn is over
        // if(!this.currentTurn) {
        //     return;
        // }

        switch(dropZone.name){ //Name is the render
            case "allyZone":
                gameObject.y = dropZone.y + (dropZone.data.values.allies.length * 25);
                dropZone.data.values.allies.push(gameObject);
                break;
            case "heroZone":
                gameObject.y = dropZone.y - (dropZone.data.values.heroes.length * 25);
                dropZone.data.values.heroes.push(gameObject);
                break;
        }
        gameObject.x = dropZone.x;
        // gameObject.disableInteractive();
        // self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
    });

    this.rerender(this);
    self.children.bringToTop(this.player.mover);
    this.player.mover.play('idle');
    this.player.startTurn(this);
}   //create

update() {

}

rerender() {
    this.renderObjects.forEach( object => object.render(this));
}
}
