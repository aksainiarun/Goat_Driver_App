import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../utils/colors'
import { Font_Heebo_Medium } from '../../utils/typograpy'
import { TouchableRipple } from 'react-native-paper'
/**
 * 
 * @param {{ 
 * isDisable:boolean,
 * onPress:Function, 
 * title:string,
 * isLoading:boolean
 * }} props Props for the component
 * 
 */
export default function Button({ onPress, isDisable = false, title, isLoading }) {
    return (
        <TouchableRipple borderless onPress={onPress && onPress} style={{ borderRadius: 8 }} disabled={isDisable}>
            <View style={{ backgroundColor: PRIMARY_LIGHT_COLOR, alignItems: 'center', paddingVertical: 14, height: 50, opacity: isDisable ? 0.5 : 1, }}>
                {!isLoading ? <Text style={{ fontSize: 15, fontFamily: Font_Heebo_Medium, textTransform: 'uppercase', color: "#000" }}>{title}</Text> :
                    <ActivityIndicator size={27} color={PRIMARY_COLOR} animating />}

            </View>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({})