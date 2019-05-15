'use strict';
import {domEl, buttons, el, functions} from './main';

/* =================================================
Event Listeners
================================================*/
buttons.cta1.addEventListener('click', function() {
  functions.transformDom('showForm');
});

buttons.cta2.addEventListener('click', function(e) {
  const errorMsg = document.getElementsByClassName('error-message')[0];

  // Prevents form default action.
  e.preventDefault();

  // Removes the error msg if there is one, so there are no dubbles.
  if (errorMsg) {
    domEl.wrapper.removeChild(errorMsg);
  }

  if (functions.validate()) {
    // Creation of the 'succesfull' message.
    const name = document.getElementById('firstName');

    const h1 = document.createElement('h1');
    h1.setAttribute('id', 'msgH1');
    h1.innerHTML = 'Succesfull!';

    const p = document.createElement('p');
    p.setAttribute('id', 'msgP');
    p.innerHTML = 'Welcome to the Uber, ' + name.value + '!<br> Your account has been succesfully created. You can now order Ubers when ever you like!';

    domEl.msg.prepend(p);
    domEl.msg.prepend(h1);

    setTimeout(function() {
      domEl.msg.style.display = 'block';
    }, 450);

    functions.scrollUp();
    functions.transformDom('cancelForm');
    functions.transformDom('bgColor');
  }
});

buttons.cancel.addEventListener('click', function() {
  functions.transformDom('cancel');
});

buttons.back.addEventListener('click', function() {
  functions.transformDom('cancel');
  functions.transformDom('formUp');
  domEl.msg.style.display = 'none';

  domEl.msg.removeChild(msgH1);
  domEl.msg.removeChild(msgP);
});

export {};
