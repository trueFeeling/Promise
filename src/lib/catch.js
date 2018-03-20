/**
 * 
 * @param {*} onRejected 
 */
export default function (onRejected) {
    return this.then(null, onRejected)
}