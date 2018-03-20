import Promise from '../Promise'
import resolvePromise from './resolvePromise'
/**
 * Promise.prototype.then
 * @param {Function} onResolved 
 * @param {Function} onRejected 
 */
export default function (onResolved, onRejected) {
    const PromiseStatus = this.PromiseStatus;
    const PromiseValue = this.PromiseValue;
    const onResolvedCallback = this.onResolvedCallback;
    const onRejectedCallback = this.onRejectedCallback;
    let promise2;
    // 如果不是函数， 我们就返回一个value/ reason
    onResolved = typeof onResolved === 'function' ? onResolved : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : e => e;

    if(PromiseStatus === 'resolved'){
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const instance = onResolved(PromiseValue);
                    // 用户手动返回了一个Promise实例
                    resolvePromise(promise2, instance, resolve, reject)
                } catch (e) {
                    reject(e);
                }
            });
        })
    }

    if(PromiseStatus === 'rejected'){
        return promise2 = new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const instance = onRejected(PromiseValue);
                    // 用户手动返回了一个Promise实例
                    resolvePromise(promise2, instance, resolve, reject)
                } catch (e) {
                    reject(e);
                }
            });
        })
    }
    
    // 如果是pending，说明此时promise还未执行完
    // 而then里面的任务是依赖于这个还处于pending的promise的
    // 所以push到这个promise的onResolvedCallback里面
    // 待promise为resolved的时候，一并执行
    if(PromiseStatus === 'pending'){
        return new Promise((resolve, reject) => {
            onResolvedCallback.push(value => {
                try {
                    onResolved(value)
                } catch (e) {
                    reject(e)
                }
            });

            onRejectedCallback.push(reason => {
                try {
                    onRejected(reason)
                } catch (e) {
                    reject(e)
                }
            });
        });
    }
}