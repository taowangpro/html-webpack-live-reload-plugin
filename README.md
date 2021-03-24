# html-webpack-live-reload-plugin
Reloads browser when watching any assets changes, friends with html-webpack-plugin / webpack5

> This intentionally works with the last webpack 5, html-webpack-plugin inject html with assets feature

## Usage

**webpack.config.js**
```js
const HtmlWebpackLiveReload = require('html-webpack-live-reload-plugin');

plugins: [
    new HtmlWebpackPlugin() // intentionally work together with this
    new HtmlWebpackLiveReload(),
  ]
```

> The plugin will start only when "watch" mode

## API

new HtmlWebpackLiveReload(options)

- options.port: socket server port, default 3333

## Need to Know

HtmlWebpackLiveReload does only watch live reload via standalone socket.io
- It has to another web server to handle http(s)
- The standalone socket.io has different web origin. Most of browser block this working. The worth case, the live reload stopped. 
- To overcome this, "Moesif Origin" browser extionsion is the easiest, assuming we are dev nerd

## The Final
very basic, send me email for more feature.
Thanks


