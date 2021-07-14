import Phaser from 'phaser';
export default class PlayerSelect extends Phaser.Scene {
    constructor() {
        super('PlayerSelect');
    }

    preload() {

    }

    create() {
        console.log("Player select scene");
        this.scene.start('Game');

    }   //create

    update() {

    }

}
