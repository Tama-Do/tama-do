'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _TouchableItem = require('../TouchableItem');

var _TouchableItem2 = _interopRequireDefault(_TouchableItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Style = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_Style || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_DrawerItem = require('./DrawerView.js').babelPluginFlowReactPropTypes_proptype_DrawerItem || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_DrawerScene = require('./DrawerView.js').babelPluginFlowReactPropTypes_proptype_DrawerScene || require('prop-types').any;

/**
 * Component that renders the navigation list in the drawer.
 */
var DrawerNavigatorItems = function DrawerNavigatorItems(_ref) {
  var _ref$navigation = _ref.navigation,
      state = _ref$navigation.state,
      navigate = _ref$navigation.navigate,
      items = _ref.items,
      activeItemKey = _ref.activeItemKey,
      activeTintColor = _ref.activeTintColor,
      activeBackgroundColor = _ref.activeBackgroundColor,
      inactiveTintColor = _ref.inactiveTintColor,
      inactiveBackgroundColor = _ref.inactiveBackgroundColor,
      getLabel = _ref.getLabel,
      renderIcon = _ref.renderIcon,
      onItemPress = _ref.onItemPress,
      style = _ref.style,
      labelStyle = _ref.labelStyle;
  return _react2.default.createElement(
    _reactNative.View,
    { style: [styles.container, style] },
    items.map(function (route, index) {
      var focused = activeItemKey === route.key;
      var color = focused ? activeTintColor : inactiveTintColor;
      var backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;
      var scene = { route: route, index: index, focused: focused, tintColor: color };
      var icon = renderIcon(scene);
      var label = getLabel(scene);
      return _react2.default.createElement(
        _TouchableItem2.default,
        {
          key: route.key,
          onPress: function onPress() {
            onItemPress({ route: route, focused: focused });
          },
          delayPressIn: 0
        },
        _react2.default.createElement(
          _reactNative.View,
          { style: [styles.item, { backgroundColor: backgroundColor }] },
          icon ? _react2.default.createElement(
            _reactNative.View,
            {
              style: [styles.icon, focused ? null : styles.inactiveIcon]
            },
            icon
          ) : null,
          typeof label === 'string' ? _react2.default.createElement(
            _reactNative.Text,
            { style: [styles.label, { color: color }, labelStyle] },
            label
          ) : label
        )
      );
    })
  );
};

/* Material design specs - https://material.io/guidelines/patterns/navigation-drawer.html#navigation-drawer-specs */
DrawerNavigatorItems.propTypes = {
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  items: require('prop-types').arrayOf(babelPluginFlowReactPropTypes_proptype_NavigationRoute).isRequired,
  activeItemKey: require('prop-types').string,
  activeTintColor: require('prop-types').string,
  activeBackgroundColor: require('prop-types').string,
  inactiveTintColor: require('prop-types').string,
  inactiveBackgroundColor: require('prop-types').string,
  getLabel: require('prop-types').func.isRequired,
  renderIcon: require('prop-types').func.isRequired,
  onItemPress: require('prop-types').func.isRequired,
  style: babelPluginFlowReactPropTypes_proptype_Style,
  labelStyle: babelPluginFlowReactPropTypes_proptype_Style
};
DrawerNavigatorItems.defaultProps = {
  activeTintColor: '#2196f3',
  activeBackgroundColor: 'rgba(0, 0, 0, .04)',
  inactiveTintColor: 'rgba(0, 0, 0, .87)',
  inactiveBackgroundColor: 'transparent'
};

var styles = _reactNative.StyleSheet.create({
  container: {
    marginTop: _reactNative.Platform.OS === 'ios' ? 20 : 0,
    paddingVertical: 4
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center'
  },
  inactiveIcon: {
    /*
     * Icons have 0.54 opacity according to guidelines
     * 100/87 * 54 ~= 62
     */
    opacity: 0.62
  },
  label: {
    margin: 16,
    fontWeight: 'bold'
  }
});

exports.default = DrawerNavigatorItems;