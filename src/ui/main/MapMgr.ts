/**
 * 地图管理
 */
class MapMgr{
    public static instance:MapMgr = new MapMgr();

    public mapDict:any;
    //public curMap:MapCtrl;
    public map:any;

    private constructor(){
        if (MapMgr.instance) throw 'MapMgr.instance单例已存在！';
        let self = this;
        self.mapDict = <any>{};
    }

    /**
     * 注册地图
     * @param {string} mapType
     * @param {MapCtrl} ctrl
     * @param {boolean} isSetCur 是否设置为当前地图
     */
    register(mapType:string, ctrl:MapCtrl, isSetCur:boolean = false){
        let self = this;
        if (self.mapDict[mapType]){
            console.log('已存在改类型地图控制器：' + mapType);
            return;
        }
        self.mapDict[mapType] = ctrl;

       // if(isSetCur) self.curMap = ctrl;
    }

    /**
     * 设置当前地图
     * @param {string} type
     */
    setCurMap(type:string){
        let self = this;
      //  self.curMap = self.getCtrl(type);
    }

    /**
     * 获取地图控制器
     * @param {string} mapType
     * @returns {MapCtrl}
     */
    getCtrl(mapType:string):MapCtrl{
        let self = this;
        if (! self.mapDict[mapType]){
            console.log('不存在改类型地图控制器：' + mapType);
            return null;
        }

        return self.mapDict[mapType];
    }
}