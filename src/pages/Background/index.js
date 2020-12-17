import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';
import '../../assets/img/logo-192.png';

console.log('This is the background page.');
chrome.runtime.onMessage.addListener(receiver);
let FLOMO_API = '';

function receiver(request, sender, sendResponse) {
  // todo should need a better sol
  // if from the pop up
  if (sender.url.includes('popup.html')) {
    console.log('flomo api received');
    FLOMO_API = request.api;
    return;
  }
  // console.log(request);

  if (!FLOMO_API) {
    alert('no flomo api set');
    return;
  }

  fetch(FLOMO_API, {
    method: 'POST',
    // Adding body or contents to send
    body: JSON.stringify({
      content: `#testfromChrome ${request.text}`,
    }),

    // Adding headers to the request
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((res) => sendResponse(res));
  return true;
}
