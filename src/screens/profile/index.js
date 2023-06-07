import { Text, StyleSheet, View, Image, Linking } from 'react-native'
import React, { Component } from 'react'
import Container from '../../components/layout/Container'
import { AVATAR } from '../../utils/images'
import { SCREEN_WIDTH } from '../../utils/constants'
import { Font_Heebo_Medium, Font_Heebo_Regular, Font_Lato_Bold } from '../../utils/typograpy'
import Header from '../../components/header/Header'
import { TouchableRipple } from 'react-native-paper'
import Icon from '../../utils/icons'
import ConfirmModal from '../../components/modals/alerts/Confirm'
import { connect } from 'react-redux'

const ListItem = ({ iconName, iconColor, title, onPress }) => {
    return (<TouchableRipple onPress={onPress && onPress} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', borderBottomWidth: 1, borderBottomColor: "rgba(244,244,244,1)", paddingVertical: 22, paddingHorizontal: 18 }}>
        <>
            <Icon name={iconName} color={iconColor} size={20} />
            <Text style={{ fontSize: 14, fontFamily: Font_Heebo_Regular, color: "#000", marginLeft: 21 }}>{title}</Text>
        </>
    </TouchableRipple>)
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogout: false,
            phoneNumber:'9898989898',
        }
    }
    handleLogoutConfirm = () => {
        this.setState({ isLogout: !this.state.isLogout })
    }
    handleLogout = () => {
        this.handleLogoutConfirm()
        this.props.logout()
    }
    render() {
        const { isLogout, phoneNumber } = this.state
        const {data}=this.props
        return (
            <Container>
                <View>
                    <Header headerTitle='My Profile' />
                </View>
                <View>
                    <Image source={{ uri:"https://img.freepik.com/premium-vector/vector-cityscape-background-with-seamless-pattern_554888-1131.jpg" }} style={{ width: SCREEN_WIDTH, height: 150, }} />
                    <View style={{ alignItems: 'center', marginTop: -(SCREEN_WIDTH * 0.26) / 2 }}>
                        <Image source={ data.profilePhoto?{uri:data.profilePhoto}:AVATAR} style={{ width: SCREEN_WIDTH * 0.26, height: SCREEN_WIDTH * 0.26, borderRadius: SCREEN_WIDTH * 0.26, marginBottom: 10 }} />
                        <View style={{ alignItems: 'center', }}>
                            <Text style={{ fontSize: 25, fontFamily: Font_Lato_Bold, color: "#000", lineHeight: 30.45 }}>{data.firstName} {data.lastName}</Text>
                            <Text style={{ fontSize: 14, fontFamily: Font_Heebo_Medium, color: "#9A9A9A", lineHeight: 20.45 }}>{data.email}</Text>
                            <Text style={{ fontSize: 13, fontFamily: Font_Heebo_Medium, color: "#9A9A9A", lineHeight: 20.45 }}>Id: GOAT{data.displayId}</Text>
                        </View>
                    </View>
                </View>
                <View style={{}}>
                    <ListItem title={"Edit Profile"} iconName={"pencil-sharp"} iconColor={"#236CD9"} onPress={() => this.props.navigation.navigate("edit-profile")} />
                    <ListItem title={"My Orders"} iconName={"briefcase"} iconColor={"rgba(55, 71, 79, 1)"} onPress={() => this.props.navigation.navigate("my-orders")} />
                    <ListItem title={"Talk to our Support"} iconName={"call-sharp"} iconColor={"rgba(243, 122, 32, 1)"} onPress={()=>Linking.openURL(`tel:${phoneNumber}`)}/>
                    <ListItem title={"Log out"} iconName={"log-out"} iconColor={"rgba(255, 85, 82, 1)"} onPress={this.handleLogoutConfirm} />
                </View>
                <ConfirmModal visible={isLogout} onPressCancel={this.handleLogoutConfirm} onPress={this.handleLogout} content={"Are you sure you want to logout"} heading={"Logging Out"} buttonTitle="Logout" />
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
        logout: () => dispatch({ type: 'LOGOUT'}),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Profile)
const styles = StyleSheet.create({})