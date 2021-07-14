import Card from './card';
import Phaser from 'phaser'
export default class Dealer {
    constructor(scene, cards) {
        this.dealCards = () => {
            // let playerSprite;
            // let opponentSprite;
            // if (scene.isPlayerA) {
            //     playerSprite = 'cyanCardFront';
            //     opponentSprite = 'magentaCardBack';
            // } else {
            //     playerSprite = 'magentaCardFront';
            //     opponentSprite = 'cyanCardBack';
            // }
            cards = Phaser.Math.RND.shuffle(cards);
            for (let i = 0; i < 4; i++) {
                let playerCard = new Card(scene);
                playerCard.render(475 + (i * 200), 650, cards.pop());
            }
        }
    }
}
