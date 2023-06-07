import { Text, StyleSheet, View, ScrollView, Image, FlatList, Animated, Easing } from 'react-native'
import React, { Component, createRef } from 'react'
import Container from '../../components/layout/Container'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/constants'
import { Avatar, TouchableRipple } from 'react-native-paper'
import { AVATAR } from '../../utils/images'
import Icon from '../../utils/icons'
import { Font_Heebo_Medium, Font_Lato_Bold } from '../../utils/typograpy'
import OrderCard from '../orders/OrderCard'
import { PRIMARY_COLOR } from '../../utils/colors'
import Notification from './Notification'
import { connect } from 'react-redux'
import { getAllOrders } from '../../actions/thunkActions'
import MapView, { Marker } from 'react-native-maps';


const RenderTabs = ({ data, onPress, isSelected }) => {
    return <TouchableRipple onPress={onPress && onPress} borderless style={{ backgroundColor: "#fff", borderWidth: 1, borderRadius: 20, paddingVertical: 5, paddingHorizontal: 17, borderColor: isSelected ? PRIMARY_COLOR : "#000" }}>
        <Text style={{ fontSize: 13, color: isSelected ? PRIMARY_COLOR : "#000", fontFamily: Font_Heebo_Medium,textTransform:'capitalize' }}>{data}</Text>
    </TouchableRipple>
}
const RenderCard = () => {
    return (
        <View></View>
    )
}
const TABS = ["All", "confirm", "delivered", "rejected",]
const BACKGROUND_COLOR = "rgba(255, 255, 255, 1)"
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollOffsetAnim: new Animated.Value(0),
            isSnapEnd: false,
            selectedTab: "All"
        }
        this.scrollViewRef = createRef();
    }

    componentDidMount() {
        this.initialScroll()
        this.props.getAllOrders(this.props.data.id)
    }

    initialScroll = () => {
        this.scrollViewRef.current?.scrollTo({ x: 0, y: SCREEN_HEIGHT * 0.5 })
    }
    handleTabs = (value) => {
        this.setState({ selectedTab: value })
    }
    handleNotification = () => {

    }
    render() {
        const HEIGHT = (SCREEN_HEIGHT - 20)
        const HEADER_OPACITY = this.state.scrollOffsetAnim.interpolate({
            inputRange: [HEIGHT, SCREEN_HEIGHT],
            outputRange: [0, 1],
            easing: Easing.linear,
            extrapolate: 'extend'
        })
        const bgStyle = {
            backgroundColor: this.state.scrollOffsetAnim.interpolate({
                inputRange: [HEIGHT, SCREEN_HEIGHT],
                outputRange: ["transparent", BACKGROUND_COLOR],
                easing: Easing.linear,
                extrapolate: 'extend'
            }),
        };
        const TRANSLATE_Y = this.state.scrollOffsetAnim.interpolate({
            inputRange: [HEIGHT, SCREEN_HEIGHT],
            outputRange: [50, 0],
            extrapolate: 'clamp',
            easing: Easing.linear
        })
        const { isSnapEnd, selectedTab } = this.state
        return (
            <Container>
                <Animated.View style={[{ position: 'absolute', zIndex: 1, width: SCREEN_WIDTH, }, bgStyle]}>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableRipple borderless style={styles.avatarContainer} onPress={() => this.props.navigation.navigate("profile")}>
                                <Image source={this.props.data?.profilePhoto?{uri:this.props.data?.profilePhoto}:AVATAR} style={styles.avatar} />
                            </TouchableRipple>
                            <Animated.View style={{ paddingHorizontal: 10, opacity: HEADER_OPACITY }}>
                                <Text style={{ fontSize: 25, fontFamily: Font_Lato_Bold, color: "#000" }}>My Task</Text>
                            </Animated.View>
                        </View>
                        <View>
                            {/* <Icon name='notifications' size={25} color='#6D7378' style={styles.notificationIcon} onPress={this.handleNotification} />
                            <View style={styles.notificationIconBadge}>
                                <Text style={{ fontSize: 9, fontFamily: Font_Heebo_Medium, color: "#fff" }}>1</Text>
                            </View> */}
                        </View>
                    </View>
                    <Animated.View style={{ opacity: HEADER_OPACITY, paddingBottom: 14, transform: [{ translateX: TRANSLATE_Y }] }}>
                        <FlatList
                            contentContainerStyle={{ paddingHorizontal: 14 }}
                            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={TABS}
                            renderItem={({ item, index }) => <RenderTabs data={item} />}
                        />
                    </Animated.View>
                </Animated.View>
                <ScrollView ref={this.scrollViewRef}

                    onScroll={(evt) => {
                        const { contentOffset } = evt.nativeEvent;
                        const { y } = contentOffset;
                        this.state.scrollOffsetAnim.setValue(y);
                        if (y > SCREEN_HEIGHT) {
                            this.setState({ isSnapEnd: false })
                        } else {
                            this.setState({ isSnapEnd: true })
                        }
                    }}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    alwaysBounceVertical={false}
                    // style={{ zIndex: 99 }}
                    contentContainerStyle={{ flexGrow: 1, }}
                    stickyHeaderIndices={[0]}
                    decelerationRate={'fast'}
                    snapToEnd={isSnapEnd}
                    scrollEventThrottle={18}
                    snapToInterval={SCREEN_HEIGHT}
                    snapToOffsets={[SCREEN_HEIGHT * 0.4, (SCREEN_HEIGHT / 1.1) + 65, 0]}
                >
                    <View>
                    <MapView
                        style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        <Marker
                            coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                            title="Marker Title"
                            description="Marker Description"
                        />
                    </MapView>
                        {/* <Image source={{ uri: `https://img.freepik.com/premium-vector/city-map-any-kind-digital-info-graphics-print-publication-gps-map_403715-37.jpg?h=1000` }} style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }} /> */}
                    </View>
                    <View style={{ zIndex: 99, backgroundColor: BACKGROUND_COLOR, borderTopRightRadius: 25, borderTopLeftRadius: 25 }}>
                        <View style={{ paddingHorizontal: 14, paddingVertical: 14, marginBottom: 14 }}>
                            <Text style={{ fontSize: 25, fontFamily: Font_Lato_Bold, color: "#000" }}>My Task</Text>
                        </View>
                        <View style={{ marginBottom: 14 }}>
                            <FlatList
                                contentContainerStyle={{ paddingHorizontal: 14 }}
                                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={TABS}
                                renderItem={({ item, index }) => <RenderTabs data={item} onPress={() => this.handleTabs(item)} isSelected={item === selectedTab} />}
                            />
                        </View>
                        <View style={{height:500}}>
                            {this.props.orders.map((item, index) => selectedTab==item.status || selectedTab=='All'?<OrderCard key={index} data={item} orderStatus={item.status} />:null)}
                        </View>
                    </View>
                </ScrollView>
                {/* <Notification /> */}
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
      data: state.AuthReducer.data,
      orders:state.AuthReducer.orders,
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      getAllOrders: (id) =>dispatch(getAllOrders(id)),
      };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Home)
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        paddingBottom: 10
    },
    avatarContainer: {
        width: 45,
        height: 45,
        borderRadius: 55,
    },
    avatar: {
        width: 45,
        height: 45,
        borderWidth: 2,
        borderRadius: 55,
        resizeMode: 'cover',
        borderColor: "#04DAC4"
    },
    notificationIcon: {
        width: 45,
        height: 45,
        borderWidth: 2,
        borderRadius: 55,
        resizeMode: 'cover',
        borderColor: "rgba(255,255,255,0.5)",
        backgroundColor: "rgba(255,255,255,0.5)",
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    notificationIconBadge: {
        backgroundColor: "#F73942",
        position: 'absolute',
        right: 0,
        paddingHorizontal: 5,
        paddingVertical: 0.5,
        borderRadius: 12

    }
})