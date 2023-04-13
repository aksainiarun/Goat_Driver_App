import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Font_Heebo_Bold, Font_Heebo_Regular, Font_Heebo_SemiBold, Font_Lato_Bold, Font_Poppins_Bold } from '../../utils/typograpy'
import { PRIMARY_COLOR } from '../../utils/colors'
import BottomLinks from './BottomLinks'

export default function Footer() {
    return (
        <View style={{ backgroundColor: "#fff", paddingTop: 20,  }}>            
            <Text style={styles.title}>All Categories</Text>
            <View style={styles.headingContainer}>
                <View style={{ flexBasis: '50%' }}>
                    <Text style={styles.subHeading}>Heading1</Text>
                </View>
                <View style={{ flexBasis: '50%' }}>
                    <Text style={styles.subHeading}>Heading2</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 14, paddingRight: 13 }}>
                <View style={{ flex: 1, }}>
                    <Text style={styles.labels}>Sub Heading</Text>
                    <Text style={styles.labels}>Sub Heading</Text>
                    <Text style={styles.labels}>Sub Heading</Text>
                    <Text style={styles.labels}>Sub Heading</Text>
                </View>
                <View style={{ flex: 1, }}>
                    <Text style={styles.labels}>Sub Heading</Text>
                    <Text style={styles.labels}>Sub Heading</Text>
                    <Text style={styles.labels}>Sub Heading</Text>
                    <Text style={styles.labels}>Sub Heading</Text>
                </View>
            </View>
            <View style={styles.headingContainer}>
                <View style={{ flexBasis: '50%' }}>
                    <Text style={styles.subHeading}>Heading1</Text>
                </View>
                <View style={{ flexBasis: '50%' }}>
                    <Text style={styles.subHeading}>Heading2</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 14, paddingRight: 13, marginBottom:25 }}>
                <View style={{ flex: 1, }}>
                    <Text style={styles.labels}>Sub Heading</Text>
                    <Text style={styles.labels}>Sub Heading</Text>
                    <Text style={styles.labels}>Sub Heading</Text>
                    <Text style={styles.labels}>Sub Heading</Text>
                </View>
                <View style={{ flex: 1, }}>
                    <Text style={styles.labels}>Sub Heading</Text>
                    <Text style={styles.labels}>Sub Heading</Text>
                    <Text style={styles.labels}>Sub Heading</Text>
                    <Text style={styles.labels}>Sub Heading</Text>
                </View>
            </View>
<BottomLinks/>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        color: "#000",
        fontFamily: Font_Lato_Bold,
        textTransform: 'uppercase',
        paddingHorizontal: 20
    },
    subHeading: {
        fontSize: 17,
        color: "#000",
        fontFamily: Font_Heebo_Bold,
    },
    labels: {
        fontSize: 14,
        color: "#000",
        fontFamily: Font_Heebo_Regular,
        marginVertical: 7
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: PRIMARY_COLOR,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginBottom: 7,
        marginTop: 14
    }
})