/**
 * 地图制器
 */
class MapCtrl{
    public map:eui.Group;
    public mapCells:eui.Group;

    constructor(map, mapCells){
        let self = this;
        self.map = map;
        self.mapCells = mapCells;
    }

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
}