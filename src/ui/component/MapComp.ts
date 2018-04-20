/**
 * 地图组件
 */
import ColorTransform = dragonBones.ColorTransform;

class MapComp extends UI.SkinUIBase {
    private tiles: eui.Group; // 地图背景集合
    private cells: eui.Group; // 地图网格
    private roleLayer: eui.Group; // 角色层

    onCreate() {
        super.onCreate();
        let self = this;

    }

    /**
     * 画网格
     */
    drawGrid() {
        let self = this;
        let data = self.data;
        let cellSize = MapCtrl.CellSize;
        let rowCount = Math.ceil(self.width / cellSize);
        let colCount = Math.ceil(self.height / cellSize);

        for (let row = 0; row < rowCount; row++) {
            for (let col = 0; col < colCount; col++) {
                let state = data[row + ',' + col] || Consts.CellState.Empty;
                let sprite = new egret.Sprite();
                let graphics = sprite.graphics;
                self.cells.addChild(sprite);
                sprite.x = col * cellSize;
                sprite.y = row * cellSize;
                if (state == Consts.CellState.Cannot)
                    graphics.beginFill(0xFF4500, 0.5);
                else if (state == Consts.CellState.Through)
                    graphics.beginFill( 0x8FBC8F, 0.5);
                else if (state == Consts.CellState.NPC)
                    graphics.beginFill( 0x00FFFF, 0.5);
                else
                    graphics.lineStyle(1,0x708090,0.5);

                graphics.drawRect(0, 0, cellSize, cellSize);
                graphics.endFill();
            }
        }
    }
}