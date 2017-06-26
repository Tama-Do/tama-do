import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

var babelPluginFlowReactPropTypes_proptype_NavigationNavigatorProps = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationNavigatorProps || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_NavigationScreenProp = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationScreenProp || require('prop-types').any;

export default class SceneView extends PureComponent {
  static childContextTypes = {
    navigation: propTypes.object.isRequired
  };

  getChildContext() {
    return {
      navigation: this.props.navigation
    };
  }

  render() {
    const { screenProps, navigation, component: Component } = this.props;

    return <Component screenProps={screenProps} navigation={navigation} />;
  }
}
SceneView.propTypes = {
  screenProps: require('prop-types').shape({}),
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  component: require('prop-types').any.isRequired
};
SceneView.propTypes = {
  screenProps: require('prop-types').shape({}),
  navigation: babelPluginFlowReactPropTypes_proptype_NavigationScreenProp,
  component: require('prop-types').any.isRequired
};