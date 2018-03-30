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
var scene1 = (function (_super) {
    __extends(scene1, _super);
    function scene1() {
        var _this = _super.call(this) || this;
        var self = _this;
        self.skinName = self.__proto__.__class__ + 'Skin';
        self.addEventListener(egret.Event.ADDED_TO_STAGE, self.onAddToStage, self);
        self.viewPort.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchHandle, self);
        return _this;
    }
    scene1.prototype.onAddToStage = function () {
        var self = this;
        var ctr = new MapCtrl(self.map, self.mapCells);
        MapMgr.instance.register('mainCity', ctr, true);
        PlayerCtrl.instance.init(self.player);
    };
    scene1.prototype.touchHandle = function (event) {
        var self = this;
        PlayerCtrl.instance.moveToStage(event.stageX, event.stageY);
    };
    return scene1;
}(eui.Component));
__reflect(scene1.prototype, "scene1");
