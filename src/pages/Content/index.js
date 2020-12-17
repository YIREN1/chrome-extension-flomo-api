import { Notyf } from 'notyf';
// Create an instance of Notyf
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  position: {
    x: 'right',
    y: 'top',
  },
});

const MOUSE_UP = 'mouseup',
  selection = getSelection();
let enabled = true;
const IS_TOUCH = false;

const getXY = (e) => ({ x: e.pageX, y: e.pageY });

function getText() {
  return selection.toString().trim();
}

const setStyleProp = (el, obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      el.style[key] = obj[key];
    }
  }
};

function firstMouseUp(e) {
  // console.log(e.target);
  const text = getText();
  if (btn.contains(e.target) && !text) {
    return;
  }
  if (enabled && text) {
    let btnPos = {
      position: 'fixed',
      zIndex: 99999,
      translateX: 0,
      left: 0,
      top: 0,
      translateY: 0,
      padding: '2px',
    };
    // console.log(getText());

    const { x, y } = getXY(e);
    let left = x - window.pageXOffset,
      top = y - window.pageYOffset + 10;
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    btnPos.translateX = left;
    btnPos.translateY = top;
    // console.log(btnPos);

    btnPos.transform = `translateX(${btnPos.translateX}px) translateY(${btnPos.translateY}px)`;
    btnPos.display = 'block';

    setStyleProp(btn, btnPos);
  }
}

function removeFirstMouseUp() {
  document.removeEventListener(MOUSE_UP, firstMouseUp);
}

document.addEventListener(MOUSE_UP, firstMouseUp);

document.addEventListener('mousedown', (e) => {
  const { target } = e;
  if (btn.contains(target)) {
    e.preventDefault();
    // onClikcButton();
  } else {
    btn.style.display = 'none';
  }
});

let btn = document.createElement('BUTTON'); // Create a <button> element
let span = document.createElement('span');
let div = document.createElement('div');
div.appendChild(btn);
div.style.position = 'absolute';

// todo figure out id
let imgURL = `url(${chrome.extension.getURL('logo-192.png')})`;
// console.log(imgURL)
const spanStyle = {
  width: '18px',
  height: '18px',
  backgroundSize: 'contain',
  display: 'block',
  backgroundImage: imgURL,
};
setStyleProp(span, spanStyle);

btn.appendChild(span);

document.documentElement.appendChild(div);

const event = new Event('select');

btn.addEventListener('click', onClikcButton, false);

function onClikcButton() {
  alert('click');
  btn.style.display = 'none';

  const text = getText();
  // console.log(text);
  let message = {
    text,
  };
  chrome.runtime.sendMessage(message, {}, handleResponse);

  function handleResponse(res) {
    console.log(res);
    if (!res) {
      return;
    }
    if (res?.data === 0) {
      notyf.success(res.message);
    } else {
      notyf.error(res.message);
    }
  }
}

console.log('content scripts loaded, react');
