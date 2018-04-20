/**
 * 玩家控制器
 */
import KeyInputHandler = Tools.KeyInputHandler;

class PlayerCtrl{
    public static instance:PlayerCtrl = new PlayerCtrl();

    // 自由行走的区域百分比：角色位置在屏幕宽(35%~65%)高(35%~65%)的居中区域行走将不会推图
	private readonly MovablePercentWidth:number = 0.65;
	private readonly MovablePercentHeight:number = 0.65;

    private readonly MoveSpeed:number = 3; // 移动速度：像素/帧

	private player:eui.Image;

	// 边界坐标
    private boundRight:number;
    private boundLeft:number;
    private boundDown:number;
    private boundUp:number;

	private toMapPoint:egret.Point; // 目标map坐标
	private speedX:number;
	private speedY:number;
    private isMoving:boolean;
	private arrivedCb:Function; // 到达map目标点回调

    private constructor(){
        if (PlayerCtrl.instance) throw 'CharacterCtrl.instance单例已存在！';
    }

    /**
     * 初始化
     * @param player 玩家对象
     */
	init(player:any) {
		let self = this;
        self.player = player;
        self.toMapPoint = MapMgr.instance.curMap.globalToLocal(player.x, player.y);
        self.boundRight = Utils.StageUtils.stageWidth * self.MovablePercentWidth;
        self.boundLeft = Utils.StageUtils.stageWidth * (1 - self.MovablePercentWidth);
        self.boundDown = Utils.StageUtils.stageHeight * self.MovablePercentHeight;
        self.boundUp = Utils.StageUtils.stageHeight * (1 - self.MovablePercentHeight);

        egret.startTick(self.onFrameEnter, self);

        Utils.StageUtils.stage.addEventListener('onJoystick', self.onJoystick, self);
        Utils.StageUtils.stage.addEventListener('onJoystickEnd', self.onJoystickEnd, self);
        Utils.StageUtils.stage.addEventListener('keydown', self.keyHandler, self);
        Utils.StageUtils.stage.addEventListener('keyup', self.keyHandler, self);
	}

    private onJoystick(event:egret.Event){
        let self = this;
        let angle = event.data;
        let point = egret.Point.polar(10000, angle);
        let playerPoint = MapMgr.instance.curMap.globalToLocal(self.player.x, self.player.y);
        playerPoint = playerPoint.add(point);
        self.moveToMap(playerPoint.x, playerPoint.y);
    }

    private onJoystickEnd(){
        let self = this;
        self.stopMove();
    }


    private keyHandler(event:egret.Event){
        let self = this;
        let isDown: boolean = event.type == "keydown";
        if (!isDown)
            return self.stopMove();

        let dir = event.data;

        let playerPoint = MapMgr.instance.curMap.globalToLocal(self.player.x, self.player.y);
        switch (dir) {
            case KeyInputHandler.DIR_LEFT:
                playerPoint.offset(-10000, 0);
                break;
            case KeyInputHandler.DIR_RIGHT:
                playerPoint.offset(10000, 0);
                break;
            case KeyInputHandler.DIR_UP:
                playerPoint.offset(0, -10000);
                break;
            case KeyInputHandler.DIR_DOWN:
                playerPoint.offset(0, 10000);
                break;
        }

        self.moveToMap(playerPoint.x,playerPoint.y);
        egret.Point.release(playerPoint);
    }

	private onFrameEnter(){
		let self = this;
		if(self.speedX || self.speedY)
		    self.onMove();

		return true;
	}

	// 更新地图/人物的移动
	private onMove() {
        let self = this;
        self.isMoving = true;
        let isUp = self.speedY < 0;
        let isLeft = self.speedX < 0;
        let player = self.player;
        let map: MapCtrl = MapMgr.instance.curMap;

        // 左右移动
        if ((isLeft && map.x < 0 && player.x < self.boundLeft)
            || (!isLeft && map.x + map.width > Utils.StageUtils.stageWidth && player.x > self.boundRight))
            map.x -= self.speedX;       // 地图是反向移动造成人物正向移动的错觉
        else
            player.x += self.speedX;    // 当地图不能滚动时移动人物

        // 上下移动
        if ((isUp && map.y < 0 && player.y < self.boundUp)
            || (!isUp && map.y + map.height > Utils.StageUtils.stageHeight && player.y > self.boundDown))
            map.y -= self.speedY;
        else
            player.y += self.speedY;

        // map坐标边界值校验
        if (map.x > 0) map.x = 0;
        if (map.x < Utils.StageUtils.stageWidth - map.width) map.x = Utils.StageUtils.stageWidth - map.width;
        if (map.y > 0) map.y = 0;
        if (map.y < Utils.StageUtils.stageHeight - map.height) map.y = Utils.StageUtils.stageHeight - map.height;

        // player坐标边界值校验
        let arrivedBoundX; // X方向是否到达边界
        let arrivedBoundY; // Y方向是否到达边界
        if (player.x <= player.width * 0.5) {
            player.x = player.width * 0.5;
            arrivedBoundX = true;
        }
        if (player.x >= Utils.StageUtils.stageWidth - player.width * 0.5) {
            player.x = Utils.StageUtils.stageWidth - player.width * 0.5;
            arrivedBoundX = true;
        }
        if (player.y <= player.height) {
            player.y = player.height;
            arrivedBoundY = true;
        }
        if (player.y >= Utils.StageUtils.stageHeight) {
            player.y = Utils.StageUtils.stageHeight;
            arrivedBoundY = true;
        }

        // 到角落了
        if (arrivedBoundX && arrivedBoundY)
            return self.stopMove();

        // 判断是否趋近目标点
        let playerMapPoint = map.globalToLocal(player.x, player.y);
        let disX = Math.abs(playerMapPoint.x - self.toMapPoint.x);
        let disY = Math.abs(playerMapPoint.y - self.toMapPoint.y);
        if (disX < self.MoveSpeed && disY < self.MoveSpeed)
            return self.stopMove();

        // 垂直于边界无法继续移动的情况
        if(disX < self.MoveSpeed && arrivedBoundY)
            return self.stopMove();
        if(disY < self.MoveSpeed && arrivedBoundX)
            return self.stopMove();
    }

    // 停止移动
    private stopMove(){
        let self = this;
        self.isMoving = false;
        self.speedX = self.speedY = 0;
        if (self.arrivedCb) self.arrivedCb();
    }

    /**
     * 通过屏幕目标点移动到对应的地图坐标
     * @param {number} stageX
     * @param {number} stageY
     * @param {Function} cb
     */
	moveToStage(stageX:number, stageY:number, cb?:Function){
	    let self = this;
        let map:MapCtrl = MapMgr.instance.curMap;
        let toMapPoint = map.globalToLocal(stageX, stageY);
        self.moveToMap(toMapPoint.x, toMapPoint.y, cb);
        egret.Point.release(toMapPoint); // 缓存实例
    }

    /**
     * 移动到地图坐标点
     * @param {number} mapX
     * @param {number} mapY
     * @param {Function} cb
     */
    moveToMap(mapX:number, mapY:number, cb?:Function){
	    let self = this;
        let map:MapCtrl = MapMgr.instance.curMap;
        let playerPoint = map.globalToLocal(self.player.x, self.player.y);
        let targetPoint = egret.Point.create(mapX, mapY);
        let angle = Math.atan2(targetPoint.y - playerPoint.y, targetPoint.x - playerPoint.x);
        self.speedX = Math.cos(angle) * self.MoveSpeed;
        self.speedY = Math.sin(angle) * self.MoveSpeed;
        self.toMapPoint = targetPoint;
        self.arrivedCb = cb;

        egret.Point.release(playerPoint); // 缓存实例
        egret.Point.release(targetPoint);
    }
}