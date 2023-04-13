import { Text, StyleSheet, View, SafeAreaView, Platform, StatusBar } from 'react-native'
import React, { Component } from 'react'

export default class Container extends Component {
    componentDidMount() {
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(this.props.statusBarColor ? this.props.statusBarColor : "#000");
            StatusBar.setBarStyle('light-content');
        }
        if (Platform.OS === 'ios') {
            StatusBar.setBarStyle('dark-content');
        }
    }
    render() {
        const { statusBarColor } = this.props
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
                <SafeAreaView style={{ backgroundColor: statusBarColor && statusBarColor, }} />
                <View style={[{ flex: 1, }, this.props.style]}>
                    {this.props.children}
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

})