import Phaser from 'phaser'
export default class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload () {
        this.load.image('Logo', 'src/assets/logo.png');
        this.load.json('CaptainHook', 'src/assets/villains/Captain Hook/CaptainHook.json');
    }

    create() {
        // console.log('Boot');
        this.scene.start('Preloader');
    }   //create

    update() {

    }

}
