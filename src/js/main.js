import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import PlayVideo from "./modules/playVideo";
import Difference from "./modules/difference";
import Form from "./modules/form";
import ShowInfo from "./modules/showinfo";
import Download from "./modules/download";




window.addEventListener('DOMContentLoaded', ()=> { 
  //т.к. у нас уже импортирован класс-шаблон, мы на его основе можем создать новый объект который непосредственно будем использовать - можно через переменную а можно через объект ( позже)

  //slider - это экземпляр класса - объект
  // вот Главный слайдер - в параметрах уже объект передаем
  
  const slider = new MainSlider({btns: '.next', container: '.page'});
 slider.render(); // 

 //для главного слайдера страницы Модуля
 const modulePageSlider = new MainSlider({
  btns: '.next',
  container: '.moduleapp'
});
modulePageSlider.render(); // 


 //video на главной
 const videoPlayer = new PlayVideo('.showup .play','.overlay');
 videoPlayer.init();

  //video в Модулях
  new PlayVideo('.module__video .play','.overlay').init();
 
 //передаем в параметры новый экземпляр класса -  объект из селекторов
 // это первый минислайдер на 1 стр. - для других мы также создадим объекты на основе класса MiniSlider  но передавать будем уже другие селекторы
 const showUpSlider = new MiniSlider({
  container: '.showup__content-slider',
  prev: '.showup__prev',
  next: '.showup__next',
  activeClass: 'card-active', // точку не ставим перед классом т.к. будет add-remove class использоваться
  animate: true,

 });
 showUpSlider.init();

 // остальные слайдеры инициализируем - на 3 стр
 const modulesSlider = new MiniSlider({
  container: '.modules__content-slider',
  //т.к. кнопки slick-prev есть и в другом слайдере ограничим родителем
  prev: '.modules__info-btns .slick-prev',
  next: '.modules__info-btns .slick-next',
  activeClass: 'card-active', // точку не ставим перед классом т.к. будет add-remove class использоваться
  animate: true,
  autoplay: true // для автопоказа
 });
 modulesSlider.init();

 //слайдер на 5 стр
 const feedSlider = new MiniSlider({
  container: '.feed__slider',
  prev: '.feed__slider .slick-prev', // ограничим секцией селекторы
  next: '.feed__slider .slick-next',
  activeClass: 'feed__item-active', // точку не ставим перед классом т.к. будет add-remove class использоваться
 });
 feedSlider.init();


 // модуль Difference
 new Difference('.officerold', '.officernew', '.officer__card-item').init(); // можно так вызвать
//  const Diff = new Difference('.officerold', '.officernew', '.officer__card-item' );
// Diff.init();

//Формы - можно по тегу или по классу
new Form('.form').init();

//Аккордеон Info
new ShowInfo('.plus__content').init();

//скачивание файла
new Download('.download').init();

}); // конец


