import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ForgotPassword, Login, ResetPassword, VerifyOtp, Home, Profile, Orders, EditProfile, ChangePassword } from './routes'
import { connect } from 'react-redux'

const { Navigator, Screen } = createStackNavigator()
class RootNavigation extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render() {
        return (this.props.state.isLogin?
            <Navigator screenOptions={{headerShown: false}}>
                <Screen name='home' component={Home} />
                <Screen name='profile' component={Profile} />
                <Screen name='my-orders' component={Orders} />
                <Screen name='edit-profile' component={EditProfile} />
                <Screen name='change-password' component={ChangePassword} />
            </Navigator>:
            <Navigator screenOptions={{headerShown: false}}>
            <Screen name='login' component={Login} />
            <Screen name='forgot-password' component={ForgotPassword} />
            <Screen name='reset-password' component={ResetPassword} />
            <Screen name='verify-otp' component={VerifyOtp} />
        </Navigator>
        )
    }
}
const mapStateToProps = state => {
    return {
      state: state.AuthReducer,
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
        login: (data) => dispatch({ type: 'SIGNIN', payload: data }),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(RootNavigation)
const styles = StyleSheet.create({})