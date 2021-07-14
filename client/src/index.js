import Phaser from 'phaser';
import GameScene from './scenes/gamescene';
import PlayerSelect from './scenes/playerselectscene'
import config from './config/config';
import Boot from './scenes/bootscene';
import Preloader from './scenes/preloaderscene';

document.body.style.margin = "0px";
document.body.style.overflow = "hidden";
document.body.style.padding = "0px";

class Game extends Phaser.Game {
    constructor () {
        super(config);
        this.scene.add('Boot', Boot);
        this.scene.add('Preloader', Preloader);
        this.scene.add('PlayerSelect', PlayerSelect);
        this.scene.add('Game', GameScene);
        this.scene.start('Boot');
    }
}

const game = new Game();

// function requestFullScreen(element) {
//     // Supports most browsers and their versions.
//     var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
//
//     if (requestMethod) { // Native full screen.
//         requestMethod.call(element);
//     } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
//         var wscript = new ActiveXObject("WScript.Shell");
//         if (wscript !== null) {
//             wscript.SendKeys("{F11}");
//         }
//     }
// }
//
// let elem = document.body; // Make the body go full screen.
// requestFullScreen(elem);

window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
    console.log("Resized!");
});
// class MyGame extends Phaser.Scene
// {
//     constructor ()
//     {
//         super();
//     }
//
//     preload ()
//     {
//         this.load.image('logo', logoImg);
//     }
//
//     create ()
//     {
//         const logo = this.add.image(400, 150, 'logo');
//
//         this.tweens.add({
//             targets: logo,
//             y: 450,
//             duration: 2000,
//             ease: "Power2",
//             yoyo: true,
//             loop: -1
//         });
//     }
// }
