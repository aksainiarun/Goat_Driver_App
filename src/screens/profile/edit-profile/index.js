import { Text, StyleSheet, View, ScrollView, TextInput, Image } from 'react-native'
import React, { Component } from 'react'
import Container from '../../../components/layout/Container'
import { GRAY_COLOR, PLACEHOLDER_COLOR, PRIMARY_LIGHT_COLOR } from '../../../utils/colors'
import Header from '../../../components/header/Header'
import { Font_Heebo_Regular } from '../../../utils/typograpy'
import Button from '../../../components/button/Button'
import { SCREEN_WIDTH } from '../../../utils/constants'
import { AVATAR } from '../../../utils/images'
import Icon from '../../../utils/icons'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'
import { TouchableRipple } from 'react-native-paper'

export default class EditProfile extends Component {
    render() {
        return (
            <Container>
                <Header headerTitle='Edit Profile' />
                <KeyboardAvoidingScrollView>
                    <View style={styles.container}>
                        <View style={{ alignItems: 'center', marginVertical: 25 }}>
                            <View style={styles.imageContainer}>
                                <Image source={AVATAR} style={{ width: SCREEN_WIDTH * 0.3, height: SCREEN_WIDTH * 0.3, borderRadius: SCREEN_WIDTH * 0.3, marginBottom: 10 }} />
                                <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                    <Icon name='edit' type='feather' style={styles.editIcon} color='#000' />
                                </View>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Full Name' value='Alex Walker' style={styles.textInput} placeholderTextColor={PLACEHOLDER_COLOR} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='example@gmail.com' value='example@gmail.com' editable={false} style={[styles.textInput, { color: "#585858" }]} placeholderTextColor={PLACEHOLDER_COLOR} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Goat Id' value='GOAT142536' editable={false} style={[styles.textInput, { color: "#585858" }]} placeholderTextColor={PLACEHOLDER_COLOR} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={[styles.inputContainer, { width: 60, marginRight: 12, paddingHorizontal: 5, }]}>
                                <TextInput placeholder='Phone no' value='+1' style={[styles.textInput, { color: "#585858", textAlign: 'center' }]} placeholderTextColor={PLACEHOLDER_COLOR} />
                            </View>
                            <View style={[styles.inputContainer, { flex: 1 }]}>
                                <TextInput placeholder='Phone no' value='1234567890' style={[styles.textInput, { color: "#585858" }]} placeholderTextColor={PLACEHOLDER_COLOR} />
                            </View>
                        </View>
                        <TouchableRipple onPress={() => this.props.navigation.navigate("change-password")} style={[styles.inputContainer, { justifyContent: 'center' }]}>
                            <Text style={[styles.textInput, { fontSize: 16 }]}>Change Password</Text>
                        </TouchableRipple>
                    </View>
                </KeyboardAvoidingScrollView>
                <View style={{ padding: 14 }}>
                    <Button
                        title='Save'
                        onPress={() => this.props.navigation.goBack()}
                    />
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14
    },
    inputContainer: {
        backgroundColor: GRAY_COLOR,
        marginBottom: 14,
        borderRadius: 8,
        paddingHorizontal: 14,
        height: 50
    },
    textInput: {
        fontFamily: Font_Heebo_Regular,
        color: "#000",
        fontSize: 14,

    },
    imageContainer: {
        width: SCREEN_WIDTH * 0.3,
        height: SCREEN_WIDTH * 0.3,
    },
    editIcon: {
        width: 35,
        height: 35,
        borderRadius: 35,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: PRIMARY_LIGHT_COLOR,
    }
})