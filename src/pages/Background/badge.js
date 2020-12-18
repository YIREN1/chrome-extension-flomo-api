import { getTabLocation, isHostEnabled } from '../utils';

export let domains = [];

export async function updateBadge(tabId) {
  const enable = await isHostEnabled(await getTabLocation(tabId), domains);
  console.log(enable);

  chrome.browserAction.setBadgeText({ text: enable ? '' : 'off' });
}

// updateBadge();
