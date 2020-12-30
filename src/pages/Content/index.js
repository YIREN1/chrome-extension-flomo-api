import { Notyf } from 'notyf';
import { isHostEnabled } from '../utils';
import 'notyf/notyf.min.css';
import './server';
const notyf = new Notyf({
  position: {
    x: 'right',
    y: 'top',
  },
});

const MOUSE_UP = 'mouseup',
  selection = getSelection();

async function startup() {
  enabled = await isHostEnabled(location);
}

export function onEnabledChange(newEnableVal) {
  enabled = newEnableVal;
}
let enabled = true;

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

    const { x, y } = getXY(e);
    let left = x - window.pageXOffset,
      top = y - window.pageYOffset + 10;
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    btnPos.translateX = left;
    btnPos.translateY = top;

    btnPos.transform = `translateX(${btnPos.translateX}px) translateY(${btnPos.translateY}px)`;
    btnPos.display = 'block';

    setStyleProp(btn, btnPos);
  }
}

document.addEventListener(MOUSE_UP, firstMouseUp);

document.addEventListener('mousedown', (e) => {
  const { target } = e;
  if (btn.contains(target)) {
    e.preventDefault();
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

btn.addEventListener('click', onClikcButton, false);

function onClikcButton() {
  btn.style.display = 'none';

  const text = getText();
  let message = {
    text,
  };
  chrome.runtime.sendMessage(message, {}, handleResponse);

  function handleResponse(res) {
    // no res or no res.code
    if (!res || (res.code !== 0 && !res.code)) {
      console.error(res, 'no response or failed');
      return;
    }
    
    if (res?.code === 0) {
      notyf.success(res.message);
    } else {
      notyf.error(res.message);
    }
  }
}
startup();
// console.log('content scripts loaded');
