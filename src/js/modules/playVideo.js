export default class VideoPlayer {
  //передаем объект в виде деструктуризаци - page, btns, next -  по умолчанию свойство - они могут быть а могут и нет - тогда пустая строка. ={} - если передадут без параметров сработает пустой объект
  // будем для извлечение свойств использовать деструктуризацию. Порядок свойств в объекте не важен
  constructor (triggers, overlay, ) { // close кнопку передавать не будем т.к. они есть во всех модалках а будем здесь инициализировать
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
    //привязываем изменения контекста вызова к this. 21-14
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);

  }
  //методы
  //Так как по кликам на разных кнопках будут вызываться разные плееры то создадим отдельный метод - будет получать url ( после клика по кнопке)


    // методы для кнопок -  показа и скрытия модалок

 bindTriggers() {  //из init перенесли сюда
    
 this.btns.forEach((item, i) => { 
  //оборачиваем try т.к. ошибка с плеером с первой страницы
try {
 // еще раз получаем селектор но уже получим ближайший от кнопки. 
const blockedElem = item.closest('.module__video-item').nextElementSibling;
//применяем остаток от деления
if( i % 2 == 0) { // т.е. все четные ??
  blockedElem.setAttribute('data-disabled', 'true'); // всему блоку назначим .module__video-item
}
} catch (error) {
  
}
item.addEventListener('click', ()=> { 

if(!item.closest('.module__video-item') || item.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
  //получаем текущую кнопку по которой кликнули
this.activeBtn = item;

// по клику запускаем метод createPlayer
//получаем URL-код прямо из кнопки btn - по data атрибуту 
// но нам также надо следить чтобы при повторном клике по кнопке показа плеер не создавал новый обхект this.player иначе они буду плодиться - проверяем по наличию тега iframe с Id frame в верстке
if(document.querySelector('iframe#frame')) { // если уже есть, значит вызывали
//просто показываем модалку и не создаем новый, чтобы позже по клику на close прятать именно его
this.overlay.style.display = 'flex';

//для кликов если кнопкок уже много 05-50
if(this.path !== item.getAttribute('data-url') ) { // если не равен текущему атрибуту
this.path =item.getAttribute('data-url'); // то перезаписываем свойство

// и запускаем видео функцией с API Utube
this.player.loadVideoById( {videoId: this.path});  // загружаем новое видео по id и передаем объект
}


} else { // если нет еще
this.path =item.getAttribute('data-url');
//запускаем метод
this.createPlayer(this.path);
console.log(333);
console.log(this.path);
}

}
 
});
});
    }

    // скрываем модалки с плеером
    bindClose() {
      this.close.addEventListener('click', ()=> { 
     //try т.к. ошибка когда включаем плеер в модулях
     this.overlay.style.display = 'none';
   
     this.player.stopVideo(); // останавливаем при закрытии

    });
    }

  

  createPlayer(url) {
     // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      // var player; // вместо этого this.player - Также убираем ф.

      this.player = new YT.Player('frame', { // переменная YT пока нет - она будет подгружаться с U tube. Далее 'player' - это блок которй мы мы создадим в HTML  см. п1  документации
        height: '100%', // ставим максимум  - будет ограничен родителем
        width: '100%',
        videoId: `${url}`, // важно! вместо кода M7lc1UVf-VE будем брать передавать код через параметр url - код подгружается с U tube

        events: { // но контекст this бдует теряться т.к. мы будем запускать вновом экземпляре класса - поэтому надо привязать через bind см. выше
          'onStateChange': this.onPlayerStateChange
        }
      });
      console.log(this.player); // тестируем
      //показываем модалку с видео
      this.overlay.style.display = 'flex';

    }

    //создаем метод для вызова второго плеера 10-10 - будет срабатываь каждый раз когда будет менять состояние плеера №1
onPlayerStateChange(state) {
try {
  //описываем что должно происходить
//находим сначала элемент второго Плеера - находим от кнопки по которой кликнули + closest + слдеующий блок со вторым Пелеером
const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
//находим иконку Play с первого Плеера стобы позже применить ее к кнопке второго Плеера - через clone true нужен для глубокого копрования если передаем без параметров, иначе скопирует без содержимого только оболочку 14-20
const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);

//когда именно мы будем выплнять - проверяем состояние 0 – воспроизведение видео завершено
if(state.data == 0) {
  //но надо сначала проверить что он есть т.к. юзер может заново кликать
  if(blockedElem.querySelector('.play__circle').classList.contains('closed')) {
    blockedElem.querySelector('.play__circle').classList.remove('closed');
//удаляем иконку замка и заменяем на склонированную иконку playBtn
blockedElem.querySelector('svg').remove();
blockedElem.querySelector('.play__circle').appendChild(playBtn);

//также надо заменить надпись на заголовка на Пелеере на Play Video 

blockedElem.querySelector('.play__text').textContent = 'Play Video';
// убираем модификатор чтобы стиль текста поменять
blockedElem.querySelector('.play__text').classList.remove('attention');
//также убрать свойство filter и opacity
blockedElem.style.opacity = 1;
blockedElem.style.filter = 'none';

//разблокируем второй Плеер
blockedElem.setAttribute('data-disabled', 'false');

  }



}
} catch (error) {
  
}

    }


  // метод  init - подключение плеера U tube
  // Важно! он один вызывается из сборзика main и от него потом запускаются все методы здесь в конструкторе
  init() {
    if(this.btns.length > 0) {
       // 2. This code loads the IFrame Player API code asynchronously.
 const tag = document.createElement('script'); // создаем тег

 tag.src = "https://www.youtube.com/iframe_api"; // путь
 const firstScriptTag = document.getElementsByTagName('script')[0]; //  скрипт должен быть самым первым в HTML
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // обращаемся к главному родителю и перед ним помещаем наш скрипт

 this.bindTriggers(); //вызываем показ модалки

 this.bindClose();
    }

  }

}//

