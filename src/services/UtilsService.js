export default {
    saveToStorage,
    loadFromStorage,
    _makeId
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
function _makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
// function indexOf(items, item pos=0){
//     var count = 0;
//     items.some((currItem, idx) => {
//         (currItem===item)? 
//     });
//     return count;s
// }