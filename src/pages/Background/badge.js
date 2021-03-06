import { getTabLocation, isHostEnabled } from '../utils';
import watcher from '../utils/storage-watcher';

export let domains = [];

export async function onTabsUpdated(tabId, changeInfo, tab) {
  if (tab.active) {
    try {
      await updateBadge(tabId);
    } catch (error) {
      console.log(error);
    }
  }
}

export async function onTabsActivated({ tabId }) {
  try {
    await updateBadge(tabId);
  } catch (error) {
    console.log(error);
  }
}

export async function updateBadge(tabId) {
  try {
    const enable = await isHostEnabled(await getTabLocation(tabId), domains);
    chrome.browserAction.setBadgeText({ text: enable ? '' : 'off' });
  } catch (error) {
    console.log(error);
  }
}

export function onStorageChanged(changedItems) {
  domains = changedItems.excludeDomains;
  updateBadge();
}

watcher('excludeDomains', onStorageChanged);
const { tabs } = chrome;
tabs.onUpdated.addListener(onTabsUpdated);
tabs.onActivated.addListener(onTabsActivated);
