/**
 * 地图背景
 */
import Texture = egret.Texture;

class MapBackground extends egret.DisplayObjectContainer{
    private mapId:number = 1193;
    private mapWidth:number = 3200;
    private mapHeight:number = 2400;
    private rowNum:number;
    private colNum:number;
    private tiles:any = {};
    private miniMap:egret.Bitmap;
    private screenTiles:string[] = [];  // 屏幕上显示的瓦片

    init(mapId:number){
        let self = this;
        self.miniMap = new egret.Bitmap();
        self.miniMap.width = self.mapWidth;
        self.miniMap.height = self.mapHeight;
        RES.getResByUrl("resource/map/1193/mini.jpg", (img:Texture) => {
            self.miniMap.texture = img;
            self.addChild(this.miniMap);
            self.drawTiles();
        }, this, RES.ResourceItem.TYPE_IMAGE);

    }

    drawTiles(){
        let self = this;
        for (var i = 0; i <= 4; i++) {
            for (var j = 0; j <= 4; j++) {
                var tileKey: string = i + "_" + j;
                var tile: MapTile = self.tiles[tileKey];
                if (!tile) {
                    tile = new MapTile();
                    tile.init(self.mapId, i, j);
                    self.tiles[tileKey] = tile;
                }
                if (!tile.parent) {
                    self.addChild(tile);
                }
                //self.screenTiles.push(tileKey);
            }
        }
    }

    updatePos(x:number, y:number){
        //this.tiles
    }
}