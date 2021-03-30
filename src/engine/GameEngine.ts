import { State } from "../core/EngineState";
import { UUID } from "../utils/UUID";
import { AppleObject } from "./objects/AppleObject";
import { SnakeObject } from "./objects/SnakeObject";

/**贪吃蛇核心引擎*/
export class GameEngine {

    /**ID 每次实例化生成唯一的ID*/
    private readonly _id:string = UUID.add();

    /**所在的HTML容器*/
    private readonly _container:HTMLElement;

    /**当前状态*/ 
    private _state:State = State.CREATE;

    /** 蛇对象*/
    private readonly _snake:SnakeObject;

    /** 苹果对象*/
    private readonly _apple:AppleObject;

    /** 上下文对象*/
    private _context:any = {};

    /** 配置参数*/
    private _config;

    constructor(container:HTMLElement,config:Setting){
        this._config = config;
        this._context.settings = this._config;
    }

    /**创建实例*/
    static create(container:HTMLElement,config:Setting) :GameEngine{
        return new GameEngine(container,config)
    }

    init(){

    }

    start(){

    }
}

interface Setting {
    speed:Number,  
}

