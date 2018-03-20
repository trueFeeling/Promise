import then from './lib/then'
import c from './lib/catch'
export default Promise = function (callback) {
    const PromiseStatus = this.PromiseStatus = "pending";
    const PromiseValue = this.PromiseValue = undefined;
    const onResolvedCallback = this.onResolvedCallback = [];
    const onRejectedCallback = this.onRejectedCallback = [];
    const resolve = this.resolve = value => {
        if(PromiseStatus === 'pending'){
            // 先用settimeout把任务挂起
            // 避免callback运行后，链式调用的then直接被运行了
            setTimeout(() => {
                if(PromiseStatus === 'pending'){
                    this.PromiseStatus = "resolved";
                    this.PromiseValue = value;
                    onResolvedCallback.forEach(fn => {
                        fn(value)
                    })     
                }
            });
        }
    };
    const reject = this.reject = reason => {
        setTimeout(() => {
            if(PromiseStatus === 'pending'){
                this.PromiseStatus = "rejected";
                this.PromiseValue = reason;
                onRejectedCallback.forEach(fn => {
                    fn(reason)
                })     
            }
        });       
    };
    try {
        callback(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

Promise.prototype = {
    then: then,
    catch: c
}


