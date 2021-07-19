import Phaser from 'phaser';
import GameScene from './scenes/gamescene.js';
import PlayerSelect from './scenes/playerselectscene.js';
import config from './config/config.js';
import Boot from './scenes/bootscene.js';
import Preloader from './scenes/preloaderscene.js';

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
    //VILLAIN_DECK = scene.maxWidth/12;
    //LOCATION_0 = scene.maxWidth*(1/6 + 0.1734*2/3 + 0.1226/2);
    //LOCATION_1 = scene.maxWidth*(1/6 + 0.3825*2/3 + 0.1226/2);
    //LOCATION_2 = scene.maxWidth*(1/6 + 0.5903*2/3 + 0.1226/2);
    //LOCATION_3 = scene.maxWidth*(1/6 + 0.7994159928122192*2/3 + 0.1226/2);
    //FATE_DECK = scene.maxWidth*11/12;
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
