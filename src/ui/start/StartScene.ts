class StartScene extends Scene.SceneBase{
    // 重写：自定义需要的UI层
    initLayer(layerClasses?: any[]){
        layerClasses = [
            UI.BaseLayer,
            UI.MainUILayer,
            UI.DlgUILayer,
            UI.MsgUILayer
        ];
        super.initLayer(layerClasses);
    }
}