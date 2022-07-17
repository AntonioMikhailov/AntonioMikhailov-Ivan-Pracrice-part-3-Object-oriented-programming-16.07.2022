//слайдеры которые внутри страниц
// также импортирем Главный прототип Slider
import Slider from "./slider";


//экспортируем в сборщик
export default class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay); // берем из прототипа
  }

// оформляем слайды - активные
decorizeSlides() {
  //сначала удаляем активный класс со всех, потом добавляем текущему -первому слайду. Во всех слайдерах такой прием будет
  this.slides.forEach(item => { 
    item.classList.remove(this.activeClass);
    //очищаем все анимации = прозрачности
    if(this.animate == true) { // если было передано из инициализации
      //для заголовка слайда
        item.querySelector('.card__title').style.opacity = "0.4";
        //для стрелки на слайде
        item.querySelector('.card__controls-arrow').style.opacity = "0";
     }
     });
     this.slides[0].classList.add(this.activeClass);
     // создаем анимацию для активных слайдов
     if(this.animate == true) { // если было передано из инициализации
      //для заголовка слайда
        this.slides[0].querySelector('.card__title').style.opacity = "1";
        //для стрелки на слайде
        this.slides[0].querySelector('.card__controls-arrow').style.opacity = "1";
     }

}

//метод для автопереключения слайдера на 3 стр -  у него есть свойство autoplay
nextSlide() {
  // во внутрь помещаем весь код из кнопки next
      // добавляем в конец родителя первый слайд
      this.container.appendChild(this.slides[0]);
      this.decorizeSlides(); // активируем анимацию также
     
}

  //кнопки триггеры
  bindTriggers() {
    this.next.addEventListener('click', ()=> this.nextSlide()); // вызываем метод переключения вперед 

    this.prev.addEventListener('click', ()=> { 
      console.log(22);
      let active = this.slides[this.slides.length -1];
      // последний слайд помещаем перед первым
      this.container.insertBefore(active, this.slides[0]);
      this.decorizeSlides(); // активируем анимацию также
   });
  }

//назначим стили слайдеру через CSSText
init() {
try {
  
  this.container.style.cssText = `
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  align-items: flex-start;
  `;
  // console.log(this.prev, this.next, this.container );
  this.bindTriggers();
  this.decorizeSlides();
  if(this.autoplay == true) {
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }
} catch (error) {
  
}
}
}//

