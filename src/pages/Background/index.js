import '../../assets/img/logo-192.png';
// import './badge';
import axios from 'axios';
import { getOptions, chromeTabsSendMessage, getCurrentTabId } from '../utils';
import asyncToChromeListener from './asyncToChromeListener';
console.log('background page.');
let FLOMO_API = '';

async function installed() {
  ({ FLOMO_API } = await getOptions('FLOMO_API'));
}
chrome.runtime.onInstalled.addListener(installed);

function onInstallWrapper(d) {
  installed();
}
chrome.runtime.onMessage.addListener(asyncToChromeListener(onMessageWrapper));

// no async for listener
async function onMessageWrapper(request, sender) {
  return await receiver(request, sender);
}
async function receiver(request, sender) {
  // !await will result in error
  let defaultTag = '';
  // todo should need a better sol to detect if from popup, sperate handler
  // if from the pop up
  if (sender.url.includes('popup.html')) {
    console.log('flomo api received');
    //todo move to
    
    FLOMO_API = request.api;
    // console.log(FLOMO_API);
    return {
      name: 'notif',
      message: 'Flomo api received',
    };
  }

  if (!FLOMO_API) {
    alert('No flomo api set');
    return;
  }
  return (
    axios
      .post(FLOMO_API, {
        content: `${defaultTag}${request.text}`,
      })

      .then((response) => response.data)
      // .then((res) => {
      //   sendResponse(res);
      // todo consider where should we put this logic
      //   // chromeTabsSendMessage(tabId, {
      //   //   name: 'notif',
      //   //   message: res.message,
      //   // });
      // })
      .catch((e) => {})
  );
  //todo
  // return true;
}
