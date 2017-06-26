import React from 'react';

// @todo when we split types into common, native and web,
// we can properly change Animated.Value to its real value


/**
 * NavigationState is a tree of routes for a single navigator, where each child
 * route may either be a NavigationScreenRoute or a NavigationRouterRoute.
 * NavigationScreenRoute represents a leaf screen, while the
 * NavigationRouterRoute represents the state of a child navigator.
 *
 * NOTE: NavigationState is a state tree local to a single navigator and
 * its child navigators (via the routes field).
 * If we're in navigator nested deep inside the app, the state will only be the
 * state for that navigator.
 * The state for the root navigator of our app represents the whole navigation
 * state for the whole app.
 */
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_HeaderProps', {
  value: require('prop-types').shape({
    mode: require('prop-types').any.isRequired,
    router: require('prop-types').any.isRequired,
    getScreenDetails: require('prop-types').func.isRequired,
    style: require('prop-types').any.isRequired
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationState', {
  value: require('prop-types').shape({
    index: require('prop-types').number.isRequired,
    routes: require('prop-types').arrayOf(require('prop-types').any).isRequired
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationLeafRoute', {
  value: require('prop-types').shape({
    key: require('prop-types').string.isRequired,
    routeName: require('prop-types').string.isRequired,
    path: require('prop-types').string,
    params: require('prop-types').any
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationStateRoute', {
  value: require('prop-types').shape({
    index: require('prop-types').number.isRequired,
    routes: require('prop-types').arrayOf(require('prop-types').any).isRequired
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationRouter', {
  value: require('prop-types').shape({
    getStateForAction: require('prop-types').func.isRequired,
    getActionForPathAndParams: require('prop-types').func.isRequired,
    getPathAndParamsForState: require('prop-types').func.isRequired,
    getComponentForRouteName: require('prop-types').func.isRequired,
    getComponentForState: require('prop-types').func.isRequired,
    getScreenOptions: require('prop-types').any.isRequired
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationScreenDetails', {
  value: require('prop-types').shape({
    options: require('prop-types').any.isRequired,
    state: require('prop-types').any.isRequired,
    navigation: require('prop-types').any.isRequired
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationScreenOptions', {
  value: require('prop-types').shape({
    title: require('prop-types').string
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationScreenConfigProps', {
  value: require('prop-types').shape({
    navigation: require('prop-types').any.isRequired,
    screenProps: require('prop-types').object.isRequired
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationScreenComponent', {
  value: require('prop-types').shape({
    navigationOptions: require('prop-types').any
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationNavigator', {
  value: require('prop-types').shape({
    router: require('prop-types').shape({
      getStateForAction: require('prop-types').func.isRequired,
      getActionForPathAndParams: require('prop-types').func.isRequired,
      getPathAndParamsForState: require('prop-types').func.isRequired,
      getComponentForRouteName: require('prop-types').func.isRequired,
      getComponentForState: require('prop-types').func.isRequired,
      getScreenOptions: require('prop-types').any.isRequired
    }),
    navigationOptions: require('prop-types').any
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationParams', {
  value: require('prop-types').shape({})
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationNavigateAction', {
  value: require('prop-types').shape({
    type: require('prop-types').oneOf(['Navigation/NAVIGATE']).isRequired,
    routeName: require('prop-types').string.isRequired,
    params: require('prop-types').shape({}),
    action: require('prop-types').any
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationBackAction', {
  value: require('prop-types').shape({
    type: require('prop-types').oneOf(['Navigation/BACK']).isRequired,
    key: require('prop-types').string
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationSetParamsAction', {
  value: require('prop-types').shape({
    type: require('prop-types').oneOf(['Navigation/SET_PARAMS']).isRequired,
    key: require('prop-types').string.isRequired,
    params: require('prop-types').shape({})
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationInitAction', {
  value: require('prop-types').shape({
    type: require('prop-types').oneOf(['Navigation/INIT']).isRequired,
    params: require('prop-types').shape({})
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationResetAction', {
  value: require('prop-types').shape({
    type: require('prop-types').oneOf(['Navigation/RESET']).isRequired,
    index: require('prop-types').number.isRequired,
    key: require('prop-types').string,
    actions: require('prop-types').arrayOf(require('prop-types').shape({
      type: require('prop-types').oneOf(['Navigation/NAVIGATE']).isRequired,
      routeName: require('prop-types').string.isRequired,
      params: require('prop-types').shape({}),
      action: require('prop-types').any
    })).isRequired
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationUriAction', {
  value: require('prop-types').shape({
    type: require('prop-types').oneOf(['Navigation/URI']).isRequired,
    uri: require('prop-types').string.isRequired
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationStackViewConfig', {
  value: require('prop-types').shape({
    mode: require('prop-types').oneOf(['card', 'modal']),
    headerMode: require('prop-types').any,
    cardStyle: require('prop-types').any,
    transitionConfig: require('prop-types').func,
    onTransitionStart: require('prop-types').func,
    onTransitionEnd: require('prop-types').func
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationStackScreenOptions', {
  value: require('prop-types').shape({
    header: require('prop-types').oneOfType([require('prop-types').any, require('prop-types').func]),
    headerTitle: require('prop-types').oneOfType([require('prop-types').string, require('prop-types').any]),
    headerTitleStyle: require('prop-types').any,
    headerTintColor: require('prop-types').string,
    headerLeft: require('prop-types').any,
    headerBackTitle: require('prop-types').string,
    headerTruncatedBackTitle: require('prop-types').string,
    headerBackTitleStyle: require('prop-types').any,
    headerPressColorAndroid: require('prop-types').string,
    headerRight: require('prop-types').any,
    headerStyle: require('prop-types').any,
    gesturesEnabled: require('prop-types').bool
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationStackRouterConfig', {
  value: require('prop-types').shape({
    initialRouteName: require('prop-types').string,
    initialRouteParams: require('prop-types').shape({}),
    paths: require('prop-types').any,
    navigationOptions: require('prop-types').any
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationRouteConfig', {
  value: require('prop-types').shape({
    navigationOptions: require('prop-types').any,
    path: require('prop-types').string
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationPathsConfig', {
  value: require('prop-types').shape({})
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationTabRouterConfig', {
  value: require('prop-types').shape({
    initialRouteName: require('prop-types').string,
    paths: require('prop-types').shape({}),
    navigationOptions: require('prop-types').any,
    order: require('prop-types').arrayOf(require('prop-types').string),
    backBehavior: require('prop-types').oneOf(['none', 'initialRoute'])
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationTabScreenOptions', {
  value: require('prop-types').shape({
    tabBarIcon: require('prop-types').oneOfType([require('prop-types').any, require('prop-types').func]),
    tabBarLabel: require('prop-types').oneOfType([require('prop-types').string, require('prop-types').any, require('prop-types').func]),
    tabBarVisible: require('prop-types').bool
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationDrawerScreenOptions', {
  value: require('prop-types').shape({
    drawerIcon: require('prop-types').oneOfType([require('prop-types').any, require('prop-types').func]),
    drawerLabel: require('prop-types').oneOfType([require('prop-types').any, require('prop-types').func])
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationRouteConfigMap', {
  value: require('prop-types').shape({})
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationProp', {
  value: require('prop-types').shape({
    state: require('prop-types').any.isRequired,
    dispatch: require('prop-types').any.isRequired
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationScreenProp', {
  value: require('prop-types').shape({
    state: require('prop-types').any.isRequired,
    dispatch: require('prop-types').any.isRequired,
    goBack: require('prop-types').func.isRequired,
    navigate: require('prop-types').func.isRequired,
    setParams: require('prop-types').func.isRequired
  })
});


/**
 * Gestures, Animations, and Interpolators
 */

if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationNavigatorProps', {
  value: require('prop-types').shape({
    navigation: require('prop-types').shape({
      state: require('prop-types').any.isRequired,
      dispatch: require('prop-types').any.isRequired
    }).isRequired,
    screenProps: require('prop-types').any.isRequired,
    navigationOptions: require('prop-types').any.isRequired
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationLayout', {
  value: require('prop-types').shape({
    height: require('prop-types').any.isRequired,
    initHeight: require('prop-types').number.isRequired,
    initWidth: require('prop-types').number.isRequired,
    isMeasured: require('prop-types').bool.isRequired,
    width: require('prop-types').any.isRequired
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationScene', {
  value: require('prop-types').shape({
    index: require('prop-types').number.isRequired,
    isActive: require('prop-types').bool.isRequired,
    isStale: require('prop-types').bool.isRequired,
    key: require('prop-types').string.isRequired,
    route: require('prop-types').any.isRequired
  })
});


// The scene renderer props are nearly identical to the props used for rendering
// a transition. The exception is that the passed scene is not the active scene
// but is instead the scene that the renderer should render content for.
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationTransitionProps', {
  value: require('prop-types').shape({
    layout: require('prop-types').shape({
      height: require('prop-types').any.isRequired,
      initHeight: require('prop-types').number.isRequired,
      initWidth: require('prop-types').number.isRequired,
      isMeasured: require('prop-types').bool.isRequired,
      width: require('prop-types').any.isRequired
    }).isRequired,
    navigation: require('prop-types').shape({
      state: require('prop-types').any.isRequired,
      dispatch: require('prop-types').any.isRequired,
      goBack: require('prop-types').func.isRequired,
      navigate: require('prop-types').func.isRequired,
      setParams: require('prop-types').func.isRequired
    }).isRequired,
    position: require('prop-types').any.isRequired,
    progress: require('prop-types').any.isRequired,
    scenes: require('prop-types').arrayOf(require('prop-types').shape({
      index: require('prop-types').number.isRequired,
      isActive: require('prop-types').bool.isRequired,
      isStale: require('prop-types').bool.isRequired,
      key: require('prop-types').string.isRequired,
      route: require('prop-types').any.isRequired
    })).isRequired,
    scene: require('prop-types').shape({
      index: require('prop-types').number.isRequired,
      isActive: require('prop-types').bool.isRequired,
      isStale: require('prop-types').bool.isRequired,
      key: require('prop-types').string.isRequired,
      route: require('prop-types').any.isRequired
    }).isRequired,
    index: require('prop-types').number.isRequired,
    screenProps: require('prop-types').shape({})
  })
});


/**
 * Describes a visual transition from one screen to another.
 */
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_NavigationTransitionSpec', {
  value: require('prop-types').shape({
    duration: require('prop-types').number,
    easing: require('prop-types').func,
    timing: require('prop-types').func
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_TransitionConfig', {
  value: require('prop-types').shape({
    transitionSpec: require('prop-types').shape({
      duration: require('prop-types').number,
      easing: require('prop-types').func,
      timing: require('prop-types').func
    }),
    screenInterpolator: require('prop-types').func
  })
});
if (typeof exports !== 'undefined') Object.defineProperty(exports, 'babelPluginFlowReactPropTypes_proptype_LayoutEvent', {
  value: require('prop-types').shape({
    nativeEvent: require('prop-types').shape({
      layout: require('prop-types').shape({
        x: require('prop-types').number.isRequired,
        y: require('prop-types').number.isRequired,
        width: require('prop-types').number.isRequired,
        height: require('prop-types').number.isRequired
      }).isRequired
    }).isRequired
  })
});