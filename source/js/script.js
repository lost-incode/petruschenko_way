const ESC_KEYCODE_TEXT = 'Escape';
const ESC_KEYCODE_SHORT_TEXT = 'Esc';
const REGULAR_PHONE = '[0-9]{10}';
const REGULAR_EMAIL = '[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+';

var tab; // заголовок вкладки
var tabContent; // блок содержащий контент вкладки


window.onload=function() {
    tabContent=document.querySelectorAll('.tabs__content');
    tab=document.getElementsByClassName('tabs__controls-item');
    hideTabsContent(1);
}

document.getElementById('tabs').onclick= function (event) {
    let target=event.target;
    if (target.className=='tabs__controls-item') {
      for (let i=0; i<tab.length; i++) {
        if (target == tab[i]) {
          showTabsContent(i);
            break;
        }
      }
    }
}

function hideTabsContent(a) {
    for (let i=a; i<tabContent.length; i++) {
        tabContent[i].classList.remove('tabs__show');
        tabContent[i].classList.add("tabs__hide");
        tab[i].classList.remove('tabs__whiteborder');
    }
}

function showTabsContent(b){
    if (tabContent[b].classList.contains('tabs__hide')) {
        hideTabsContent(0);
        tab[b].classList.add('tabs__whiteborder');
        tabContent[b].classList.remove('tabs__hide');
        tabContent[b].classList.add('tabs__show');
    }
}

// Скрипт для отслеживания нажатия на карточку - переход к нужному табу по ссылке-якорю

const LINK_NAMES = ['#Greece', '#Albania', '#Macedonia', '#Montenegro', '#Croatia'];

const cards = document.querySelectorAll('.visit-places__item');

cards.forEach((card) => card.addEventListener('click', (evt) => {
  if (evt.target.getAttribute('href')) {
    const indexOfShownTab = LINK_NAMES.indexOf(evt.target.getAttribute('href'));

    for (let i = 0; i < tab.length; i++) {
      if (i !== indexOfShownTab) {
        hideTabsContent(i);
      }
    }
    showTabsContent(indexOfShownTab);
  }
}));

// Скрипт для открытия/закрытия модального окна

const modalLinks = document.querySelectorAll('.order-button');

const modalWindow = document.querySelector('.modal--form');
const modalClose = modalWindow.querySelector('.modal__close-button');
const modalInputPhone = modalWindow.querySelector('#phone');
const modalInputEmail = modalWindow.querySelector('#email');
const modalForm = modalWindow.querySelector('.form');

const questionsForm = document.querySelector('.questions__form');
const formInputPhone = questionsForm.querySelector('#questions-phone');
const formInputEmail = questionsForm.querySelector('#questions-email');
const modalSuccess = document.querySelector('.modal--success');
const modalSuccessClose = modalSuccess.querySelector('.modal__close-button');

let isStorageSupport = true;
let storagePhone = "";
let storageEmail = "";

try {
  storagePhone = localStorage.getItem("modalInputPhone");
  storageEmail = localStorage.getItem("modalInputEmail");
} catch (err) {
  isStorageSupport = false;
}

const removeModalForm = () => {
  modalWindow.classList.remove('modal--open');
  modalWindow.classList.add('modal--close');
}

const showModalSucces = () => {
  modalSuccess.classList.add('modal--open');
  modalSuccess.classList.remove('modal--close');
}

const removeModalSucces = () => {
  modalSuccess.classList.remove('modal--open');
  modalSuccess.classList.add('modal--close');
}

const onEscapeKeydown = (evt) => {
  if (evt.defaultPrevented) {
    return;
  }

  if (evt.key === ESC_KEYCODE_TEXT || evt.key === ESC_KEYCODE_SHORT_TEXT) {
    removeModalForm();
    removeModalSucces();
  }
};

modalLinks.forEach((modalLink) => {
  modalLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    modalWindow.classList.remove('modal--close');
    modalWindow.classList.add('modal--open');

    if (storagePhone) {
      modalInputPhone.value = storagePhone;
    }

    if (storageEmail) {
      modalInputEmail.value = storageEmail;
    }

    modalInputPhone.focus();
  });
});

document.addEventListener('keyup', onEscapeKeydown);

modalClose.addEventListener('click', () => {
  removeModalForm();
});

modalSuccessClose.addEventListener('click', () => {
  removeModalForm();
  removeModalSucces();
});

const closeModal = (evt) => {
  if (evt.target.className.includes('modal ')) {
    removeModalForm();
  }
};

const closeModalSucces = (evt) => {
  if (evt.target.className.includes('modal ')) {
    removeModalForm();
    removeModalSucces();
  }
};

modalWindow.addEventListener('click', closeModal);
modalSuccess.addEventListener('click', closeModalSucces);

modalForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  console.log()
  if(modalInputPhone.value.match(REGULAR_PHONE)  && modalInputEmail.value.match(REGULAR_EMAIL)){
    if (isStorageSupport) {
      localStorage.setItem("modalInputPhone", modalInputPhone.value);
      localStorage.setItem("modalInputEmail", modalInputEmail.value);
    }
    showModalSucces();
  }
});

questionsForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  if(formInputPhone.value.match(REGULAR_PHONE)  && formInputEmail.value.match(REGULAR_EMAIL)){
    showModalSucces();
  }
});


const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
    navMain.classList.toggle('main-nav--closed');
    navMain.classList.toggle('main-nav--opened');
});
