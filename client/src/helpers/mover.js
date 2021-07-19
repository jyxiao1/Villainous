import Phaser from 'phaser'

export default class Mover extends Phaser.GameObjects.Sprite{
    constructor(scene, url) {
        super(scene, scene.maxWidth*(1/6 + 0.1734*2/3 + 0.1226/2), scene.maxHeight/2, url);
        this.currLocation = 0;
        this.moveModifier = 0; // TODO implement move modifier which can be changed from certain cards
        // this.play('walk');
        // Animations/spritesheets
        // this.takeDamage
        // this.height = 264;
        // this.width = 276;

        // this.setScale(2);

    }
    walk(scene, endX){
        console.log("walking");
        this.play("walk");
        let mover = this;
        if(endX - this.x > 0){ //pointing to the right
            this.setFlip(true, false);
        }else{
            this.setFlip(false, false);
        }

        scene.tweens.add({
            targets: this,
            x: endX,
            duration: 1500,
            ease: 'Linear',
            onComplete: function () {
                console.log("idling");
                mover.play("idle");
            }
        });
    }
    talk(scene, dialogue){

    }
    validMoves(){
        return [this.currLocation - 1, this.currLocation + 1]// By default move to adjacent spaces
    }
}