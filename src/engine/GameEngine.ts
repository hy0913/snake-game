import { EngineState } from "../core/EngineState";
import { UUID4 } from "../utils/UUID";
import { AppleObject } from "./objects/AppleObject";
import { SnakeObject } from "./objects/SnakeObject";

/**贪吃蛇核心引擎*/
export class GameEngine {

    /**ID 每次实例化生成唯一的ID*/
    private readonly _id:string = UUID4.generate();

    /**所在的HTML容器*/
    private readonly _container:HTMLElement;

    /**当前状态*/ 
    private _state:EngineState = EngineState.CREATE;

    /** 蛇对象*/
    private readonly _snake:SnakeObject;

    /** 苹果对象*/
    private readonly _apple:AppleObject;

    /** 上下文对象*/
    private _context:any = {};

    /** 配置参数*/
    private _settings;

    constructor(container:HTMLElement,settings:Setting){
        this._settings = settings;
        this._context.settings = this._settings;
    }

    /**创建实例*/
    static create(container:HTMLElement,settings:Setting) :GameEngine{
        return new GameEngine(container,settings)
    }

    init(){

    }

    start(){

    }
}

interface Setting {
    speed:Number,  
}

