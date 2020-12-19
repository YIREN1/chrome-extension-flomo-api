import { getTabLocation, isHostEnabled } from '../utils';
import watcher from '../utils/storage-watcher';

export let domains = [];

export async function onTabsUpdated(tabId, changeInfo, tab) {
  if (tab.active) {
    await updateBadge(tabId);
  }
}

export async function onTabsActivated({ tabId }) {
  await updateBadge(tabId);
}

/**
 * 更新扩展图标上的 off 标签
 * @param {Number} [tabId] - 根据哪个标签页的 location object 来更新图标。默认为当前选中的标签页
 */
export async function updateBadge(tabId) {
  const enable = await isHostEnabled(await getTabLocation(tabId), domains);
  chrome.browserAction.setBadgeText({ text: enable ? '' : 'off' });
}

export function onStorageChanged(changedItems) {
  domains = changedItems.excludeDomains;
  updateBadge();
}
// ! cause uncaught error might be related to async, comment out for now
// watcher('excludeDomains', onStorageChanged);
const { tabs } = chrome;
tabs.onUpdated.addListener(onTabsUpdated);
tabs.onActivated.addListener(onTabsActivated);
