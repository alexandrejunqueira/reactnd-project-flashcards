import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo';

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

AppStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

export default AppStatusBar;
