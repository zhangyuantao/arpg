var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地图制器
 */
var MapCtrl = (function () {
    function MapCtrl(map, mapCells) {
        var self = this;
        self.map = map;
        self.mapCells = mapCells;
    }
    Object.defineProperty(MapCtrl.prototype, "x", {
        get: function () {
            return this.map.x;
        },
        set: function (x) {
            this.map.x = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapCtrl.prototype, "y", {
        get: function () {
            return this.map.y;
        },
        set: function (y) {
            this.map.y = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapCtrl.prototype, "width", {
        get: function () {
            return this.map.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapCtrl.prototype, "height", {
        get: function () {
            return this.map.height;
        },
        enumerable: true,
        configurable: true
    });
    MapCtrl.prototype.globalToLocal = function (stageX, stageY) {
        return this.map.globalToLocal(stageX, stageY);
    };
    return MapCtrl;
}());
__reflect(MapCtrl.prototype, "MapCtrl");
