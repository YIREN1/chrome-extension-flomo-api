/* eslint-disable no-restricted-globals */
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import {onEnabledChange} from './index';
const notyf = new Notyf({
  position: {
    x: 'right',
    y: 'top',
  },
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.name === 'get_location') sendResponse(location);
  if (request.name === 'notif') {
    notyf.success(request.message);
  }
  if (request.name === 'change_enable') {
    onEnabledChange(request.enable);
  }
});
