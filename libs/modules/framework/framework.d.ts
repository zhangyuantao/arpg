declare class GameObject extends egret.HashObject {
    view: egret.DisplayObject;
    key: string;
    constructor();
    onCreate(): void;
    onDestroy(): void;
    onEnterFrame(advancedTime: number): void;
}
/**
 * Created by zyt on 2017/12/8.
 * 继承eui.Component界面基类
 * 需要设置皮肤
 */
declare namespace UI {
    class SkinUIBase extends eui.Component implements IUI {
        key: string;
        data: any;
        isPause: boolean;
        constructor(data?: any);
        static show(data?: any): any;
        onCreate(): void;
        onEnter(): void;
        show(): void;
        close(destroy?: boolean): void;
        onDestroy(): void;
        /**
         * 暂停，当打开新界面时当前界面暂停
         */
        pause(): void;
        /**
         * 恢复，当前界面关闭时上个界面恢复
         */
        resume(): void;
    }
}
/**
 * Created by zyt on 2017/12/8.
 * 继承egret.Sprite界面基类
 */
declare namespace UI {
    class SpriteUIBase extends egret.Sprite implements IUI {
        key: string;
        data: any;
        isPause: boolean;
        constructor(data?: any);
        static show(data?: any): any;
        onCreate(): void;
        onEnter(): void;
        onDestroy(): void;
        show(): void;
        close(destroy?: boolean): void;
        /**
         * 暂停，当打开新界面时当前界面暂停
         */
        pause(): void;
        /**
         * 恢复，当前界面关闭时上个界面恢复
         */
        resume(): void;
    }
}
/**
 * 单例基类
 */
declare class SingletonClass {
    static getInstance(...args: any[]): any;
}
interface ISingleton {
    instance: any;
}
/**
 * Created by zyt on 2018/4/17.
 * 最上层界面基类，置于MsgUILayer层
 */
declare namespace UI {
    class MsgUI extends SkinUIBase {
    }
}
declare class ObjectPool {
    constructor();
    private onEnterFrame(advancedTime);
    private _pool;
    private _list;
    createObject(classFactory: any): GameObject;
    destroyObject(obj: GameObject): void;
    private static instance;
    static getInstance(): ObjectPool;
}
declare class State {
    constructor();
    onEnter(): void;
    onExit(): void;
}
declare class StateMachine {
    private _state;
    constructor();
    change(state: State): void;
}
declare namespace Res {
    class LoadingResDlg extends UI.SkinUIBase implements RES.PromiseTaskReporter {
        private loadingTxt;
        onProgress(current: number, total: number): void;
    }
}
declare namespace Res {
    class PreloadingUI extends UI.SpriteUIBase implements RES.PromiseTaskReporter {
        onCreate(): void;
        private textField;
        private createView();
        onProgress(current: number, total: number): void;
    }
}
declare namespace Res {
    class ResMgr {
        static instance: ResMgr;
        private constructor();
        /**
         * 单例
         * @returns {Index.ResMgr}
         */
        static getInstance(): ResMgr;
        /**
         * 加载资源组带加载界面
         * @param {string} name
         */
        static loadGroup(name: string): Promise<void>;
    }
}
declare namespace Scene {
    interface IScene {
        data: any;
        key: string;
        layerMap: any;
        uiStackMap: any;
        onUpdateEnabled: boolean;
        onCreate(): any;
        onEnter(): any;
        onUpdate(): any;
        onExit(): any;
        onDestroy(): any;
    }
    /**
     * 场景基类
     */
    class SceneBase extends eui.UILayer implements IScene {
        data: any;
        key: string;
        layerMap: any;
        onUpdateEnabled: boolean;
        uiStackMap: any;
        constructor(data?: any);
        /**
         * 静态run方法
         */
        static run(data?: any, onUpdateEnabled?: boolean, destroyCur?: boolean): SceneBase;
        /**
         * 实例化
         */
        onCreate(): void;
        /**
         * 初始化界面层，默认7层
         */
        initLayer(layerClasses?: any[]): void;
        /**
         * 进入
         * @param param
         */
        onEnter(): void;
        /**
         * 帧循环
         */
        onUpdate(): void;
        /**
         * 退出
         */
        onExit(): void;
        /**
         * 销毁
         */
        onDestroy(): void;
        private getUISatck(layerName);
        /**
         * 添加界面
         * @param {egret.DisplayObject} ui
         */
        add(ui: egret.DisplayObject): void;
        /**
         * 添加UI元素到指定层
         * @param {Swift.UI.LayerBase} layer
         * @param {egret.DisplayObject} ui
         */
        addToLayer(layer: egret.DisplayObjectContainer, ui: egret.DisplayObject): void;
        /**
         * 移除ui元素
         * @param {egret.DisplayObject} ui
         */
        remove(ui: egret.DisplayObject): void;
        /**
         * 获取指定层的当前界面
         * @param {string} layerName
         * @returns {Swift.UI.IUI}
         */
        getTopFromLayer(layerName: string): UI.IUI;
        /**
         * 关闭指定层的当前界面
         * @param {string} layerName
         * @param {boolean} destroy 是否要移除界面
         */
        closeTopFromLayer(layerName: string, destroy?: boolean): void;
    }
}
declare namespace Scene {
    /**
     * 场景管理
     */
    class SceneMgr {
        sceneMap: any;
        curScene: string;
        /**
         * 当前场景
         * @returns {any}
         * @constructor
         */
        readonly CurScene: any;
        /**
         * 运行or切换场景
         * 注意了：先退出上个场景再进入新场景
         * @param {string} key
         * @param classFactory
         * @param data 数据
         * @param {boolean} onUpdateEnabled 是否要帧循环
         * @param {boolean} destroyCur 是否销毁当前场景
         */
        run(key: string, classFactory: any, data?: any, onUpdateEnabled?: boolean, destroyCur?: boolean): SceneBase;
        /**
         * 帧循环
         */
        onUpdate(): void;
        /**
         * 销毁所有场景
         * @param {string} key
         */
        destroyAll(): void;
    }
    let sceneMgr: SceneMgr;
}
/**
 * 键盘输入处理
 */
declare namespace Tools {
    class KeyInputHandler {
        static instance: KeyInputHandler;
        static DIR_LEFT: number;
        static DIR_RIGHT: number;
        static DIR_UP: number;
        static DIR_DOWN: number;
        private curDir;
        private constructor();
        private keyHandler(event);
    }
}
/**
 * Created by zyt on 2017/12/8.
 * 对话框界面基类，置于DlgUILayer层
 */
declare namespace UI {
    class DlgUI extends SkinUIBase {
    }
}
/**
 * Created by zyt on 2018/4/17.
 * 引导界面基类，置于GuideUILayer层
 */
declare namespace UI {
    class GuideUI extends SkinUIBase {
    }
}
/**
 * Created by zyt on 2017/12/8.
 * 对话框界面基类，置于MainUILayer层
 */
declare namespace UI {
    class MainUI extends SkinUIBase {
    }
}
/**
 * Created by zyt on 2018/4/17.
 * 菜单界面基类，置于MenuUILayer层
 */
declare namespace UI {
    class MenuUI extends SkinUIBase {
    }
}
/**
 * 该游戏应用
 */
declare namespace App {
    class Game {
    }
}
/**
 * Game
 */
declare namespace Game {
    class GameLoop {
        constructor();
        /**
         * 游戏帧循环
         */
        onUpdate(): void;
    }
    let gameLoop: GameLoop;
}
declare namespace Consts.LayerNames {
    let BaseLayer: string;
    let MainUILayer: string;
    let MenuUILayer: string;
    let DlgUILayer: string;
    let MsgUILayer: string;
    let GuideUILayer: string;
    let TopUILayer: string;
}
/**
 * Created by zyt on 2018/4/17.
 * 最上层界面基类，置于TopUILayer层
 */
declare namespace UI {
    class TopUI extends SkinUIBase {
    }
}
/**
 * Created by zyt on 2018/1/6.
 * UI界面管理
 */
declare namespace UI {
    class UIManager {
        /**
         * 添加界面
         */
        add(ui: egret.DisplayObject): void;
        /**
         * 移除ui元素
         */
        remove(ui: egret.DisplayObject): void;
        /**
         * 获取指定层的当前界面
         */
        getTopFromLayer(layerName: string): IUI;
        /**
         * 关闭指定层的当前界面
         */
        closeTopFromLayer(layerName: string, destroy?: boolean): void;
    }
    let uiManager: UIManager;
}
/**
 * 摇杆组件
 * 需要对应皮肤：JoystickSkin
 */
declare namespace UI {
    class Joystick extends eui.Component {
        private tray;
        private handle;
        private radius;
        private curAngle;
        constructor();
        private onAddToStage();
        private onTouchBegin(event);
        private onTouchMove(event);
        private onTouchEnd();
    }
}
/**
 * Created by zyt on 2018/4/17.
 * 定义Layer接口
 */
declare namespace UI {
    interface ILayer {
        layerName: string;
    }
}
/**
 * Created by zyt on 2017/12/8.
 * 定义UI界面接口
 */
declare namespace UI {
    interface IUI {
        key: string;
        data: any;
        isPause: boolean;
        onCreate(): any;
        onEnter(): any;
        onDestroy(): any;
        show(): any;
        close(destroy: boolean): any;
        pause(): any;
        resume(): any;
    }
}
/**
 * Created by zyt on 2018/4/17.
 * 基础层，与eui无关
 */
declare namespace UI {
    class BaseLayer extends egret.DisplayObjectContainer implements ILayer {
        layerName: string;
        constructor();
    }
}
/**
 * Created by zyt on 2018/1/6.
 * 对话框界面层
 */
declare namespace UI {
    import UILayer = eui.UILayer;
    class DlgUILayer extends UILayer implements ILayer {
        layerName: string;
        constructor();
    }
}
/**
 * Created by zyt on 2018/4/17.
 * eui界面层,包裹所有UILayer
 */
declare namespace UI {
    class EUILayer extends eui.UILayer {
        constructor();
    }
}
/**
 * Created by zyt on 2018/1/6.
 * 最上层的引导UI层
 */
declare namespace UI {
    class GuideUILayer extends eui.UILayer implements ILayer {
        layerName: string;
        constructor();
    }
}
/**
 * Created by zyt on 2018/1/6.
 * 主容器层
 */
declare namespace UI {
    class MainUILayer extends eui.UILayer implements ILayer {
        layerName: string;
        constructor();
    }
}
/**
 * Created by zyt on 2018/1/6.
 * 菜单界面层
 */
declare namespace UI {
    class MenuUILayer extends eui.UILayer implements ILayer {
        layerName: string;
        constructor();
    }
}
/**
 * Created by zyt on 2018/1/6.
 * 消息UI层
 */
declare namespace UI {
    class MsgUILayer extends eui.UILayer implements ILayer {
        layerName: string;
        constructor();
    }
}
/**
 * Created by zyt on 2018/1/6.
 * 顶部界面层
 */
declare namespace UI {
    class TopUILayer extends eui.UILayer implements ILayer {
        layerName: string;
        constructor();
    }
}
declare class GameScene extends GameObject {
    static key: string;
    constructor();
    onCreate(): void;
    onDestroy(): void;
    onEnterFrame(advancedTime: number): void;
}
declare namespace Utils {
    class StageUtils extends SingletonClass implements ISingleton {
        instance: StageUtils;
        static readonly stage: egret.Stage;
        static readonly stageWidth: number;
        static readonly stageHeight: number;
    }
}
/**
 * Created by zyt on 2018/1/6.
 * 通用工具类
 */
declare namespace Utils {
    /**
     * 获取对象类名
     * @param target
     * @returns {any}
     */
    function getClassName(target: any): any;
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    function createBitmapByName(name: string): egret.Bitmap;
    /**
     * 等待一段时间的async实现
     * @param {number} timeout 单位毫秒
     * @returns {Promise<any>}
     */
    function waitTime(timeout: number): Promise<{}>;
}
