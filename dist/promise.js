(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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

var _then = __webpack_require__(2);

var _then2 = _interopRequireDefault(_then);

var _catch = __webpack_require__(5);

var _catch2 = _interopRequireDefault(_catch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Promise = function Promise(callback) {
    var _this = this;

    var PromiseStatus = this.PromiseStatus = "pending";
    var PromiseValue = this.PromiseValue = undefined;
    var onResolvedCallback = this.onResolvedCallback = [];
    var onRejectedCallback = this.onRejectedCallback = [];
    var resolve = this.resolve = function (value) {
        if (PromiseStatus === 'pending') {
            // 先用settimeout把任务挂起
            // 避免callback运行后，链式调用的then直接被运行了
            setTimeout(function () {
                if (PromiseStatus === 'pending') {
                    _this.PromiseStatus = "resolved";
                    _this.PromiseValue = value;
                    onResolvedCallback.forEach(function (fn) {
                        fn(value);
                    });
                }
            });
        }
    };
    var reject = this.reject = function (reason) {
        setTimeout(function () {
            if (PromiseStatus === 'pending') {
                _this.PromiseStatus = "rejected";
                _this.PromiseValue = reason;
                onRejectedCallback.forEach(function (fn) {
                    fn(reason);
                });
            }
        });
    };
    try {
        callback(resolve, reject);
    } catch (e) {
        reject(e);
    }
};

Promise.prototype = {
    then: _then2.default,
    catch: _catch2.default
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Promise = undefined;

var _Promise = __webpack_require__(0);

var _Promise2 = _interopRequireDefault(_Promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Promise = exports.Promise = _Promise2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (onResolved, onRejected) {
    var PromiseStatus = this.PromiseStatus;
    var PromiseValue = this.PromiseValue;
    var onResolvedCallback = this.onResolvedCallback;
    var onRejectedCallback = this.onRejectedCallback;
    var promise2 = void 0;
    // 如果不是函数， 我们就返回一个value/ reason
    onResolved = typeof onResolved === 'function' ? onResolved : function (v) {
        return v;
    };
    onRejected = typeof onRejected === 'function' ? onRejected : function (e) {
        return e;
    };

    if (PromiseStatus === 'resolved') {
        return promise2 = new _Promise2.default(function (resolve, reject) {
            setTimeout(function () {
                try {
                    var instance = onResolved(PromiseValue);
                    // 用户手动返回了一个Promise实例
                    (0, _resolvePromise2.default)(promise2, instance, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    if (PromiseStatus === 'rejected') {
        return promise2 = new _Promise2.default(function (resolve, reject) {
            setTimeout(function () {
                try {
                    var instance = onRejected(PromiseValue);
                    // 用户手动返回了一个Promise实例
                    (0, _resolvePromise2.default)(promise2, instance, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    // 如果是pending，说明此时promise还未执行完
    // 而then里面的任务是依赖于这个还处于pending的promise的
    // 所以push到这个promise的onResolvedCallback里面
    // 待promise为resolved的时候，一并执行
    if (PromiseStatus === 'pending') {
        return new _Promise2.default(function (resolve, reject) {
            onResolvedCallback.push(function (value) {
                try {
                    onResolved(value);
                } catch (e) {
                    reject(e);
                }
            });

            onRejectedCallback.push(function (reason) {
                try {
                    onRejected(reason);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
};

var _Promise = __webpack_require__(0);

var _Promise2 = _interopRequireDefault(_Promise);

var _resolvePromise = __webpack_require__(3);

var _resolvePromise2 = _interopRequireDefault(_resolvePromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolvePromise;

var _util = __webpack_require__(4);

/**
 * 
 * @param {*} promise2 
 * @param {*} instance 
 * @param {*} resolve 
 * @param {*} reject 
 */
function resolvePromise(promise2, instance, resolve, reject) {
  var then = void 0;
  var thenCalledOrThrow = false;

  if (promise2 === instance) {
    return reject(new TypeError('Chaining cycle detected for promise!'));
  }

  if (instance instanceof Promise) {
    if (instance.status === 'pending') {
      instance.then(function (v) {
        resolvePromise(promise2, v, resolve, reject);
      }, reject);
    } else {
      instance.then(resolve, reject);
    }
    return;
  }

  // 返回的是一个对象或者函数
  if (instance !== null && ((0, _util.isObj)(instance) || (0, _util.isFunction)(instance))) {
    try {
      then = instance.then;
      if ((0, _util.isFunction)(then)) {
        then.call(instance, function (y) {
          if (thenCalledOrThrow) return;
          thenCalledOrThrow = true;
          return resolvePromise(promise2, y, resolve, reject);
        }, function (r) {
          if (thenCalledOrThrow) return;
          thenCalledOrThrow = true;
          return reject(r);
        });
      } else {
        resolve(instance);
      }
    } catch (e) {
      if (thenCalledOrThrow) return;
      thenCalledOrThrow = true;
      return reject(e);
    }
  } else {
    // 如果我们返回的是一个值，那么直接resolve它
    // 让下一个then能够调用到
    // 值穿透
    resolve(instance);
  }
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var isFunction = exports.isFunction = function isFunction(fn) {
    return {}.toString.call(fn) === '[object Function]';
};

var isObj = exports.isObj = function isObj(obj) {
    return {}.toString.call(obj) === '[object Object]';
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (onRejected) {
  return this.then(null, onRejected);
};

/***/ })
/******/ ]);
});