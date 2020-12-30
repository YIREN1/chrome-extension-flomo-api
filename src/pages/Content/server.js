/* eslint-disable no-restricted-globals */
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { onEnabledChange } from './index';
import watcher from '../utils/storage-watcher';
import { isHostEnabled } from '../utils';

const notyf = new Notyf({
  position: {
    x: 'right',
    y: 'top',
  },
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.name === 'get_location') sendResponse(location);
  if (request.name === 'notif') {
    if (request.code) {
      notyf.error(request.message);
    } else {
      notyf.success(request.message);
    }
  }
  if (request.name === 'change_enable') {
    // onEnabledChange(request.enable);
  }
});

async function onStorageChanged(items) {
  const { enabledAllSites, excludeDomains } = items;
  if (enabledAllSites || enabledAllSites === false) {
    onEnabledChange(enabledAllSites);
  } else if (excludeDomains) {
    const enable = await isHostEnabled(location, excludeDomains);
    onEnabledChange(enable);
  }
}

// watcher('excludeDomains', onStorageChanged);
watcher(['enabledAllSites', 'excludeDomains'], onStorageChanged);
