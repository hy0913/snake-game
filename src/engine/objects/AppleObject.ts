import { EngineContext } from "../GameEngine";

export class AppleObject {
    private readonly _context: EngineContext;

    private _appleNode: Array<number> = [];

    constructor(context: EngineContext) {
        this._context = context;

        // 轮询不断的生成苹果
        this.appleGenerate();
    }

    appleGenerate() {
        setInterval(() => {
            this.renderApple();
        }, 500)
    }

    /**画苹果*/
    renderApple() {
        const { ctx, config } = this._context;
        const { snakeWidth, width, height } = config;
        if (!this._appleNode.length) {
            this._appleNode = [Math.floor(Math.random() * width / snakeWidth), Math.floor(Math.random() * height / snakeWidth)];
        }
        const x = this._appleNode[0];
        const y = this._appleNode[1];
        ctx.fillStyle = "blue";
        ctx.fillRect(x * snakeWidth, y * snakeWidth, snakeWidth, snakeWidth);
    }

    clearApple() {
        this._appleNode = [];
    }

    get appleNode(): Array<number> {
        return this._appleNode;
    }
}