var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var KeyInputHandler = (function () {
    function KeyInputHandler() {
        var self = this;
        if (KeyInputHandler.instance)
            throw 'KeyInputHandler.instance单例已存在！';
        document.addEventListener("keydown", function (event) {
            self.keyHandler(event);
        });
        document.addEventListener("keyup", function (event) {
            Game.stage.dispatchEventWith(event.type);
            self.curDir = 0;
        });
    }
    KeyInputHandler.prototype.keyHandler = function (event) {
        var self = this;
        var dir;
        switch (event.keyCode) {
            // left
            case 37:
            case 65:
                dir = KeyInputHandler.DIR_LEFT;
                break;
            // right
            case 39:
            case 68:
                dir = KeyInputHandler.DIR_RIGHT;
                break;
            // up
            case 38:
            case 87:
                dir = KeyInputHandler.DIR_UP;
                break;
            // down
            case 83:
            case 40:
                dir = KeyInputHandler.DIR_DOWN;
                break;
            default:
                return;
        }
        if (self.curDir == dir)
            return;
        self.curDir = dir;
        Game.stage.dispatchEventWith(event.type, false, dir);
    };
    KeyInputHandler.instance = new KeyInputHandler();
    KeyInputHandler.DIR_LEFT = 1;
    KeyInputHandler.DIR_RIGHT = 2;
    KeyInputHandler.DIR_UP = 3;
    KeyInputHandler.DIR_DOWN = 4;
    return KeyInputHandler;
}());
__reflect(KeyInputHandler.prototype, "KeyInputHandler");
