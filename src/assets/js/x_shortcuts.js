(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Shortcuts"] = factory();
	else
		root["Shortcuts"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var _ = {
    noop: function noop() {
        //
    },

    // 类型判断
    typeOf: function typeOf(o) {
        return o == null ? String(o) : {}.toString.call(o).slice(8, -1).toLowerCase();
    },

    //判断数组中是否包含某个元素
    arrayContain: function arrayContain() {
        var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        return arr.indexOf(val) !== -1;
    },

    //判断用户是否按下监听的所有按键
    arrContainAllObjValue: function arrContainAllObjValue() {
        var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return (Object.keys(obj) || []).every(function (k) {
            return _.arrayContain(arr, obj[k]);
        });
    },

    //从数组中移除某个元素
    arrayRemoveItem: function arrayRemoveItem() {
        var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var index = arr.indexOf(val);

        if (index > -1) {
            arr.splice(index, 1);
        }

        return arr;
    },

    //获取下一次按键对应的ascii码
    getStrangeItemOfArr: function getStrangeItemOfArr() {
        var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var next = null;

        (Object.keys(obj) || []).every(function (k) {
            if (!_.arrayContain(arr, obj[k])) {
                next = obj[k];
                return false;
            }
            return true;
        });
        return next;
    }
};

exports.default = _;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShortcutsFactory = function ShortcutsFactory() {
    var S = {
        _inited: false,
        _ELE_ERROR_MSG: 'ele is not a element!',
        keys: {}, //监听的按键{key:code},code为按键对应的ascii码
        curKeys: [], //当前按下的键
        actionFn: _util2.default.noop, //完成按键的回调函数
        finishFn: _util2.default.noop, //完成按键取消后的回调函数
        isFinish: false, //判断是否完成按键
        isOrder: false, //按键是否有相应的顺序
        _keydown: function _keydown(evt) {
            evt = evt || window.event;

            if (!_util2.default.arrayContain(S.curKeys, evt.keyCode)) {
                if (_util2.default.getStrangeItemOfArr(S.curKeys, S.keys) === evt.keyCode && S.isOrder || !S.isOrder) {
                    S.curKeys.push(evt.keyCode);
                }
            }
            if (_util2.default.arrContainAllObjValue(S.curKeys, S.keys)) {
                if (S.actionFn && !S.isFinish) {
                    S.actionFn();
                }
                S.isFinish = true;
            }
        },
        _keyup: function _keyup(evt) {
            evt = evt || window.event;

            if (_util2.default.arrContainAllObjValue(S.curKeys, S.keys) && S.isFinish) {
                //完成按键,又取消的事件
                if (S.finishFn) {
                    S.finishFn();
                }
            }

            S.curKeys = _util2.default.arrayRemoveItem(S.curKeys, evt.keyCode);
            S.isFinish = false;
        },

        //监听用户键盘操作
        _listenkeys: function _listenkeys() {
            var ELE = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            S._addListener(ELE, 'keydown', S._keydown);
            S._addListener(ELE, 'keyup', S._keyup);
            S._inited = true;
        },
        _unListenkeys: function _unListenkeys() {
            var ELE = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            S._removeListener(ELE, 'keydown', S._keydown);
            S._removeListener(ELE, 'keyup', S._keyup);
            S._inited = false;
        },
        _addListener: function _addListener(ele, eKey, fn, bool) {
            if (document.attachEvent) {
                ele.attachEvent('on' + eKey, fn);
            } else {
                ele.addEventListener(eKey, fn, bool);
            }
        },
        _removeListener: function _removeListener(ele, eKey, fn, bool) {
            if (document.detachEvent) {
                ele.detachEvent('on' + eKey, fn);
            } else {
                ele.removeEventListener(eKey, fn, bool);
            }
        },
        _initOptions: function _initOptions(options) {
            var _options$ele = options.ele,
                ele = _options$ele === undefined ? document : _options$ele,
                _options$keys = options.keys,
                keys = _options$keys === undefined ? {} : _options$keys,
                _options$isOrder = options.isOrder,
                isOrder = _options$isOrder === undefined ? false : _options$isOrder,
                _options$actionFn = options.actionFn,
                actionFn = _options$actionFn === undefined ? null : _options$actionFn,
                _options$finishFn = options.finishFn,
                finishFn = _options$finishFn === undefined ? null : _options$finishFn,
                _options$lastS = options.lastS,
                lastS = _options$lastS === undefined ? null : _options$lastS;


            S.ele = ele;
            S.keys = keys;
            S.isOrder = isOrder;
            S.actionFn = actionFn;
            S.finishFn = finishFn;
            S.lastS = lastS;

            var ELE = S.ele || null;

            if (!ELE) {
                console.error(S._ELE_ERROR_MSG);
                return null;
            }

            return ELE;
        },
        init: function init(options) {
            var ELE = S._initOptions(options);

            if (!ELE) {
                return null;
            }

            S._listenkeys(ELE);

            return S;
        },
        free: function free() {
            if (S._inited) {
                if (S.ele) {
                    S._unListenkeys(S.ele);
                } else {
                    console.error(S._ELE_ERROR_MSG);
                }
            } else {
                console.error('Could not find the event to release!');
            }

            return null;
        }
    };

    return S;
};

exports.default = {
    init: function init(o) {
        return ShortcutsFactory().init(o);
    }
};
module.exports = exports['default'];

/***/ })
/******/ ]);
});