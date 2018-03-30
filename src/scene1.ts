class scene1 extends eui.Component{
    private viewPort:eui.Group; // 屏幕视口
	private map:eui.Group;
	private mapCells:eui.Group;
	private player:eui.Image;

	public constructor() {
		super();
		let self:any = this;
		self.skinName = self.__proto__.__class__ + 'Skin';
		self.addEventListener(egret.Event.ADDED_TO_STAGE, self.onAddToStage, self);
		self.viewPort.addEventListener(egret.TouchEvent.TOUCH_TAP, self.touchHandle, self);
	}

    private onAddToStage(){
        let self = this;
        let ctr:MapCtrl = new MapCtrl(self.map, self.mapCells);
        MapMgr.instance.register('mainCity', ctr, true);
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