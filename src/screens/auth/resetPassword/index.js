import { Text, StyleSheet, View, TextInput } from 'react-native'
import React, { Component } from 'react'
import Container from '../../../components/layout/Container'
import Header from '../../../components/header/Header'
import { Font_Heebo_Medium, Font_Heebo_Regular, Font_Lato_Bold } from '../../../utils/typograpy'
import { GRAY_COLOR, PRIMARY_COLOR } from '../../../utils/colors'
import Button from '../../../components/button/Button'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import Icon from '../../../utils/icons'

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            isPasswordView: false
        }
    }
    handlePasswordState = () => {
        this.setState({ isPasswordView: !this.state.isPasswordView })
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
                        <TextInput placeholder='Enter New Password' secureTextEntry style={styles.textInput} />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput placeholder='Confirm Password' secureTextEntry={!isPasswordView} style={styles.textInput} />
                        <Icon name={isPasswordView ? 'eye' : 'eye-off'} color='rgba(0,0,0,0.3)' size={25} onPress={this.handlePasswordState} />
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Button
                            title='Submit'
                            onPress={() => this.props.navigation.navigate("login")}
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