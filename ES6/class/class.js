// class 声明创建了一个基于原型继承的具有给定名称的新类


// 类声明
class Polygon {
  constructor(height, width) {
    this.name = 'Polygon'
    this.area = height * width;
    this.height = height;
    this.width = width;
  }
}


console.log(new Polygon(3, 4).area)


// 类表达式

const Diagonal = class {
  constructor(long, width) {
    this.diagonal = Math.sqrt(Math.pow(long, 2) + Math.pow(width, 2))
  }
}

console.log(new Diagonal(3, 4).diagonal)



// 正方形是 子类， 继承 父类的方法

class Square extends Polygon {
  constructor(length) {
    // 函数中使用的 super() 只能在构造函数中使用，并且必须在使用 this 关键字前调用。
    super(length, length);
    this.name = 'Square'
  }
}

console.log(new Square(5))