import { getOptions } from './index';

export const listeners = [];

export function onStorageChanged(changedItems, area) {
  const changedNewValue = {};

  for (let key in changedItems) {
    changedNewValue[key] = changedItems[key].newValue;
  }

  listeners.forEach((realListener) => {
    realListener(changedNewValue, area);
  });
}

chrome.storage.onChanged.addListener(onStorageChanged);

const { isArray } = Array;

export default function watcher(keys, areas, listener) {
  const _keys = isArray(keys) ? keys : [keys];

  let _areas, _listener;
  if (3 === arguments.length) {
    _areas = isArray(areas) ? areas : [areas];
    _listener = listener;
  } else {
    _listener = areas;
    _areas = ['local'];
  }

  _areas.forEach((area) => {
    getOptions(_keys, area).then((items) => _listener(items, area));
  });

  function realListener(changes, area) {
    if (!_areas.includes(area)) {
      return;
    }

    const myChanges = {};

    for (let key in changes) {
      if (_keys.includes(key)) {
        myChanges[key] = changes[key];
      }
    }

    // myChanges 对象不是空的则调用监听函数
    for (let _ in myChanges) {
      _listener(myChanges, area);
      break;
    }
  }

  listeners.push(realListener);

  return () => listeners.splice(listeners.indexOf(realListener), 1);
}
