export let isFunction = function (fn) {
    return ({}).toString.call(fn) === '[object Function]'
};

export let isObj = function (obj) {
    return ({}).toString.call(obj) === '[object Object]'
}