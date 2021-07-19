import Phaser from 'phaser'

export default class Card extends Phaser.GameObjects.Image{
    constructor(scene, cardFront, cardBack, x, y) {
        super(scene, x, y, cardBack);
        this.fullWidth = 0;
        this.fullHeight = 0;
        this.unfocusedWidth = scene.maxWidth * 0.115;
        this.unfocusedHeight = 0;
        this.currLocation = -1;
        this.velocityX = 0; //TODO use velocityX and Y to "animate"
        this.velocityY = 0;
        this.fullWidth = this.width / 2
        this.setScale(this.unfocusedWidth/this.width);
        this.setInteractive();
        this.cardFront = cardFront;
        this.cardBack = cardBack;

        // this.renderOutline = () => {
        //     let dropZoneOutline = scene.add.graphics();
        //     dropZoneOutline.lineStyle(4, 0xb8a6ff);
        //     dropZoneOutline.strokeRect(this.x, dropZone.y,
        //         this.input.hitArea.width, dropZone.input.hitArea.height)
        // }

    }
    render(scene) {
        // let card = scene.add.image(x, y, sprite);
        this.setScale(this.unfocusedWidth/this.width).setInteractive();
        scene.input.setDraggable(this);

        this.on('pointerover', function(pointer){
            // card.setTint('#ff69b4');
        })
        this.on('pointerout', function(pointer){
            // card.setTint('#00ffff');
        })
        return this;
    }

    calculateVelocity(x, y){
        let accelX = x - this.x;
    }

    setSelectable(isSelectable){
        if(isSelectable){
            this.setVisible(true);
            this.setInteractive();
        }else{
            this.setVisible(false);
            this.disableInteractive();
        }
    }
}

/** FATE **/
class Fate extends Card {
    constructor(scene, cardFront, cardBack) {
        super(scene, cardFront, cardBack, scene.maxWidth*11/12, scene.maxHeight/2);
    }
}

export class Hero extends Fate {
    constructor(scene, cardFront, cardBack, name, strength, effect) {
        super(scene, cardFront, cardBack);
        this.name = name;
        this.strength = strength;
        this.effect = effect;
    }
}

export class FateItem extends Fate {
    constructor(scene, cardFront, cardBack, name, effect) {
        super(scene, cardFront, cardBack);
        this.name = name;
        this.effect = effect;
    }
}

export class FateEffect extends Fate {
    constructor(scene, cardFront, cardBack, name, effect) {
        super(scene, cardFront, cardBack);
        this.name = name;
        this.effect = effect;
    }
}

/** VILLAIN **/
class Villain extends Card {
    constructor(scene, cardFront, cardBack) {
        super(scene, cardFront, cardBack, scene.maxWidth/12, scene.maxHeight/2);
    }
}

export class Ally extends Villain {
    constructor(scene, cardFront, cardBack, name, cost, strength, effect) {
        super(scene, cardFront, cardBack);
        this.name = name;
        this.cost = cost;
        this.strength = strength;
        this.effect = effect;
    }}

export class VillainItem extends Villain {
    constructor(scene, cardFront, cardBack, name, cost, effect) {
        super(scene, cardFront, cardBack);
        this.name = name;
        this.cost = cost;
        this.effect = effect;
    }
}

export class VillainEffect extends Villain {
    constructor(scene, cardFront, cardBack, name, cost, effect) {
        super(scene);
        this.name = name;
        this.cost = cost;
        this.effect = effect;
    }
}

export class Condition extends Villain {
    constructor(scene, cardFront, cardBack, name, condition, effect) {
        super(scene, cardFront, cardBack);
        this.name = name;
        this.condition = condition;
        this.effect = effect;
    }
}