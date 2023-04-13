import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ForgotPassword, Login, ResetPassword, VerifyOtp, Home, Profile, Orders, EditProfile, ChangePassword } from './routes'

const { Navigator, Screen } = createStackNavigator()
export default class RootNavigation extends Component {
    render() {
        return (
            <Navigator screenOptions={{
                headerShown: false
            }}>
                <Screen name='login' component={Login} />
                <Screen name='forgot-password' component={ForgotPassword} />
                <Screen name='reset-password' component={ResetPassword} />
                <Screen name='verify-otp' component={VerifyOtp} />
                <Screen name='home' component={Home} />
                <Screen name='profile' component={Profile} />
                <Screen name='my-orders' component={Orders} />
                <Screen name='edit-profile' component={EditProfile} />
                <Screen name='change-password' component={ChangePassword} />
            </Navigator>
        )
    }
}

const styles = StyleSheet.create({})