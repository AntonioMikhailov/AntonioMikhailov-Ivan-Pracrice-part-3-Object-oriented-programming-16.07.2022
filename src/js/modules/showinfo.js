export default class ShowInfo {
  constructor(triggers) {
this.btns = document.querySelectorAll(triggers);
  }

  init() {
this.btns.forEach(item => { 
  item.addEventListener('click', ()=> { 
 try {
  const sibling =  item.closest('.module__info-show').nextElementSibling;
  sibling.classList.toggle('msg'); // сам себя будет тоглить
  sibling.style.marginTop = '20px';
 } catch (error) {
  
 }
 }); 
 });

  }
}//