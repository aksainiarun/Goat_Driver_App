import { Text, StyleSheet, View, Image, TextInput } from 'react-native'
import React, { Component } from 'react'
import Container from '../../../components/layout/Container'
import { LOGIN_IMAGE } from '../../../utils/images'
import { SCREEN_WIDTH } from '../../../utils/constants'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import { GRAY_COLOR, PRIMARY_COLOR } from '../../../utils/colors'
import { Font_Heebo_Medium, Font_Heebo_Regular, Font_Heebo_SemiBold, Font_Lato_Bold } from '../../../utils/typograpy'
import Button from '../../../components/button/Button'
import Icon from '../../../utils/icons'


export default class Login extends Component {
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
                <KeyboardAvoidingScrollView contentOffset={{ x: 0, y: 15 }} contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        <Image source={LOGIN_IMAGE} style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH - 85, }}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={{ paddingHorizontal: 14, paddingTop: 25, marginBottom: 15 }}>
                        <Text style={styles.textHeading}>Welcome <Text style={{ color: PRIMARY_COLOR }}>Goat Delivery</Text></Text>
                        <Text style={styles.textSubParagraph}>Please enter your sign in details</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput placeholder='Enter email address' style={styles.textInput} />
                        </View>
                        <View style={[styles.textInputContainer, { marginBottom: 8 }]}>
                            <TextInput placeholder='Enter password' secureTextEntry={!isPasswordView} style={styles.textInput} />
                            <Icon name={isPasswordView ? 'eye' : 'eye-off'} color='rgba(0,0,0,0.3)' size={25} onPress={this.handlePasswordState} />
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={styles.forgotPassword} onPress={() => this.props.navigation.navigate("forgot-password")}>Forgot password</Text>
                        </View>
                        <View>
                            <Button
                                title='Login'
                                onPress={() => this.props.navigation.navigate("home")}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    textHeading: {
        fontSize: 25,
        fontFamily: Font_Lato_Bold,
        color: "#000",
        marginBottom: 8
    },
    textSubParagraph: {
        fontFamily: Font_Heebo_Regular,
        fontSize: 13,
        color: "#858180"
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