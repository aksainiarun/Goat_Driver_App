import { Text, StyleSheet, View, TextInput } from 'react-native'
import React, { Component } from 'react'
import Container from '../../../components/layout/Container'
import Header from '../../../components/header/Header'
import { Font_Heebo_Medium, Font_Heebo_Regular, Font_Lato_Bold } from '../../../utils/typograpy'
import { GRAY_COLOR, PRIMARY_COLOR } from '../../../utils/colors'
import Button from '../../../components/button/Button'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import Icon from '../../../utils/icons'
import { connect } from 'react-redux'
import { postWithBody } from '../../../utils/appUtil/ApiHelper'

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPasswordView: false,
            confirmPassword: '',
            password: '',
            oldPassword: '',
            isLoading: false,
        }
    }
    handlePasswordState = () => {
        this.setState({ isPasswordView: !this.state.isPasswordView })
    }
    onChangeText(val, key) {
        this.setState({ [key]: val })
    }
    changePassword() {
        if (this.state.confirmPassword != this.state.password) { alert('Password does not matched.'); return }
        if (!this.state.password) { alert('New password should not be empty.'); return }
        let body = {
            "driverId": this.props.data._id,
            "oldPassword": this.state.oldPassword,
            "password": this.state.password
        }
        this.setState({ isLoading: true })
        postWithBody('driver/changePassword', JSON.stringify(body))
            .then(res => {
                this.setState({ isLoading: false })
                if (!res.err) {
                    this.props.navigation.navigate("profile")
                } else {
                    alert(res.msg)
                }
            }).catch(error => { console.log(error, 'change password'); })
    }
    render() {
        const { isPasswordView, isLoading } = this.state
        return (
            <Container>
                <Header />
                <KeyboardAvoidingScrollView style={styles.container}>
                    <Text style={styles.textHeading}>Change <Text style={{ color: PRIMARY_COLOR }}>Password</Text></Text>
                    <Text style={styles.textSubParagraph}>Create new password</Text>
                    <View style={styles.textInputContainer}>
                        <TextInput placeholder='Enter old password' style={styles.textInput}
                            onChangeText={(val) => this.onChangeText(val, 'oldPassword')} />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput placeholder='Enter new password' style={styles.textInput}
                            onChangeText={(val) => this.onChangeText(val, 'password')} />
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput placeholder='Confirm password' style={styles.textInput} secureTextEntry={isPasswordView}
                            onChangeText={(val) => this.onChangeText(val, 'confirmPassword')} />
                        <Icon name={isPasswordView ? 'eye' : 'eye-off'} color='rgba(0,0,0,0.3)' size={25} onPress={this.handlePasswordState} />
                    </View>
                </KeyboardAvoidingScrollView>
                <View style={{ padding: 10 }}>
                    <Button
                        title='Submit'
                        onPress={() => this.changePassword()}
                        isLoading={isLoading}
                    />
                </View>
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return {
        data: state.AuthReducer.data,
    };
};
export default connect(mapStateToProps)(ChangePassword)
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