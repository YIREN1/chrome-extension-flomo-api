<p align="center">

<img src="src/assets/img/logo-192.png" width="64"/>
  <h2 align="center">Flomo API chrome extension</h2>

  <p align="center">
    An easy-to-use extension that can save notes in one click

  </p>
</p>

https://chrome.google.com/webstore/detail/flomo-api/bliaamgfpeogldcelkmkegfofapaocfn/related?hl=en&authuser=0

[点此查看用法](usage_zh.md)

## Development getting started

1. clone this repo
2. install npm, make sure npm is installed by the command `npm -v`
3. `npm i`
4. `npm start`
5. Load the extension on Chrome as following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
6. Happy hacking.

## features

1. show a button which users can click to send notes
2. choose which hosts/domains to enable/disable the feature
3. show an entry "send to flomo" in context menus

### CHANGELOG

- 12.31 v0.2.2

1. add default tag : '#chrome ' and from <url>
2. add context menus entry to allow alternative sending methods

## built with

- reactjs
- bootstrap
- webpack
- babel
- notif (why notif instead of chrome.notifications? Because chrome notification does not show colors and thus users cannot easily tell if their action is successful or not)
- axios

## TODO

- [] default tags, eg: #from <url>, #(from chrome extension), etc.
- [] add more advanced websites blacklist/whitelist logic
- [] make UI look better (obviously I am not UI expert)
- [] auto detect url from https://flomoapp.com/mine?source=incoming_webhook
- [] support other official API
- [] alternative send method: command/ctrl

## Discussion:

https://github.com/flomoapp/3rd-party-tools/discussions/12

## Author

Yi Ren

jamesren1998@gmail.com
