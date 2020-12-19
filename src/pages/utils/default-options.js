import promisify from './promisify';
const defaultOptions = {
  excludeDomains: [],
  FLOMO_API: '',
};

export function getDefaultOptions(_keys) {
  if (_keys === null) {
    // deep copy
    return { ...defaultOptions };
  }
  const keys = Array.isArray(_keys) ? _keys : [_keys];
  const optionsObj = {};
  keys.forEach((key) => {
    optionsObj[key] = defaultOptions.hasOwnProperty(key)
      ? defaultOptions[key]
      : null;
  });
  return optionsObj;
}

