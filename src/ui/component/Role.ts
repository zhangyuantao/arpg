/**
 * 游戏角色组件
 */
class Role extends UI.SkinUIBase{
    constructor(){
        super();
        let self = this;
        self.addEventListener(egret.Event.ADDED_TO_STAGE, self.onAddToStage, self);
    }

    private onAddToStage(){
        let self = this;
        self.anchorOffsetX = self.width >> 1;
        self.anchorOffsetY = self.height;
    }
}