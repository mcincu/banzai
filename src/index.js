import * as PLAYGROUND from './static/playground.js';
import {
    PLAYGROUND_CONFIG
} from './static/playground-config';

import { Animation } from './game/animation';
import { Text } from './game/text';

const entity = (x = 0, y = 0, components = {}) => ({
    x,
    y,
    scale: 1.0,
    rotation: 0,
    components
});

// eslint-disable-next-line no-unused-vars
const app = new PLAYGROUND.Application(Object.assign(PLAYGROUND_CONFIG, {
    create: function () {
        this.card = entity(300, 280, {
            'image': 'card'
        });
        this.entities = [
            this.card
        ];
        //Load bitmap font and set up text drawing function
        this.loadAtlas('font');
        this.layer.drawText = Text.drawText(this.layer, this.atlases.font);
        //Load test board
        this.loadImage('board');
        //Load test card
        this.loadImage('card');
        this.tween(this.card)
            .to({ scale: 2 }, 0.5)
            .to({ scale: 2 }, 0.5).wait(1)
            .loop();
    },
    resize: function () {
        // Scale up as much as possible while fitting the screen
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const baseWidth = this.width;
        const baseHeight = this.height;
        const scale = Math.min(Math.floor(windowWidth / baseWidth), Math.floor(windowHeight / baseHeight));
        this.scale = Math.max(1, scale);
        console.log(scale);
    },
    step: function (dt) {
    },
    render: function () {
        const screen = this.layer;
        screen.clear('#444444');
        screen.drawImage(this.images.board, 0, 0);
        screen.drawText(
            `Perro salchicha gordo bachicha toma solcito a la orilla del mar. 
            Tiene sombrero de marinero, y en vez de traje se puso un collar.`,
            10, 20, { scale: 1, bw: 150 });
        screen
            .save()
            .align(0.5, 0.5)
            .translate(this.card.x, this.card.y)
            .rotate(this.card.rotation)
            .scale(this.card.scale, this.card.scale)
            .drawImage(this.images.card, 0, 0)
            .restore();

    }
}));
