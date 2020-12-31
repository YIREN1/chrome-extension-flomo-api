import '../../assets/img/logo-192.png';
import './badge';
import axios from 'axios';
import { getOptions, chromeTabsSendMessage, getCurrentTabId } from '../utils';
import asyncToChromeListener from './asyncToChromeListener';

console.log('background page.');
let FLOMO_API = '';
let defaultTag = '#chrome ';
async function installed() {
  ({ FLOMO_API } = await getOptions('FLOMO_API'));
}
chrome.runtime.onInstalled.addListener(installed);

chrome.runtime.onMessage.addListener(asyncToChromeListener(onMessageWrapper));

chrome.contextMenus.create({
  type: 'normal',
  title: 'Save Text to Flomo',
  id: 'flomoText',
  onclick: sendToFlomoWithText,
  contexts: ['selection'],
});

// no async for listener
async function onMessageWrapper(request, sender) {
  return await receiver(request, sender);
}

const sendToFlomo = async (content) => {
  if (!FLOMO_API) {
    alert('No flomo api set');
    return;
  }
  return axios
    .post(FLOMO_API, {
      content: `${content}`,
    })

    .then((response) => response.data)
    .catch((e) => {});
};

function formatContent(selectionText, url) {
  return `<p>${defaultTag}${selectionText}</p>${
    url ? `<p>From: ${url}</p>` : ''
  }`;
}

async function sendToFlomoWithText(info, tab) {
  let content = formatContent(info.selectionText, tab.url);
  try {
    const res = await sendToFlomo(content);
    if (!res) return;
    const tabId = await getCurrentTabId();
    // todo message port closed before...
    await chromeTabsSendMessage(tabId, {
      name: 'notif',
      code: res.code,
      message: res.message,
    });
  } catch (error) {
    console.log(error);
  }
}
async function receiver(request, sender) {
  // todo should need a better sol to detect if from popup, sperate handler
  // if from the pop up
  if (sender.url.includes('popup.html')) {
    console.log('flomo api received');
    //todo move to

    FLOMO_API = request.api;
    return {
      name: 'notif',
      message: 'Flomo api received',
    };
  }
  // from content script
  return sendToFlomo(formatContent(request.text,request.url));
}
