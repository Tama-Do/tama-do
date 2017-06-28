'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactNative = require('react-native');

var _CardStackStyleInterpolator = require('./CardStackStyleInterpolator');

var _CardStackStyleInterpolator2 = _interopRequireDefault(_CardStackStyleInterpolator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_TransitionConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_TransitionConfig || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_NavigationTransitionSpec = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationTransitionSpec || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_NavigationTransitionProps = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationTransitionProps || require('prop-types').any;

// Used for all animations unless overriden
var DefaultTransitionSpec = {
  duration: 250,
  easing: _reactNative.Easing.inOut(_reactNative.Easing.ease),
  timing: _reactNative.Animated.timing
};

var IOSTransitionSpec = {
  duration: 500,
  easing: _reactNative.Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  timing: _reactNative.Animated.timing
};

// Standard iOS navigation transition
var SlideFromRightIOS = {
  transitionSpec: IOSTransitionSpec,
  screenInterpolator: _CardStackStyleInterpolator2.default.forHorizontal
};

// Standard iOS navigation transition for modals
var ModalSlideFromBottomIOS = {
  transitionSpec: IOSTransitionSpec,
  screenInterpolator: _CardStackStyleInterpolator2.default.forVertical
};

// Standard Android navigation transition when opening an Activity
var FadeInFromBottomAndroid = {
  // See http://androidxref.com/7.1.1_r6/xref/frameworks/base/core/res/res/anim/activity_open_enter.xml
  transitionSpec: {
    duration: 350,
    easing: _reactNative.Easing.out(_reactNative.Easing.poly(5)), // decelerate
    timing: _reactNative.Animated.timing
  },
  screenInterpolator: _CardStackStyleInterpolator2.default.forFadeFromBottomAndroid
};

// Standard Android navigation transition when closing an Activity
var FadeOutToBottomAndroid = {
  // See http://androidxref.com/7.1.1_r6/xref/frameworks/base/core/res/res/anim/activity_close_exit.xml
  transitionSpec: {
    duration: 230,
    easing: _reactNative.Easing.in(_reactNative.Easing.poly(4)), // accelerate
    timing: _reactNative.Animated.timing
  },
  screenInterpolator: _CardStackStyleInterpolator2.default.forFadeFromBottomAndroid
};

function defaultTransitionConfig(
// props for the new screen
transitionProps,
// props for the old screen
prevTransitionProps,
// whether we're animating in/out a modal screen
isModal) {
  if (_reactNative.Platform.OS === 'android') {
    // Use the default Android animation no matter if the screen is a modal.
    // Android doesn't have full-screen modals like iOS does, it has dialogs.
    if (prevTransitionProps && transitionProps.index < prevTransitionProps.index) {
      // Navigating back to the previous screen
      return FadeOutToBottomAndroid;
    }
    return FadeInFromBottomAndroid;
  }
  // iOS and other platforms
  if (isModal) {
    return ModalSlideFromBottomIOS;
  }
  return SlideFromRightIOS;
}

function getTransitionConfig(transitionConfigurer,
// props for the new screen
transitionProps,
// props for the old screen
prevTransitionProps, isModal) {
  var defaultConfig = defaultTransitionConfig(transitionProps, prevTransitionProps, isModal);
  if (transitionConfigurer) {
    return _extends({}, defaultConfig, transitionConfigurer());
  }
  return defaultConfig;
}

exports.default = {
  DefaultTransitionSpec: DefaultTransitionSpec,
  defaultTransitionConfig: defaultTransitionConfig,
  getTransitionConfig: getTransitionConfig
};