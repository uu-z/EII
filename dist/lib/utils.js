'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkDirExists = exports.getFileInfo = exports.getfileName = undefined;

var _child_process = require('child_process');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getfileName = exports.getfileName = function getfileName(filename) {
    return filename.split('/').pop().split('.').shift();
};

var getFileInfo = exports.getFileInfo = function getFileInfo(file) {
    var buf = (0, _child_process.execSync)('ffprobe -v quiet -print_format json -show_format -show_streams ' + file);
    return JSON.parse(buf);
};

var checkDirExists = exports.checkDirExists = function checkDirExists(dir) {
    try {
        _fs2.default.statSync(dir);
    } catch (e) {
        _fs2.default.mkdirSync(dir);
    }
};