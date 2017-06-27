import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';

import TouchableItem from '../TouchableItem';

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
const DrawerNavigatorItems = ({
  navigation: { state, navigate },
  items,
  activeItemKey,
  activeTintColor,
  activeBackgroundColor,
  inactiveTintColor,
  inactiveBackgroundColor,
  getLabel,
  renderIcon,
  onItemPress,
  style,
  labelStyle
}) => <View style={[styles.container, style]}>
    {items.map((route, index) => {
    const focused = activeItemKey === route.key;
    const color = focused ? activeTintColor : inactiveTintColor;
    const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;
    const scene = { route, index, focused, tintColor: color };
    const icon = renderIcon(scene);
    const label = getLabel(scene);
    return <TouchableItem key={route.key} onPress={() => {
      onItemPress({ route, focused });
    }} delayPressIn={0}>
          <View style={[styles.item, { backgroundColor }]}>
            {icon ? <View style={[styles.icon, focused ? null : styles.inactiveIcon]}>
                  {icon}
                </View> : null}
            {typeof label === 'string' ? <Text style={[styles.label, { color }, labelStyle]}>
                  {label}
                </Text> : label}
          </View>
        </TouchableItem>;
  })}
  </View>;

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

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
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

export default DrawerNavigatorItems;