import { Animated, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Container from '../../components/layout/Container';
import { CHARCOAL_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../utils/colors'
import { Font_Heebo_Medium } from '../../utils/typograpy'
import { useNavigation } from '@react-navigation/native'

import MapView, { Marker } from 'react-native-maps';
import useStatusBarHeight from '../../utils/constants/StatusBarHeight'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '../../utils/icons';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/constants';
import { Font_Heebo_Bold, Font_Heebo_Regular, Font_Heebo_SemiBold } from '../../utils/typograpy';
import ProgressStrip from '../../components/progress/ProgressStrip'
import { postWithBody } from '../../utils/appUtil/ApiHelper';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../actions/thunkActions';
import SelectDropdown from 'react-native-select-dropdown';

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };

export default function OrderDetail({ route }) {
    const [scrollOffsetAnim] = useState(new Animated.Value(0))
    const [freeHeight, setFreeHeight] = useState(0)
    const [order] = useState(route.params.order)
    const [orderStatus, setOrderStatus] = useState(route.params.order.status)
    const scrollViewRef = useRef(null);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const data = useSelector(state => state.AuthReducer.data)
    const insets = useSafeAreaInsets()
    const initialScroll = () => {
        scrollViewRef.current?.scrollTo({ x: 0, y: SCREEN_HEIGHT * 0.42 })
    }
    useEffect(() => {
        initialScroll()

        return () => {

        }
    }, [scrollViewRef, freeHeight])

    const HEIGHT = SCREEN_HEIGHT * 0.7

    const HEADER_OPACITY = scrollOffsetAnim.interpolate({
        inputRange: [0, HEIGHT],
        outputRange: [0, 1],
    })
    const markDelivered = () => {
        let body = JSON.stringify({
            orderId: order._id,
            status: 'delivered'
        })
        postWithBody('driverOrder/updateStatus', body)
            .then(res => {
                if (!res.err) {
                    setOrderStatus('delivered')
                    dispatch(getAllOrders(data._id))
                } else {
                    alert(res.msg)
                }
            }).catch(error => { console.log(error, 'update order status'); })
    }
    const handleFreeSpace = (height) => {
        if (height < SCREEN_HEIGHT / 2) {
            setFreeHeight((SCREEN_HEIGHT - height) - (insets.bottom + insets.top) + Platform.select({ ios: insets.top, android: 17 }))
        }

    }
    return (
        <Container>
            <View style={styles.backButton}>
                <Animated.View style={[styles.cardHeader, { opacity: HEADER_OPACITY, backgroundColor: "#fff", position: 'absolute', padding: 14, paddingLeft: 55, borderBottomWidth: 0, zIndex: -1 }]}>
                    <Text style={{ fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: CHARCOAL_COLOR }}>Shipper</Text>
                </Animated.View>
                <View style={styles.iconContainer}>
                    <Icon
                        name='arrow-back'
                        color='#fff'
                        size={25}
                        onPress={navigation.goBack}
                        style={styles.icon}
                    />
                </View>
                {/* <Icon onPress={navigation.goBack} name='arrow-back' style={styles.backButtonIcon} size={20} color='#fff' /> */}
            </View>
            <ScrollView
                ref={scrollViewRef}
                onScroll={(evt) => {
                    const { contentOffset } = evt.nativeEvent;
                    const { y } = contentOffset;
                    if (y > HEIGHT) {
                        scrollOffsetAnim.setValue(y);
                    } else {
                        scrollOffsetAnim.setValue(0);
                    }

                }}
                showsVerticalScrollIndicator={false}
                bounces={false}
                alwaysBounceVertical={false}
                style={{ zIndex: 99 }}
                contentContainerStyle={{ flexGrow: 1, }}
                stickyHeaderIndices={[0]} decelerationRate={'fast'} snapToStart scrollEventThrottle={18}
                snapToInterval={SCREEN_HEIGHT}
                snapToOffsets={[SCREEN_HEIGHT * 0.42, (SCREEN_HEIGHT / 1.1) + 45]}>
                <MapView
                    style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
                    initialRegion={{
                        latitude: 37.3318456,
                        longitude: -122.0296002,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
                        title="Store"
                        description="Store Location"
                    />
                    {/* <MapViewDirections
                        origin={order.address?.location?.coordinates}
                        destination={destination}
                        apikey={googleKey}
                        strokeWidth={3}
                        strokeColor="red"
                    /> */}
                </MapView>
                <View style={[styles.shipperCard]} onLayout={(e) => handleFreeSpace(e.nativeEvent.layout.height)}>
                    <View style={styles.divider} />
                    <View style={styles.cardHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: CHARCOAL_COLOR }}>Order Status</Text>
                            <SelectDropdown
                                data={['Delivered']}
                                defaultButtonText='Change Status'
                                buttonStyle={{ paddingHorizontal: 8, marginHorizontal: 0, width: 120, height: 30, borderRadius: 30 }}
                                buttonTextStyle={{ fontSize: 12, fontFamily: Font_Heebo_SemiBold, color: "#000", marginHorizontal: 8, flex: 0 }}
                                dropdownIconPosition='right'
                                renderDropdownIcon={() => <Icon name='caret-down-outline' />}
                                rowStyle={{ height: 35 }}
                                rowTextStyle={{ fontSize: 12, fontFamily: Font_Heebo_SemiBold, color: "#000", flex: 0, textAlign: 'left' }}
                            />
                        </View>
                        <ProgressStrip status={orderStatus} />
                        <Text style={{ fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: CHARCOAL_COLOR }}>Shipper</Text>
                    </View>
                    <View style={styles.shipperCardBody} >
                        <View style={[styles.flexRow, { marginBottom: 14 }]}>
                            <Image source={{ uri: order.driver?.profilePhoto ? order.driver?.profilePhoto : "https://img.freepik.com/free-photo/delivery-concept-portrait-happy-african-american-delivery-man-pointing-hand-present-box-package-isolated-grey-studio-background-copy-space_1258-1263.jpg" }} style={{ width: 45, height: 45, borderRadius: 45 }} />
                            <View style={{ flex: 1, paddingLeft: 14 }}>
                                <View style={[styles.flexRow, { marginBottom: 0 }]}>
                                    <Text style={{ fontSize: 16, fontFamily: Font_Heebo_SemiBold, color: "#000" }}>{order.driver?.firstName} {order.driver?.lastName}</Text>
                                    {orderStatus == "delivered" ? <Text style={[styles.label, { color: 'green' }]} >Delivered</Text> : <Text style={styles.label} onPress={() => markDelivered()}>Mark Delivered</Text>}
                                </View>
                                <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Regular, color: CHARCOAL_COLOR }}>Delivery Boy</Text>
                            </View>
                            {/* <Icon name='ios-call-sharp' style={styles.icon} color='#fff' size={22} onPress={() => console.log("@working")} /> */}
                        </View>
                        <View>
                            <View style={{ marginBottom: 12 }}>
                                <Text style={{ fontSize: 16, color: "#000", fontFamily: Font_Heebo_Bold }}>Order Placed at 12:03 PM</Text>
                                <Text style={{ fontSize: 14, color: "#000", fontFamily: Font_Heebo_Regular }}>{order.address?.address} {order.address?.address2} </Text>
                            </View>
                            <View style={styles.flexRow}>
                                <Text style={styles.heading}>Order Number</Text>
                                <Text style={styles.label}>{order.orderNumber}</Text>
                            </View>
                            <View style={styles.flexRow}>
                                <Text style={styles.heading}>Estimate Time</Text>
                                <Text style={styles.label}>23 min</Text>
                            </View>
                            <View style={styles.flexRow}>
                                <Text style={styles.heading}>Total Amount</Text>
                                <Text style={styles.label}>${order.total}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: freeHeight, backgroundColor: "#fff", width: SCREEN_WIDTH }} />
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    shipperCard: {
        marginTop: Platform.select({ ios: -190, android: -100 }),
        backgroundColor: "#fff",
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        zIndex: 99,
        position: 'relative',
        // transform: [{ translateY: SCREEN_HEIGHT / 2 }]
    },

    cardHeader: {
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(200,200,200,1)",
        padding: 14,
    },
    shipperCardBody: {
        padding: 14,

    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14
    },
    icon: {
        width: 40,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 40
    },
    heading: {
        fontSize: 14,
        color: "#A8A9AB",
        fontFamily: Font_Heebo_Medium
    },
    label: {
        fontSize: 14,
        color: "#000",
        fontFamily: Font_Heebo_Bold
    },
    divider: {
        width: 80,
        height: 5,
        backgroundColor: "#d1d1d1",
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15
    },
    backButton: {
        position: 'absolute',
        zIndex: 999,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        height: 45,
        top: 1
    },
    // backButtonIcon: {
    //     width: 35,
    //     height: 35,
    //     textAlign: 'center',
    //     textAlignVertical: 'center',
    //     backgroundColor: PRIMARY_COLOR,
    //     borderRadius: 40
    // },
    iconContainer: {
        width: 35,
        height: 35,
        borderRadius: 35,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        textAlign: 'center',
        textAlignVertical: 'center',
    },
})