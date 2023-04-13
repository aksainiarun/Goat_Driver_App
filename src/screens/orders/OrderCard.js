import { Text, StyleSheet, View, Image, TouchableOpacity, Platform, UIManager, LayoutAnimation } from 'react-native';
import { useState } from 'react';
import { Font_Heebo_Bold, Font_Heebo_Medium, Font_Heebo_Regular } from '../../utils/typograpy';
import { PRIMARY_LIGHT_COLOR } from '../../utils/colors'
import { ProductCard } from './Confirm'
import Icon from '../../utils/icons'
import ProgressStrip from '../../components/progress/ProgressStrip'
import { useNavigation } from '@react-navigation/native';
import { TouchableRipple } from 'react-native-paper';

const InProgressBadge = () => {
    return <View style={{ backgroundColor: "rgba(253, 183, 20, 1)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100, }}>
        <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: "#fff" }}>In Progress</Text>
    </View>
}
const DeliveredBadge = () => {
    return <View style={{ backgroundColor: "rgba(94, 180, 17, 1)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100, }}>
        <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: "#fff" }}>Delivered</Text>
    </View>
}
const CanceledBadge = () => {
    return <View style={{ backgroundColor: "rgba(253, 1, 1, 1)", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 100, }}>
        <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: "#fff" }}>Canceled</Text>
    </View>
}

/**
 * 
 * @param {{ 
 * orderStatus: "delivered" | "canceled" | "pending",
 * }} props Props for the component
 * 
 */

export default function OrderCard({ orderStatus }) {
    const [isItemView, setIsItemView] = useState(false)
    const handleShowItems = () => {
        LayoutAnimation.easeInEaseOut();
        setIsItemView(!isItemView)
    }
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    const navigation = useNavigation()
    const backgroundColor = orderStatus === 'delivered' ? "rgba(94, 180, 17, 0.1)" : orderStatus === 'canceled' ? "rgba(253, 1, 1, 0.1)" : orderStatus === 'pending' ? "rgba(253, 183, 20, 0.1)" : null
    const ORDER_STATUS = orderStatus === 'delivered' ? <DeliveredBadge /> : orderStatus === 'canceled' ? <CanceledBadge /> : orderStatus === 'pending' ? <InProgressBadge /> : null
    return (
        <View style={styles.card}>
            <View style={[styles.cardHeader, { backgroundColor }]}>
                <View style={styles.flexRow}>
                    <Text style={styles.text}>Order ID: <Text style={{ fontFamily: Font_Heebo_Bold }}>124561231245</Text></Text>
                    {ORDER_STATUS}
                </View>
                <View style={styles.flexRow}>
                    <Text style={styles.text}>Delivery Date: <Text style={{ fontFamily: Font_Heebo_Bold }}>Jan 02,2023</Text></Text>
                    <Text style={styles.text}>Total Amount: <Text style={{ fontFamily: Font_Heebo_Bold }}>$500</Text></Text>
                </View>
                <View>
                    <Text style={styles.text}>Delivery Time: <Text style={{ fontFamily: Font_Heebo_Bold }}>10:00 AM to 12:30 PM</Text></Text>
                </View>
            </View>
            <View style={{ padding: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
                    <View style={{ flex: 0.7 }}>
                        <Text style={styles.text}>Order Date:</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.text}>Dec 25, 2022</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 }}>
                    <View style={{ flex: 0.7 }}>
                        <Text style={styles.text}>Shipping Address:</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.text, { fontSize: 16 }]}>Alex Walker</Text>
                        <Text style={styles.text}>H 703,  Bestech Grand Spa Park View Sector 81 Gurugram 120022</Text>
                    </View>
                </View>
            </View>
            <View style={{ padding: 14, borderTopColor: "rgba(200,200,200,1)", borderTopWidth: 0.5 }}>
                {!isItemView && <TouchableOpacity onPress={handleShowItems} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ width: 40, height: 40, marginRight: 8 }} source={{ uri: "https://firstbase.in/phpfiles/2020/04/3_Frozen_Food_Packaging_Design_Delhi_Mumbai.jpg" }} />
                    <Image style={{ width: 40, height: 40, marginRight: 8 }} source={{ uri: "https://firstbase.in/phpfiles/2020/04/3_Frozen_Food_Packaging_Design_Delhi_Mumbai.jpg" }} />
                    <Image style={{ width: 40, height: 40, marginRight: 8 }} source={{ uri: "https://firstbase.in/phpfiles/2020/04/3_Frozen_Food_Packaging_Design_Delhi_Mumbai.jpg" }} />
                    <Image style={{ width: 40, height: 40, marginRight: 8 }} source={{ uri: "https://firstbase.in/phpfiles/2020/04/3_Frozen_Food_Packaging_Design_Delhi_Mumbai.jpg" }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                        <Text style={{ fontSize: 14, color: "#000", fontFamily: Font_Heebo_Medium, }} numberOfLines={1} adjustsFontSizeToFit>View 21 Items</Text>
                        <Icon name='chevron-down' />
                    </View>
                </TouchableOpacity>}
                {isItemView && <View>
                    <TouchableOpacity onPress={handleShowItems} style={{ flexDirection: 'row', alignItems: 'center', height: 40, marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, }}>
                            <Text style={{ fontSize: 14, color: "#000", fontFamily: Font_Heebo_Medium, }}>Poultry</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: 14, color: "#000", fontFamily: Font_Heebo_Medium, }} >View 21 Items</Text>
                            <Icon name='chevron-up' />
                        </View>
                    </TouchableOpacity>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </View>}


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 14,
        borderWidth: 0.5,
        borderColor: "rgba(200,200,200,1)",
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 1
    },
    cardHeader: {
        padding: 14,
        backgroundColor: PRIMARY_LIGHT_COLOR,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14
    },
    text: {
        fontSize: 13,
        fontFamily: Font_Heebo_Regular,
        color: "#000"
    },
    trackLiveButton: {
        borderWidth: 1,
        alignItems: 'center',
        padding: 10

    },
})