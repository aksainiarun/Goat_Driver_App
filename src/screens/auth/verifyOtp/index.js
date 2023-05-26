import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import Container from '../../../components/layout/Container'
import Header from '../../../components/header/Header'
import { Font_Heebo_Medium, Font_Heebo_Regular, Font_Lato_Bold } from '../../../utils/typograpy'
import { GRAY_COLOR, PLACEHOLDER_COLOR, PRIMARY_COLOR } from '../../../utils/colors'
import Button from '../../../components/button/Button'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import OTPInputView from '@twotalltotems/react-native-otp-input'
export default class VerifyOtp extends Component {
    constructor() {
        super();
    }
    validateOTP(OTP) {
        const { email } = this.props.route.params
        if (!email || !OTP) { return }
        this.props.navigation.navigate("reset-password", { email, OTP })
    }
    render() {
        return (
            <Container>
                <Header />
                <KeyboardAvoidingScrollView style={styles.container}>
                    <Text style={styles.textHeading}>Enter <Text style={{ color: PRIMARY_COLOR }}>OTP</Text></Text>
                    <Text style={styles.textSubParagraph}>A verification codes has been sent to{'\n' + this.props.route.params.email}</Text>

                    <OTPInputView
                        style={{ width: '100%', height: 45, marginBottom: 40, marginTop: 20 }}
                        pinCount={4}
                        onCodeChanged={code => { this.setState({ code: code }) }}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.textInputContainer}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        placeholderCharacter='*'
                        placeholderTextColor={PLACEHOLDER_COLOR}

                        onCodeFilled={(code => {
                            this.validateOTP(code)
                        })}
                    />

                    <View style={{ paddingVertical: 10 }}>
                        <Button
                            title='Submit'
                            onPress={() => this.validateOTP()}
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
        paddingHorizontal: 10,
        borderRadius: 10,
        marginHorizontal: 14,
        width: 55,
        height: 55,
        color: "#000",
        fontSize: 14,
        fontFamily: Font_Heebo_Medium,
    },
    textInput: {
        flex: 1,
        height: 50,
        fontSize: 14,
        fontFamily: Font_Heebo_Medium,
        paddingVertical: 0
    },
})