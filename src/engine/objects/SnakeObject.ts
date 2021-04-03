export class SnakeObject {
    private _context: any;

    // 蛇当前方向
    private _direction: DirectionNum = DirectionNum.right;

    // 蛇的列表集合
    private _snakeList: Array<[number, number]>;

    private _timer:any;

    constructor(context: any, snakeList: Array<[number, number]>) {
        this._context = context;
        this._snakeList = snakeList;

        // 添加上下左右监听事件
        this.addListener()

        // 初始化蛇
        this.renderSnake();

        // 定时运动
        this.setInterval()

    }

    /** 监听上下左右*/
    addListener() {
        document.addEventListener('keydown', (e) => {
            this.move(e.keyCode);
        });
    }

    /** 定时运动*/
    setInterval(){
        this._timer = setInterval(()=>{
            this.move(this._direction);
        },200)    
    }

    /**移动蛇*/
    move(code: DirectionNum) {
        let lastPosition = this._snakeList[this._snakeList.length - 1];
        switch (code) {
            case DirectionNum.left:
                // 禁止反方向运动
                if(this._direction === DirectionNum.right) { return }
                this._snakeList.push([lastPosition[0] - 1, lastPosition[1]]);
                break;
            case DirectionNum.up:
                if(this._direction === DirectionNum.down) { return }
                this._snakeList.push([lastPosition[0], lastPosition[1] - 1]);
                break;
            case DirectionNum.right:
                if(this._direction === DirectionNum.left) { return }
                this._snakeList.push([lastPosition[0] + 1, lastPosition[1]]);
                break;
            case DirectionNum.down:
                if(this._direction === DirectionNum.up) { return }
                this._snakeList.push([lastPosition[0], lastPosition[1] + 1]);
                break;
            default:
                return;
        }
        this._direction = code;
        const ctx = this._context.ctx;
        this._snakeList.shift();
        ctx.clearRect(0, 0, 800, 800);
        this.renderSnake();
    }

    /**画蛇*/
    renderSnake() {
        let square = 10;
        const snakeList = this._snakeList;
        const ctx = this._context.ctx;
        for (let i = 0; i < snakeList.length; i++) {
            let x = snakeList[i][0];
            let y = snakeList[i][1];
            ctx.fillStyle = "#FF0000";
            if(square * x > 800 || square * y > 800){
                alert('失败');
                clearInterval(this._timer);
                break;
            }
            ctx.fillRect(x * square, y * square, square, square);
        }
    }
}

enum DirectionNum {
    left = 37,
    up = 38,
    right = 39,
    down = 40
}