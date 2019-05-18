'use strict';
/* =================================================
Global Vars
================================================*/
// Colors
const colors = {
  'primary' : 'rgba(34, 83, 120, .9)',
  'primaryDark' : 'rgba(34, 83, 120, 1)',
  'error' : 'rgba(180, 51, 60, 1)'
}

// Dom Elements
const domEl = {
  'bgColor' : document.getElementsByClassName('color-background')[0],
  'wrapper' : document.getElementsByClassName('wrapper')[0],
  'msg' : document.getElementsByClassName('msg')[0],
  'body' : document.getElementsByTagName('body')[0],
  'logo' : document.getElementsByClassName('logo')[0],
  'article' : document.getElementsByTagName('article')[0],
  'formWrapper' : document.getElementsByClassName('formWrapper')[0],
  'inputs' : document.getElementsByTagName('input'),
  'selects' : document.getElementsByTagName('select'),
  'errorMsg' : document.getElementsByClassName('error-message')[0]
}

// Buttons
const buttons = {
  'cta1' : document.getElementById('cta1'),
  'cta2' : document.getElementById('cta2'),
  'cancel' : document.getElementsByClassName('cancel')[0],
  'back' : document.getElementsByClassName('back')[0]
}

const breakPoints = {
  'small' : 320,
  'medium' : 540,
  'large' : 1024
}

export {colors, domEl, buttons, breakPoints};
