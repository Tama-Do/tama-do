import { Animated, Easing, Platform } from 'react-native';

var babelPluginFlowReactPropTypes_proptype_TransitionConfig = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_TransitionConfig || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_NavigationTransitionSpec = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationTransitionSpec || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_NavigationTransitionProps = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationTransitionProps || require('prop-types').any;

import CardStackStyleInterpolator from './CardStackStyleInterpolator';

// Used for all animations unless overriden
const DefaultTransitionSpec = {
  duration: 250,
  easing: Easing.inOut(Easing.ease),
  timing: Animated.timing
};

const IOSTransitionSpec = {
  duration: 500,
  easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  timing: Animated.timing
};

// Standard iOS navigation transition
const SlideFromRightIOS = {
  transitionSpec: IOSTransitionSpec,
  screenInterpolator: CardStackStyleInterpolator.forHorizontal
};

// Standard iOS navigation transition for modals
const ModalSlideFromBottomIOS = {
  transitionSpec: IOSTransitionSpec,
  screenInterpolator: CardStackStyleInterpolator.forVertical
};

// Standard Android navigation transition when opening an Activity
const FadeInFromBottomAndroid = {
  // See http://androidxref.com/7.1.1_r6/xref/frameworks/base/core/res/res/anim/activity_open_enter.xml
  transitionSpec: {
    duration: 350,
    easing: Easing.out(Easing.poly(5)), // decelerate
    timing: Animated.timing
  },
  screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid
};

// Standard Android navigation transition when closing an Activity
const FadeOutToBottomAndroid = {
  // See http://androidxref.com/7.1.1_r6/xref/frameworks/base/core/res/res/anim/activity_close_exit.xml
  transitionSpec: {
    duration: 230,
    easing: Easing.in(Easing.poly(4)), // accelerate
    timing: Animated.timing
  },
  screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid
};

function defaultTransitionConfig(
// props for the new screen
transitionProps,
// props for the old screen
prevTransitionProps,
// whether we're animating in/out a modal screen
isModal) {
  if (Platform.OS === 'android') {
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
  const defaultConfig = defaultTransitionConfig(transitionProps, prevTransitionProps, isModal);
  if (transitionConfigurer) {
    return {
      ...defaultConfig,
      ...transitionConfigurer()
    };
  }
  return defaultConfig;
}

export default {
  DefaultTransitionSpec,
  defaultTransitionConfig,
  getTransitionConfig
};