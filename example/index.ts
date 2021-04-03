import { GameEngine } from '../src/index';

let container = document.getElementById('snake');

let engine = GameEngine.create(container, { 
    width:600, // 画布宽度
    height:600,  // 画布高度
    speed: 1000,  // 蛇运动频率ms
    snakeWidth:10, // 蛇的大小
});

console.log('engine',engine)

