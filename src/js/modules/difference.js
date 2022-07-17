export default class Difference {
  //получаем в параметр первый и второй блоки (столбики) + сами карточки
constructor(oldOffiser, newOfficer, items) {
try {
  this.oldOffiser = document.querySelector(oldOffiser);
this.newOfficer = document.querySelector(newOfficer);

//для карточек делаем отдельную переменную для каждого блока
this.oldItems = this.oldOffiser.querySelectorAll(items);
this.newItems = this.newOfficer.querySelectorAll(items);
//т.к. карточки будем получать из двух блоков то селекторы будем передавать отдельно
this.items = items;
//Добавляем счетчик для карточек, чтобы следить когда нужно будет скрыть последнюю карточку с Плюсом
this.oldCounter = 0;
this.newCounter = 0;
} catch (error) {
  
}

}
// метод для кликов
bindTriggers(container, itemsCards, counter) {
  //Селекторы для кнопок будем брать из родителя и прямо в методе
  container.querySelector('.plus').addEventListener('click', ()=> { 
   //сначала проверяем что мы открываем не последний элемент карточку
   if( counter !==  itemsCards.length -2) // -2 т.к. еще с Плюсом
  { //то открываем карточки по очереди
itemsCards[counter].style.display = 'flex';
counter ++;
  } else { // когда дошли до последней - показываем ее и удалем самую последнюю с Плюсом 17-11
    itemsCards[counter].style.display = 'flex';
    itemsCards[itemsCards.length -1].remove();
  }
 });

}

//Убираем повторение кода - передаем в параметр карточки два раза вызвав hideItems() для двух колонок
hideItems(itemsCards) {
  // мы можем в одном методе применить цикл для двух блоков но тогда нам надо в цикл еще добавить имя массива - arr
  itemsCards.forEach((item, i, arr) =>{
      // прячем все карточки кроме последних
      if(i!== arr.length -1) {
        item.style.display = 'none';

      }
  });


}
// метод init - самый главный,т.к. он будет запускаться из сборщика
init() {
try {
  //передаем в параметр сначала карточки из первого столбика  
this.hideItems( this.oldItems);
//затем для второго
this.hideItems( this.newItems);
//также и для кнопок Плюс - два раза вызываем с разными селекторами
this.bindTriggers(this.oldOffiser, this.oldItems, this.oldCounter);
this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
} catch (error) {
  
}
}

}//