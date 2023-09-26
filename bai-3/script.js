/**
 * Created by nhatnk on 4/26/17.
 */

class Hero {
  image
  top
  left
  size

  constructor(image, top, left, size) {
    this.image = image
    this.top = top
    this.left = left
    this.size = size
  }

  getHeroElement() {
    return '<img ' +
    ' width="'+ this.size + '"' +
    ' height="'+ this.size + '"' +
    ' src="' + this.image +'"' +
    ' style="top: '+ this.top + 'px; left:' + this.left + 'px;position:absolute;" />'
  }

  moveRight() {
    this.left += 10
    console.log("right: " + this.left)
  }
  
  moveLeft() {
    this.left -= 10
    console.log("left: " + this.left)
  }

  moveBottom() {
    this.top += 10
    console.log("bottom: " + this.left)
  }
  
  moveTop() {
    this.top -= 10
    console.log("top: " + this.left)
  }
}

let hero = new Hero('pikachu.png', 20, 30, 200);

function start(){
  if(hero.left < window.innerWidth - hero.size - 10 && hero.top == 20){
    // window.innerWidth: là thuộc tính của màn hình, trả về kích thước chiều rộng màn hình, tùy theo từng máy tính
    // window.innerHeight: trả về kích thước chiều cao màn hình, tùy theo từng máy tính
    hero.moveRight()
  } else if (hero.top < window.innerHeight - hero.size - 10 && hero.left > 30) {
    hero.moveBottom()
  } else if (hero.left > 30) {
    hero.moveLeft()
  } else if (hero.top > 20) {
    hero.moveTop()
  }

  document.getElementById('game').innerHTML = hero.getHeroElement();
  setTimeout(start, 50)
  // giống setInterval(): thực hiện lặp đi lặp lại 1 hàm, với thời gian xác định
}

start();