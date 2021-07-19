import Phaser from 'phaser'
export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload () {
        // add logo image
        let logo = this.add.image(400, 180, 'Logo');

        // display progress bar
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 300, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        // update progress bar
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 310, 300 * value, 30);
        });

        // update file progress text
        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        // remove progress bar when complete
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            logo.destroy();
            this.ready();
        }.bind(this));

        this.timedEvent = this.time.delayedCall(1000, this.ready, [], this);

        // load assets needed in our game
        let villainCards = this.cache.json.get('CaptainHook').villainDeck
        villainCards.forEach(card =>
            this.load.image(card.name, "src/assets/villains/Captain Hook/Villain/" + card.sprite)
        );
        // console.log(villainCards)

        let fateCards = this.cache.json.get('CaptainHook').fateDeck
        fateCards.forEach(card =>
            this.load.image(card.name, "src/assets/villains/Captain Hook/Fate/" + card.sprite)
        );
        // console.log(fateCards)

        this.load.image('fateBack', "src/assets/villains/Captain Hook/Fate_Back.png");
        this.load.image('villainBack', "src/assets/villains/Captain Hook/Villain_Back.png");

        // this.load.spritesheet('idle_aggressive', "src/assets/villains/Captain Hook/idle_aggressive.png", {frameWidth: 92, frameHeight: 88});
        // this.load.spritesheet('walk_aggressive', "src/assets/villains/Captain Hook/walk_aggressive.png", {frameWidth: 92, frameHeight: 88});
        this.load.atlas('mover', 'src/assets/villains/Captain Hook/mover.png', 'src/assets/villains/Captain Hook/mover.json');

        this.load.image('hookRealm', 'src/assets/villains/Captain Hook/realm.jpg');
        this.load.atlas('flares', 'src/assets/flares.png','src/assets/flares.json');
    }

    init () {
        this.readyCount = 0;
    }

    ready () {
        this.readyCount++;
        if (this.readyCount === 2) {
            this.scene.start('PlayerSelect');
        }
    }

    create() {
        console.log("Preloader");
    }

    update() {

    }

}
