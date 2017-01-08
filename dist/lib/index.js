'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _child_process = require('child_process');

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EII = function () {
    function EII(options) {
        _classCallCheck(this, EII);

        this.taskQueue = [];
        this.completeQueue = [];

        if (options) {

            this.options = options;
            this.fileinfo = (0, _utils.getFileInfo)(options.input);
            this.video = this.fileinfo.streams[1];
            this.format = this.fileinfo.format;
        }
    }

    _createClass(EII, [{
        key: 'start',
        value: function start() {
            var _options = this.options,
                _options$startSec = _options.startSec,
                startSec = _options$startSec === undefined ? 0 : _options$startSec,
                _options$per = _options.per,
                per = _options$per === undefined ? 10 : _options$per,
                outDir = _options.outDir;

            outDir && (0, _utils.checkDirExists)(outDir);

            var i = startSec;
            do {
                this.taskQueue.push(i);
                i += per;
            } while (i < this.format.duration);

            this.extracter();
        }
    }, {
        key: 'extracter',
        value: function extracter() {
            var _this = this;

            var _options2 = this.options,
                input = _options2.input,
                _options2$time = _options2.time,
                time = _options2$time === undefined ? 10 : _options2$time,
                _options2$fps = _options2.fps,
                fps = _options2$fps === undefined ? 10 : _options2$fps,
                _options2$outDir = _options2.outDir,
                outDir = _options2$outDir === undefined ? process.cwd() : _options2$outDir;

            var filename = (0, _utils.getfileName)(this.options.input);
            var height = this.options.height || this.video.height;
            var current = this.taskQueue[0];

            new Promise(function (resolve, reject) {

                (0, _child_process.exec)('ffmpeg -i ' + input + ' -vf scale=' + height + ':-1 -ss ' + current + ' -t ' + time + ' -r ' + fps + ' -y ' + outDir + '/' + filename + current + '.gif ', function (err, stdout, stderr) {
                    if (err) {
                        _this.taskQueue.unshift(current);
                        reject(err);
                    }
                    if (stderr) {
                        _this.completeQueue.push(current);
                        console.log('\u8017\u65F6' + process.uptime() + 's, \u5DF2\u5B8C\u6210: ' + _this.completeQueue.length + ', \u8FD8\u5269\u4F59: ' + _this.taskQueue.length);
                        if (_this.taskQueue.length > 0) {
                            resolve(_this.extracter());
                        }
                    }
                });
                _this.taskQueue.shift();
            });
        }
    }]);

    return EII;
}();

exports.default = EII;