'use strict';
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var logger = require('nlogger').logger('plugin/local');

function Server(name, config) {
    var image;
    this.serverName = 'local';
    this.options = {
        //sprite图片前缀
        prefix: 'sprite',
        //图片文件保存的目录
        root: __dirname,
        //访问图片的url
        baseURI: 'http://static.peaches.net/peaches/'
    };
    this.options = _.extend(this.options, config);
    image = this.options.prefix + '-' + name + '.png';
    this.name = path.join(this.options.root, image);
    this.url = this.options.baseURI + image;
}
Server.prototype = {
    write: function (canvas, next) {
        var buffer = canvas.toBuffer();
        fs.writeFile(this.name, buffer, function (err) {
            next(null);
        });
    }
};

module.exports = Server;