import Phaser from 'phaser'

export default class Card /*extends Phaser.GameObjects.Image*/{ //TODO extends gameobject.sprite?
    constructor(scene) {
        // super(scene, scene.maxWidth/12, scene.maxHeight/2, name)
        this.fullWidth = 0
        this.fullHeight = 0
        this.unfocusedWidth = scene.maxWidth * 0.115
        this.unfocusedHeight = 0


        this.render = (x, y, sprite) => {
            this.fullWidth = sprite.width / 2
            let card = scene.add.image(x, y, sprite);
            card.setScale(this.unfocusedWidth/card.width).setInteractive();
            this.width = card.width
            this.height = card.height
            scene.input.setDraggable(card);

            card.on('pointerover', function(pointer){
                // card.setTint('#ff69b4');
            })
            card.on('pointerout', function(pointer){
                // card.setTint('#00ffff');
            })
            return card;
        }
        // this.renderOutline = () => {
        //     let dropZoneOutline = scene.add.graphics();
        //     dropZoneOutline.lineStyle(4, 0xb8a6ff);
        //     dropZoneOutline.strokeRect(this.x, dropZone.y,
        //         this.input.hitArea.width, dropZone.input.hitArea.height)
        // }

    }
}

/** FATE **/
class Fate extends Card {
    constructor(scene) {
        super(scene);
    }
}

export class Hero extends Fate {
    constructor(scene, name, strength, effect) {
        super(scene);
        this.name = name;
        this.strength = strength;
        this.effect = effect;
    }
}

export class FateItem extends Fate {
    constructor(scene, name, effect) {
        super(scene);
        this.name = name;
        this.effect = effect;
    }
}

export class FateEffect extends Fate {
    constructor(scene, name, effect) {
        super(scene);
        this.name = name;
        this.effect = effect;
    }
}

/** VILLAIN **/
class Villain extends Card {

}

export class Ally extends Villain {
    constructor(scene, name, cost, strength, effect) {
        super(scene);
        this.name = name;
        this.cost = cost;
        this.strength = strength;
        this.effect = effect;
    }}

export class VillainItem extends Villain {
    constructor(scene, name, cost, effect) {
        super(scene);
        this.name = name;
        this.cost = cost;
        this.effect = effect;
    }
}

export class VillainEffect extends Villain {
    constructor(scene, name, cost, effect) {
        super(scene);
        this.name = name;
        this.cost = cost;
        this.effect = effect;
    }
}

export class Condition extends Villain {
    constructor(scene, name, cost, effect) {
        super(scene);
        this.name = name;
        this.effect = effect;
    }
}