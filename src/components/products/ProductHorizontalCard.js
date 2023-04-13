import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { CHARCOAL_COLOR, DISCOUNT_BADGE_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../utils/colors'
import { Font_Heebo_Bold, Font_Heebo_Light, Font_Heebo_Medium, Font_Heebo_Regular, Font_Heebo_SemiBold } from '../../utils/typograpy'
import { SCREEN_WIDTH } from '../../utils/constants';
import { TouchableRipple } from 'react-native-paper';
import Icon from '../../utils/icons';

const PRODUCT_WIDTH = SCREEN_WIDTH * 0.25;
const PRODUCT_HEIGHT = PRODUCT_WIDTH + 15;
/**
 * 
 * @param {{ 
 * style:object,
 * isAdded:boolean
 * }} props Props for the component
 * 
 */
export default function ProductHorizontalCard({ style, isAdded = false }) {
    const [isCartButtonActive, setIsCartButtonActive] = useState(isAdded)
    const [qty, setQty] = useState(1)
    const handleCartButton = () => {
        setIsCartButtonActive(!isCartButtonActive)
    }
    const handleCartQtyButton = (type) => {
        if (type === 'plus') {
            setQty(qty + 1)

        } else {
            if (qty <= 1) {
                handleCartButton()
                setQty(1)
            }
            setQty(qty - 1)
        }

    }
    return (
        <View style={[styles.container, style]}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: "https://www.mccainindia.com/assets/upload/product/1531292963_1111111-min.png" }} />
            </View>
            <View style={styles.contentInfo}>
                <View style={{ minHeight: 40, marginBottom: 0, }}>
                    <Text style={{ fontSize: 15, fontFamily: Font_Heebo_Regular, color: "#000", lineHeight: 18.45, paddingRight: 40 }}>Product Name Product Name </Text>
                </View>
                <View style={{ minHeight: 15, marginBottom: 4, flex: 1 }}>
                    <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: "#4E545C", lineHeight: 15.45 }}>1Kg</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: Font_Heebo_Bold, color: "#28282B", lineHeight: 20.45, marginRight: 5 }}>$250</Text>
                            <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Medium, color: CHARCOAL_COLOR, lineHeight: 14.45, textDecorationColor: CHARCOAL_COLOR, textDecorationLine: 'line-through' }}>$300</Text>
                        </View>
                        <View style={{ backgroundColor: DISCOUNT_BADGE_COLOR, paddingHorizontal: 6, paddingVertical: 2 }}>
                            <Text style={{ fontSize: 11, fontFamily: Font_Heebo_Light, color: "#000" }}>12% off</Text>
                        </View>
                    </View>
                    {!isCartButtonActive ?
                        <TouchableRipple style={{ width: 100, height: 30, }} onPress={handleCartButton}>
                            <View style={{ borderWidth: 1, borderColor: PRIMARY_LIGHT_COLOR, height: 30, width: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: PRIMARY_LIGHT_COLOR }}>
                                <Text style={{ color: "#000", fontFamily: Font_Heebo_SemiBold }}>Add</Text>
                            </View>
                        </TouchableRipple> :
                        <View style={{ width: 100, height: 30, flexDirection: 'row', alignItems: 'center', }}>
                            <TouchableRipple style={styles.cartButton} onPress={() => handleCartQtyButton("plus")}>
                                <Icon name='plus' type='entypo' color='#fff' />
                            </TouchableRipple>
                            <View style={styles.cartNumber}>
                                <Text style={{ fontSize: 14, fontFamily: Font_Heebo_Bold, color: "#000" }}>{qty}</Text>
                            </View>
                            <TouchableRipple style={styles.cartButton} onPress={() => handleCartQtyButton("minus")}>
                                <Icon name='minus' type='entypo' color='#fff' />
                            </TouchableRipple>
                        </View>}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomColor: "rgba(240, 240, 240, 1)",
        borderBottomWidth: 0.5,
        paddingVertical: 14

    },
    imageContainer: {
        paddingRight: 10
    },
    image: {
        width: PRODUCT_WIDTH,
        height: PRODUCT_HEIGHT,
        backgroundColor: "#f1f1f1",
        marginBottom: 8,
    },
    contentInfo: {
        flex: 1,
        height: PRODUCT_HEIGHT
    },
    cartButton: {
        width: (PRODUCT_WIDTH / 3) + 4,
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        height: 30,
        justifyContent: 'center'
    },
    cartNumber: {
        width: (PRODUCT_WIDTH / 3) + 4,
        alignItems: 'center',
        height: 30,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        justifyContent: 'center',
    },
    // removeButton: {
    //     position: 'absolute',
    //     width: 35,
    //     height: 35,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: "#f00"
    // }
})