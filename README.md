<p align="center">

<img src="src/assets/img/logo-192.png" width="64"/>
  <h2 align="center">Flomo API chrome extension</h2>

  <p align="center">
    An easy-to-use extension that can save notes in one click

  </p>
</p>

**The extension is currently under review by chrome web store and will be published after passing the review**

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

CHANGELOG

12.31 0.2.0

add 

## built with

- reactjs
- bootstrap
- webpack
- babel
- notif
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
