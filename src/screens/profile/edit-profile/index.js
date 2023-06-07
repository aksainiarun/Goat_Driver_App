import { Text, StyleSheet, View, ScrollView, TextInput, Image, Alert } from 'react-native'
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
import { connect } from 'react-redux'
import { UploadImageService } from '../../../utils/images/UploadImageService'
import GetLocation from 'react-native-get-location';
import { putRequestWithBody } from '../../../utils/appUtil/ApiHelper'
import { getByDriverId } from '../../../actions/thunkActions'
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.data.firstName ? this.props.data.firstName : '',
            lastName: this.props.data.lastName ? this.props.data.lastName : '',
            contact: this.props.data.contact ? this.props.data.contact : '',
            profilePhoto: this.props.data.profilePhoto ? this.props.data.profilePhoto : '',
            isLoading: false,
        }
    }

    onChangeText(val, key) {
        this.setState({ [key]: val })
    }
    getImage = () => {
        UploadImageService().then(res => {
            this.setState({ profilePhoto: res });
        });
    };
    async updateProfile() {
        const body = new FormData();
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        }).then(location => {
            body.append('longitude', location.latitude);
            body.append('latitude', location.longitude);
        }).catch(error => { console.log(error); })
        body.append('profilePhoto', {
            uri: this.state.profilePhoto,
            name: this.props.data._id,
            type: 'image/*',
        });
        body.append('firstName', this.state.firstName);
        body.append('lastName', this.state.lastName);
        body.append('contact', this.state.contact);
        body.append('driverId', this.props.data._id);
        body.append('address', "address");
        console.log(body);
        this.setState({ isLoading: true })
        putRequestWithBody('driver/update', body)
            .then(res => {
                this.setState({ isLoading: false })
                if (!res.err) {
                    this.props.getProfile(this.props.data._id)
                } else {
                    alert(res.msg)
                }
            }).catch(err => { console.log(err); alert(err.msg); this.setState({ isLoading: false }); })
    }
    render() {
        const { firstName, lastName, contact, profilePhoto, isLoading } = this.state
        const { data } = this.props
        return (
            <Container>
                <Header headerTitle='Edit Profile' />
                <KeyboardAvoidingScrollView>
                    <View style={styles.container}>
                        <View style={{ alignItems: 'center', marginVertical: 25 }}>
                            <View style={styles.imageContainer}>
                                <Image source={profilePhoto ? { uri: profilePhoto } : AVATAR} style={{ width: SCREEN_WIDTH * 0.3, height: SCREEN_WIDTH * 0.3, borderRadius: SCREEN_WIDTH * 0.3, marginBottom: 10 }} />
                                <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                    <Icon name='edit' type='feather' style={styles.editIcon} color='#000'
                                        onPress={() => this.getImage()} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='First Name' value={firstName} style={styles.textInput} placeholderTextColor={PLACEHOLDER_COLOR}
                                onChangeText={(val) => this.onChangeText(val, 'firstName')} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Last Name' value={lastName} style={styles.textInput} placeholderTextColor={PLACEHOLDER_COLOR}
                                onChangeText={(val) => this.onChangeText(val, 'lastName')} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='example@gmail.com' value={data.email} editable={false} style={[styles.textInput, { color: "#585858" }]} placeholderTextColor={PLACEHOLDER_COLOR} />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput placeholder='Goat Id' value={'GOAT' + data.displayId} editable={false} style={[styles.textInput, { color: "#585858" }]} placeholderTextColor={PLACEHOLDER_COLOR} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={[styles.inputContainer, { width: 60, marginRight: 12, paddingHorizontal: 5, }]}>
                                <TextInput placeholder='Phone no' value='+91' style={[styles.textInput, { color: "#585858", textAlign: 'center' }]} placeholderTextColor={PLACEHOLDER_COLOR}
                                />
                            </View>
                            <View style={[styles.inputContainer, { flex: 1 }]}>
                                <TextInput placeholder='Phone no' value={contact} style={[styles.textInput, { color: "#585858" }]} placeholderTextColor={PLACEHOLDER_COLOR}
                                    maxLength={10}
                                    keyboardType='numeric'
                                    onChangeText={(val) => this.onChangeText(val, 'contact')} />
                            </View>
                        </View>
                        <TouchableRipple onPress={() => this.props.navigation.navigate("change-password")} style={[styles.inputContainer, { justifyContent: 'center' }]}>
                            <Text style={[styles.textInput, { fontSize: 16, height: null }]}>Change Password</Text>
                        </TouchableRipple>
                    </View>
                </KeyboardAvoidingScrollView>
                <View style={{ padding: 14 }}>
                    <Button
                        title='Save'
                        onPress={() => this.updateProfile()}
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
const mapDispatchToProps = dispatch => {
    return {
        getProfile: (_id) => dispatch(getByDriverId(_id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
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
        height: 54

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