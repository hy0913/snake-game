import { EngineContext } from "../GameEngine";

export class SnakeObject {
    private readonly _context: EngineContext;

    // 蛇当前方向
    private _direction: DirectionNum = DirectionNum.right;

    // 蛇的列表集合
    private _snakeList: Array<[number, number]>;

    // 定时器
    private _timer: any;

    constructor(context: EngineContext, snakeList: Array<[number, number]>) {
        this._context = context;
        this._snakeList = snakeList;

        // 添加上下左右监听事件
        this.addListener()
        // 初始化蛇
        this.renderSnake();
        // 定时运动
        this.animate();

    }

    /** 监听上下左右*/
    addListener() {
        document.addEventListener('keydown', (e) => {
            this.move(e.keyCode);
        });
    }

    /** 定时运动*/
    animate() {
        const { config } = this._context;
        const { speed } = config;
        this._timer = setInterval(() => {
            this.move(this._direction);
        }, speed)
    }

    /**移动蛇*/
    move(direction: DirectionNum) {
        const { ctx, apple, config } = this._context;
        const { width, height } = config;
        // 获取最后一个点的坐标
        let lastPosition = this._snakeList[this._snakeList.length - 1];
        switch (direction) {
            case DirectionNum.left:
                // 禁止反方向运动
                if (this._direction === DirectionNum.right) return
                this._snakeList.push([lastPosition[0] - 1, lastPosition[1]]);
                break;
            case DirectionNum.up:
                if (this._direction === DirectionNum.down) return
                this._snakeList.push([lastPosition[0], lastPosition[1] - 1]);
                break;
            case DirectionNum.right:
                if (this._direction === DirectionNum.left) return
                this._snakeList.push([lastPosition[0] + 1, lastPosition[1]]);
                break;
            case DirectionNum.down:
                if (this._direction === DirectionNum.up) return
                this._snakeList.push([lastPosition[0], lastPosition[1] + 1]);
                break;
            default:
                return;
        }
        this._direction = direction;
        // 清除蛇第一个元素
        this._snakeList.shift();
        // 清空画布
        ctx.clearRect(0, 0, width, height);
        // 重新绘制
        this.renderSnake();
        // 绘制苹果位置
        apple.renderApple();
    }



    /**画蛇*/
    renderSnake() {
        const { ctx, apple, config } = this._context;
        const { snakeWidth, width, height } = config;
        
        // 获取蛇头位置
        let headPosition = this._snakeList[this._snakeList.length - 1];
        // 获取当前苹果位置
        let applePosition = apple.appleNode;
        // 头部位置和苹果位置相交,代表吃到苹果了
        if (headPosition[0] === applePosition[0] && headPosition[1] === applePosition[1]) {
            let first = this._snakeList[0];
            const xMove = this._direction === DirectionNum.left ? 1 : this._direction === DirectionNum.right ? -1 : 0;
            const yMove = this._direction === DirectionNum.up ? 1 : this._direction === DirectionNum.down ? -1 : 0;
            // 在蛇的尾部增加一个元素
            this._snakeList.unshift([first[0] - xMove, first[1] - yMove]);
            // 清除苹果
            apple.clearApple();
        }

        for (let i = 0; i < this._snakeList.length; i++) {
            let x = this._snakeList[i][0];
            let y = this._snakeList[i][1];
            ctx.fillStyle = "#FF0000";
            // 出界---失败
            if (snakeWidth * x > width || snakeWidth * y > height || x < 0 || y < 0) {
                alert('游戏结束');
                clearInterval(this._timer);
                break;
            }
            // 碰到自己身体---失败
            if (headPosition[0] === x && headPosition[1] === y && i !== this._snakeList.length - 1) {
                alert('游戏结束');
                clearInterval(this._timer);
                break;
            }
            ctx.fillRect(x * snakeWidth, y * snakeWidth, snakeWidth, snakeWidth);
        }
    }
}

enum DirectionNum {
    left = 37,
    up = 38,
    right = 39,
    down = 40
}