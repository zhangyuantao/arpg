var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地图管理
 */
var MapMgr = (function () {
    function MapMgr() {
        if (MapMgr.instance)
            throw 'MapMgr.instance单例已存在！';
        var self = this;
        self.mapDict = {};
    }
    /**
     * 注册地图
     * @param {string} mapType
     * @param {MapCtrl} ctrl
     * @param {boolean} isSetCur 是否设置为当前地图
     */
    MapMgr.prototype.register = function (mapType, ctrl, isSetCur) {
        if (isSetCur === void 0) { isSetCur = false; }
        var self = this;
        if (self.mapDict[mapType]) {
            console.log('已存在改类型地图控制器：' + mapType);
            return;
        }
        self.mapDict[mapType] = ctrl;
        if (isSetCur)
            self.curMap = ctrl;
    };
    /**
     * 设置当前地图
     * @param {string} type
     */
    MapMgr.prototype.setCurMap = function (type) {
        var self = this;
        self.curMap = self.getCtrl(type);
    };
    /**
     * 获取地图控制器
     * @param {string} mapType
     * @returns {MapCtrl}
     */
    MapMgr.prototype.getCtrl = function (mapType) {
        var self = this;
        if (!self.mapDict[mapType]) {
            console.log('不存在改类型地图控制器：' + mapType);
            return null;
        }
        return self.mapDict[mapType];
    };
    MapMgr.instance = new MapMgr();
    return MapMgr;
}());
__reflect(MapMgr.prototype, "MapMgr");
