import { GameEngine } from '../src/index';

let container = document.getElementById('snake');

let engine = GameEngine.create(container, { speed: 2 });

console.log('engine',engine)

