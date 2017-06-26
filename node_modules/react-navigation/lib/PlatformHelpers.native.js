'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Linking = exports.BackAndroid = undefined;

var _reactNative = require('react-native');

var BackAndroid = _reactNative.BackHandler || _reactNative.BackAndroid;

exports.BackAndroid = BackAndroid;
exports.Linking = _reactNative.Linking;