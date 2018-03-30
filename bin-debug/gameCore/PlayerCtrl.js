var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 玩家控制器
 */
var PlayerCtrl = (function () {
    function PlayerCtrl() {
        // 自由行走的区域百分比：角色位置在屏幕宽(35%~65%)高(35%~65%)的居中区域行走将不会推图
        this.MovablePercentWidth = 0.65;
        this.MovablePercentHeight = 0.65;
        this.MoveSpeed = 3; // 移动速度：像素/帧
        if (PlayerCtrl.instance)
            throw 'CharacterCtrl.instance单例已存在！';
    }
    PlayerCtrl.prototype.init = function (player) {
        var self = this;
        self.player = player;
        self.toMapPoint = MapMgr.instance.curMap.globalToLocal(player.x, player.y);
        self.boundRight = Game.stageWidth * self.MovablePercentWidth;
        self.boundLeft = Game.stageWidth * (1 - self.MovablePercentWidth);
        self.boundDown = Game.stageHeight * self.MovablePercentHeight;
        self.boundUp = Game.stageHeight * (1 - self.MovablePercentHeight);
        egret.startTick(self.onFrameEnter, self);
        Game.stage.addEventListener('onJoystick', self.onJoystick, self);
        Game.stage.addEventListener('onJoystickEnd', self.onJoystickEnd, self);
        Game.stage.addEventListener('keydown', self.keyHandler, self);
        Game.stage.addEventListener('keyup', self.keyHandler, self);
    };
    PlayerCtrl.prototype.onJoystick = function (event) {
        var self = this;
        var angle = event.data;
        var point = egret.Point.polar(10000, angle);
        var playerPoint = MapMgr.instance.curMap.globalToLocal(self.player.x, self.player.y);
        playerPoint = playerPoint.add(point);
        self.moveToMap(playerPoint.x, playerPoint.y);
    };
    PlayerCtrl.prototype.onJoystickEnd = function () {
        var self = this;
        self.isMoving = false;
    };
    PlayerCtrl.prototype.keyHandler = function (event) {
        var self = this;
        var isDown = event.type == "keydown";
        if (!isDown) {
            self.isMoving = false;
            return;
        }
        var dir = event.data;
        var playerPoint = MapMgr.instance.curMap.globalToLocal(self.player.x, self.player.y);
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
        self.moveToMap(playerPoint.x, playerPoint.y);
        egret.Point.release(playerPoint);
    };
    PlayerCtrl.prototype.onFrameEnter = function () {
        var self = this;
        var player = self.player;
        var map = MapMgr.instance.curMap;
        if (self.isMoving) {
            // 左右移动
            if (self.isRight) {
                if (map.x + map.width > Game.stageWidth && player.x > self.boundRight)
                    map.x -= self.speedX;
                else
                    player.x += self.speedX;
            }
            else {
                if (map.x < 0 && player.x < self.boundLeft)
                    map.x += self.speedX;
                else
                    player.x -= self.speedX;
            }
            // 上下移动
            if (self.isDown) {
                if (map.y + map.height > Game.stageHeight && player.y > self.boundDown)
                    map.y -= self.speedY;
                else
                    player.y += self.speedY;
            }
            else {
                if (map.y < 0 && player.y < self.boundUp)
                    map.y += self.speedY;
                else
                    player.y -= self.speedY;
            }
            // map坐标边界值校验
            if (map.x > 0)
                map.x = 0;
            if (map.x < Game.stageWidth - map.width)
                map.x = Game.stageWidth - map.width;
            if (map.y > 0)
                map.y = 0;
            if (map.y < Game.stageHeight - map.height)
                map.y = Game.stageHeight - map.height;
            // player坐标边界值校验
            if (player.x < player.width * 0.5)
                player.x = player.width * 0.5;
            if (player.x > Game.stageWidth - player.width * 0.5)
                player.x = Game.stageWidth - player.width * 0.5;
            if (player.y < player.height)
                player.y = player.height;
            if (player.y > Game.stageHeight)
                player.y = Game.stageHeight;
            // 判断是否趋近目标点
            var playerMapPoint = map.globalToLocal(player.x, player.y);
            var dir = playerMapPoint.subtract(self.toMapPoint);
            if (dir.length < self.MoveSpeed) {
                self.isMoving = false;
                if (self.arrivedCb)
                    self.arrivedCb();
            }
        }
        return true;
    };
    /**
     * 通过屏幕目标点移动到对应的地图坐标
     * @param {number} stageX
     * @param {number} stageY
     * @param {Function} cb
     */
    PlayerCtrl.prototype.moveToStage = function (stageX, stageY, cb) {
        var self = this;
        var map = MapMgr.instance.curMap;
        var toMapPoint = map.globalToLocal(stageX, stageY);
        self.moveToMap(toMapPoint.x, toMapPoint.y, cb);
        egret.Point.release(toMapPoint); // 缓存实例
    };
    /**
     * 移动到地图坐标点
     * @param {number} mapX
     * @param {number} mapY
     * @param {Function} cb
     */
    PlayerCtrl.prototype.moveToMap = function (mapX, mapY, cb) {
        var self = this;
        var map = MapMgr.instance.curMap;
        var playerPoint = map.globalToLocal(self.player.x, self.player.y);
        var targetPoint = egret.Point.create(mapX, mapY);
        var angle = Math.atan2(Math.abs(targetPoint.y - playerPoint.y), Math.abs(targetPoint.x - playerPoint.x));
        self.speedX = Math.cos(angle) * self.MoveSpeed;
        self.speedY = Math.sin(angle) * self.MoveSpeed;
        self.isRight = targetPoint.x > playerPoint.x;
        self.isDown = targetPoint.y > playerPoint.y;
        self.toMapPoint = targetPoint;
        self.isMoving = true;
        self.arrivedCb = cb;
        egret.Point.release(playerPoint); // 缓存实例
        egret.Point.release(targetPoint);
        console.log('moveToMap');
    };
    PlayerCtrl.instance = new PlayerCtrl();
    return PlayerCtrl;
}());
__reflect(PlayerCtrl.prototype, "PlayerCtrl");
