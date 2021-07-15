import * as actions from '../helpers/action';
import Card from '../helpers/card';
import $ from 'jquery';

export default class Realm {
    constructor(scene) {
        let i = 0
        this.locations = []
        this.firstInitialized = false; //TODO replace with static or sth
        let json = scene.cache.json.get('CaptainHook')
        json.realm.forEach( location => {
            let newLocation = new Location(scene, location.upperActions, location.lowerActions, i);
            console.log(location.upperActions)
            this.locations.push(newLocation)
            i += 1
        })
        this.render(scene);
    }

    render(scene) {
        let realm = scene.add.graphics();
        // realm.lineStyle(2, 0xb8a6ff);
        // realm.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height)
        console.log(scene.maxWidth)
        console.log(scene.maxHeight)
        let img = scene.add.image(scene.maxWidth /2, scene.maxHeight /2, 'hookRealm')
        img.setScale((scene.maxWidth * 2/3)/img.width/*, ((scene.maxWidth * 2/3)/img.width) * 0.2794249775381851*/);

        this.locations.forEach(location => location.render(scene));
    }
}

function actionsFactory(actionString){
    if (actionString.startsWith("GainPower")) {
        return new actions.GainPower(parseInt(actionString[actionString.length - 1]))
    } else if (actionString.startsWith("PlayCard")) {
        return new actions.PlayCard()
    } else if (actionString.startsWith("Activate")) {
        return new actions.Activate()
    } else if (actionString.startsWith("Fate")) {
        return new actions.Fate()
    } else if (actionString.startsWith("MoveItemAlly")) {
        return new actions.MoveItemAlly()
    } else if (actionString.startsWith("MoveHero")) {
        return new actions.MoveHero()
    } else if (actionString.startsWith("Vanquish")) {
        return new actions.Vanquish()
    } else if (actionString.startsWith("DiscardCards")) {
        return new actions.DiscardCards()
    }
}

class Location {
    constructor(scene, upperActions, lowerActions, renderIndex) {
        this._allies = [];
        this._heroes = [];
        this._villainItems = [];
        this._fateItems = [];
        this._renderIndex = renderIndex;
        this._upperActions = []; //Pair of actions
        this._lowerActions = []; //Pair of actions
        this._width = scene.maxWidth * 0.115;
        this._height = scene.maxWidth * 0.161191135734072;

        this._upperActions.push(actionsFactory(upperActions[0]));
        this._upperActions.push(actionsFactory(upperActions[1]));
        this._lowerActions.push(actionsFactory(lowerActions[0]));
        this._lowerActions.push(actionsFactory(lowerActions[1]));

        // this.render(scene);
        this.renderOutline = (dropZone) => {
            // let dropZoneOutline = scene.add.graphics();
            // dropZoneOutline.lineStyle(4, 0xb8a6ff);
            // dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height)
            // let img = scene.add.image(dropZone.x, dropZone.y, 'hookRealm')
            // img.setScale(dropZone.input.hitArea.width/img.width, dropZone.input.hitArea.height/img.height);
        }

    }

    render(scene) {
        // console.log(this); This is Location
        // console.log(scene);
        let xPos = 0;
        switch(this._renderIndex)
        {
            case 0:
                xPos = scene.maxWidth*(1/6 + 0.1734*2/3 + 0.1226/2);
                break;
            case 1:
                xPos = scene.maxWidth*(1/6 + 0.3825*2/3 + 0.1226/2);
                break;
            case 2:
                xPos = scene.maxWidth*(1/6 + 0.5903*2/3 + 0.1226/2);
                break;
            case 3:
                xPos = scene.maxWidth*(1/6 + 0.7994159928122192*2/3 + 0.1226/2);
                break;
        }

        // console.log("Render Location: xpos " + xPos + ", width " + this._width);
        //TODO instead of readding zone data, try to shift it?

        // Ally Zone
        this._allyZone = scene.add.zone(xPos, scene.maxHeight/2 + this._height, this._width, this._height).setRectangleDropZone(this._width, this._height);
        this._allyZone.setName(this._renderIndex);
        console.log(this._allyZone.name)
        let allyZoneOutline = scene.add.graphics();
        allyZoneOutline.lineStyle(4, 0x58a6ff);
        allyZoneOutline.strokeRoundedRect(this._allyZone.x - this._allyZone.input.hitArea.width / 2,
            this._allyZone.y - this._allyZone.input.hitArea.height / 2,
            this._allyZone.input.hitArea.width,
            this._allyZone.input.hitArea.height, 5)
        this._allyZone.setData({ allies: this._allies, villainItems: this._villainItems });

        // Hero Zone
        this._heroZone = scene.add.zone(xPos, scene.maxHeight/2 - this._height, this._width, this._height).setRectangleDropZone(this._width, this._height);
        this._heroZone.setName(this._renderIndex)
        let heroZoneOutline = scene.add.graphics();
        heroZoneOutline.lineStyle(4, 0xb8a6ff);
        heroZoneOutline.strokeRoundedRect(this._heroZone.x - this._heroZone.input.hitArea.width / 2,
            this._heroZone.y - this._heroZone.input.hitArea.height / 2,
            this._heroZone.input.hitArea.width,
            this._heroZone.input.hitArea.height, 5)
        this._heroZone.setData({ heroes: this._heroes, fateItems: this._fateItems });

    }

    placeObject(pointer, gameObject, dropZone){
        // if(!(gameObject instanceof Card)){
        //     return
        // }
        // if(gameObject instanceof Ally) {
        //
        // }elseIf
        dropZone.data.values.allies.push(gameObject);
        gameObject.x = dropZone.x;
        gameObject.y = (dropZone.y);// + (dropZone.data.values.cards * 50);
        gameObject.disableInteractive();
        self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
    }

}