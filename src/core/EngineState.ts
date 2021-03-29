export enum EngineState {

    /**
     * 创建状态，一切未初始化
    */
    CREATE = 'Create',

    /**
     * 初始化
     */
    INIT = 'Init',

    /**
     * 运行状态
     */
    RUNNING = 'Running',

    /**
     * 暂停状态
     */
    PAUSE = 'Pause',

    /**
     * 关闭状态
     */
    SHUTDOWN = 'Shutdown'
}