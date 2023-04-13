import { Text, StyleSheet, View, Modal, TextInput, FlatList, } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import Icon from '../../utils/icons'
import { Font_Heebo_Medium, Font_Heebo_Regular, Font_Heebo_SemiBold, Font_Lato_Bold } from '../../utils/typograpy'
import { GRAY_COLOR, PLACEHOLDER_COLOR, PRIMARY_LIGHT_COLOR } from '../../utils/colors'
import Button from '../button/Button'
import { TouchableRipple } from 'react-native-paper'
import RadioButton from '../button/RadioButton'
import DatePicker from 'react-native-date-picker'
/**
 * 
 * @param {{ 
 * isVisible:boolean,
 * onClose:Function, 
 * }} props Props for the component
 * 
 */
const FILTER_ITEM = ["Delivered", "Accepted", "Rejected"]

export default function Filter({ isVisible, onClose }) {
    const [applyFilters, setApplyFilter] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [startOpen, setStartOpen] = useState(false)
    const [endOpen, setEndOpen] = useState(false)
    const handleFilter = (item) => {
        applyFilters.push(item)
    }
    const handelDateChange = () => { }
    return (
        <Modal visible={isVisible} onRequestClose={onClose && onClose} transparent animationType='slide'>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: "rgba(0,0,0,0.2)" }}>
                <View style={{ width: '100%', height: '100%', backgroundColor: "#fff", borderRadius: 10 }}>
                    <View style={styles.modalHeader}>
                        <Text style={{ fontSize: 22, fontFamily: Font_Lato_Bold, color: "#000" }}>Filter</Text>
                        <Icon name='close' size={25} onPress={onClose && onClose} />
                    </View>
                    <View style={{ padding: 14 }}>
                        <Text style={{ fontSize: 18, fontFamily: Font_Heebo_Medium, color: "#000" }}>Date Range</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingBottom: 0 }}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.textInput} onPress={() => setStartOpen(true)}>Start Date</Text>
                                <DatePicker
                                    modal
                                    open={startOpen}
                                    date={startDate}
                                    mode='date'
                                    onConfirm={(date) => {
                                        setStartOpen(false)
                                        setStartDate(date)
                                    }}
                                    onCancel={() => {
                                        setStartOpen(false)
                                    }}
                                />
                            </View>
                            <View style={{ marginHorizontal: 5 }}>
                                <Text style={{ fontSize: 15, color: "#000", }}>-</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.textInput} onPress={() => setEndOpen(true)}>End Date</Text>
                                <DatePicker
                                    modal
                                    mode='date'
                                    open={endOpen}
                                    date={endDate}
                                    onConfirm={(date) => {
                                        setEndOpen(false)
                                        setEndDate(date)
                                    }}
                                    onCancel={() => {
                                        setEndOpen(false)
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.suHeadings}>
                        <Text style={{ fontSize: 18, fontFamily: Font_Heebo_Medium, color: "#000" }}>Order Status</Text>
                        <View style={styles.clearAll}>
                            <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Regular, color: "#000" }}>Clear All</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={FILTER_ITEM}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => <TouchableRipple onPress={() => handleFilter(item)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: "rgba(240, 240, 240, 1)" }}>
                                <React.Fragment>
                                    <Text style={{ fontSize: 16, fontFamily: Font_Heebo_SemiBold, color: "#000", lineHeight: 20 }}>{item}</Text>
                                    <RadioButton />
                                </React.Fragment>
                            </TouchableRipple>}
                            keyExtractor={(item) => item}
                        />
                    </View>
                    <View style={{ padding: 14 }}>
                        <Button
                            title='Apply'
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    modalHeader: {
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: "rgba(200,200,200,1)"
    },
    suHeadings: {
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: GRAY_COLOR,
        paddingHorizontal: 14,
        borderRadius: 10,
        flex: 1
    },
    textInput: {
        textAlign: 'center',
        paddingVertical: 0,
        height: 50,
        fontFamily: Font_Heebo_Medium,
        fontSize: 15,
        flex: 1,
        textAlignVertical: 'center',
    },
    clearAll: {
        backgroundColor: PRIMARY_LIGHT_COLOR,
        paddingHorizontal: 14,
        paddingVertical: 3,
        borderRadius: 15
    },
})