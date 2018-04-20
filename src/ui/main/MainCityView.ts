/**
 * 主城界面
 */
class MainCityView extends UI.SkinUIBase{
    private viewPort:eui.Group; // 屏幕视口
	private mapRoot:eui.Group;
	private player:Role;

    onCreate(){
    	super.onCreate();
        let self = this;

        // 加载地图组件
        let ctr:MapCtrl = new MapCtrl();
        MapMgr.instance.register('mainCity', ctr, true);
        ctr.load({width:1600, height:1600, gridData:{'0,0':0,'0,1':1,'0,2':2,'0,3':3}}, self.mapRoot);

        // 实例化一个玩家
        self.player = new Role();
        self.viewPort.addChild(self.player);
        PlayerCtrl.instance.init(self.player);
    }

    private touchHandle(event:egret.TouchEvent){
        let self = this;
        PlayerCtrl.instance.moveToStage(event.stageX, event.stageY);
    }

   /* private draw(){
        let self = this;

        for (let row = 0; row < 40; row++) {
            for (let col = 0; col < 9; col++) {
                let mapCell:eui.Image = new eui.Image('a_2_png');
                mapCell.x = 500 + 64 * col + 32 * (row % 2);
                mapCell.y = 500 + 32 * row / 2;
                mapCell.filters = [new GlowFilter(0)];
                self.mapCells.addChild(mapCell);
            }
        }
    }

	private draw1(){
		let self = this;
		let sprite = new Sprite();
		sprite.graphics.lineStyle(1);
		sprite.x = 500;
		sprite.y = 500;
		self.mapCells.addChild(sprite);

		for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 19; col++) {
                sprite.graphics.drawRect(32 * col, 32 * row, 32, 32);
            }
		}
		sprite.graphics.endFill();
	}*/

}