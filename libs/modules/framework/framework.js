var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        var _this = _super.call(this) || this;
        _this.key = "gameObject";
        return _this;
    }
    GameObject.prototype.onCreate = function () {
    };
    GameObject.prototype.onDestroy = function () {
    };
    GameObject.prototype.onEnterFrame = function (advancedTime) {
    };
    return GameObject;
}(egret.HashObject));
__reflect(GameObject.prototype, "GameObject");
/**
 * Created by zyt on 2017/12/8.
 * 继承eui.Component界面基类
 * 需要设置皮肤
 */
var UI;
(function (UI) {
    var SkinUIBase = (function (_super) {
        __extends(SkinUIBase, _super);
        function SkinUIBase(data) {
            var _this = _super.call(this) || this;
            var self = _this;
            var className = Utils.getClassName(self);
            self.skinName = className.slice(className.lastIndexOf('.') + 1) + 'Skin'; // 设置皮肤
            self.data = data;
            self.onCreate();
            self.once(egret.Event.ADDED_TO_STAGE, self.onEnter, self);
            self.once(egret.Event.REMOVED_FROM_STAGE, self.onDestroy, self);
            return _this;
        }
        SkinUIBase.show = function (data) {
            var self = this;
            var className = self.name;
            var ui = new self(data);
            ui.key = className;
            ui.show();
            // 添加到UI管理
            UI.uiManager.add(ui);
            return ui;
        };
        // 首次初始化
        SkinUIBase.prototype.onCreate = function () {
        };
        SkinUIBase.prototype.onEnter = function () { };
        // 显示界面
        SkinUIBase.prototype.show = function () {
            var self = this;
            if (!self.visible)
                self.visible = true;
        };
        // 关闭界面（隐藏） destroy：是否要移除销毁界面
        SkinUIBase.prototype.close = function (destroy) {
            if (destroy === void 0) { destroy = true; }
            var self = this;
            if (self.visible)
                self.visible = false;
            if (destroy)
                UI.uiManager.remove(self);
        };
        // 销毁界面
        SkinUIBase.prototype.onDestroy = function () {
            var self = this;
            // 清除数据缓存
            self.data = null;
            console.log(self.key + "->destroy");
        };
        /**
         * 暂停，当打开新界面时当前界面暂停
         */
        SkinUIBase.prototype.pause = function () {
            var self = this;
            self.isPause = true;
            console.log('pause');
        };
        /**
         * 恢复，当前界面关闭时上个界面恢复
         */
        SkinUIBase.prototype.resume = function () {
            var self = this;
            self.isPause = false;
            console.log('resume');
        };
        return SkinUIBase;
    }(eui.Component));
    UI.SkinUIBase = SkinUIBase;
    __reflect(SkinUIBase.prototype, "UI.SkinUIBase", ["UI.IUI"]);
})(UI || (UI = {}));
/**
 * Created by zyt on 2017/12/8.
 * 继承egret.Sprite界面基类
 */
var UI;
(function (UI) {
    var SpriteUIBase = (function (_super) {
        __extends(SpriteUIBase, _super);
        function SpriteUIBase(data) {
            var _this = _super.call(this) || this;
            var self = _this;
            self.data = data;
            self.touchEnabled = true;
            self.once(egret.Event.ADDED_TO_STAGE, self.onEnter, self);
            self.once(egret.Event.REMOVED_FROM_STAGE, self.onDestroy, self);
            self.onCreate();
            return _this;
        }
        // 静态show方法，简化需要new一个的方式
        SpriteUIBase.show = function (data) {
            var self = this;
            var className = self.name;
            var ui = new self(data);
            ui.key = className;
            ui.show();
            // 添加到UI管理
            UI.uiManager.add(ui);
            return ui;
        };
        SpriteUIBase.prototype.onCreate = function () { };
        SpriteUIBase.prototype.onEnter = function () { };
        // 销毁界面
        SpriteUIBase.prototype.onDestroy = function () {
            var self = this;
            // 清除数据缓存
            self.data = null;
            console.log(self.key + "->destroy");
        };
        // 显示界面
        SpriteUIBase.prototype.show = function () {
            var self = this;
            if (!self.visible)
                self.visible = true;
        };
        // 关闭界面（隐藏） destroy：是否要移除销毁界面
        SpriteUIBase.prototype.close = function (destroy) {
            if (destroy === void 0) { destroy = true; }
            var self = this;
            if (self.visible)
                self.visible = false;
            if (destroy)
                UI.uiManager.remove(self);
        };
        /**
         * 暂停，当打开新界面时当前界面暂停
         */
        SpriteUIBase.prototype.pause = function () {
            var self = this;
            self.isPause = true;
            console.log('pause');
        };
        /**
         * 恢复，当前界面关闭时上个界面恢复
         */
        SpriteUIBase.prototype.resume = function () {
            var self = this;
            self.isPause = false;
            console.log('resume');
        };
        return SpriteUIBase;
    }(egret.Sprite));
    UI.SpriteUIBase = SpriteUIBase;
    __reflect(SpriteUIBase.prototype, "UI.SpriteUIBase", ["UI.IUI"]);
})(UI || (UI = {}));
/**
 * 单例基类
 */
var SingletonClass = (function () {
    function SingletonClass() {
    }
    SingletonClass.getInstance = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var classRef = this;
        if (!classRef.instance)
            classRef.instance = new classRef(args);
        return classRef.instance;
    };
    return SingletonClass;
}());
__reflect(SingletonClass.prototype, "SingletonClass");
/**
 * Created by zyt on 2018/4/17.
 * 最上层界面基类，置于MsgUILayer层
 */
var UI;
(function (UI) {
    var MsgUI = (function (_super) {
        __extends(MsgUI, _super);
        function MsgUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MsgUI;
    }(UI.SkinUIBase));
    UI.MsgUI = MsgUI;
    __reflect(MsgUI.prototype, "UI.MsgUI");
})(UI || (UI = {}));
var ObjectPool = (function () {
    function ObjectPool() {
        this._pool = {};
        this._list = [];
        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    }
    ObjectPool.prototype.onEnterFrame = function (advancedTime) {
        var list = this._list.concat();
        for (var i = 0, length = list.length; i < length; i++) {
            var obj = list[i];
            obj.onEnterFrame(advancedTime);
        }
    };
    ObjectPool.prototype.createObject = function (classFactory) {
        var result;
        var key = classFactory.key;
        var arr = this._pool[key];
        if (arr != null && arr.length) {
            result = arr.shift();
        }
        else {
            result = new classFactory();
            result.key = key;
        }
        result.onCreate();
        this._list.push(result);
        return result;
    };
    ObjectPool.prototype.destroyObject = function (obj) {
        var key = obj.key;
        if (this._pool[key] == null) {
            this._pool[key] = [];
        }
        this._pool[key].push(obj);
        obj.onDestroy();
        var index = this._list.indexOf(obj);
        if (index != -1) {
            this._list.splice(index, 1);
        }
    };
    ObjectPool.getInstance = function () {
        if (ObjectPool.instance == null) {
            ObjectPool.instance = new ObjectPool();
        }
        return ObjectPool.instance;
    };
    return ObjectPool;
}());
__reflect(ObjectPool.prototype, "ObjectPool");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var State = (function () {
    function State() {
    }
    State.prototype.onEnter = function () {
    };
    State.prototype.onExit = function () {
    };
    return State;
}());
__reflect(State.prototype, "State");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var StateMachine = (function () {
    function StateMachine() {
    }
    StateMachine.prototype.change = function (state) {
        if (this._state) {
            this._state.onExit();
        }
        this._state = state;
        this._state.onEnter();
    };
    return StateMachine;
}());
__reflect(StateMachine.prototype, "StateMachine");
var Res;
(function (Res) {
    var LoadingResDlg = (function (_super) {
        __extends(LoadingResDlg, _super);
        function LoadingResDlg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LoadingResDlg.prototype.onProgress = function (current, total) {
            this.loadingTxt.text = "Loading..." + current + "/" + total;
        };
        return LoadingResDlg;
    }(UI.SkinUIBase));
    Res.LoadingResDlg = LoadingResDlg;
    __reflect(LoadingResDlg.prototype, "Res.LoadingResDlg", ["RES.PromiseTaskReporter"]);
})(Res || (Res = {}));
var Res;
(function (Res) {
    var PreloadingUI = (function (_super) {
        __extends(PreloadingUI, _super);
        function PreloadingUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PreloadingUI.prototype.onCreate = function () {
            _super.prototype.onCreate.call(this);
            this.createView();
        };
        PreloadingUI.prototype.createView = function () {
            var self = this;
            self.textField = new egret.TextField();
            self.addChild(self.textField);
            self.textField.y = 300;
            self.textField.width = Utils.StageUtils.stageWidth;
            self.textField.height = 100;
            self.textField.textAlign = "center";
        };
        PreloadingUI.prototype.onProgress = function (current, total) {
            this.textField.text = "Loading..." + current + "/" + total;
        };
        return PreloadingUI;
    }(UI.SpriteUIBase));
    Res.PreloadingUI = PreloadingUI;
    __reflect(PreloadingUI.prototype, "Res.PreloadingUI", ["RES.PromiseTaskReporter"]);
})(Res || (Res = {}));
var Res;
(function (Res) {
    var ResMgr = (function () {
        function ResMgr() {
            if (ResMgr.instance)
                throw 'ResMgr instance already constructed!';
        }
        /**
         * 单例
         * @returns {Index.ResMgr}
         */
        ResMgr.getInstance = function () {
            if (!ResMgr.instance)
                ResMgr.instance = new ResMgr();
            return ResMgr.instance;
        };
        /**
         * 加载资源组带加载界面
         * @param {string} name
         */
        ResMgr.loadGroup = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var dlg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            dlg = Res.LoadingResDlg.show();
                            return [4 /*yield*/, RES.loadGroup(name, 0, dlg)];
                        case 1:
                            _a.sent();
                            dlg.close();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ResMgr;
    }());
    Res.ResMgr = ResMgr;
    __reflect(ResMgr.prototype, "Res.ResMgr");
})(Res || (Res = {}));
var Scene;
(function (Scene) {
    /**
     * 场景基类
     */
    var SceneBase = (function (_super) {
        __extends(SceneBase, _super);
        function SceneBase(data) {
            var _this = _super.call(this) || this;
            var self = _this;
            self.data = data;
            self.onCreate();
            return _this;
        }
        /**
         * 静态run方法
         */
        SceneBase.run = function (data, onUpdateEnabled, destroyCur) {
            if (data === void 0) { data = {}; }
            if (onUpdateEnabled === void 0) { onUpdateEnabled = false; }
            if (destroyCur === void 0) { destroyCur = true; }
            var classFactory = this;
            return Scene.sceneMgr.run(classFactory.name, classFactory, data, onUpdateEnabled, destroyCur);
        };
        // 生命周期 START
        /**
         * 实例化
         */
        SceneBase.prototype.onCreate = function () {
            var self = this;
            self.layerMap = {};
            self.uiStackMap = {};
            self.initLayer();
        };
        /**
         * 初始化界面层，默认7层
         */
        SceneBase.prototype.initLayer = function (layerClasses) {
            if (layerClasses === void 0) { layerClasses = [
                UI.BaseLayer,
                UI.MainUILayer,
                UI.MenuUILayer,
                UI.DlgUILayer,
                UI.MsgUILayer,
                UI.GuideUILayer,
                UI.TopUILayer
            ]; }
            var self = this;
            var euiLayer = new UI.EUILayer();
            for (var i = 0, l_i = layerClasses.length; i < l_i; i++) {
                var classRef = layerClasses[i];
                var layer = new classRef();
                layer.touchThrough = true;
                self.layerMap[layer.layerName] = layer;
                self.uiStackMap[layer.layerName] = []; // 为每层初始化ui栈
                if (layer instanceof UI.BaseLayer)
                    self.addChildAt(layer, 0);
                else
                    euiLayer.addChild(layer);
            }
            self.addChildAt(euiLayer, 1);
        };
        /**
         * 进入
         * @param param
         */
        SceneBase.prototype.onEnter = function () {
            var self = this;
            self.visible = true;
            self.touchEnabled = true;
            console.log(self.key + "->enter");
        };
        /**
         * 帧循环
         */
        SceneBase.prototype.onUpdate = function () {
        };
        /**
         * 退出
         */
        SceneBase.prototype.onExit = function () {
            var self = this;
            self.visible = false;
            self.touchEnabled = false;
            console.log(self.key + "->exit");
        };
        /**
         * 销毁
         */
        SceneBase.prototype.onDestroy = function () {
            var self = this;
            // 先退出
            self.onExit();
            // 遍历每个层级的UI，执行其onDestroy()
            var tmpLayer;
            var tmpUI;
            for (var key in self.layerMap) {
                tmpLayer = self.layerMap[key];
                for (var j = 0, l_j = tmpLayer.numElements; j < l_j; j++) {
                    tmpUI = tmpLayer.getElementAt(j);
                    tmpUI.onDestroy();
                }
            }
            self.layerMap = null;
            self.uiStackMap = null;
            // 移除自身
            var parent = self.parent;
            if (!parent)
                return console.warn('场景没有父节点！');
            parent.removeChild(self);
            console.log(self.key + "->destroy");
        };
        // 生命周期 END
        SceneBase.prototype.getUISatck = function (layerName) {
            return this.uiStackMap[layerName];
        };
        /**
         * 添加界面
         * @param {egret.DisplayObject} ui
         */
        SceneBase.prototype.add = function (ui) {
            var self = this;
            var targetLayer;
            if (ui instanceof UI.MainUI)
                targetLayer = self.layerMap[Consts.LayerNames.MainUILayer];
            else if (ui instanceof UI.MenuUI)
                targetLayer = self.layerMap[Consts.LayerNames.MenuUILayer];
            else if (ui instanceof UI.DlgUILayer)
                targetLayer = self.layerMap[Consts.LayerNames.DlgUILayer];
            else if (ui instanceof UI.MsgUI)
                targetLayer = self.layerMap[Consts.LayerNames.MsgUILayer];
            else if (ui instanceof UI.GuideUI)
                targetLayer = self.layerMap[Consts.LayerNames.GuideUILayer];
            else if (ui instanceof UI.TopUILayer)
                targetLayer = self.layerMap[Consts.LayerNames.TopUILayer];
            else
                targetLayer = self.layerMap[Consts.LayerNames.BaseLayer];
            self.addToLayer(targetLayer, ui);
        };
        /**
         * 添加UI元素到指定层
         * @param {Swift.UI.LayerBase} layer
         * @param {egret.DisplayObject} ui
         */
        SceneBase.prototype.addToLayer = function (layer, ui) {
            var self = this;
            layer.addChild(ui);
            var stack = self.getUISatck(layer.layerName);
            // 当前界面暂停
            if (stack.length) {
                var curUI = stack[stack.length - 1];
                curUI.pause();
            }
            // 压入新界面
            stack.push(ui);
        };
        /**
         * 移除ui元素
         * @param {egret.DisplayObject} ui
         */
        SceneBase.prototype.remove = function (ui) {
            var self = this;
            var layer = ui.parent;
            if (layer)
                layer.removeChild(ui);
            ui = null;
            var stack = self.getUISatck(layer.layerName);
            stack.pop(); // 当前界面出栈
            // 恢复上个界面
            if (stack.length) {
                var lastUI = stack[stack.length - 1];
                lastUI.resume();
            }
        };
        /**
         * 获取指定层的当前界面
         * @param {string} layerName
         * @returns {Swift.UI.IUI}
         */
        SceneBase.prototype.getTopFromLayer = function (layerName) {
            var self = this;
            var stack = self.getUISatck(layerName);
            if (!stack || !stack.length)
                return null;
            return stack[stack.length - 1];
        };
        /**
         * 关闭指定层的当前界面
         * @param {string} layerName
         * @param {boolean} destroy 是否要移除界面
         */
        SceneBase.prototype.closeTopFromLayer = function (layerName, destroy) {
            if (destroy === void 0) { destroy = true; }
            var self = this;
            var ui = self.getTopFromLayer(layerName);
            if (ui)
                ui.close(destroy);
        };
        return SceneBase;
    }(eui.UILayer));
    Scene.SceneBase = SceneBase;
    __reflect(SceneBase.prototype, "Scene.SceneBase", ["Scene.IScene"]);
})(Scene || (Scene = {}));
var Scene;
(function (Scene) {
    /**
     * 场景管理
     */
    var SceneMgr = (function () {
        function SceneMgr() {
            this.sceneMap = {};
        }
        Object.defineProperty(SceneMgr.prototype, "CurScene", {
            /**
             * 当前场景
             * @returns {any}
             * @constructor
             */
            get: function () {
                var self = this;
                return self.sceneMap[self.curScene];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 运行or切换场景
         * 注意了：先退出上个场景再进入新场景
         * @param {string} key
         * @param classFactory
         * @param data 数据
         * @param {boolean} onUpdateEnabled 是否要帧循环
         * @param {boolean} destroyCur 是否销毁当前场景
         */
        SceneMgr.prototype.run = function (key, classFactory, data, onUpdateEnabled, destroyCur) {
            if (data === void 0) { data = {}; }
            if (onUpdateEnabled === void 0) { onUpdateEnabled = false; }
            if (destroyCur === void 0) { destroyCur = true; }
            var self = this;
            // 当前场景退出
            var oldScene = self.sceneMap[self.curScene];
            if (oldScene) {
                if (destroyCur) {
                    oldScene.onDestroy();
                    delete self.sceneMap[oldScene.key];
                }
                else
                    oldScene.onExit();
            }
            var scene = self.sceneMap[key];
            if (!scene) {
                scene = new classFactory(data);
                Utils.StageUtils.stage.addChild(scene);
                scene.key = key;
                scene.onUpdateEnabled = onUpdateEnabled;
                self.sceneMap[key] = scene;
            }
            self.curScene = key;
            scene.onEnter();
            return scene;
        };
        /**
         * 帧循环
         */
        SceneMgr.prototype.onUpdate = function () {
            var self = this;
            var curScene = self.CurScene;
            if (curScene && curScene.onUpdateEnabled)
                curScene.onUpdate();
        };
        /**
         * 销毁所有场景
         * @param {string} key
         */
        SceneMgr.prototype.destroyAll = function () {
            var self = this;
            if (!self.sceneMap)
                return;
            for (var key in self.sceneMap)
                self.sceneMap[key].onDestroy();
            self.sceneMap = {};
        };
        return SceneMgr;
    }());
    Scene.SceneMgr = SceneMgr;
    __reflect(SceneMgr.prototype, "Scene.SceneMgr");
    Scene.sceneMgr = new SceneMgr();
})(Scene || (Scene = {}));
/**
 * 键盘输入处理
 */
var Tools;
(function (Tools) {
    var KeyInputHandler = (function () {
        function KeyInputHandler() {
            var self = this;
            if (KeyInputHandler.instance)
                throw 'KeyInputHandler.instance单例已存在！';
            document.addEventListener("keydown", function (event) {
                self.keyHandler(event);
            });
            document.addEventListener("keyup", function (event) {
                Utils.StageUtils.stage.dispatchEventWith(event.type);
                self.curDir = 0;
            });
        }
        KeyInputHandler.prototype.keyHandler = function (event) {
            var self = this;
            var dir;
            switch (event.keyCode) {
                // left
                case 37:
                case 65:
                    dir = KeyInputHandler.DIR_LEFT;
                    break;
                // right
                case 39:
                case 68:
                    dir = KeyInputHandler.DIR_RIGHT;
                    break;
                // up
                case 38:
                case 87:
                    dir = KeyInputHandler.DIR_UP;
                    break;
                // down
                case 83:
                case 40:
                    dir = KeyInputHandler.DIR_DOWN;
                    break;
                default:
                    return;
            }
            if (self.curDir == dir)
                return;
            self.curDir = dir;
            Utils.StageUtils.stage.dispatchEventWith(event.type, false, dir);
        };
        KeyInputHandler.instance = new KeyInputHandler();
        KeyInputHandler.DIR_LEFT = 1;
        KeyInputHandler.DIR_RIGHT = 2;
        KeyInputHandler.DIR_UP = 3;
        KeyInputHandler.DIR_DOWN = 4;
        return KeyInputHandler;
    }());
    Tools.KeyInputHandler = KeyInputHandler;
    __reflect(KeyInputHandler.prototype, "Tools.KeyInputHandler");
})(Tools || (Tools = {}));
/**
 * Created by zyt on 2017/12/8.
 * 对话框界面基类，置于DlgUILayer层
 */
var UI;
(function (UI) {
    var DlgUI = (function (_super) {
        __extends(DlgUI, _super);
        function DlgUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DlgUI;
    }(UI.SkinUIBase));
    UI.DlgUI = DlgUI;
    __reflect(DlgUI.prototype, "UI.DlgUI");
})(UI || (UI = {}));
/**
 * Created by zyt on 2018/4/17.
 * 引导界面基类，置于GuideUILayer层
 */
var UI;
(function (UI) {
    var GuideUI = (function (_super) {
        __extends(GuideUI, _super);
        function GuideUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GuideUI;
    }(UI.SkinUIBase));
    UI.GuideUI = GuideUI;
    __reflect(GuideUI.prototype, "UI.GuideUI");
})(UI || (UI = {}));
/**
 * Created by zyt on 2017/12/8.
 * 对话框界面基类，置于MainUILayer层
 */
var UI;
(function (UI) {
    var MainUI = (function (_super) {
        __extends(MainUI, _super);
        function MainUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MainUI;
    }(UI.SkinUIBase));
    UI.MainUI = MainUI;
    __reflect(MainUI.prototype, "UI.MainUI");
})(UI || (UI = {}));
/**
 * Created by zyt on 2018/4/17.
 * 菜单界面基类，置于MenuUILayer层
 */
var UI;
(function (UI) {
    var MenuUI = (function (_super) {
        __extends(MenuUI, _super);
        function MenuUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MenuUI;
    }(UI.SkinUIBase));
    UI.MenuUI = MenuUI;
    __reflect(MenuUI.prototype, "UI.MenuUI");
})(UI || (UI = {}));
/**
 * 该游戏应用
 */
var App;
(function (App) {
    var Game = (function () {
        function Game() {
        }
        return Game;
    }());
    App.Game = Game;
    __reflect(Game.prototype, "App.Game");
})(App || (App = {}));
/**
 * Game
 */
var Game;
(function (Game) {
    var GameLoop = (function () {
        function GameLoop() {
            var self = this;
            egret.lifecycle.addLifecycleListener(function (context) {
                context.onUpdate = self.onUpdate;
            });
        }
        /**
         * 游戏帧循环
         */
        GameLoop.prototype.onUpdate = function () {
            Scene.sceneMgr.onUpdate();
        };
        return GameLoop;
    }());
    Game.GameLoop = GameLoop;
    __reflect(GameLoop.prototype, "Game.GameLoop");
    Game.gameLoop = new GameLoop();
})(Game || (Game = {}));
var Consts;
(function (Consts) {
    var LayerNames;
    (function (LayerNames) {
        LayerNames.BaseLayer = 'BaseLayer'; // 基础UI层，与eui无关继承egret.DisplayObjectContainer
        LayerNames.MainUILayer = 'MainUILayer'; // 主UI层
        LayerNames.MenuUILayer = 'MenuUILayer.'; // 菜单UI层
        LayerNames.DlgUILayer = 'DlgUILayer'; // 对话框界面UI层
        LayerNames.MsgUILayer = 'MsgUILayer.'; // 消息UI层
        LayerNames.GuideUILayer = 'GuideUILayer'; // 引导UI层
        LayerNames.TopUILayer = 'TopUILayer'; // 顶部UI层
    })(LayerNames = Consts.LayerNames || (Consts.LayerNames = {}));
})(Consts || (Consts = {}));
/**
 * Created by zyt on 2018/4/17.
 * 最上层界面基类，置于TopUILayer层
 */
var UI;
(function (UI) {
    var TopUI = (function (_super) {
        __extends(TopUI, _super);
        function TopUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TopUI;
    }(UI.SkinUIBase));
    UI.TopUI = TopUI;
    __reflect(TopUI.prototype, "UI.TopUI");
})(UI || (UI = {}));
/**
 * Created by zyt on 2018/1/6.
 * UI界面管理
 */
var UI;
(function (UI) {
    var UIManager = (function () {
        function UIManager() {
        }
        /**
         * 添加界面
         */
        UIManager.prototype.add = function (ui) {
            var curScene = Scene.sceneMgr.CurScene;
            if (!curScene)
                return;
            curScene.add(ui);
        };
        /**
         * 移除ui元素
         */
        UIManager.prototype.remove = function (ui) {
            var curScene = Scene.sceneMgr.CurScene;
            if (!curScene)
                return;
            curScene.remove(ui);
        };
        /**
         * 获取指定层的当前界面
         */
        UIManager.prototype.getTopFromLayer = function (layerName) {
            var curScene = Scene.sceneMgr.CurScene;
            if (!curScene)
                return;
            curScene.getTopFromLayer(layerName);
        };
        /**
         * 关闭指定层的当前界面
         */
        UIManager.prototype.closeTopFromLayer = function (layerName, destroy) {
            if (destroy === void 0) { destroy = true; }
            var curScene = Scene.sceneMgr.CurScene;
            if (!curScene)
                return;
            curScene.closeTopFromLayer(layerName, destroy);
        };
        return UIManager;
    }());
    UI.UIManager = UIManager;
    __reflect(UIManager.prototype, "UI.UIManager");
    UI.uiManager = new UIManager();
})(UI || (UI = {}));
/**
 * 摇杆组件
 * 需要对应皮肤：JoystickSkin
 */
var UI;
(function (UI) {
    var Joystick = (function (_super) {
        __extends(Joystick, _super);
        function Joystick() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.addEventListener(egret.Event.ADDED_TO_STAGE, self.onAddToStage, self);
            return _this;
        }
        Joystick.prototype.onAddToStage = function () {
            var self = this;
            self.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
            self.addEventListener(egret.TouchEvent.TOUCH_END, self.onTouchEnd, self);
            self.addEventListener(egret.TouchEvent.TOUCH_CANCEL, self.onTouchEnd, self);
            self.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, self.onTouchEnd, self);
            self.radius = self.tray.width >> 1;
        };
        Joystick.prototype.onTouchBegin = function (event) {
            var self = this;
            self.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
        };
        Joystick.prototype.onTouchMove = function (event) {
            var self = this;
            var point = self.handle.parent.globalToLocal(event.stageX, event.stageY);
            var angle = Math.atan2(point.y - self.tray.y, point.x - self.tray.x);
            // 限制滑动距离
            if (point.length > self.radius)
                point = egret.Point.polar(self.radius, angle);
            self.handle.x = point.x;
            self.handle.y = point.y;
            if (self.curAngle == angle)
                return;
            self.curAngle = angle;
            self.stage.dispatchEventWith('onJoystick', false, angle);
        };
        Joystick.prototype.onTouchEnd = function () {
            var self = this;
            egret.Tween.removeTweens(self.handle);
            egret.Tween.get(self.handle).to({ x: 0, y: 0 }, 100, egret.Ease.backOut);
            self.stage.dispatchEventWith('onJoystickEnd');
            self.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, self.onTouchMove, self);
        };
        return Joystick;
    }(eui.Component));
    UI.Joystick = Joystick;
    __reflect(Joystick.prototype, "UI.Joystick");
})(UI || (UI = {}));
/**
 * Created by zyt on 2018/4/17.
 * 基础层，与eui无关
 */
var UI;
(function (UI) {
    var BaseLayer = (function (_super) {
        __extends(BaseLayer, _super);
        function BaseLayer() {
            var _this = _super.call(this) || this;
            _this.layerName = Consts.LayerNames.BaseLayer;
            return _this;
        }
        return BaseLayer;
    }(egret.DisplayObjectContainer));
    UI.BaseLayer = BaseLayer;
    __reflect(BaseLayer.prototype, "UI.BaseLayer", ["UI.ILayer"]);
})(UI || (UI = {}));
/**
 * Created by zyt on 2018/1/6.
 * 对话框界面层
 */
var UI;
(function (UI) {
    var UILayer = eui.UILayer;
    var DlgUILayer = (function (_super) {
        __extends(DlgUILayer, _super);
        function DlgUILayer() {
            var _this = _super.call(this) || this;
            _this.layerName = Consts.LayerNames.DlgUILayer;
            return _this;
        }
        return DlgUILayer;
    }(UILayer));
    UI.DlgUILayer = DlgUILayer;
    __reflect(DlgUILayer.prototype, "UI.DlgUILayer", ["UI.ILayer"]);
})(UI || (UI = {}));
/**
 * Created by zyt on 2018/4/17.
 * eui界面层,包裹所有UILayer
 */
var UI;
(function (UI) {
    var EUILayer = (function (_super) {
        __extends(EUILayer, _super);
        function EUILayer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EUILayer;
    }(eui.UILayer));
    UI.EUILayer = EUILayer;
    __reflect(EUILayer.prototype, "UI.EUILayer");
})(UI || (UI = {}));
/**
 * Created by zyt on 2018/1/6.
 * 最上层的引导UI层
 */
var UI;
(function (UI) {
    var GuideUILayer = (function (_super) {
        __extends(GuideUILayer, _super);
        function GuideUILayer() {
            var _this = _super.call(this) || this;
            _this.layerName = Consts.LayerNames.GuideUILayer;
            return _this;
        }
        return GuideUILayer;
    }(eui.UILayer));
    UI.GuideUILayer = GuideUILayer;
    __reflect(GuideUILayer.prototype, "UI.GuideUILayer", ["UI.ILayer"]);
})(UI || (UI = {}));
/**
 * Created by zyt on 2018/1/6.
 * 主容器层
 */
var UI;
(function (UI) {
    var MainUILayer = (function (_super) {
        __extends(MainUILayer, _super);
        function MainUILayer() {
            var _this = _super.call(this) || this;
            _this.layerName = Consts.LayerNames.MainUILayer;
            return _this;
        }
        return MainUILayer;
    }(eui.UILayer));
    UI.MainUILayer = MainUILayer;
    __reflect(MainUILayer.prototype, "UI.MainUILayer", ["UI.ILayer"]);
})(UI || (UI = {}));
/**
 * Created by zyt on 2018/1/6.
 * 菜单界面层
 */
var UI;
(function (UI) {
    var MenuUILayer = (function (_super) {
        __extends(MenuUILayer, _super);
        function MenuUILayer() {
            var _this = _super.call(this) || this;
            _this.layerName = Consts.LayerNames.MenuUILayer;
            return _this;
        }
        return MenuUILayer;
    }(eui.UILayer));
    UI.MenuUILayer = MenuUILayer;
    __reflect(MenuUILayer.prototype, "UI.MenuUILayer", ["UI.ILayer"]);
})(UI || (UI = {}));
/**
 * Created by zyt on 2018/1/6.
 * 消息UI层
 */
var UI;
(function (UI) {
    var MsgUILayer = (function (_super) {
        __extends(MsgUILayer, _super);
        function MsgUILayer() {
            var _this = _super.call(this) || this;
            _this.layerName = Consts.LayerNames.MsgUILayer;
            return _this;
        }
        return MsgUILayer;
    }(eui.UILayer));
    UI.MsgUILayer = MsgUILayer;
    __reflect(MsgUILayer.prototype, "UI.MsgUILayer", ["UI.ILayer"]);
})(UI || (UI = {}));
/**
 * Created by zyt on 2018/1/6.
 * 顶部界面层
 */
var UI;
(function (UI) {
    var TopUILayer = (function (_super) {
        __extends(TopUILayer, _super);
        function TopUILayer() {
            var _this = _super.call(this) || this;
            _this.layerName = Consts.LayerNames.TopUILayer;
            return _this;
        }
        return TopUILayer;
    }(eui.UILayer));
    UI.TopUILayer = TopUILayer;
    __reflect(TopUILayer.prototype, "UI.TopUILayer", ["UI.ILayer"]);
})(UI || (UI = {}));
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this) || this;
    }
    GameScene.prototype.onCreate = function () {
    };
    GameScene.prototype.onDestroy = function () {
    };
    GameScene.prototype.onEnterFrame = function (advancedTime) {
    };
    GameScene.key = "gamescene";
    return GameScene;
}(GameObject));
__reflect(GameScene.prototype, "GameScene");
var Utils;
(function (Utils) {
    var StageUtils = (function (_super) {
        __extends(StageUtils, _super);
        function StageUtils() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(StageUtils, "stage", {
            get: function () {
                return egret.MainContext.instance.stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageUtils, "stageWidth", {
            get: function () {
                return StageUtils.stage.stageWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageUtils, "stageHeight", {
            get: function () {
                return StageUtils.stage.stageHeight;
            },
            enumerable: true,
            configurable: true
        });
        return StageUtils;
    }(SingletonClass));
    Utils.StageUtils = StageUtils;
    __reflect(StageUtils.prototype, "Utils.StageUtils", ["ISingleton"]);
})(Utils || (Utils = {}));
/**
 * Created by zyt on 2018/1/6.
 * 通用工具类
 */
var Utils;
(function (Utils) {
    /**
     * 获取对象类名
     * @param target
     * @returns {any}
     */
    function getClassName(target) {
        return target.__proto__.__class__;
    }
    Utils.getClassName = getClassName;
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    Utils.createBitmapByName = createBitmapByName;
    /**
     * 等待一段时间的async实现
     * @param {number} timeout 单位毫秒
     * @returns {Promise<any>}
     */
    function waitTime(timeout) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(resolve, timeout);
                    })];
            });
        });
    }
    Utils.waitTime = waitTime;
})(Utils || (Utils = {}));
