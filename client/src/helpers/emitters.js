import Phaser from 'phaser';

const SPEED_MIN = 25
const SPEED_MAX = 50

export default function createEmitter(scene, x, y, width, height, color){
    let particles = scene.add.particles('flares');
    particles.createEmitter({
        frame: color,
        x: x - width / 2 - 4,
        y: { min: y - height / 2,
            max: y + height / 2},
        lifespan: 250,
        speedX: {min: -SPEED_MIN, max: -SPEED_MAX},
        scale: {start: 0.1, end: 0},
        quantity: 2,
        blendMode: 'ADD',
    }); //Left side
    particles.createEmitter({
        frame: color,
        x: x + width / 2 + 4,
        y: { min: y - height / 2,
            max: y + height / 2},
        lifespan: 250,
        speedX: {min: SPEED_MIN, max: SPEED_MAX},
        scale: {start: 0.1, end: 0},
        quantity: 2,
        blendMode: 'ADD',
    }); //Right side

    particles.createEmitter({
        frame: color,
        x: { min: x - width / 2,
            max: x + width / 2},
        y: y + height / 2 + 4,
        lifespan: 250,
        speedY: {min: SPEED_MIN, max: SPEED_MAX},
        scale: {start: 0.1, end: 0},
        quantity: 2,
        blendMode: 'ADD',
    }); //Bottom side

    particles.createEmitter({
        frame: color,
        x: { min: x - width / 2,
            max: x + width / 2},
        y: y - height / 2 - 4,
        lifespan: 250,
        speedY: {min: -SPEED_MIN, max: -SPEED_MAX},
        scale: {start: 0.1, end: 0},
        quantity: 2,
        blendMode: 'ADD',
    }); //Top side
    return particles;
}