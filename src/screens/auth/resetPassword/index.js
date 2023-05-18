import { Text, StyleSheet, View, TextInput } from 'react-native'
import React, { Component } from 'react'
import Container from '../../../components/layout/Container'
import Header from '../../../components/header/Header'
import { Font_Heebo_Medium, Font_Heebo_Regular, Font_Lato_Bold } from '../../../utils/typograpy'
import { GRAY_COLOR, PRIMARY_COLOR } from '../../../utils/colors'
import Button from '../../../components/button/Button'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import Icon from '../../../utils/icons'
import { postWithBody } from '../../../utils/appUtil/ApiHelper'

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            isPasswordView: false,
            password:'',
            confirmPassword:''
        }
    }
    handlePasswordState = () => {
        this.setState({ isPasswordView: !this.state.isPasswordView })
    }
    resetPassword(){
        const {email,OTP}=this.props.route.params
        let {password,confirmPassword}=this.state
        if(!password || password !=confirmPassword){return}
        let body={email,password,OTP}
        postWithBody('driver/resetPassword',JSON.stringify(body))
        .then(res=>{
            if(!res.err){
                this.props.navigation.navigate("login")
            }else{
                alert(res.msg)
            }
        }).catch(error=>{console.log(error);})
    }
    onChangeText(val, key) {
        this.setState({ [key]: val })
    }
    render() {
        const { isPasswordView } = this.state
        return (
            <Container>
                <Header />
                <KeyboardAvoidingScrollView style={styles.container}>
                    <Text style={styles.textHeading}>Reset <Text style={{ color: PRIMARY_COLOR }}>Password</Text></Text>
                    <Text style={styles.textSubParagraph}>Create new password</Text>
                    <View style={styles.textInputContainer}>
                        <TextInput placeholder='Enter New Password' style={styles.textInput} 
                        onChangeText={(val) => this.onChangeText(val, 'password')}/>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput placeholder='Confirm Password' secureTextEntry={!isPasswordView} style={styles.textInput} 
                        onChangeText={(val) => this.onChangeText(val, 'confirmPassword')}/>
                        <Icon name={isPasswordView ? 'eye' : 'eye-off'} color='rgba(0,0,0,0.3)' size={25} onPress={this.handlePasswordState} />
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Button
                            title='Submit'
                            onPress={() => this.resetPassword()}
                        />
                    </View>
                </KeyboardAvoidingScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 14
    },
    textHeading: {
        fontSize: 25,
        fontFamily: Font_Lato_Bold,
        color: "#000",
        marginBottom: 8,
        marginTop: 20
    },
    textSubParagraph: {
        fontFamily: Font_Heebo_Regular,
        fontSize: 13,
        color: "#858180",
        marginBottom: 20
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: GRAY_COLOR,
        paddingHorizontal: 14,
        borderRadius: 10,
        marginBottom: 10
    },
    textInput: {
        flex: 1,
        height: 50,
        fontSize: 14,
        fontFamily: Font_Heebo_Medium,
        paddingVertical: 0
    },
    formContainer: {
        paddingHorizontal: 14,
        backgroundColor: "#fff",
        flex: 1,
        paddingTop: 14
    },
    forgotPassword: {
        fontSize: 12,
        textAlign: 'right',
        fontFamily: Font_Heebo_Medium,
        color: PRIMARY_COLOR
    },
})