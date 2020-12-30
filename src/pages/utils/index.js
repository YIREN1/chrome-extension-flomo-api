import { getDefaultOptions } from './default-options';

export async function chromeLocalGet(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(getDefaultOptions(keys), (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

export async function chromeLocalSet(data) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(data, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

export async function chromeTabsSendMessage(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, {}, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

export async function getOptions(keys, area = 'local') {
  return chromeLocalGet(keys);
  // return chromeCall(`storage.${area}`, 'get', 'excludeDomains');
}

export async function getCurrentTabId() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query(
      {
        active: true,
        // lastFocusedWindow: true,
        currentWindow: true,
      },
      (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      }
    );
  })
    .then((data) => data[0].id)
    .catch((e) => {
      console.log(e);
    });
}
export async function getTabLocation(tabId) {
  if (!tabId) {
    tabId = await getCurrentTabId();
  }

  return chromeTabsSendMessage(tabId, { name: 'get_location' });
}

export async function isHostEnabled(locationObj, disabledDomainList) {
  const { enabledAllSites } = await chromeLocalGet('enabledAllSites');

  if (!enabledAllSites) {
    return false;
  }
  const location =
    locationObj ||
    (locationObj === null ? locationObj : await getTabLocation());

  if (!location) {
    return null;
  }

  const { host } = location;
  const domains =
    disabledDomainList ||
    (await chromeLocalGet('excludeDomains')).excludeDomains;
  return !domains || !domains.some((domain) => host.endsWith(domain));
}

export async function clearLocalStorage() {}
