import { Modal, Platform, SectionList, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { TouchableRipple } from 'react-native-paper'
import { Font_Heebo_Medium, Font_Heebo_Regular, Font_Heebo_SemiBold } from '../../utils/typograpy'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/constants'

const DATA = [
    {
        title: 'Main dishes',
        data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
        title: 'Sides',
        data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
    },
    {
        title: 'Drinks',
        data: ['Water', 'Coke', 'Beer'],
    },
    {
        title: 'Desserts',
        data: ['Cheese Cake', 'Ice Cream'],
    },
];
export default function Notification({ isVisible, onClose }) {
    return (
        <Modal visible={isVisible} backdropOpacity={0}
            onTouchStart={() => console.log("onTouchStart")}
            style={{ margin: 0 }} transparent>
            <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(0,0,0,0.3)", zIndex: 9999 }]}>
                <TouchableWithoutFeedback style={[StyleSheet.absoluteFill, { zIndex: 9999 }]} onPress={onClose && onClose}>
                    <View style={StyleSheet.absoluteFill} />
                </TouchableWithoutFeedback>
                <View style={styles.notifyContainer}>
                    <View style={styles.notifyContainer_}>
                        <View style={styles.list_container}>
                            <SectionList
                                sections={DATA}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item }) => <TouchableRipple style={styles.listItem}>
                                    <>
                                        {item.notification ? <Text style={[styles.heading, { flex: 1 }]}>{item.notification.name} {item.notificationType == "follow_request" ?
                                            <Text style={styles.subheading}>started following you</Text>
                                            : <Text style={styles.subheading}>{item.notificationType}</Text>}</Text>
                                            : null}
                                        <Text style={[styles.heading, { flex: 1 }]}>{item.message}</Text>
                                    </>
                                </TouchableRipple>}
                                renderSectionHeader={({ section: { title } }) => (
                                    <View style={{}}>
                                        <Text style={[styles.notifyHeaderText, { color: "#000" }]}>{title}</Text>
                                    </View>
                                )}
                                contentContainerStyle={{ paddingBottom: 10, alignItems: 'flex-start' }}
                            />

                        </View>
                        {/* <TouchableRipple underlayColor={"rgba(144,144,144,0.9)"} activeOpacity={1} onPress={() => console.log("working")} style={[styles.notifyFooter,]}>
                            <Text style={{ fontFamily: Font_Heebo_SemiBold, lineHeight: 20, fontSize: 14, color: "#000" }}>See All Notification</Text>
                        </TouchableRipple> */}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    notifyContainer: {
        position: 'absolute',
        right: 15,
        top: 69
    },
    notifyContainer_: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.6,
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: "rgba(184, 183, 183, 0.5)",
        borderRadius: 10,
        backgroundColor: "#fff"
    },
    list_container: {
        height: SCREEN_HEIGHT * 0.53,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 14,
        borderBottomColor: "rgba(184, 183, 183, 0.5)",
        borderBottomWidth: 2,
        paddingVertical: 10,
        width: SCREEN_WIDTH * 0.6
    },
    notifyHeaderText: {
        marginHorizontal: 14,
        backgroundColor: "#fff",
        fontSize: 12,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        marginTop: 25,
        marginBottom: 5,
        fontFamily: Font_Heebo_Medium,
        lineHeight: 14.6,


    },
    heading: {
        fontSize: 12,
        fontFamily: Font_Heebo_SemiBold,
        color: "#fff",
        marginLeft: 12,
    },
    subheading: {
        fontFamily: Font_Heebo_Regular
    },
    notifyFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        backgroundColor: "#fff",
        paddingVertical: 9,
        width: SCREEN_WIDTH * 0.56,
        borderRadius: 8,
    },
})