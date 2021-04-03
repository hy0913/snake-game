import { GameEngine } from '../src/index';

let container = document.getElementById('snake');

let engine = GameEngine.create(container, { 
    width:800, // 画布宽度
    height:800,  // 画布高度
    speed: 50,  // 蛇运动频率ms
    snakeWidth:50, // 蛇的大小
});

console.log('engine',engine)

