import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Icon from '../../../utils/icons'
import { TouchableRipple } from 'react-native-paper'
import { Font_Heebo_Medium, Font_Heebo_SemiBold, Font_Lato_Bold } from '../../../utils/typograpy'
import { CHARCOAL_COLOR, PRIMARY_COLOR, PRIMARY_LIGHT_COLOR } from '../../../utils/colors'
import LocationManuallyType from './ManuallyType'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../utils/constants'
import GetLocation from 'react-native-get-location'
import { getRequest, postWithBody } from '../../../utils/helper/apiHelper'
import { useDispatch } from 'react-redux'
import { getHomeBanner, getTopCategory } from '../../../actions/thunkActions'
/**
 * 
 * @param {{ 
 * isVisible:boolean,
 * onClose:Function, 
 * }} props Props for the component
 * 
 */
export default function Autodetect({ isVisible = false, onClose }) {
  const [isTypeManually, setIsTypeManually] = useState(false)
  const dispatch=useDispatch()
  const handleTypeManually = () => {
    setIsTypeManually(!isTypeManually)
    onClose && onClose()
  }
  const handleAutoDetect = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
    .then(async location => {
      let body=JSON.stringify({
        "longitude":location.longitude,
        "latitude":location.latitude
        })
      console.log(body,'.....')
      let storeData=await postWithBody('store/getAllStore',body);
      console.log(storeData,'res.....')
      if(storeData?.products[0]){
        dispatch({type: 'STORE_DATA', payload: storeData.products[0]})
        dispatch(getHomeBanner(storeData.products[0]._id))
        dispatch(getTopCategory(storeData.products[0]._id))
        onClose()
      }
    })
    .catch( error => {
        alert(JSON.stringify(error))
    })
   }
  return (
    <>
      <Modal visible={isVisible} transparent onRequestClose={onClose && onClose} animationType='slide'>
        <View style={styles.container} pointerEvents='box-none'>
          <TouchableWithoutFeedback style={StyleSheet.absoluteFillObject} onPressOut={onClose && onClose}>
            <View style={styles.absolute} />
          </TouchableWithoutFeedback>
          <View style={styles.wrapper} >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Icon name='location-sharp' size={25} color='#000' style={{ backgroundColor: PRIMARY_LIGHT_COLOR, width: 40, height: 40, textAlign: 'center', textAlignVertical: 'center', borderRadius: 40 }} />
              <Text style={{ fontSize: 25, fontFamily: Font_Lato_Bold, color: "#000", marginLeft: 10 }}>Select Location</Text>
            </View>
            <Text style={{ fontSize: 14, fontFamily: Font_Heebo_Medium, color: CHARCOAL_COLOR, marginBottom: 16, marginLeft: 5 }}>Please provide your delivery location for the best experience</Text>
            <View style={styles.buttonWrapper}>
              <TouchableRipple style={styles.button} onPress={handleTypeManually}>
                <Text style={{ fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: "#000" }}>Type Manually</Text>
              </TouchableRipple>
              <TouchableRipple style={[styles.button, { backgroundColor: PRIMARY_COLOR }]} onPress={handleAutoDetect}>
                <Text style={{ fontSize: 14, fontFamily: Font_Heebo_SemiBold, color: "#fff" }}>Auto Detect</Text>
              </TouchableRipple>
            </View>
          </View>
        </View>
      </Modal>
      <LocationManuallyType isVisible={isTypeManually} onClose={handleTypeManually} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  wrapper: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 8
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: PRIMARY_LIGHT_COLOR,
    width: "48%",
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  absolute: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    ...StyleSheet.absoluteFill,

  }
})