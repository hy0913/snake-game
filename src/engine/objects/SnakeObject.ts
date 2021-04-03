export class SnakeObject {
    private _context: any;

    // 蛇当前方向
    private _direction: DirectionNum = DirectionNum.right;

    // 蛇的列表集合
    private _snakeList: Array<[number, number]>;

    private _timer: any;

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
    setInterval() {
        this._timer = setInterval(() => {
            this.move(this._direction);
        }, 200)
    }

    /**移动蛇*/
    move(direction: DirectionNum) {
        let lastPosition = this._snakeList[this._snakeList.length - 1];
        switch (direction) {
            case DirectionNum.left:
                // 禁止反方向运动
                if (this._direction === DirectionNum.right) { return }
                this._snakeList.push([lastPosition[0] - 1, lastPosition[1]]);
                break;
            case DirectionNum.up:
                if (this._direction === DirectionNum.down) { return }
                this._snakeList.push([lastPosition[0], lastPosition[1] - 1]);
                break;
            case DirectionNum.right:
                if (this._direction === DirectionNum.left) { return }
                this._snakeList.push([lastPosition[0] + 1, lastPosition[1]]);
                break;
            case DirectionNum.down:
                if (this._direction === DirectionNum.up) { return }
                this._snakeList.push([lastPosition[0], lastPosition[1] + 1]);
                break;
            default:
                return;
        }
        this._direction = direction;
        const ctx = this._context.ctx;
        const apple = this._context.apple;
        this._snakeList.shift();
        ctx.clearRect(0, 0, 600, 600);
        this.renderSnake();
        apple.renderApple();
    }



    /**画蛇*/
    renderSnake() {
        let square = 10;
        const ctx = this._context.ctx;
        const apple = this._context.apple;

        let headPosition = this._snakeList[this._snakeList.length - 1];
        let applePosition = apple._appleNode;
        if (headPosition[0] === applePosition[0] && headPosition[1] === applePosition[1]) {
            // 头部位置和苹果位置相交
            console.log('相交了')
            let first = this._snakeList[0];
            const xMove = this._direction === DirectionNum.left ? 1 : this._direction === DirectionNum.right ? -1 : 0;
            const yMove = this._direction === DirectionNum.up ? 1 : this._direction === DirectionNum.down ? -1 : 0;
            this._snakeList.unshift([first[0] - xMove, first[1] - yMove]);
            apple.clearApple();
        }
        console.log('this._snakeList', this._snakeList)
        for (let i = 0; i < this._snakeList.length; i++) {
            let x = this._snakeList[i][0];
            let y = this._snakeList[i][1];
            ctx.fillStyle = "#FF0000";
            // 出界失败
            if (square * x > 600 || square * y > 600 || x < 0 || y < 0) {
                alert('游戏结束');
                clearInterval(this._timer);
                break;
            }
            // 碰到自己身体失败
            if (headPosition[0] === x && headPosition[1] === y && i !== this._snakeList.length - 1) {
                alert('游戏结束');
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