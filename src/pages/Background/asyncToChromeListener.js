export default function asChromeListener(listener) {
  return (message, sender, sendResponse) => {
    const returnValue = listener(message, sender);

    if (isPromise(returnValue)) {
      returnValue.then(sendResponse);
      return true;
    } else {
      if (typeof returnValue !== 'undefined') {
        sendResponse(returnValue);
      }
      return false;
    }
  };
}

function isPromise(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    'then' in value &&
    'catch' in value
  );
}
