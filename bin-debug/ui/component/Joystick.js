var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 摇杆
 */
var Joystick = (function (_super) {
    __extends(Joystick, _super);
    function Joystick() {
        var _this = _super.call(this) || this;
        var self = _this;
        self.addEventListener(egret.Event.ADDED_TO_STAGE, self.onAddToStage, self);
        return _this;
    }
    Joystick.prototype.onAddToStage = function () {
        var self = this;
        self.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
        self.addEventListener(egret.TouchEvent.TOUCH_END, self.onTouchEnd, self);
        self.addEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onTouchEnd, self);
        self.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, self.onTouchEnd, self);
        self.radius = self.tray.width >> 1;
    };
    Joystick.prototype.onTouchBegin = function (event) {
        var self = this;
        Game.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
    };
    Joystick.prototype.onTouchMove = function (event) {
        var self = this;
        var point = self.handle.parent.globalToLocal(event.stageX, event.stageY);
        var angle = Math.atan2(point.y - self.tray.y, point.x - self.tray.x);
        // 限制滑动距离
        if (point.length > self.radius)
            point = egret.Point.polar(self.radius, angle);
        self.handle.x = point.x;
        self.handle.y = point.y;
        if (self.curAngle == angle)
            return;
        self.curAngle = angle;
        self.stage.dispatchEventWith('onJoystick', false, angle);
    };
    Joystick.prototype.onTouchEnd = function () {
        var self = this;
        egret.Tween.removeTweens(self.handle);
        egret.Tween.get(self.handle).to({ x: 0, y: 0 }, 100, egret.Ease.backOut);
        self.stage.dispatchEventWith('onJoystickEnd');
        self.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
    };
    return Joystick;
}(eui.Component));
__reflect(Joystick.prototype, "Joystick");
