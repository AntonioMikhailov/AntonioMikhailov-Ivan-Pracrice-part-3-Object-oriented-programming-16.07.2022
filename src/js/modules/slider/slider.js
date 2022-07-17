export default class Slider {

//передаем объект в виде деструктуризации - page, btns, next -  по умолчанию свойство - они могут быть а могут и нет - тогда пустая строка. ={} - если передадут без параметров сработает пустой объект
  // будем для извлечение свойств использовать деструктуризацию. Порядок свойств в объекте не важен
  constructor ({ // здесь значения по умолчанию
    container = null, 
    btns = null, 
    next = null, 
    prev= null,
    //добавляем параметры для мини слайдеров
    activeClass, // было  activeClass = '' - но ошибка в консоли что пустой класс
    animate = false, // будем использовать как false-true
    autoplay = false
  } = {}) { 

    this.container = document.querySelector(container); // передаем селектор родителя 
  try {
    this.slides = this.container.children; //внутри все слайды - showup, difference  и т.д.
  } catch (error) {  
  }

this.btns = document.querySelectorAll(btns); // All т.к. во  втором слайде -странице уже 2 стрелки
this.prev = document.querySelector(prev);  // если не передадим будет null и ошибки не будет
this.next = document.querySelector(next);
this.activeClass = activeClass;
this.animate = animate;
this.autoplay = autoplay;


this.slideIndex = 1;

}

} // конец

