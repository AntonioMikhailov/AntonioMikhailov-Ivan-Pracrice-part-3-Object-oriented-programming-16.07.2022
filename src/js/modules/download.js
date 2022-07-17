export default class Download {
constructor(triggers) {
  //кнопок скачивания много - на каждой странице модуля и в реале все файлы должны быть разнвми а знавит и пути к ниим
  this.btns = document.querySelectorAll(triggers);
  //теперь нам нужны путь по которому будет браться файл -  в реале разные пути - решить можно через switch-case - определяеп на какую кликнули и подставляем нужный путь для этой кнопки
  this.path = 'assets/img/mainbg.jpg';
}
//метод для скачивания файлов
downloadItem(path) {
  const element = document.createElement('a'); //создаем ссылку
  element.setAttribute('href', path);
  // и также атрибут download нужен
  element.setAttribute('download', 'nice-picture');
  //это элемент файл не появится на странице и не должен
  element.style.display = 'none';
  document.body.appendChild(element); // добавили скрытую ссылку на страницу
  //вызываем событие клик для этого элеменрта и если где то есть обработчик он сработает
  element.click();
  // после клика сразу удаляем элемент
  // document.body.removeChild(element);
  }
init() {
  this.btns.forEach(item => { 
    item.addEventListener('click', ()=> { 
 //запускаем метод который будет скачивать файл и передаем путь
this.downloadItem(this.path);
console.log(33);
   }); 
   });
}
}//