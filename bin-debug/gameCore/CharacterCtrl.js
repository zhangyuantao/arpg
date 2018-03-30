var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 角色控制器
 * 怪物、NPC等移动单位控制
 */
var CharacterCtrl = (function () {
    function CharacterCtrl() {
    }
    return CharacterCtrl;
}());
__reflect(CharacterCtrl.prototype, "CharacterCtrl");
