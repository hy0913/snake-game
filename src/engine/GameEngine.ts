import { State } from "../core/EngineState";
import { UUID } from "../utils/UUID";
import { AppleObject } from "./objects/AppleObject";
import { SnakeObject } from "./objects/SnakeObject";

/**贪吃蛇*/
export class GameEngine {

    /**ID 每次实例化生成唯一的ID*/
    private readonly _id: string = UUID.add();

    /**所在的HTML容器*/
    private readonly _container: HTMLElement;

    /** 蛇对象*/
    private readonly _snake: SnakeObject;

    /** 苹果对象*/
    private readonly _apple: AppleObject;

    /** Canvas对象**/
    private _ctx: any;

    /** 配置参数*/
    private _config;

    /** 上下文对象*/
    private _context: any = {};

    constructor(container: HTMLElement, config: Setting) {
        this._config = config;
        this._context.settings = this._config;

        this._container = container;

        // 生成2D画布对象
        this.createCanvas(container);

        // 初始化苹果对象
        this._apple = new AppleObject(this._context);
        this._context.apple = this._apple;

        // 初始化蛇对象
        this._snake = new SnakeObject(this._context, [[0, 0], [1, 0], [2, 0]]);
        this._context.snake = this._snake;

    }

    /**创建实例*/
    static create(container: HTMLElement, config: Setting): GameEngine {
        return new GameEngine(container, config)
    }

    createCanvas(container: HTMLElement) {
        let canvas = document.createElement('canvas');
        canvas.classList.add('snake-canvas');
        canvas.style.position = 'absolute';
        canvas.style.backgroundColor = 'lightblue';
        canvas.width = 600;
        canvas.height = 600;
        canvas.style.left = '50%';
        canvas.style.top = '50%';
        canvas.style.transform = 'translate(-50%,-50%)';
        this._ctx = canvas.getContext('2d');
        this._context.ctx = this._ctx;
        container.appendChild(canvas);

    }

}

interface Setting {
    speed: Number,
}

