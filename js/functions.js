'use strict';
import {colors, domEl, buttons, breakPoints} from './main';

/* =================================================
 Auto Functions
================================================*/
// Makes sure that the background color is the same height as the body.

const screenResize = () => {
  const allInViewport = $(domEl.logo).outerHeight() + $(domEl.article).outerHeight() + $(domEl.formWrapper).outerHeight();

  if (window.innerWidth < 540 || window.innerHeight > allInViewport) {
    domEl.bgColor.style.height = window.innerHeight + 'px';
  } else {
    domEl.bgColor.style.height = $(domEl.logo).outerHeight() + $(domEl.article).outerHeight() + $(domEl.formWrapper).outerHeight() + 30 + 'px';

    // if (window.innerWidth > 921) {
    //   domEl.bgColor.style.height = $(domEl.logo).outerHeight() + $(domEl.formWrapper).outerHeight() + 'px';
    // } else {
    //   domEl.bgColor.style.height = $(domEl.logo).outerHeight() + $(domEl.article).outerHeight() + $(domEl.formWrapper).outerHeight() + 30 + 'px';
    // }
  }
}

// const screenResize = () => {
//   if (window.innerHeight > $(domEl.bgColor).outerHeight()) {
//     if (window.innerWidth < window.outerHeight) {
//       domEl.bgColor.style.height = $(domEl.logo).outerHeight() + $(domEl.formWrapper).outerHeight() + 'px';
//     } else {
//       domEl.bgColor.style.height = window.innerHeight + 'px';
//     }
//   } else {
//     if (window.innerWidth > 921) {
//       domEl.bgColor.style.height = $(domEl.logo).outerHeight() + $(domEl.formWrapper).outerHeight() + 'px';
//     } else {
//       domEl.bgColor.style.height = $(domEl.logo).outerHeight() + $(domEl.article).outerHeight() + $(domEl.formWrapper).outerHeight() + 30 + 'px';
//     }
//   }
// }

screenResize();

window.onresize = () =>{
  screenResize()
  console.log('rezise')
};

//Scrolls page up after reload
if (performance.navigation.type == 1) {
  setTimeout(function() {
    scrollUp();
  }, 300);
}

//Sets page to the top
function scrollUp() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/* =================================================
 Dom Transform Function
================================================*/
/** this function manipulates the dom elements.
*@param {string} elements: through these key-words decides which elements get changed and in what way.
*/
function transformDom(elements) {
  // This removes the article and puts the background opacity to 1.
  if (elements === 'bgColor') {
    domEl.bgColor.style.backgroundColor = colors.primaryDark;

    setTimeout(function() {
      domEl.article.style.display = 'none';
    }, 150);
  }

  // This shows the form when cta1 is used (only for mobiel and smaller mobiles have different values then the other mobiles).
  if (elements === 'showForm') {
    const formHeight = $(domEl.formWrapper).height() + $(domEl.logo).height()/2 + 'px';

    domEl.formWrapper.style.transform = `translateY(-${$(domEl.logo).height()/3*2}px)`;
    domEl.logo.style.transform = `translateY(-${$(domEl.logo).height()/4}px)  scale(.7)`;
    domEl.bgColor.style.height = formHeight;

    transformDom('bgColor');
    buttons.cancel.style.display = 'block';
  }

  // This removes the form, changes the bgcolor to opacity .9, empties out all the input and select tags and removes the error message and error borders.
  if (elements === 'cancelForm') {
    domEl.body.style.overflow = 'hidden';
    domEl.bgColor.style.backgroundColor = colors.primary;
    domEl.wrapper.style.height = '';
    domEl.formWrapper.style.transform = 'translateY(100vh)';
    domEl.logo.style.transform = 'translateY(0)  scale(1)';
    buttons.cancel.style.display = 'none';

    for (let i = 0; i < domEl.inputs.length; i++) {
      domEl.inputs[i].value = '';
      domEl.inputs[i].style.borderColor = colors.primaryDark;
    }

    for (let i = 0; i < domEl.selects.length; i++) {
      domEl.selects[i].value = '';
      domEl.selects[i].nextElementSibling.innerHTML = '';
      domEl.selects[i].nextElementSibling.style.borderColor = colors.primaryDark;
    }

    if (domEl.errorMsg) {
      domEl.wrapper.removeChild(errorMsg);
    }
  }

  // Uses 'cancelForm' and show the article.
  if (elements === 'cancel') {
    transformDom('cancelForm');
    setTimeout(function() {
      domEl.article.style.display = 'block';
    }, 300);
  }

  // This makes sure the form is shown on the homepage after the users clicks 'back', on alle devices other than mobiles.
  if (elements === 'formUp') {
    if (window.innerWidth > 540) {
      setTimeout(function() {
        domEl.formWrapper.style.transform = 'translateY(0)';
        domEl.body.style.overflow = 'visible';
      }, 250);
    }
  }
}

/* =================================================
 Form Validation Function
================================================*/
function validate() {
  const errorLst = [];
  let formCor = true;

  // These are the input tags.
  for (let i = 0; i < domEl.inputs.length; i++) {
    const input = domEl.inputs[i];

    if (input.id === 'email') {
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value) ? inputCor(input) : inputIncor(input);
    }

    if (input.id === 'password') {
      input.value.length >= 8 ? inputCor(input) : inputIncor(input);
    }

    if (input.id === 'password2') {
      const password = document.getElementById('password').value;

      input.value === password && input.value.length >= 8 ? inputCor(input) : inputIncor(input);
    }

    if (input.id === 'firstName' || input.id === 'lastName') {
      if (input.id === 'firstName') {
        input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
      }
      input.value.length >= 2 && /^([^0-9]*)$/.test(input.value) ? inputCor(input) : inputIncor(input);
    }

    if (input.id === 'phoneNumber') {
      input.value.length >= 10 && /^[0-9]*$/.test(input.value) ? inputCor(input) : inputIncor(input);
    }
  }

  // These are the select tags.
  for (let i = 0; i < domEl.selects.length; i++) {
    const select = domEl.selects[i];
    const selectWrapper = select.nextElementSibling;

    select.value === '' ? inputIncor(selectWrapper) : inputCor(selectWrapper);
  }

  /** Changes border color of correct element, this makes sure that corrected fields don't show the error border.
  *@param {Object} element: correct element.
  */
  function inputCor(element) {
    element.style.borderColor = colors.primary;

    if (element.tagName == 'INPUT') {
      console.log(element.placeholder + ': ' + element.value);
    } else {
      console.log(element.previousElementSibling.dataset.placeholder + ': ' + element.previousElementSibling.value);
    }
  }

  /** Creates error border, adds it to the errorlist and changes formCor to false.
  *@param {Object} element: incorrect element.
  */
  function inputIncor(element) {
    if (element.id === 'custom-select') {
      errorLst.push(element.previousElementSibling.dataset.placeholder);
    } else {
      errorLst.push(element.placeholder);
    }

    element.style.borderColor = colors.error;
    formCor = false;
  }

  if (formCor) {
    return true;
  } else {
    createMsg(errorLst);
  }
}

/* =================================================
 Create Error Message
================================================*/
/** This function creates the error message, when there are input fields incorrect.
*@param {Array} errorLst: a list of incorrect input fields.
*/
function createMsg(errorLst) {
  const errorMsg = document.createElement('div');
  errorMsg.setAttribute('class', 'error-message');

  const list = document.createElement('ul');

  errorMsg.innerHTML = '<p>Please correct the following: </p>';

  for (let i = 0; i < errorLst.length; i++) {
    const item = document.createElement('li');
    item.innerHTML += errorLst[i];
    list.appendChild(item);
  }

  errorMsg.appendChild(list);
  domEl.wrapper.appendChild(errorMsg);

  // This creates the error message cancel button (Includes the event listener).
  (function() {
    const errorMsgX = document.createElement('button');
    errorMsgX.setAttribute('class', 'error-message-x');

    const errorMsgXText = document.createTextNode('X');
    errorMsgX.appendChild(errorMsgXText);
    errorMsg.appendChild(errorMsgX);

    errorMsgX.addEventListener('click', function() {
      setTimeout(function() {
        errorMsg.style.opacity = '0';
        errorMsg.style.transform = 'translateY(100vh)';
      }, 100);
    });
  })();

  // This timeout is used to make sure the error message is created before it is shown.
  setTimeout(function() {
    errorMsg.style.opacity = '1';
    errorMsg.style.transform = 'translateY(0)';
  }, 100);
}

export {transformDom, validate, scrollUp};
