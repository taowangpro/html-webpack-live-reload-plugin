const path = require('path');
const fs = require('fs');
const socketio = require('socket.io');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlWebpackLiveReload {
  options

  constructor(options) {
    this.options = {
      port: 3333,
      ...options,
      isWatching: !!(process.argv.find((a) => /--watch(=true)?/.test(a))),
    };

    if (this.options.isWatching) {
      console.log(`\nLiveLoad is going to run on port ${this.options.port}! To avoid "Access-Control-Allow-Origin" blocking, "Moesif Origin" browser extionsion is the easiest`)

      const io = socketio(this.options.port);
      io.on("connection", socket => {
        console.log(`LiveLoad got connected, is live.`)
      });

      this.options.io = io;
    } else {
      this.apply = () => { };
    }
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlWebpackLiveReload', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync('HtmlWebpackLiveReload',
        (data, cb) => {
          data.assetTags.scripts.push({
            ...data.assetTags.scripts[0],
            attributes: {},
            innerHTML: fs.readFileSync(path.join(__dirname, '../socket.io/client-dist/socket.io.min.js'), 'utf8') +
              `\n;io.connect('ws://' + window.location.hostname + ':${this.options.port}').on("reload", function(){window.location.reload()});`
          });

          cb(null, data)
        }
      );
    });

    compiler.hooks.done.tapAsync('HtmlWebpackLiveReload', (state, cb) => {
      setTimeout(() => this.options.io.emit('reload'), 1000);
      cb();
    });
  }
}

module.exports = HtmlWebpackLiveReload;
