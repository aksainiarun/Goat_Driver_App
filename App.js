import { Text, TextInput } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigation from './src/navigation/RootNavigation'
import { store, persistor } from './src/Reducer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default class App extends Component {
  render() {
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
    return (
      <Provider store={store}>
        <PersistGate
          //  loading={<Text>Loading...</Text>} 
          persistor={persistor}>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
        </PersistGate>
      </Provider>
    )
  }
}