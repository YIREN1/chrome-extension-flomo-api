

export function sendNotification(message, type = 'basic', title = 'FLOMO') {
  chrome.notifications.create({
    type: type,
    iconUrl: 'logo-192.png',
    title: title,
    message: message,
  });
}
