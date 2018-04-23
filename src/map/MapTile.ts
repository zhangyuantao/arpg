/**
 * 单个地图瓦片
 */
class MapTile extends egret.Bitmap{
    init(mapId:number, row:number, col:number){
        let self = this;
        let resPath = "resource/map/" + mapId + "/" + row + "_" + col + ".jpg";
        self.x = col * 256;
        self.y = row * 256;
        RES.getResByUrl(resPath, (img:Texture) => {
            self.texture = img;
        }, self, RES.ResourceItem.TYPE_IMAGE);
    }
}