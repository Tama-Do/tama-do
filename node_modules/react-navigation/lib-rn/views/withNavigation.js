import React from 'react';
import propTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

var babelPluginFlowReactPropTypes_proptype_NavigationAction = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationAction || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_NavigationState = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationState || require('prop-types').any;

export default function withNavigation(Component) {
  const componentWithNavigation = (props, { navigation }) => <Component {...props} navigation={navigation} />;

  componentWithNavigation.displayName = `withNavigation(${Component.displayName || Component.name})`;

  componentWithNavigation.contextTypes = {
    navigation: propTypes.object.isRequired
  };

  return hoistStatics(componentWithNavigation, Component);
}