import { Text, StyleSheet, View, TextInput } from 'react-native'
import React, { Component } from 'react'
import RootNavigation from './src/navigation/RootNavigation'
import { NavigationContainer } from '@react-navigation/native'
export default class App extends Component {
  render() {
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
    return (
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({})