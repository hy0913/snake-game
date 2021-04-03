export class AppleObject {
    private _context: any;

    private _appleNode: Array<number> = [];

    constructor(context: any) {
        this._context = context;

        this.appleGenerate()
    }

    appleGenerate() {
        setInterval(() => {
            this.renderApple();
        }, 500)
    }

    /**画苹果*/
    renderApple() {
        if (!this._appleNode.length) {
            this._appleNode = [Math.floor(Math.random() * 60), Math.floor(Math.random() * 60)];
        }
        const square = 10;
        const ctx = this._context.ctx;
        let x = this._appleNode[0];
        let y = this._appleNode[1];
        ctx.fillStyle = "blue";
        ctx.fillRect(x * square, y * square, square, square);
    }

    clearApple(){
        this._appleNode = []; 
    } 
}