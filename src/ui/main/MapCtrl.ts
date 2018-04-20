/**
 * 地图制器
 */
import DisplayObjectContainer = egret.DisplayObjectContainer;

class MapCtrl{
    public static CellSize = 32;
    private map:MapComp;

    get x():number{
        return this.map.x;
    }

    get y():number{
        return this.map.y;
    }

    set x(x:number){
        this.map.x = x;
    }

    set y(y:number){
        this.map.y = y;
    }

    get width():number{
        return this.map.width;
    }

    get height():number{
        return this.map.height;
    }

    globalToLocal(stageX: number, stageY: number):egret.Point{
        return this.map.globalToLocal(stageX, stageY);
    }

    load(data:any, root:DisplayObjectContainer){
        let self = this;
        self.map = new MapComp(data);
        root.addChild(self.map);
        self.map.x = 0;
        self.map.y = 0;
    }
}