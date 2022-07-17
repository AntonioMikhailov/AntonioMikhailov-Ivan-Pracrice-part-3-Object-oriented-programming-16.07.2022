export default class Form {
  constructor(forms) {
    //будем сразу работать с двумя формами
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll('input');
    //для проверки поле почты на кириллицу - можно по атрибуту [type = "email"]
   this.emailInput = document.querySelectorAll('input[name="email"]');
    //оповещаем юзера о процессе отправки - создадим объект с текстами
this.message = {
  loading: 'Идет загрузка',
  success: 'Спасибо, мы скоро с Вами свяжемся',
  failure: 'Что то пошло не так...',
    };
this.path = 'assets/question.php'; // путь
  }
  //проверяем ввод почты только с латиницей
  checkEmail() {
// console.log(this.emailInput);
this.emailInput.forEach(item => { 
  item.addEventListener('input', ()=> { 
    console.log(444);
    item.value =  item.value.replace(/[а-я]/ig, ''); // У Ивана через match
  });
  });   
  }
  //маска телефона
  initMask() {
    let setCursorPosition = (pos, elem) => {
      //сначала установим фокус
      elem.focus();
      // далее нужен метод setSelectionRange - но он не поддерживается старыми бр. и нам надо написать полифил
      if(elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos); // установим курсор
      } else if (elem.createTextRange) { // если не поддерживает то метод range
        let range = elem.createTextRange();
        range.collapse(true);  // объединит граничные точки диапазона  
        range.moveStart('character', pos);
        range.moveEnd('character', pos);
        range.select();
    }
    };
    function createMask(event) {
      // создаем матрицу  - можно в JSON  файле для рая разных стран - она будет в input видна
      let matrix = '+1 (___) ___-___';
      //итератор
    let  i = 0;
    //получаем все Нецифры  и заменяем пустым - на основе матрицы
    let def = matrix.replace(/\D/g, '');
    // все Нецифры чистим  - на основе ввода юзера
    let val = this.value.replace(/\D/g, '' );
    //сверяем кол. во симвлов. Если юзер начнет удалаять из матрицы +7 то он не сможет это сделать
    if(def.length >= val.length) {
      val = def;
    }
    //нам надо из матрицы удалить нижнее подчеркивание в процессе вода цифр - заменить на цифры, но скобки оставляем и пробелы между группами цифр
    //в метод replace мы  аожем передать и ф.
    this.value = matrix.replace(/./g, function (a) { 
      //проверяем символы на правильность
      //Метод regexp.test(str) проверяет, есть ли хоть одно совпадение, если да, то возвращает true , иначе false 
     return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a ; //  a - каждый символ который перебирается в матрице и проверяем что длина уже введенных и очищенных символов будет не больше чем в val - и если true то переходим к следующему символу и если второе условие false то вернем пустая строка а если  и оно False то просто - a ( тот же символ что и пришел в ф.)
    });
    // еще одно условие когда выделяем input  c маской то курсор должен встать в определенную позицию - после +7 ( сюда) и потом если он выйдет из Input - blur то маска должна снова восстановиться
    if(event.type == 'blur') {
      //если кол-во символов будет равно 2 (+7) то очистим input
      if(this.value.length == 2) {
        this.value = '';
      }
    }  else {
      //куда установить курсор - вызываем ф.
      setCursorPosition(this.value.length, this);
      console.log(this.value.length);
      console.log(this);
    }
    }
    //вручную задаем атрибут
    let inputs = document.querySelectorAll('[name = "phone"]');
    inputs.forEach(item => { 
     //обрабатываем все 
      item.addEventListener('input', createMask );
      item.addEventListener('focus', createMask );
      item.addEventListener('blur', createMask );
     });
     //конец маски
  }
//ф. postData  - копируем из requests прошлого проекта и правим синтаксис под методы
  //метод отправки формы 
  async postData (url, data){
    let res = await fetch(url, { // ждать должен
      method: "POST", // вот где ошибка была!!! надо "POST"  а не POST
      body: data,
      //для formData заголовок не надо добавлять
    });
    return await res.text();
    }
  //метод init - копируем все что нужно из прошлого проекта
init() {
  this.checkEmail(); // вызываем проверку почты на кириллицу
  this.initMask(); //вызываем маску телефона
 this.forms.forEach(item => { 
    item.addEventListener('submit', (e)=> {
      e.preventDefault(); //отменяем перезагрузку
      // надо создать блок оповещения о процессе отправки. Блок будет внизу формы
      let statusMessage = document.createElement('div');
      //добавми стили
      statusMessage.style.cssText = `
      margin-top: 15px;
      font-size: 18px;
      color: white;
      `;
      item.parentNode.appendChild(statusMessage); //родитель формы
      //вставляем контент
      statusMessage.textContent = this.message.loading; //Идет загрузка
      //формируем данные для формы
      const formData = new FormData(item); // передали формы все две
      //вызываем ф. и передаем путь api и данные формы
      this.postData(this.path, formData )
      // т.к. возвращается промис - обрабатываем через then
      .then(res => {
        //проверяем в консоли и пишем юзеру статус отправки
        console.log(res);
        statusMessage.textContent = this.message.success;
      })
      //если ошибка
      .catch(()=> {
        statusMessage.textContent = this.message.failure;
      })
      //finally выполнится всегда
      .finally(()=>{
        setTimeout(() => {
          this.inputs.forEach(item => { 
            item.value = ''; 
           });
           statusMessage.textContent ='';
           //или
          //  statusMessage.remove();
        }, 1000);
      });
  }); 
});
}
}//
