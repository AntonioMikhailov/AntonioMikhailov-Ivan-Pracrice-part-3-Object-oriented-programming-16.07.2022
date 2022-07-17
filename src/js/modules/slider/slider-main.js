import  Slider from "./slider"; // импортируе главный слайдер

//экспортируем в сборщик MainSlider  который наследует (extends) от Slider
export default class MainSlider extends Slider {
// получим все свойства и методы из slider.js

constructor(page, btns) {
  //super(...) вызывает родительский конструктор 
  super(page, btns); // взяли свойства  прототипа Slider
}

// Вырезали из slider.js 
// первый рабочий метод - показ текущего слайда
showSlides(n) {
  if( n > this.slides.length) {
    this.slideIndex = 1;
  } 

  if(n <1 ) {
    this.slideIndex  = this.slides.length;
  }
  //сначала прячем фото hanson - но можно и в CSS его опять надо обернуть try-catch
try {
  //анимацию добавляем через opacity
  this.hansonImage.style.opacity = '0';
  if( n == 3){
     setTimeout(() => {
      // this.hansonImage.style.display = 'block';
      this.hansonImage.classList.add('animated'); // просто зазадет время
      this.hansonImage.style.opacity = '1';
      this.hansonImage.classList.add('slideInUp') ; //  а этот стиль уже анимирует
    }, 3000);
    } else  { // когда юзер уйдет со страницы прячем снова
      this.hansonImage.classList.remove('slideInUp') ;
    }

} catch (error) {
  
}

  //скрываем все слайды при первом показе
  this.slides.forEach(item => { 
  item.style.display = 'none'; 
 });

// console.log( this.slides);
// console.log(this.slides.length);
 //показываем первый
 this.slides[this.slideIndex-1].style.display = 'block';

}//

//также мы знаем что у нас есть еще один слайдер с кнопками вперед-назад
plusSlides(n) {
this.showSlides(this.slideIndex += n);

}

//обработчики кнопок все сюда
bindTriggers() {
  this.btns.forEach(item => { 
    item.addEventListener('click', ()=> { 
     this.plusSlides(1); // вызовет plusSlides  а тот метод showSlides
     });
       // по клику на лого покажем первую страницу слайда
       item.parentNode.previousElementSibling.addEventListener('click', (e)=> { 
        e.preventDefault(); // отменяем перезагрузку т.к. ссылка
        this.slideIndex =1; // меняем индекс на 1
        this.showSlides(this.slideIndex);
        
    });
    });

      //добавляем селекторы кнопок вперед-назад для слайдера страницы Модули
  document.querySelectorAll('.prevmodule').forEach(item => { 
    item.addEventListener('click', (e)=> { 
      e.preventDefault();
      this.plusSlides(-1); // назад 
   });
 });
//вперед мотаем
 document.querySelectorAll('.nextmodule').forEach(item => { 
  item.addEventListener('click', (e)=> { 
    e.stopPropagation();
    e.preventDefault();
    this.plusSlides(1); // вперед
 });
});

}

//создадим метод render - который будет совершать действия и объединяет все методы ( ф.) выше
render() {
 
  if(this.container) { // если на странице есть такой элемент то выполняется код
 try {
  this.hansonImage = document.querySelector('.hanson');
} catch (error) {}
  

  // запускаем сразу показ первого слайда при загрузке страницы и передаем index
  this.showSlides(this.slideIndex);
  // Важно! у каждого экземпляра объекта будут свои индексы и салайдеры которые не будут пересекаться
  
  this.bindTriggers(); // внутри if вызываем


  } //конец IF


}



}//

