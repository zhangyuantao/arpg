var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Game
 */
var Game = (function () {
    function Game() {
    }
    Object.defineProperty(Game, "stage", {
        get: function () {
            return egret.MainContext.instance.stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game, "stageWidth", {
        get: function () {
            return Game.stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game, "stageHeight", {
        get: function () {
            return Game.stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    return Game;
}());
__reflect(Game.prototype, "Game");
