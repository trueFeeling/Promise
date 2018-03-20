import {isFunction, isObj} from './util'
/**
 * 
 * @param {*} promise2 
 * @param {*} instance 
 * @param {*} resolve 
 * @param {*} reject 
 */
export default function resolvePromise (promise2, instance, resolve, reject) {
    let then
    let thenCalledOrThrow = false
  
    if (promise2 === instance) {
      return reject(new TypeError('Chaining cycle detected for promise!'))
    }
  
    if (instance instanceof Promise) {
      if (instance.status === 'pending') {
        instance.then(v => {
          resolvePromise(promise2, v, resolve, reject)
        }, reject)
      } else {
        instance.then(resolve, reject)
      }
      return
    }

    // 返回的是一个对象或者函数
    if ((instance !== null) && (isObj(instance) || isFunction(instance))) {
      try {
        then = instance.then;
        if (isFunction(then)) {
          then.call(instance, y => {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true
            return resolvePromise(promise2, y, resolve, reject)
          }, r => {
            if (thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return reject(r)
          })
        } else {
          resolve(instance)
        }
      } catch (e) {
        if (thenCalledOrThrow) return;
        thenCalledOrThrow = true;
        return reject(e)
      }
    } else {
      // 如果我们返回的是一个值，那么直接resolve它
      // 让下一个then能够调用到
      // 值穿透
      resolve(instance);
    }
}