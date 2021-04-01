Object.prototype.constructor


// 返回实例对象 的 构造函数 的引用，此属性是函数本身的引用，不是字符串，对于原始数据类型来说，1， true， 'test' 该值只可读

function Tree(name) {
  this.name = name
}


var theTree = new Tree('RedWood');

console.log('the tree constructor is' + theTree.constructor)