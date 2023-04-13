import { Animated, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { Font_Heebo_Medium } from '../../utils/typograpy'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const HEADER_MAX_HEIGHT = 40;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
function Category({ scrollOffset }) {
    const topBanner=useSelector(state=>state.AuthReducer.topCategory)
    const navigation=useNavigation()
    const imageHeight = scrollOffset?.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });
    return (
        <View style={styles.subCategory}>
            <FlatList
                horizontal
                data={topBanner}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index }) => <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center' }}
                onPress={()=>navigation.navigate('plp',{data:item})} >
                    <Animated.Image style={{ width: 40, height: imageHeight, opacity: imageHeight }} resizeMode='contain' source={{ uri: item.image}} />
                    <Text style={{ fontSize: 12, color: "#000", fontFamily: Font_Heebo_Medium }}>{item.name}</Text>
                </TouchableOpacity>}
                keyExtractor={(item)=>item._id}
            />
        </View>
    )
}

export default memo(Category)

const styles = StyleSheet.create({
    subCategory: {
        paddingVertical: 8,
        backgroundColor: "#fff",
        elevation: 10
    },
})